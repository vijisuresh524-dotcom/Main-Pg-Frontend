import React from 'react'
import Navbar from '../component/NavBar'
import Footer from '../component/Footer'
import { FaClock,FaSpinner,FaCheckCircle,FaClipboard } from 'react-icons/fa';

const Overview = () => {
  const User = JSON.parse(localStorage.getItem("loggedInUser"));
  
  const tasks = JSON.parse(
    localStorage.getItem(`tasks_${User.email}`)
  ) || [];

  const total = tasks.length;

  const pending = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const progress = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const completed = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const high = tasks.filter(
    (task) => task.priority === "High"
  ).length;

  const medium = tasks.filter(
    (task) => task.priority === "Medium"
  ).length;

  const low = tasks.filter(
    (task) => task.priority === "Low"
  ).length;

  const completionRate =
    total === 0
      ? 0
      : Math.round((completed / total) * 100);

  const upcoming = [...tasks]
    .sort(
      (a, b) =>
        new Date(a.dueDate) - new Date(b.dueDate)
    )
    .slice(0, 5);

  return (
    <div>
    <Navbar />
    <div className="bg-slate-100 min-h-screen p-8">
      
     
     
     
     {/* <div className="min-h-screen bg-slate-100 px-8 py-8"> */}

        {/* Header */}

        <div className="bg-gradient-to-r from-[#39248B] to-[#6544F5] rounded-3xl text-white p-8 shadow-xl mt-20">

          <h1 className="text-4xl font-bold">
            📋 Overview
          </h1>

          <p className="mt-2 text-lg text-gray-200">
            Organize your workflow efficiently.
          </p>

        </div>



      {/* Summary Cards */}

      <div className="grid md:grid-cols-4 gap-6 mb-10 mt-6">

        <div className="bg-white rounded-xl shadow-lg shadow-gray-300 hover:scale-105 transition duration-300 p-6">
          <p className="text-gray-500">Total Tasks</p>
          <FaClipboard className="text-2xl text-gray-700 mt-2" />
          <h2 className="text-3xl font-bold">{total}</h2>
        </div>

        <div className="bg-orange-100 rounded-xl shadow-lg shadow-gray-300 hover:scale-105 transition duration-300 p-6">
          <p>Pending</p>
          <FaClock className="text-orange-500 text-2xl mt-2" />
          <h2 className="text-3xl font-bold">{pending}</h2>
        </div>

        <div className="bg-blue-100 rounded-xl shadow-lg shadow-gray-300 hover:scale-105 transition duration-300 p-6">
          <p>In Progress</p>
          <FaSpinner className="text-blue-500 text-2xl mt-2" />
          <h2 className="text-3xl font-bold">{progress}</h2>
        </div>

        <div className="bg-green-100 rounded-xl shadow-lg shadow-gray-300 hover:scale-105 transition duration-300 p-6">
          <p>Completed</p>
          <FaCheckCircle className="text-green-500 text-2xl mt-2" />
          <h2 className="text-3xl font-bold">{completed}</h2>
        </div>

      </div>

      {/* Progress */}

      <div className="bg-white rounded-xl shadow-lg shadow-gray-300 hover:scale-105 transition duration-300 p-6 mb-8">

        <div className="flex justify-between mb-3">

          <h2 className="text-xl font-semibold">
            Completion Rate
          </h2>

          <span>{completionRate}%</span>

        </div>

        <div className="w-full bg-gray-200 rounded-full h-4">

          <div
            className="bg-green-500 h-4 rounded-full"
            style={{ width: `${completionRate}%` }}
          ></div>

        </div>

      </div>

      {/* Priority */}

      <div className="grid md:grid-cols-2 gap-8">

        <div className="bg-white rounded-xl shadow-lg shadow-gray-300 hover:scale-105 transition duration-300 p-6">

          <h2 className="text-2xl font-semibold mb-6">
            Priority Summary
          </h2>

          <div className="space-y-5">

            <div>

              <div className="flex justify-between">
                <span>High</span>
                <span>{high}</span>
              </div>

              <div className="bg-gray-200 rounded-full h-3 mt-2">
                <div
                  className="bg-red-500 h-3 rounded-full"
                  style={{
                    width:
                      total === 0
                        ? "0%"
                        : `${(high / total) * 100}%`,
                  }}
                ></div>
              </div>

            </div>

            <div>

              <div className="flex justify-between">
                <span>Medium</span>
                <span>{medium}</span>
              </div>

              <div className="bg-gray-200 rounded-full h-3 mt-2">
                <div
                  className="bg-yellow-400 h-3 rounded-full"
                  style={{
                    width:
                      total === 0
                        ? "0%"
                        : `${(medium / total) * 100}%`,
                  }}
                ></div>
              </div>

            </div>

            <div>

              <div className="flex justify-between">
                <span>Low</span>
                <span>{low}</span>
              </div>

              <div className="bg-gray-200 rounded-full h-3 mt-2">
                <div
                  className="bg-green-500 h-3 rounded-full"
                  style={{
                    width:
                      total === 0
                        ? "0%"
                        : `${(low / total) * 100}%`,
                  }}
                ></div>
              </div>

            </div>

          </div>

        </div>

        {/* Upcoming */}

        <div className="bg-white rounded-xl shadow-lg shadow-gray-300 hover:scale-105 transition duration-300 p-6">

          <h2 className="text-2xl font-semibold mb-6">
            Upcoming Deadlines
          </h2>

          {upcoming.length === 0 ? (
            <p>No Tasks</p>
          ) : (
            upcoming.map((task) => (
              <div
                key={task.id}
                className="border-b py-3"
              >
                <h3 className="font-semibold">
                  {task.title}
                </h3>

                <p className="text-sm text-gray-500">
                  Due : {task.dueDate}
                </p>
              </div>
            ))
          )}

        </div>

      </div>

      {/* Recent Tasks */}

      <div className="bg-white rounded-xl shadow-lg shadow-gray-300 p-6 mt-8">

        <h2 className="text-2xl font-semibold mb-6">
          Recent Tasks
        </h2>

        {tasks
          .slice(-5)
          .reverse()
          .map((task) => (
            <div
              key={task.id}
              className="flex justify-between border-b py-3"
            >
              <div>

                <h3 className="font-semibold">
                  {task.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {task.description}
                </p>

              </div>

              <span
                className={`px-3 py-1 rounded-full text-white text-sm ${
                  task.status === "Completed"
                    ? "bg-green-500 pt-2"
                    : task.status === "In Progress"
                    ? "bg-blue-500 pt-2"
                    : "bg-orange-500 pt-2"
                }`}
              >
                {task.status}
              </span>

            </div>
          ))}

      </div>
<Footer />
    </div>
    </div>
  );
};

export default Overview;