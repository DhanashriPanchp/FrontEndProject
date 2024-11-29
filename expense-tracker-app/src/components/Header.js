import React from 'react';
import { Link as ScrollLink } from 'react-scroll'; // For smooth scrolling
import logo from '../assets/logo.png'; // Ensure you have a logo image

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo and Title */}
        <ScrollLink to="hero" smooth={true} duration={500} className="flex items-center cursor-pointer">
          <img src={logo} alt="Expense Tracker Logo" className="h-8 mr-3" />
          <span className="text-blue-600 text-xl font-bold">Expense Tracker</span>
        </ScrollLink>

        {/* Navigation Links */}
        <nav className="flex space-x-4">
          <ScrollLink
            to="features"
            smooth={true}
            duration={500}
            className="text-gray-800 hover:text-blue-600 cursor-pointer"
          >
            Features
          </ScrollLink>
          <a href="/login" className="text-gray-800 hover:text-blue-600">
            Login
          </a>
          <a href="/signup" className="text-gray-800 hover:text-blue-600">
            Signup
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;