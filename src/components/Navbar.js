import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">
        Church Manager
      </Link>

      <div className="flex items-center space-x-4">
        {!token ? (
          <>
            <Link
              to="/login"
              className="text-sm text-gray-600 hover:text-blue-600"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-sm text-gray-600 hover:text-blue-600"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/dashboard"
              className="text-sm text-gray-600 hover:text-blue-600"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:text-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
