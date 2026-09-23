
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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    if (!name || !email || !password || !confirmPassword) {
      setMessage("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
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

      setMessage(response.message || "Account created successfully");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setMessage(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef2ff] via-[#dbeafe] to-[#eef2ff] flex items-center justify-center p-6">

      <div className="w-full max-w-7xl min-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex bg-[#341B88]">

        {/* LEFT SIDE */}
        <div className="hidden lg:flex w-1/2 flex-col justify-center px-14 py-12 text-white">

          <div className="mb-10">

            <FaTasks className="text-6xl text-cyan-300 mb-5" />

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

          <p className="mt-8 text-gray-300 max-w-lg">
            Create your TaskSphere account and manage projects,
            deadlines and priorities from one beautiful dashboard.
          </p>

          <div className="mt-12 flex gap-4">

            <Link
              to="/"
              className="border border-cyan-300 rounded-xl px-6 py-3 hover:bg-cyan-300 hover:text-[#341B88] transition"
            >
              Login
            </Link>

            <button className="text-cyan-300">
              Get Started
            </button>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-1/2 min-h-[90vh] flex items-center justify-center p-6 lg:p-10">

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl w-full max-w-md p-6 shadow-2xl">

            {/* ICON */}
            <div className="w-16 h-16 rounded-full bg-cyan-300 flex items-center justify-center mx-auto">

              <FaTasks className="text-4xl text-[#341B88]" />

            </div>

            {/* BRAND */}
            <h1 className="text-4xl font-bold mt-3 text-white text-center">
              TaskSphere
            </h1>

            <p className="text-gray-300 mt-1 text-center">
              Organize your work efficiently
            </p>

            {/* TITLE */}
            <h2 className="text-3xl font-bold text-white text-center mt-6">
              Create Account
            </h2>

            <p className="text-center text-gray-300 mt-2 mb-6">
              Join TaskSphere and start managing your tasks.
            </p>

            {/* MESSAGE */}
            {message && (
              <p className="text-center text-cyan-300 mb-4">
                {message}
              </p>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit}>

              {/* NAME */}
              <div className="mb-4">

                <label className="text-white mb-2 block">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-12 rounded-xl bg-white/10 border border-white/20 px-4 text-white placeholder-gray-300 outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300 transition"
                />

              </div>

              {/* EMAIL */}
              <div className="mb-4">

                <label className="text-white mb-2 block">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 rounded-xl bg-white/10 border border-white/20 px-4 text-white placeholder-gray-300 outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300 transition"
                />

              </div>

              {/* PASSWORD */}
              <div className="mb-4">

                <label className="text-white mb-2 block">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 rounded-xl bg-white/10 border border-white/20 px-4 text-white placeholder-gray-300 outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300 transition"
                />

              </div>

              {/* CONFIRM PASSWORD */}
              <div className="mb-5">

                <label className="text-white mb-2 block">
                  Confirm Password
                </label>

                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  className="w-full h-12 rounded-xl bg-white/10 border border-white/20 px-4 text-white placeholder-gray-300 outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300 transition"
                />

              </div>

              {/* SIGN UP BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl bg-cyan-300 text-[#341B88] font-semibold hover:bg-cyan-200 transition duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </button>

            </form>

            {/* LOGIN LINK */}
            <p className="text-center mt-5 text-gray-300">

              Already have an account?

              <Link
                to="/"
                className="text-cyan-300 ml-2 hover:underline"
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
