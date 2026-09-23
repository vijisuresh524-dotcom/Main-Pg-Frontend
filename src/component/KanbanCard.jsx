import {
  FaGripVertical,
} from "react-icons/fa";

const KanbanCard = ({
  task,
  onPointerDown,
  
  isDragging,
}) => {
  return (
    <div
      onPointerDown={(event) =>
        onPointerDown(event, task)
      }
      data-task-id={task._id}
      className={`relative rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-sm transition ${
        isDragging
          ? "scale-105 opacity-70 shadow-2xl ring-2 ring-[#341B88]"
          : "hover:shadow-md"
      } touch-none select-none`}
    >
      {/* DRAG HANDLE */}

      <div className="absolute right-3 top-3 text-gray-400">
        <FaGripVertical />
      </div>

      {/* Title */}

      <h3 className="pr-6 text-lg font-bold text-[#341B88]">
        {task.title}
      </h3>

      {/* Description */}

      <p className="mt-2 text-sm text-gray-600">
        {task.description}
      </p>

      {/* Priority */}

      <div className="mt-4">
        <p className="text-xs font-semibold text-gray-500">
          Priority
        </p>

        <p className="text-sm font-semibold">
          {task.priority}
        </p>
      </div>

      {/* Due Date */}

      <div className="mt-3">
        <p className="text-xs font-semibold text-gray-500">
          Due Date
        </p>

        <p className="text-sm">
          {task.dueDate}
        </p>
      </div>

      {/* Status */}

      <div className="mt-4">
        <p className="text-xs font-semibold text-gray-500">
          Status
        </p>

        <p
          className={`mt-1 inline-block rounded-full px-3 py-1 text-sm font-semibold ${
            task.status === "Completed"
              ? "bg-green-100 text-green-700"
              : task.status === "In Progress"
              ? "bg-blue-100 text-blue-700"
              : "bg-orange-100 text-orange-700"
          }`}
        >
          {task.status}
        </p>
      </div>

      {/* MOBILE STATUS SELECT */}

      {/* <div className="mt-4 border-t border-gray-200 pt-4">
        <label className="mb-1 block text-xs font-semibold text-gray-500">
          Change Status
        </label>

        <select
          value={task.status}
          onChange={(event) =>
            onStatusChange(
              task,
              event.target.value
            )
          }
          onPointerDown={(event) =>
            event.stopPropagation()
          }
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#341B88] focus:ring-2 focus:ring-purple-100"
        >
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
      </div> */}

      {/* DRAG INSTRUCTION */}

      <p className="mt-3 text-center text-xs text-gray-400">
        Touch and drag to move
      </p>
    </div>
  );
};

export default KanbanCard;