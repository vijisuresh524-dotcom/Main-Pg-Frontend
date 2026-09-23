import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaTasks,
  FaBell,
  FaSignOutAlt,
  FaExclamationCircle,
  FaCalendarDay,
  FaTimes,
  FaBars,
} from "react-icons/fa";

import { apiRequest } from "../services/api";

const Navbar = () => {
  const navigate = useNavigate();

  const [notificationCount, setNotificationCount] =
    useState(0);

  const [notifications, setNotifications] =
    useState([]);

  const [showNotifications, setShowNotifications] =
    useState(false);

  const [showMobileMenu, setShowMobileMenu] =
    useState(false);

  const user = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  // ============================================
  // FETCH NOTIFICATIONS
  // ============================================

  const fetchNotifications = async () => {
    try {
      const response = await apiRequest("/tasks");

      const tasks = response.tasks || [];

      const today = new Date()
        .toISOString()
        .split("T")[0];

      const notificationTasks = tasks.filter((task) => {
        const isHighPriority =
          task.priority === "High";

        const isDueToday =
          task.dueDate === today;

        const isIncomplete =
          task.status !== "Completed";

        return (
          (isHighPriority && isIncomplete) ||
          (isDueToday && isIncomplete)
        );
      });

      setNotifications(notificationTasks);

      setNotificationCount(
        notificationTasks.length
      );
    } catch (error) {
      console.error(
        "Notification error:",
        error.message
      );
    }
  };

  // ============================================
  // INITIAL NOTIFICATION LOAD
  // ============================================

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  // ============================================
  // REFRESH WHEN TASK IS UPDATED
  // ============================================

  useEffect(() => {
    const handleTaskUpdate = () => {
      console.log(
        "Task updated - refreshing notifications"
      );

      fetchNotifications();
    };

    window.addEventListener(
      "taskUpdated",
      handleTaskUpdate
    );

    return () => {
      window.removeEventListener(
        "taskUpdated",
        handleTaskUpdate
      );
    };
  }, []);

  // ============================================
  // LOGOUT
  // ============================================

  const logout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem(
      "loggedInUser"
    );

    navigate("/");
  };

  // ============================================
  // NOTIFICATION CLICK
  // ============================================

  const handleNotificationClick = (task) => {
    setShowNotifications(false);

    navigate(`/task/${task._id}`);
  };

  // ============================================
  // CLOSE MOBILE MENU
  // ============================================

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-40 bg-[#341B88] text-white shadow-lg">

      {/* ==========================================
          MAIN NAVBAR
      ========================================== */}

      <div className="flex items-center justify-between px-4 py-4 sm:px-6">

        {/* ========================================
            LOGO
        ======================================== */}

        <Link
          to="/dashboard"
          onClick={closeMobileMenu}
          className="flex items-center gap-2 text-xl font-bold sm:text-2xl"
        >
          <FaTasks />

          <span>TaskSphere</span>
        </Link>

        {/* ========================================
            DESKTOP LINKS
        ======================================== */}

        <div className="hidden items-center gap-6 md:flex">

          <Link
            to="/dashboard"
            className="transition hover:text-cyan-300"
          >
            Home
          </Link>

          <Link
            to="/kanban"
            className="transition hover:text-cyan-300"
          >
            Kanban Board
          </Link>

          <Link
            to="/overview"
            className="transition hover:text-cyan-300"
          >
            Overview
          </Link>

        </div>

        {/* ========================================
            RIGHT SIDE
        ======================================== */}

        <div className="flex items-center gap-2 sm:gap-4">

          {/* ======================================
              NOTIFICATION
          ====================================== */}

          <div className="relative">

            <button
              onClick={() =>
                setShowNotifications(
                  !showNotifications
                )
              }
              className="relative rounded-full p-2 transition hover:bg-white/10"
              title="Notifications"
            >
              <FaBell className="text-lg sm:text-xl" />

              {notificationCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold">
                  {notificationCount}
                </span>
              )}
            </button>

            {/* ====================================
                NOTIFICATION DROPDOWN
            ==================================== */}

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-[calc(100vw-32px)] max-w-80 overflow-hidden rounded-xl bg-white text-gray-800 shadow-2xl">

                {/* HEADER */}

                <div className="flex items-center justify-between bg-[#341B88] px-4 py-3 text-white">

                  <div className="flex items-center gap-2">

                    <FaBell />

                    <h3 className="font-semibold">
                      Notifications
                    </h3>

                  </div>

                  <button
                    onClick={() =>
                      setShowNotifications(false)
                    }
                    className="rounded p-1 transition hover:bg-white/20"
                  >
                    <FaTimes />
                  </button>

                </div>

                {/* NOTIFICATIONS */}

                <div className="max-h-80 overflow-y-auto">

                  {notifications.length === 0 ? (

                    <div className="px-4 py-8 text-center text-gray-500">

                      <FaBell className="mx-auto mb-2 text-2xl text-gray-300" />

                      <p className="text-sm">
                        No notifications
                      </p>

                    </div>

                  ) : (

                    notifications.map((task) => {

                      const today =
                        new Date()
                          .toISOString()
                          .split("T")[0];

                      const isHighPriority =
                        task.priority === "High";

                      const isDueToday =
                        task.dueDate === today;

                      return (
                        <button
                          key={task._id}
                          onClick={() =>
                            handleNotificationClick(task)
                          }
                          className="flex w-full gap-3 border-b px-4 py-3 text-left transition hover:bg-gray-50"
                        >

                          {/* ICON */}

                          <div className="mt-1">

                            {isHighPriority ? (

                              <FaExclamationCircle className="text-red-500" />

                            ) : (

                              <FaCalendarDay className="text-orange-500" />

                            )}

                          </div>

                          {/* CONTENT */}

                          <div className="flex-1">

                            <p className="text-sm font-semibold text-gray-800">
                              {task.title}
                            </p>

                            {isHighPriority && (
                              <p className="mt-1 text-xs text-red-500">
                                High priority task
                              </p>
                            )}

                            {isDueToday && (
                              <p className="mt-1 text-xs text-orange-500">
                                Due today
                              </p>
                            )}

                            {task.dueDate && (
                              <p className="mt-1 text-xs text-gray-400">
                                Due: {task.dueDate}
                              </p>
                            )}

                          </div>

                        </button>
                      );
                    })

                  )}

                </div>

              </div>
            )}

          </div>

          {/* ======================================
              USER PROFILE
          ====================================== */}

          <Link
            to="/profile"
            onClick={closeMobileMenu}
            className="hidden items-center gap-1 rounded-lg px-2 py-2 text-sm font-medium transition hover:bg-white/10 sm:flex"
          >
            <span>👤</span>

            <span className="max-w-[120px] truncate">
              {user?.name}
            </span>
          </Link>

          {/* ======================================
              LOGOUT
          ====================================== */}

          <button
            onClick={logout}
            className="flex items-center gap-2 rounded-lg bg-cyan-300 px-3 py-2 transition text-black"
          >

            <FaSignOutAlt />

            <span className="hidden md:block">
              Logout
            </span>

          </button>

          {/* ======================================
              MOBILE MENU BUTTON
          ====================================== */}

          <button
            onClick={() =>
              setShowMobileMenu(!showMobileMenu)
            }
            className="rounded-lg p-2 text-xl transition hover:bg-white/10 md:hidden"
            aria-label="Toggle navigation menu"
          >

            {showMobileMenu ? (
              <FaTimes />
            ) : (
              <FaBars />
            )}

          </button>

        </div>

      </div>

      {/* ==========================================
          MOBILE MENU
      ========================================== */}

      {showMobileMenu && (

        <div className="border-t border-white/20 bg-[#341B88] px-4 pb-5 pt-3 md:hidden">

          {/* HOME */}

          <Link
            to="/dashboard"
            onClick={closeMobileMenu}
            className="block rounded-lg px-4 py-3 font-medium transition hover:bg-white/10 hover:text-cyan-300"
          >
            Home
          </Link>

          {/* KANBAN */}

          <Link
            to="/kanban"
            onClick={closeMobileMenu}
            className="block rounded-lg px-4 py-3 font-medium transition hover:bg-white/10 hover:text-cyan-300"
          >
            Kanban Board
          </Link>

          {/* OVERVIEW */}

          <Link
            to="/overview"
            onClick={closeMobileMenu}
            className="block rounded-lg px-4 py-3 font-medium transition hover:bg-white/10 hover:text-cyan-300"
          >
            Overview
          </Link>

          {/* PROFILE */}

          <Link
            to="/profile"
            onClick={closeMobileMenu}
            className="block rounded-lg px-4 py-3 font-medium transition hover:bg-white/10 hover:text-cyan-300 sm:hidden"
          >
            👤 Profile
          </Link>

        </div>

      )}

    </nav>
  );
};

export default Navbar;