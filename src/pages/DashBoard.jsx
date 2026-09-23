import { useState, useEffect } from "react";
import Navbar from "../component/NavBar";
import TaskForm from "../component/TaskForm";
import TaskCard from "../component/TaskCard";
import Footer from "../component/Footer";
import { apiRequest } from "../services/api";

const DashBoard = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // --------------------------------
  // GET LOGGED-IN USER
  // --------------------------------

  const user = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  // --------------------------------
  // FETCH TASKS FROM BACKEND
  // --------------------------------

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const response = await apiRequest("/tasks");

      setTasks(response.tasks || []);
    } catch (error) {
      console.error("Failed to fetch tasks:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, []);

  // --------------------------------
  // ADD / EDIT TASK
  // --------------------------------

  const addTask = async (task) => {
    try {
      if (editingTask) {
        // EDIT EXISTING TASK

        const response = await apiRequest(
          `/tasks/${editingTask._id}`,
          {
            method: "PUT",
            body: JSON.stringify(task),
          }
        );

        setTasks((prevTasks) =>
          prevTasks.map((t) =>
            t._id === editingTask._id
              ? response.task
              : t
          )
        );

        setEditingTask(null);
      } else {
        // ADD NEW TASK

        const response = await apiRequest("/tasks", {
          method: "POST",
          body: JSON.stringify({
            ...task,
            status: "Pending",
          }),
        });

        setTasks((prevTasks) => [
          response.task,
          ...prevTasks,
        ]);
      }

      setShowForm(false);

    } catch (error) {
      alert(
        error.message || "Failed to save task"
      );
    }
  };

  // --------------------------------
  // EDIT TASK
  // --------------------------------

  const editTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  // --------------------------------
  // DELETE TASK
  // --------------------------------

  const deleteTask = async (id) => {
    try {
      await apiRequest(`/tasks/${id}`, {
        method: "DELETE",
      });

      setTasks((prevTasks) =>
        prevTasks.filter(
          (task) => task._id !== id
        )
      );

    } catch (error) {
      alert(
        error.message || "Failed to delete task"
      );
    }
  };

  // --------------------------------
  // CHANGE TASK STATUS
  // --------------------------------

 const handleStatusChange = async (id, newStatus) => {
  try {
    const response = await apiRequest(`/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        status: newStatus,
      }),
    });

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === id
          ? response.task
          : task
      )
    );

    // Tell Navbar to refresh notifications
    window.dispatchEvent(
      new Event("taskUpdated")
    );

  } catch (error) {
    alert(
      error.message ||
        "Failed to update task status"
    );
  }
};

  // --------------------------------
  // FILTER TASKS
  // --------------------------------

  const filteredTasks = tasks
    .filter((task) =>
      task.title
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter(
      (task) =>
        priority === "" ||
        task.priority === priority
    )
    .filter(
      (task) =>
        status === "" ||
        task.status === status
    );

  // --------------------------------
  // RENDER
  // --------------------------------

  return (
    <div>

      <Navbar />

      {/* TASK FORM */}

      {showForm && (
        <TaskForm
          task={editingTask}
          onAddTask={addTask}
          onClose={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
        />
      )}

      <div className="min-h-screen bg-gradient-to-br from-[#EEF2FF] via-[#F8FAFC] to-[#E0E7FF]">

      {/* HERO SECTION */}

<section className="mx-4 mt-8 rounded-3xl bg-gradient-to-r from-[#341B88] to-[#5B3FD6] p-6 text-white shadow-xl sm:mx-6 sm:mt-10 sm:p-8 lg:p-10">

  <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">

    {/* HERO CONTENT */}

    <div>
      <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
        Welcome back 👋
      </h1>

      <p className="mt-3 max-w-2xl text-base text-gray-200 sm:mt-4 sm:text-lg">
        Stay organized, complete tasks
        and boost productivity.
      </p>
    </div>

    {/* ADD TASK BUTTON */}

    <button
      onClick={() => {
        setEditingTask(null);
        setShowForm(true);
      }}
      className="w-full rounded-xl bg-cyan-300 px-6 py-3 font-semibold text-black transition hover:bg-indigo-700  sm:w-auto sm:px-8 sm:py-4"
    >
      + Add Task
    </button>

  </div>

</section>

        {/* SEARCH & FILTER */}

        <section className="mx-6 mt-6 bg-white rounded-2xl shadow-lg p-5">

          <div className="flex flex-wrap gap-4">

            {/* SEARCH */}

            <input
              type="text"
              placeholder="Search task..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="flex-1 border rounded-xl px-4 py-3 outline-none"
            />

            {/* PRIORITY */}

            <select
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value)
              }
              className="border rounded-xl px-4 py-3"
            >
              <option value="">
                All Priority
              </option>

              <option value="High">
                High
              </option>

              <option value="Medium">
                Medium
              </option>

              <option value="Low">
                Low
              </option>

            </select>

            {/* STATUS */}

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="border rounded-xl px-4 py-3"
            >
              <option value="">
                All Status
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Completed">
                Completed
              </option>

            </select>

          </div>

        </section>

        {/* TASKS */}

        <section className="p-6">

          <h2 className="text-3xl font-bold text-[#341B88] mb-6">
            My Tasks
          </h2>

          {/* LOADING */}

          {loading ? (

            <div className="text-center py-20">

              <p className="text-xl text-gray-500">
                Loading tasks...
              </p>

            </div>

          ) : filteredTasks.length > 0 ? (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

              {filteredTasks.map((task) => (

                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={editTask}
                  onDelete={deleteTask}
                 
                />

              ))}

            </div>

          ) : (

            <div className="col-span-full text-center py-20 bg-white rounded-2xl shadow">

              <h2 className="text-3xl font-bold text-gray-700">
                No Tasks Yet
              </h2>

              <p className="text-gray-500 mt-3">
                Click the Add Task button to
                create your first task.
              </p>

            </div>

          )}

        </section>

        <Footer />

      </div>

    </div>
  );
};

export default DashBoard;