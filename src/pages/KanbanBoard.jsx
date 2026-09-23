import {
  useEffect,
  useState,
} from "react";

import Navbar from "../component/NavBar";
import Footer from "../component/Footer";
import KanbanCard from "../component/KanbanCard";
import { apiRequest } from "../services/api";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] =
    useState(true);

  // Column currently being dragged over
  const [dragOverColumn, setDragOverColumn] =
    useState(null);

  // Task currently being dragged
  const [draggingTask, setDraggingTask] =
    useState(null);

  // --------------------------------
  // FETCH TASKS
  // --------------------------------

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const response =
        await apiRequest("/tasks");

      setTasks(response.tasks || []);
    } catch (error) {
      console.error(
        "Failed to fetch tasks:",
        error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // --------------------------------
  // UPDATE TASK STATUS
  // --------------------------------

  const updateTaskStatus = async (
    task,
    newStatus
  ) => {
    if (!task) {
      return;
    }

    if (task.status === newStatus) {
      return;
    }

    try {
      const response =
        await apiRequest(
          `/tasks/${task._id}/status`,
          {
            method: "PATCH",

            body: JSON.stringify({
              status: newStatus,
            }),
          }
        );

      // Update UI
      setTasks((prevTasks) =>
        prevTasks.map((item) =>
          item._id === task._id
            ? response.task
            : item
        )
      );

      // Refresh navbar notifications
      window.dispatchEvent(
        new Event("taskUpdated")
      );
    } catch (error) {
      console.error(
        "Status update error:",
        error
      );

      alert(
        error.message ||
          "Failed to update task status"
      );
    }
  };

  // --------------------------------
  // POINTER DOWN
  // --------------------------------

  const handlePointerDown = (
    event,
    task
  ) => {
    // Only handle primary mouse/touch
    if (!event.isPrimary) {
      return;
    }

    // Ignore if user touched the select
    if (
      event.target.tagName === "SELECT" ||
      event.target.tagName === "OPTION"
    ) {
      return;
    }

    setDraggingTask(task);
  };

  // --------------------------------
  // POINTER MOVE
  // --------------------------------

  useEffect(() => {
    if (!draggingTask) {
      return;
    }

    const handlePointerMove = (
      event
    ) => {
      if (!event.isPrimary) {
        return;
      }

      // Prevent mobile scrolling while dragging
      event.preventDefault();

      const element =
        document.elementFromPoint(
          event.clientX,
          event.clientY
        );

      const column =
        element?.closest(
          "[data-kanban-status]"
        );

      if (column) {
        const status =
          column.getAttribute(
            "data-kanban-status"
          );

        setDragOverColumn(status);
      } else {
        setDragOverColumn(null);
      }
    };

    const handlePointerUp = async (
      event
    ) => {
      if (!event.isPrimary) {
        return;
      }

      const element =
        document.elementFromPoint(
          event.clientX,
          event.clientY
        );

      const column =
        element?.closest(
          "[data-kanban-status]"
        );

      if (column) {
        const newStatus =
          column.getAttribute(
            "data-kanban-status"
          );

        await updateTaskStatus(
          draggingTask,
          newStatus
        );
      }

      setDraggingTask(null);
      setDragOverColumn(null);
    };

    window.addEventListener(
      "pointermove",
      handlePointerMove,
      {
        passive: false,
      }
    );

    window.addEventListener(
      "pointerup",
      handlePointerUp
    );

    window.addEventListener(
      "pointercancel",
      handlePointerUp
    );

    return () => {
      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      window.removeEventListener(
        "pointerup",
        handlePointerUp
      );

      window.removeEventListener(
        "pointercancel",
        handlePointerUp
      );
    };
  }, [draggingTask]);

  // --------------------------------
  // FILTER TASKS
  // --------------------------------

  const pendingTasks =
    tasks.filter(
      (task) =>
        task.status === "Pending"
    );

  const progressTasks =
    tasks.filter(
      (task) =>
        task.status === "In Progress"
    );

  const completedTasks =
    tasks.filter(
      (task) =>
        task.status === "Completed"
    );

  // --------------------------------
  // RENDER COLUMN
  // --------------------------------

  const renderColumn = (
    title,
    status,
    columnTasks,
    bgColor
  ) => {
    const isDragOver =
      dragOverColumn === status;

    return (
      <div
        data-kanban-status={status}
        className={`flex min-h-[500px] flex-col rounded-2xl bg-white p-4 shadow-lg transition sm:p-5 ${
          isDragOver
            ? "bg-purple-50 ring-4 ring-[#341B88]"
            : ""
        }`}
      >
        {/* COLUMN HEADER */}

        <div
          className={`mb-5 rounded-xl p-4 ${bgColor}`}
        >
          <h2 className="text-xl font-bold text-[#341B88]">
            {title}
          </h2>

          <p className="mt-1 text-sm text-gray-600">
            {columnTasks.length} task
            {columnTasks.length !== 1
              ? "s"
              : ""}
          </p>
        </div>

        {/* TASKS */}

        <div
          data-kanban-status={status}
          className="min-h-[350px] space-y-4"
        >
          {columnTasks.length > 0 ? (
            columnTasks.map((task) => (
              <KanbanCard
                key={task._id}
                task={task}
                onPointerDown={
                  handlePointerDown
                }
                onStatusChange={
                  updateTaskStatus
                }
                isDragging={
                  draggingTask?._id ===
                  task._id
                }
              />
            ))
          ) : (
            <div
              data-kanban-status={status}
              className={`flex min-h-[100px] items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition ${
                isDragOver
                  ? "border-[#341B88] bg-purple-50 text-[#341B88]"
                  : "border-gray-200 text-gray-400"
              }`}
            >
              {isDragOver
                ? "Drop task here"
                : "No tasks"}
            </div>
          )}
        </div>
      </div>
    );
  };

  // --------------------------------
  // RENDER
  // --------------------------------

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF2FF] via-[#F8FAFC] to-[#E0E7FF]">
      <Navbar />

      <main className="px-4 pb-12 pt-28 sm:px-6">

        {/* PAGE HEADER */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#341B88] sm:text-4xl">
            Kanban Board
          </h1>

          <p className="mt-2 text-sm text-gray-600 sm:text-base">
            Drag and drop your tasks to change
            their status.
          </p>

          {/* MOBILE HELP */}

          <div className="mt-4 rounded-lg border border-purple-100 bg-purple-50 px-4 py-3 text-sm text-[#341B88] md:hidden">
            <strong>Mobile:</strong> Touch and
            drag a task into another column.
            You can also use the{" "}
            <strong>Change Status</strong>{" "}
            dropdown.
          </div>
        </div>

        {/* LOADING */}

        {loading ? (
          <div className="py-20 text-center">
            <p className="text-xl text-gray-500">
              Loading tasks...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

            {/* PENDING */}

            {renderColumn(
              "Pending",
              "Pending",
              pendingTasks,
              "bg-orange-100"
            )}

            {/* IN PROGRESS */}

            {renderColumn(
              "In Progress",
              "In Progress",
              progressTasks,
              "bg-blue-100"
            )}

            {/* COMPLETED */}

            {renderColumn(
              "Completed",
              "Completed",
              completedTasks,
              "bg-green-100"
            )}

          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default KanbanBoard;