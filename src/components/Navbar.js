import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Left side */}
      <div className="flex items-center gap-6">
        <Link to="/" className="text-xl font-bold text-blue-600">
          ChurchCMS
        </Link>
      </div>

      {/* Centered Church Name */}
      {token && (
        <div className="flex-1 text-center">
          <h1 className="text-2xl font-bold text-blue-700">{user.churchName || 'Your Church'}</h1>
        </div>
      )}

      {/* Right side (buttons) */}
      <div className="flex items-center gap-4">
        {!token ? (
          <>
            <Link to="/login" className="text-sm text-gray-600 hover:text-blue-600">
              Login
            </Link>
            <Link to="/register" className="text-sm text-gray-600 hover:text-blue-600">
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="text-sm text-gray-600 hover:text-blue-600">
              Dashboard
            </Link>
            <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-600">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
