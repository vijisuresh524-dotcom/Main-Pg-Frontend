import React from "react";
import { FaEdit, FaTrash, FaCalendarAlt, FaFlag } from "react-icons/fa";

const KanbanCard = ({ task, onEdit, onDelete }) => {
  const priorityColor = {
    High: "bg-red-100 text-red-600",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-700",
  };

  const statusColor = {
    Pending: "bg-orange-100 text-orange-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Completed: "bg-green-100 text-green-700",
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5">

      {/* Title */}
      <h3 className="text-lg font-bold text-[#3D2396]">
        {task.title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-sm mt-2 line-clamp-3">
        {task.description}
      </p>

      {/* Priority & Due Date */}
      <div className="flex justify-between items-center mt-5">

        <span
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
            priorityColor[task.priority]
          }`}
        >
          <FaFlag />
          {task.priority}
        </span>

        <span className="flex items-center gap-2 text-gray-500 text-sm">
          <FaCalendarAlt />
          {task.dueDate}
        </span>

      </div>

      {/* Status */}
      <div className="mt-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            statusColor[task.status]
          }`}
        >
          {task.status}
        </span>
      </div>

      {/* Buttons */}
      {/* <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={() => onEdit && onEdit(task)}
          className="text-blue-600 hover:text-blue-800"
        >
          <FaEdit />
        </button>

        <button
          onClick={() => onDelete && onDelete(task.id)}
          className="text-red-600 hover:text-red-800"
        >
          <FaTrash />
        </button> */}

      </div>

    // </div>
  );
};

export default KanbanCard;