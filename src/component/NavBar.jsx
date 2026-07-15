import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaClipboardList,
  FaChartBar,
  FaSignOutAlt,
  FaBell,
  FaBars,
  FaTimes,
} from "react-icons/fa";


const NavBar = () => {
const [showNotification, setShowNotification] = useState(false);

const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const tasks = JSON.parse(
  localStorage.getItem(`tasks_${loggedUser.email}`)
) || [];

const today = new Date().toISOString().split("T")[0];

const notifications = [];

tasks.forEach((task) => {
  if (task.status === "Completed") {
    notifications.push(`✅ ${task.title} completed.`);
  }

  if (task.status === "In Progress") {
    notifications.push(`🔵 ${task.title} is in progress.`);
  }

  if (task.dueDate === today) {
    notifications.push(`📅 ${task.title} is due today.`);
  }

  if (task.dueDate < today && task.status !== "Completed") {
    notifications.push(`⚠️ ${task.title} is overdue.`);
  }

  if (task.priority === "High" && task.status !== "Completed") {
    notifications.push(`🔥 High priority: ${task.title}`);
  }
});
  const logout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  return (
    <div>
   <nav className="fixed top-0 left-0 right-0 z-50 bg-[#341B88] text-white shadow-lg">

  <div className="max-w-7xl mx-auto h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between">

    {/* Logo */}
    <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
      <FaClipboardList /> TaskSphere
    </h1>

    {/* Desktop Menu */}
    <div className="hidden lg:flex items-center gap-10 font-medium">

      <Link className="hover:text-cyan-300 transition" to="/dashboard">
        Home
      </Link>

      <Link className="hover:text-cyan-300 transition" to="/kanban">
        Kanban Board
      </Link>

      <Link className="hover:text-cyan-300 transition" to="/overview">
        Overview
      </Link>

    </div>

    {/* Right Side */}
    <div className="hidden lg:flex items-center gap-5">

      <p className="font-semibold whitespace-nowrap">
        Welcome, {user?.name}
      </p>

      {/* Notification */}
      <div className="relative">

        <button onClick={() => setShowNotification(!showNotification)}>
          <FaBell className="text-2xl hover:text-yellow-300" />
        </button>

        <span className="absolute -top-2 -right-2 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {notifications.length}
        </span>

        {showNotification && (
          <div className="absolute right-0 mt-4 w-72 bg-white text-gray-800 rounded-xl shadow-xl p-4">
            <h3 className="font-semibold border-b pb-2">
              Notifications
            </h3>

            {notifications.length === 0 ? (
              <p className="py-3 text-gray-500">
                No notifications
              </p>
            ) : (
              notifications.map((note, index) => (
                <div
                  key={index}
                  className="py-2 border-b last:border-none text-sm"
                >
                  {note}
                </div>
              ))
            )}
          </div>
        )}

      </div>

      <button
        onClick={logout}
        className="bg-red-400 px-5 py-2 rounded-xl hover:bg-red-500"
      >
        Logout
      </button>

    </div>

    {/* Mobile Menu Button */}
    <button
      className="lg:hidden text-2xl"
      onClick={() => setMenuOpen(!menuOpen)}
    >
      {menuOpen ? <FaTimes /> : <FaBars />}
    </button>

  </div>

  {/* Mobile Menu */}
  {menuOpen && (
    <div className="lg:hidden bg-[#41229D] px-6 py-5 space-y-5">

      <p className="font-semibold">
        Welcome, {user?.name}
      </p>

      <Link
        to="/dashboard"
        onClick={() => setMenuOpen(false)}
        className="block hover:text-cyan-300"
      >
        Home
      </Link>

      <Link
        to="/kanban"
        onClick={() => setMenuOpen(false)}
        className="block hover:text-cyan-300"
      >
        Kanban Board
      </Link>

      <Link
        to="/overview"
        onClick={() => setMenuOpen(false)}
        className="block hover:text-cyan-300"
      >
        Overview
      </Link>

      {/* Notification */}
      <button
        onClick={() => setShowNotification(!showNotification)}
        className="flex items-center gap-3"
      >
        <FaBell />
        Notifications ({notifications.length})
      </button>

      {showNotification && (
        <div className="bg-white text-gray-800 rounded-lg p-3 max-h-60 overflow-y-auto">
          {notifications.length === 0 ? (
            <p>No notifications</p>
          ) : (
            notifications.map((note, index) => (
              <div
                key={index}
                className="border-b py-2 last:border-none text-sm"
              >
                {note}
              </div>
            ))
          )}
        </div>
      )}

      <button
        onClick={logout}
        className="w-full bg-red-400 py-2 rounded-lg hover:bg-red-500"
      >
        Logout
      </button>

    </div>
  )}

</nav>
    </div>
  );
}

  

export default NavBar;