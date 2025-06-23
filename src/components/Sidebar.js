import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, UserPlusIcon, UsersIcon } from '@heroicons/react/24/solid';

const Sidebar = () => {
  const { pathname } = useLocation();

  const linkClasses = (path) =>
    `flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-200 ${
      pathname === path ? 'bg-gray-300 font-semibold' : ''
    }`;

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <aside className="w-64 h-full bg-gray-100 border-r p-4 flex flex-col items-center">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-blue-700">ChurchCMS</h1>
        {user?.churchName && (
          <div className="mt-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium shadow-sm">
            ⛪ {user.churchName}
          </div>
        )}
      </div>

      <nav className="flex flex-col space-y-2 w-full">
        <Link to="/" className={linkClasses('/')}>
          <HomeIcon className="h-5 w-5" /> Dashboard
        </Link>
        <Link to="/members" className={linkClasses('/members')}>
          <UsersIcon className="h-5 w-5" /> Members
        </Link>
        <Link to="/add" className={linkClasses('/add')}>
          <UserPlusIcon className="h-5 w-5" /> Add Member
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
