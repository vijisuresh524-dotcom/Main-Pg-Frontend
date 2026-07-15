import React, { useState } from "react";
import Navbar from "../component/NavBar";
import Footer from "../component/Footer";
import KanbanCard from "../component/KanbanCard";
import { Navigate } from "react-router-dom";

const KanbanBoard = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!loggedInUser) {
    return <Navigate to="/login" replace />;
  }

  const [search, setSearch] = useState("");

  const tasks =
    JSON.parse(localStorage.getItem(`tasks_${loggedInUser.email}`)) || [];

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase())
  );

  const pending = filteredTasks.filter(
    (task) => task.status === "Pending"
  );

  const progress = filteredTasks.filter(
    (task) => task.status === "In Progress"
  );

  const completed = filteredTasks.filter(
    (task) => task.status === "Completed"
  );

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 px-8 py-8">

        {/* Header */}

        <div className="bg-gradient-to-r from-[#39248B] to-[#6544F5] rounded-3xl text-white p-8 shadow-xl mt-20">

          <h1 className="text-4xl font-bold">
            📋 Kanban Board
          </h1>

          <p className="mt-2 text-lg text-gray-200">
            Organize your workflow efficiently.
          </p>

        </div>

        {/* Search */}

        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

          <input
            type="text"
            placeholder="🔍 Search Task..."
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        {/* Kanban */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">

          {/* Pending */}

          <div className="bg-orange-50 rounded-3xl shadow-[4px_0_15px_-5px_rgba(255,187,73,1)] p-5">

            <div className="flex justify-between items-center mb-5">

              <h2 className="text-xl font-bold text-orange-600">
                🟠 Pending
              </h2>

              <span className="bg-orange-500 text-white px-3 py-1 rounded-full">
                {pending.length}
              </span>

            </div>

            <div className="space-y-4">

              {pending.length === 0 ? (
                <p className="text-gray-500 text-center py-5">
                  No Pending Tasks
                </p>
              ) : (
                pending.map((task) => (
                  <KanbanCard key={task.id} task={task} />
                ))
              )}

            </div>

          </div>

          {/* In Progress */}

          <div className="bg-blue-50 rounded-3xl shadow-[4px_0_15px_-5px_rgba(99,102,241,1)] p-5">

            <div className="flex justify-between items-center mb-5">

              <h2 className="text-xl font-bold text-blue-600">
                🔵 In Progress
              </h2>

              <span className="bg-blue-500 text-white px-3 py-1 rounded-full">
                {progress.length}
              </span>

            </div>

            <div className="space-y-4">

              {progress.length === 0 ? (
                <p className="text-gray-500 text-center py-5">
                  No Tasks
                </p>
              ) : (
                progress.map((task) => (
                  <KanbanCard key={task.id} task={task} />
                ))
              )}

            </div>

          </div>

          {/* Completed */}

          <div className="bg-green-50 rounded-3xl shadow-[4px_0_15px_-5px_rgba(21,128,61,1)] p-5">

            <div className="flex justify-between items-center mb-5">

              <h2 className="text-xl font-bold text-green-600">
                🟢 Completed
              </h2>

              <span className="bg-green-500 text-white px-3 py-1 rounded-full">
                {completed.length}
              </span>

            </div>

            <div className="space-y-4">

              {completed.length === 0 ? (
                <p className="text-gray-500 text-center py-5">
                  No Completed Tasks
                </p>
              ) : (
                completed.map((task) => (
                  <KanbanCard key={task.id} task={task} />
                ))
              )}

            </div>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default KanbanBoard;