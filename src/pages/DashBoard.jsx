import { useState, useEffect } from "react";
import React from "react";
import Navbar from "../component/NavBar";
import TaskForm from "../component/TaskForm";
import TaskCard from "../component/TaskCard";
import Footer from "../component/Footer";


const DashBoard = () => {
  const [showForm, setShowForm] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [search, setSearch] = useState("");
 const [priority, setPriority] = useState("");
 const [status, setStatus] = useState("");

const user = JSON.parse(localStorage.getItem("loggedInUser"));

const [tasks, setTasks] = useState(() => {
  if (!user) return [];

  const savedTasks =
    JSON.parse(localStorage.getItem(`tasks_${user.email}`)) || [];

  return savedTasks.map((task) => ({
    ...task,
    status: task.status || "Pending",
  }));
});

useEffect(() => {
  if (user) {
    localStorage.setItem(
      `tasks_${user.email}`,
      JSON.stringify(tasks)
    );
  }
}, [tasks]);

const addTask = (task) => {
  let updatedTasks;

  if (editingTask) {
    // Update existing task
    updatedTasks = tasks.map((t) =>
      t.id === editingTask.id
        ? {
            ...t,
            ...task,
            id: editingTask.id,
          }
        : t
    );

    setEditingTask(null);
  } else {
    // Add new task
    const newTask = {
      id: Date.now(),
      status: "Pending",
      ...task,
    };

    updatedTasks = [...tasks, newTask];
  }

  setTasks(updatedTasks);

  localStorage.setItem(
    `tasks_${user.email}`,
    JSON.stringify(updatedTasks)
  );

  setShowForm(false);
};
    
  // Edit
  const editTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  // Delete
 const deleteTask = (id) => {
  const updatedTasks = tasks.filter((task) => task.id !== id);

  setTasks(updatedTasks);

  localStorage.setItem(
    `tasks_${user.email}`,
    JSON.stringify(updatedTasks)
  );
};

 // Filtering should be OUTSIDE useEffect
  const filteredTasks = tasks
  .filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  )
  .filter((task) =>
    priority === "" || task.priority === priority
  )
  .filter((task) =>
    status === "" || task.status === status
  );

  // status
const handleStatusChange = (id, status) => {
  const updatedTasks = tasks.map((task) =>
    task.id === id
      ? { ...task, status }
      : task
  );

  setTasks(updatedTasks);

  localStorage.setItem(
    `tasks_${user.email}`,
    JSON.stringify(updatedTasks)
  );

  console.log(`Task ${id} changed to ${status}`);
};   
  return (
    <div>
      <Navbar />

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

  {/* Hero Section */}

  <section className="mx-6 mt-30 rounded-3xl bg-gradient-to-r from-[#341B88] to-[#5B3FD6] text-white p-10 shadow-xl">

    <div className="flex justify-between items-center">

      <div>

        <h1 className="text-5xl font-bold">
          Welcome back 👋
        </h1>

        <p className="mt-4 text-lg text-gray-200">
          Stay organized, complete tasks and boost productivity.
        </p>

      </div>

      <button
        onClick={()=>{
          setEditingTask(null);
          setShowForm(true);
        }}
        className="bg-cyan-300 text-[#341B88] font-semibold px-8 py-4 rounded-xl hover:bg-cyan-200 transition"
      >
        + Add Task
      </button>

    </div>

  </section>

  {/* Search & Filter */}

  <section className="mx-6 mt-6 bg-white rounded-2xl shadow-lg p-5">

    <div className="flex flex-wrap gap-4">

     <input
  type="text"
  placeholder="Search task..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="flex-1 border rounded-xl px-4 py-3 outline-none"
/>

{/* Priority Filter */}
     <select
  value={priority}
  onChange={(e) => setPriority(e.target.value)}
  className="border rounded-xl px-4 py-3"
>
  <option value="">All Priority</option>
  <option value="High">High</option>
  <option value="Medium">Medium</option>
  <option value="Low">Low</option>
</select>


{/* Status Filter */}
      <select
  value={status}
  onChange={(e) => setStatus(e.target.value)}
  className="border rounded-xl px-4 py-3"
>
  <option value="">All Status</option>
  <option value="Pending">Pending</option>

        <option value="In Progress">In Progress</option>

        <option value="Completed">Completed</option>

      </select>

      
    </div>

  </section>

  {/* Tasks */}

  <section className="p-6">

    <h2 className="text-3xl font-bold text-[#341B88] mb-6">
      My Tasks
    </h2>

   {filteredTasks.length > 0 ? (

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

       {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={editTask}
            onDelete={deleteTask}
            onStatusChange={handleStatusChange}
          />
        ))}

      </div>

    ) : (

      <div className="col-span-full text-center py-20 bg-white rounded-2xl shadow">

        <h2 className="text-3xl font-bold text-gray-700">
          No Tasks Yet
        </h2>

        <p className="text-gray-500 mt-3">
          Click the Add Task button to create your first task.
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