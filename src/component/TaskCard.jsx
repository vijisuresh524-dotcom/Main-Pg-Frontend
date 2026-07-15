import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'; 

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {

// Status Change
 

  return (
    
<div className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition duration-300">
  <div className="flex justify-between items-center">
    <h2 className="text-xl font-bold">{task.title}</h2>

    <div className="flex gap-3">
      <button
        onClick={() => onEdit(task)}
        className="text-blue-600 hover:text-blue-800"
      >
        <FaEdit />
      </button>

      <button
        onClick={() => onDelete(task.id)}
        className="text-red-600 hover:text-red-800"
      >
        <FaTrash />
      </button>
    </div>
  </div>

  <p className="mt-3">{task.description}</p>

  <p className="mt-2">
    <strong>Priority:</strong> {task.priority}
  </p>

  <p>
    <strong>Due:</strong> {task.dueDate}
  </p>


{/* status */}
   <div className="mt-3">

            <label>Status : </label>

           <select
  value={task.status}
  onChange={(e) => onStatusChange(task.id, e.target.value)}
  className="border rounded p-1 ml-2"
>
  <option value="Pending">Pending</option>
  <option value="In Progress">In Progress</option>
  <option value="Completed">Completed</option>
</select>

          </div>
</div>
        

  );
};

export default TaskCard;