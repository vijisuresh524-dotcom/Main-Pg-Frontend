import { useState } from "react";
import {FaTasks} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";


const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Please fill all fields");
      return;
    }
     
    const response = await apiRequest("/auth/login", {
  method: "POST",
  body: JSON.stringify({
    email,
    password,
  }),
});

localStorage.setItem("token", response.token);
localStorage.setItem(
  "loggedInUser",
  JSON.stringify(response.user)
);

navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef2ff] via-[#dbeafe] to-[#eef2ff] flex items-center justify-center p-6">
<div className="w-full max-w-7xl h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex bg-[#341B88]">
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
        Stay organized.
        <br />
        Track your tasks.
        <br />
        Finish on time.
    </h2>

    <p className="mt-8 text-gray-300">
        Manage projects, deadlines and priorities from one beautiful dashboard.
    </p>

    <div className="mt-12 flex gap-4">

        <button className="border border-cyan-300 rounded-xl px-6 py-3 hover:bg-cyan-300 hover:text-[#341B88] transition">

            Learn More

        </button>

        <button className="text-cyan-300">

            Explore

        </button>

    </div>

</div>
      <div className="w-full h-[90vh] lg:w-1/2 flex items-center justify-center p-10">
  
         <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl w-full max-w-md p-6 shadow-2xl">
  <div className="w-16 h-16 rounded-full bg-cyan-300 flex items-center justify-center mx-auto">

<FaTasks className="text-4xl text-[#341B88]" />

</div>
   <h1 className="text-4xl font-bold mt-3 text-white text-center">
TaskSphere
</h1>

<p className="text-gray-300 mt-1 text-center">
Organize your work efficiently
</p>

        <h2 className="text-4xl font-bold text-white text-center mt-6">
Welcome Back
</h2>

<p className="text-center text-gray-300 mt-2 mb-6">
Login to continue managing your tasks.
</p>
        {message && (
          <p className="text-red-600 mb-3">{message}</p>
        )}

        <form onSubmit={handleSubmit}>

          <div className="mb-4">

           <label className="text-white mb-2 block">Email</label>

            <input
              type="email"
              placeholder="Enter Email"
             className="w-full h-12 rounded-xl bg-white/10 border border-white/20 px-4 text-white placeholder-gray-300 outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>

          <div className="mb-4">

            <label className="text-white mb-2 block">Password</label>

            <input
              type="password"
              placeholder="Enter Password"
               className="w-full h-12 rounded-xl bg-white/10 border border-white/20 px-4 text-white placeholder-gray-300 outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

          </div>

          <button
            className="w-full h-12 rounded-xl bg-cyan-300 text-[#341B88] font-semibold hover:bg-cyan-200 transition duration-300 shadow-lg"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-5">

          Don't have an account?

          <Link
            to="/signup"
            className="text-cyan-300 ml-2 hover:underline"
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