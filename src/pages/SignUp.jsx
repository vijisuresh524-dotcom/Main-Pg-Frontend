import { useState } from "react";
import { FaTasks } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous message
    setMessage("");
    setMessageType("");

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setMessage("Please fill all fields");
      setMessageType("error");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters");
      setMessageType("error");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);

      const response = await apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
          confirmPassword,
        }),
      });

      // Success message
      setMessage(
        response.message || "Account created successfully"
      );
      setMessageType("success");

      // Go to login page after successful registration
      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {
      console.error("Registration error:", error);

      // Show backend error on screen
      setMessage(
        error.message || "Registration failed"
      );
      setMessageType("error");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#eef2ff] via-[#dbeafe] to-[#eef2ff] p-6">

      <div className="flex min-h-[90vh] w-full max-w-7xl overflow-hidden rounded-3xl bg-[#341B88] shadow-2xl">

        {/* LEFT SIDE */}
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
            Plan your work.
            <br />
            Organize your tasks.
            <br />
            Achieve your goals.
          </h2>

          <p className="mt-8 max-w-lg text-gray-300">
            Create your TaskSphere account and manage projects,
            deadlines and priorities from one beautiful dashboard.
          </p>

          <div className="mt-12 flex gap-4">

            <Link
              to="/"
              className="rounded-xl border border-cyan-300 px-6 py-3 transition hover:bg-cyan-300 hover:text-[#341B88]"
            >
              Login
            </Link>

            <button
              type="button"
              className="text-cyan-300"
            >
              Get Started
            </button>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex min-h-[90vh] w-full items-center justify-center p-6 lg:w-1/2 lg:p-10">

          <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">

            {/* ICON */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cyan-300">

              <FaTasks className="text-4xl text-[#341B88]" />

            </div>

            {/* BRAND */}
            <h1 className="mt-3 text-center text-4xl font-bold text-white">
              TaskSphere
            </h1>

            <p className="mt-1 text-center text-gray-300">
              Organize your work efficiently
            </p>

            {/* TITLE */}
            <h2 className="mt-6 text-center text-3xl font-bold text-white">
              Create Account
            </h2>

            <p className="mb-6 mt-2 text-center text-gray-300">
              Join TaskSphere and start managing your tasks.
            </p>

            {/* MESSAGE */}
            {message && (
              <div
                className={`mb-5 rounded-xl border px-4 py-3 text-center text-sm font-medium ${
                  messageType === "success"
                    ? "border-green-300/40 bg-green-500/20 text-green-200"
                    : "border-red-300/40 bg-red-500/20 text-red-200"
                }`}
              >
                {message}
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit}>

              {/* NAME */}
              <div className="mb-4">

                <label className="mb-2 block text-white">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setMessage("");
                  }}
                  className="h-12 w-full rounded-xl border border-white/20 bg-white/10 px-4 text-white outline-none transition placeholder:text-gray-300 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300"
                />

              </div>

              {/* EMAIL */}
              <div className="mb-4">

                <label className="mb-2 block text-white">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setMessage("");
                  }}
                  className="h-12 w-full rounded-xl border border-white/20 bg-white/10 px-4 text-white outline-none transition placeholder:text-gray-300 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300"
                />

              </div>

              {/* PASSWORD */}
              <div className="mb-4">

                <label className="mb-2 block text-white">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setMessage("");
                  }}
                  className="h-12 w-full rounded-xl border border-white/20 bg-white/10 px-4 text-white outline-none transition placeholder:text-gray-300 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300"
                />

              </div>

              {/* CONFIRM PASSWORD */}
              <div className="mb-5">

                <label className="mb-2 block text-white">
                  Confirm Password
                </label>

                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setMessage("");
                  }}
                  className="h-12 w-full rounded-xl border border-white/20 bg-white/10 px-4 text-white outline-none transition placeholder:text-gray-300 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300"
                />

              </div>

              {/* SIGN UP BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-xl bg-cyan-300 font-semibold text-[#341B88] shadow-lg transition duration-300 hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Creating Account..."
                  : "Sign Up"}
              </button>

            </form>

            {/* LOGIN LINK */}
            <p className="mt-5 text-center text-gray-300">

              Already have an account?

              <Link
                to="/"
                className="ml-2 text-cyan-300 hover:underline"
              >
                Login
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default SignUp;