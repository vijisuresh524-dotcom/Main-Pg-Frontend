import {
  FaEdit,
  FaTrash,
  FaCheckCircle,
} from "react-icons/fa";

const TaskCard = ({
  task,
  onEdit,
  onDelete,
  
}) => {
  const getPriorityStyle = () => {
    if (task.priority === "High") {
      return "bg-red-100 text-red-700";
    }

    if (task.priority === "Medium") {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-green-100 text-green-700";
  };

  const getStatusStyle = () => {
    if (task.status === "Completed") {
      return "bg-green-100 text-green-700";
    }

    if (task.status === "In Progress") {
      return "bg-blue-100 text-blue-700";
    }

    return "bg-orange-100 text-orange-700";
  };

  return (
    <div className="flex flex-col rounded-2xl bg-white p-5 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">

      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-xl font-bold text-[#341B88]">
          {task.title}
        </h3>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${getPriorityStyle()}`}
        >
          {task.priority}
        </span>
      </div>

      {/* Description */}
      <p className="mb-2 min-h-[60px] text-sm text-gray-600">
        {task.description}
      </p>

      {/* Due Date */}
      <div className="mb-2">
        <p className="text-sm font-semibold text-gray-700">
          Due Date
        </p>

        <p className="text-sm text-gray-500">
          {task.dueDate}
        </p>
      </div>

      {/* Status */}
     <div className="mt-4">
  <p className="font-semibold text-gray-800 mb-2">
    Status
  </p>

  <div
    className={`w-full px-4 py-3 mb-6 rounded-xl font-semibold text-center ${
      task.status === "Completed"
        ? "bg-green-100 text-green-700"
        : task.status === "In Progress"
        ? "bg-blue-100 text-blue-700"
        : "bg-orange-100 text-orange-700"
    }`}
  >
    {task.status}
  </div>
</div>

      {/* Buttons */}
      <div className="mt-auto flex gap-3">

        <button
          onClick={() => onEdit(task)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-100 px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-200"
        >
          <FaEdit />
          Edit
        </button>

        <button
          onClick={() => onDelete(task._id)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-100 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-200"
        >
          <FaTrash />
          Delete
        </button>

      </div>

      {task.status === "Completed" && (
        <div className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-green-600">
          <FaCheckCircle />
          Task Completed
        </div>
      )}

    </div>
  );
};

export default TaskCard;