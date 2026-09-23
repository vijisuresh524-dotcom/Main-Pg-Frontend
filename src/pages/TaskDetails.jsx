import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../component/NavBar";
import Footer from "../component/Footer";
import { apiRequest } from "../services/api";

const TaskDetails = () => {
  const { id } = useParams();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await apiRequest(
          `/tasks/${id}`
        );

        setTask(response.task);
      } catch (error) {
        console.error(
          "Failed to fetch task:",
          error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF2FF] via-[#F8FAFC] to-[#E0E7FF]">
      <Navbar />

      <main className="px-6 pb-12 pt-28">

        {loading ? (
          <div className="py-20 text-center">
            <p className="text-xl text-gray-500">
              Loading task...
            </p>
          </div>
        ) : !task ? (
          <div className="py-20 text-center">
            <h2 className="text-2xl font-bold text-red-600">
              Task not found
            </h2>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-xl">

            <h1 className="text-4xl font-bold text-[#341B88]">
              {task.title}
            </h1>

            <p className="mt-5 text-gray-600">
              {task.description}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-sm text-gray-500">
                  Priority
                </p>

                <p className="mt-1 font-bold">
                  {task.priority}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-sm text-gray-500">
                  Status
                </p>

                <p className="mt-1 font-bold">
                  {task.status}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-sm text-gray-500">
                  Due Date
                </p>

                <p className="mt-1 font-bold">
                  {task.dueDate}
                </p>
              </div>

            </div>

            <Link
              to="/dashboard"
              className="mt-8 inline-block rounded-xl bg-[#341B88] px-6 py-3 font-semibold text-white hover:bg-[#4B2AB5]"
            >
              Back to Dashboard
            </Link>

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
};

export default TaskDetails;