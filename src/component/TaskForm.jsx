import { useState,useEffect } from "react";

const TaskForm = ({ task, onAddTask, onClose }) => {
  const [formData, setFormData] = useState({
  title: "",
  description: "",
  priority: "Medium",
  dueDate: "",
});
useEffect(() => {
  if (task) {
    setFormData(task);
  } else {
    setFormData({
      title: "",
      description: "",
      priority: "Medium",
      dueDate: "",
    });
  }
}, [task]);

 const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.dueDate) {
      alert("Please fill all fields.");
      return;
    }

    onAddTask(formData);
    onClose();

    setFormData({
      title: "",
      description: "",
      priority: "Medium",
      dueDate: "",
    });
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">

        <h2 className="text-2xl font-bold mb-4 text-center">
          Add New Task
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Task Title"
            className="w-full border p-2 rounded"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border p-2 rounded"
          />

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-emerald-600 text-white px-4 py-2 rounded"
            >
              Save Task
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default TaskForm;