
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaTasks,
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";

import { apiRequest } from "../services/api";
import Footer from "../component/Footer";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(true);

  // ================= LOAD PROFILE =================

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");

     const response = await apiRequest("/users/profile");

      console.log("Profile response:", response);

      setName(response.user.name);
      setEmail(response.user.email);
    } catch (error) {
      console.error("Profile error:", error);

      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  // ================= UPDATE EMAIL =================

  const handleEmailUpdate = async (e) => {
  e.preventDefault();

  setMessage("");
  setError("");

  try {
    const response = await apiRequest(
      "/users/profile/email",
      {
        method: "PUT",
        body: JSON.stringify({
          email,
        }),
      }
    );

    setMessage(response.message);

    setEmail(response.user.email);

    const loggedInUser = JSON.parse(
      localStorage.getItem("loggedInUser")
    );

    if (loggedInUser) {
      loggedInUser.email = response.user.email;

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(loggedInUser)
      );
    }
  } catch (error) {
    console.error("Email update error:", error);

    setError(
      error.message || "Failed to update email"
    );
  }
};

  // ================= UPDATE PASSWORD =================
const handlePasswordUpdate = async (e) => {
  e.preventDefault();

  setMessage("");
  setError("");

  try {
    const response = await apiRequest(
      "/users/profile/password",
      {
        method: "PUT",
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      }
    );

    setMessage(response.message);

    setCurrentPassword("");
    setNewPassword("");
  } catch (error) {
    console.error("Password update error:", error);

    setError(
      error.message || "Failed to change password"
    );
  }
};
  // ================= JSX =================

  return (
    <>
      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <nav className="fixed left-0 right-0 top-0 z-40 bg-[#341B88] text-white shadow-lg">
        <div className="flex items-center justify-between px-6 py-4">

          {/* LOGO */}

          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-2xl font-bold"
          >
            <FaTasks />

            <span>TaskSphere</span>
          </Link>

          {/* DASHBOARD LINK */}

          <Link
            to="/dashboard"
            className="flex items-center gap-2 rounded-lg bg-cyan-300 px-4 py-2.5 text-sm font-semibold text-black shadow-sm transition hover:bg-indigo-700"
          >
            <FaArrowLeft className="text-xs" />

            <span className="hidden sm:inline">
              Back to Dashboard
            </span>

            <span className="sm:hidden">
              Dashboard
            </span>
          </Link>

        </div>
      </nav>


      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main className="mx-auto min-h-[calc(100vh-80px)] max-w-7xl px-4 pb-8 pt-28 sm:px-6 lg:px-8">

        {/* =================================================
            HEADER
        ================================================== */}

        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center">

          {/* AVATAR */}

          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-3xl font-bold text-white shadow-lg ring-4 ring-indigo-100">
            {name
              ? name.charAt(0).toUpperCase()
              : "U"}
          </div>

          {/* TITLE */}

          <div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              My Profile
            </h1>

            <p className="mt-1 text-sm text-slate-500 sm:text-base">
              Manage your account information and
              security settings.
            </p>

          </div>

        </div>


        {/* =================================================
            SUCCESS MESSAGE
        ================================================== */}

        {message && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-700 shadow-sm">

            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white">
              ✓
            </span>

            <span>{message}</span>

          </div>
        )}


        {/* =================================================
            ERROR MESSAGE
        ================================================== */}

        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700 shadow-sm">

            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white">
              !
            </span>

            <span>{error}</span>

          </div>
        )}


        {/* =================================================
            LOADING / PROFILE CONTENT
        ================================================== */}

        {loading ? (

          /* ================= LOADING ================= */

          <div className="flex min-h-[300px] items-center justify-center rounded-2xl bg-white shadow-sm">

            <div className="flex flex-col items-center gap-4">

              <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600"></div>

              <p className="text-sm font-medium text-slate-500">
                Loading profile...
              </p>

            </div>

          </div>

        ) : (

          /* ================= PROFILE CARDS ================= */

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

            {/* =================================================
                PERSONAL INFORMATION
            ================================================== */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md sm:p-8">

              {/* CARD HEADER */}

              <div className="mb-8 flex items-center gap-4 border-b border-slate-100 pb-6">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                  <FaUser />
                </div>

                <div>

                  <h2 className="text-xl font-bold text-slate-900">
                    Profile Information
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Update your personal information
                  </p>

                </div>

              </div>


              {/* =================================================
                  NAME
              ================================================== */}

              <div className="mb-6">

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Full Name
                </label>

                <div className="relative">

                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    type="text"
                    value={name}
                    disabled
                    className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-500 outline-none"
                  />

                </div>

                <small className="mt-2 block text-xs text-slate-400">
                  Your name cannot be changed here.
                </small>

              </div>


              {/* =================================================
                  EMAIL FORM
              ================================================== */}

              <form onSubmit={handleEmailUpdate}>

                <div className="mb-6">

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Email Address
                  </label>

                  <div className="relative">

                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                    <input
                      type="email"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                    />

                  </div>

                </div>


                <button
                  type="submit"
                  className="w-full rounded-xl bg-cyan-300 px-5 py-3.5 text-sm font-semibold text-black shadow-sm transition hover:bg-indigo-700 hover:shadow-md active:scale-[0.98]"
                >
                  Update Email
                </button>

              </form>

            </section>


            {/* =================================================
                PASSWORD
            ================================================== */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md sm:p-8">

              {/* CARD HEADER */}

              <div className="mb-8 flex items-center gap-4 border-b border-slate-100 pb-6">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                  <FaLock />
                </div>

                <div>

                  <h2 className="text-xl font-bold text-slate-900">
                    Change Password
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Keep your account secure
                  </p>

                </div>

              </div>


              {/* PASSWORD FORM */}

              <form onSubmit={handlePasswordUpdate}>

                {/* CURRENT PASSWORD */}

                <div className="mb-6">

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Current Password
                  </label>

                  <div className="relative">

                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                    <input
                      type="password"
                      placeholder="Enter current password"
                      value={currentPassword}
                      onChange={(e) =>
                        setCurrentPassword(
                          e.target.value
                        )
                      }
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                    />

                  </div>

                </div>


                {/* NEW PASSWORD */}

                <div className="mb-6">

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    New Password
                  </label>

                  <div className="relative">

                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                    <input
                      type="password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) =>
                        setNewPassword(
                          e.target.value
                        )
                      }
                      minLength={6}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                    />

                  </div>

                  <small className="mt-2 block text-xs text-slate-400">
                    Password must be at least 6 characters.
                  </small>

                </div>


                {/* CHANGE PASSWORD BUTTON */}

                <button
                  type="submit"
                  className="w-full rounded-xl bg-cyan-300 px-5 py-3.5 text-sm font-semibold text-black shadow-sm transition hover:bg-indigo-700 hover:shadow-md active:scale-[0.98]"
                >
                  Change Password
                </button>

              </form>

            </section>

          </div>

        )}

      </main>

<Footer/>
    </>
  );
};

export default Profile;
