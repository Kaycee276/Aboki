import { FaHome, FaQuestionCircle, FaFileAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const navLinkClass = ({ isActive }) =>
  `flex flex-col items-center group relative hover:text-white transition duration-300 ${
    isActive ? "text-white font-semibold text-shadow-white" : "text-gray-500"
  } ${
    isActive
      ? "after:content-[''] after:block after:w-1 after:h-1 after:bg-white after:rounded-full after:mt-1 after:transition-all after:duration-300 after:scale-110"
      : ""
  }`;

const Nav = () => {
  return (
    <nav className="flex space-x-6 items-center">
      <NavLink to="/" className={navLinkClass}>
        <span className="sm:hidden group relative ">
          <FaHome className="text-xl" />
          <span className="tooltip">Home</span>
        </span>
        <span className="hidden sm:inline ">Home</span>
      </NavLink>

      <NavLink to="/faq" className={navLinkClass}>
        <span className="sm:hidden group relative">
          <FaQuestionCircle className="text-xl" />
          <span className="tooltip">FAQs</span>
        </span>
        <span className="hidden sm:inline ">FAQs</span>
      </NavLink>

      <NavLink to="/whitepaper" className={navLinkClass}>
        <span className="sm:hidden group relative">
          <FaFileAlt className="text-xl" />
          <span className="tooltip">Whitepaper</span>
        </span>
        <span className="hidden sm:inline ">Whitepaper</span>
      </NavLink>
    </nav>
  );
};

export default Nav;
