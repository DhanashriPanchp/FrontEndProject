import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png'; // Ensure you have a logo image

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // Clear authentication tokens or any user data
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Redirect to login page
    navigate('/login');
  };

  // Determine if the current page is login or signup
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <header className="bg-white text-black shadow-md py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <a href="/" className="flex items-center cursor-pointer">
          <img src={logo} alt="Expense Tracker Logo" className="h-8 mr-3" />
          <span className="text-xl font-bold">Expense Tracker</span>
        </a>
        {!isAuthPage && (
          <button onClick={handleLogout} className="text-sm font-medium text-blue-500 hover:text-blue-700">
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;