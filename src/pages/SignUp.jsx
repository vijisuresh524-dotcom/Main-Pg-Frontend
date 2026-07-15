import { useState } from "react";
import {FaTasks} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
 const { name, email, password, confirmPassword } = formData;
const [message, setMessage] = useState("");


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(
      (user) => user.email === email
    );

    if (existingUser) {
      setMessage("Email already registered");
      return;
    }

    const newUser = {
      name,
      email,
      password,
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup Successful");

    navigate("/");
  };

  return (
    <div  className="min-h-screen bg-gradient-to-br from-[#eef2ff] via-[#dbeafe] to-[#eef2ff] flex items-center justify-center p-6">
      <div className="w-full max-w-7xl h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex bg-[#341B88]">
        <div className="hidden lg:flex lg:w-[55%] flex-col justify-center px-14 py-8 text-white">

    <FaTasks className="text-4xl text-cyan-300 mb-6"/>

    <h1 className="text-4xl font-bold">
        TaskSphere
    </h1>

    <p className="mt-2 text-xl text-gray-300">
        Smart Task Management
    </p>

    <h2 className="text-4xl font-bold mt-8 leading-snug">
        Create your account.
        <br />
        Start organizing.
        <br />
        Boost productivity.
    </h2>

    <p className="mt-6 text-gray-300">
        Join TaskSphere and manage your tasks, projects and deadlines with ease.
    </p>

</div>
     <div className="w-full  lg:w-[45%] flex items-center justify-center mt-2">

  <div className="bg-white/10 h-[85vh] backdrop-blur-xl border border-white/20 rounded-3xl p-2 w-full max-w-md shadow-2xl">
        <div className="text-center ">

    <div className="w-14 h-14 rounded-full bg-cyan-300 flex items-center justify-center mx-auto">

        <FaTasks className="text-4xl text-[#341B88]" />

    </div>

    <h2 className="text-4xl font-bold text-white mt-3">
        Create Account
    </h2>

    <p className="text-gray-300 mt-1">
        Join TaskSphere today
    </p>

</div>

        {message && (
          <p className="bg-red-500/20 border border-red-400 text-red-200 rounded-lg px-4 py-2 mb-5">
    {message}
</p>
        )}

        <form onSubmit={handleSubmit}>

          <div className="mb-2">
            <label className="text-white mb-2 block">
    Name
</label>

            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="Enter Name"
              className="w-full h-12 rounded-xl bg-white/10 border border-white/20 px-4 text-white placeholder-gray-300 outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300 transition"
            />
          </div>

          <div className="mb-2">
            <label className="text-white mb-2 block">Email</label>

            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter Email"
             className="w-full h-12 rounded-xl bg-white/10 border border-white/20 px-4 text-white placeholder-gray-300 outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300 transition"
            />
          </div>

          <div className="mb-4">
            <label className="text-white mb-2 block">Password</label>

            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="w-full h-12 rounded-xl bg-white/10 border border-white/20 px-4 text-white placeholder-gray-300 outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300 transition"
            />
          </div>

          <div className="mb-5">
            <label className="text-white mb-2 block">Confirm Password</label>

            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full h-12 rounded-xl bg-white/10 border border-white/20 px-4 text-white placeholder-gray-300 outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300 transition"
            />
          </div>

          <button
           className="w-full h-12 rounded-xl bg-cyan-300 text-[#341B88] font-semibold hover:bg-cyan-200 transition duration-300 shadow-lg"
          >
            Sign Up
          </button>

        </form>

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