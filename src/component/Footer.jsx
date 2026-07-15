import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#2D1B69] text-white mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid md:grid-cols-3 gap-8">

          {/* Logo */}
          <div>
            <h2 className="text-3xl font-bold">TaskSphere</h2>
            <p className="mt-3 text-gray-300">
              Stay organized, manage your tasks efficiently,
              and boost your productivity every day.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="hover:text-cyan-300">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/kanban" className="hover:text-cyan-300">
                  Kanban Board
                </Link>
              </li>

              <li>
                <Link to="/overview" className="hover:text-cyan-300">
                  Overview
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Contact
            </h3>

            <p className="text-gray-300">
              📧 vijisuresh529@gmail.com
            </p>

            <p className="text-gray-300 mt-2">
              📍 Aruppukottai, Tamil Nadu
            </p>
          </div>

        </div>

        <hr className="my-8 border-gray-500" />

        <div className="text-center text-gray-300">
          © 2026 TaskSphere | Designed & Developed by
          <span className="font-semibold text-white">
            {" "}Vijayashanthi M
          </span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;