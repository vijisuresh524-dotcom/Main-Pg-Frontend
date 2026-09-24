import { useState } from "react";
import { FaTasks } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous message
    setMessage("");

    if (!email || !password) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      // Save token
      localStorage.setItem("token", response.token);

      // Save logged-in user
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(response.user)
      );

      // Navigate to dashboard
      navigate("/dashboard");

    } catch (error) {
      console.error("Login error:", error);

      // Show backend error on screen
      setMessage(
        error.message || "Invalid email or password"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#eef2ff] via-[#dbeafe] to-[#eef2ff] p-6">

      <div className="flex h-[90vh] w-full max-w-7xl overflow-hidden rounded-3xl bg-[#341B88] shadow-2xl">

        {/* LEFT SECTION */}
        <div className="hidden w-1/2 flex-col justify-center px-14 py-12 text-white lg:flex">

          <div className="mb-10">

            <FaTasks className="mb-5 text-6xl text-cyan-300" />

            <h1 className="text-5xl font-bold">
              TaskSphere
            </h1>

            <p className="mt-4 text-lg text-gray-300">
              Smart Task Management
            </p>

          </div>

          <h2 className="text-4xl font-bold leading-snug">
            Stay organized.
            <br />
            Track your tasks.
            <br />
            Finish on time.
          </h2>

          <p className="mt-8 text-gray-300">
            Manage projects, deadlines and priorities
            from one beautiful dashboard.
          </p>

          <div className="mt-12 flex gap-4">

            <button
              type="button"
              className="rounded-xl border border-cyan-300 px-6 py-3 transition hover:bg-cyan-300 hover:text-[#341B88]"
            >
              Learn More
            </button>

            <button
              type="button"
              className="text-cyan-300"
            >
              Explore
            </button>

          </div>

        </div>

        {/* RIGHT SECTION */}
        <div className="flex h-full w-full items-center justify-center p-6 sm:p-10 lg:w-1/2">

          <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-8">

            {/* ICON */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cyan-300">

              <FaTasks className="text-4xl text-[#341B88]" />

            </div>

            {/* TITLE */}
            <h1 className="mt-3 text-center text-4xl font-bold text-white">
              TaskSphere
            </h1>

            <p className="mt-1 text-center text-gray-300">
              Organize your work efficiently
            </p>

            <h2 className="mt-6 text-center text-4xl font-bold text-white">
              Welcome Back
            </h2>

            <p className="mb-6 mt-2 text-center text-gray-300">
              Login to continue managing your tasks.
            </p>

            {/* ERROR MESSAGE */}
            {message && (
              <div className="mb-5 rounded-xl border border-red-300/40 bg-red-500/20 px-4 py-3 text-center text-sm font-medium text-red-200">
                {message}
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit}>

              {/* EMAIL */}
              <div className="mb-4">

                <label className="mb-2 block text-white">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Enter Email"
                  className="h-12 w-full rounded-xl border border-white/20 bg-white/10 px-4 text-white outline-none transition placeholder:text-gray-300 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setMessage("");
                  }}
                />

              </div>

              {/* PASSWORD */}
              <div className="mb-4">

                <label className="mb-2 block text-white">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Enter Password"
                  className="h-12 w-full rounded-xl border border-white/20 bg-white/10 px-4 text-white outline-none transition placeholder:text-gray-300 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setMessage("");
                  }}
                />

              </div>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-xl bg-cyan-300 font-semibold text-[#341B88] shadow-lg transition duration-300 hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

            </form>

            {/* SIGN UP */}
            <p className="mt-5 text-center text-white">

              Don't have an account?

              <Link
                to="/signup"
                className="ml-2 text-cyan-300 hover:underline"
              >
                Sign Up
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;