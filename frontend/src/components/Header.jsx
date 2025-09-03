import React from "react";
import logoAgil from "../assets/logoagil.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate=useNavigate();
  return (
    <header className="bg-gray-700/50 fixed top-0 left-0 w-full p-4 flex justify-between items-center z-20 bg-transparent">
      {/* Left side: Logo and company name */}
      <div className="flex items-center space-x-2">
        <img src={logoAgil} alt="SNDP Logo" className="w-12" />
      </div>

      {/* Right side: Navigation buttons */}
      <nav className="flex items-center space-x-12">
        <button className="text-black hover:text-gray-700 transition-colors font-bold">
          About Us
        </button>
        <button className="text-black hover:text-gray-700 transition-colors font-bold">
          Contact Us
        </button>
        <button
          onClick={() => navigate("/login")}
          className="bg-yellow-400 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          Login
        </button>
      </nav>
    </header>
  );
};

export default Header;
