import { useEffect, useState } from "react";
import Navbar from "../component/NavBar";
import Footer from "../component/Footer";
import { apiRequest } from "../services/api";

const Overview = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await apiRequest("/tasks");

        setTasks(response.tasks || []);
      } catch (error) {
        console.error(
          "Failed to fetch overview:",
          error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const progressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "High"
  ).length;

  const completionPercentage =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        );

  const cards = [
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: "📋",
      bg: "bg-purple-100",
    },
    {
      title: "Pending",
      value: pendingTasks,
      icon: "⏳",
      bg: "bg-orange-100",
    },
    {
      title: "In Progress",
      value: progressTasks,
      icon: "🚀",
      bg: "bg-blue-100",
    },
    {
      title: "Completed",
      value: completedTasks,
      icon: "✅",
      bg: "bg-green-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF2FF] via-[#F8FAFC] to-[#E0E7FF]">
      <Navbar />

      <main className="px-6 pb-12 pt-28">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#341B88]">
            Productivity Overview
          </h1>

          <p className="mt-2 text-gray-600">
            Track your task progress and productivity.
          </p>
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <p className="text-xl text-gray-500">
              Loading overview...
            </p>
          </div>
        ) : (
          <>
            {/* Statistics */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {cards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl bg-white p-6 shadow-lg"
                >
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${card.bg}`}
                  >
                    {card.icon}
                  </div>

                  <p className="text-gray-500">
                    {card.title}
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-[#341B88]">
                    {card.value}
                  </h2>
                </div>
              ))}
            </div>

            {/* Completion */}
            <div className="mt-8 rounded-2xl bg-white p-6 shadow-lg">

              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#341B88]">
                  Completion Progress
                </h2>

                <span className="text-2xl font-bold text-[#341B88]">
                  {completionPercentage}%
                </span>
              </div>

              <div className="mt-5 h-4 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-[#341B88] transition-all"
                  style={{
                    width: `${completionPercentage}%`,
                  }}
                />
              </div>

            </div>

            {/* High Priority */}
            <div className="mt-8 rounded-2xl bg-white p-6 shadow-lg">

              <h2 className="text-2xl font-bold text-[#341B88]">
                High Priority Tasks
              </h2>

              <p className="mt-2 text-gray-600">
                You currently have{" "}
                <span className="font-bold text-red-600">
                  {highPriorityTasks}
                </span>{" "}
                high-priority task
                {highPriorityTasks !== 1 ? "s" : ""}.
              </p>

            </div>
          </>
        )}

      </main>

      <Footer />
    </div>
  );
};

export default Overview;