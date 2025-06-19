import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const { pathname } = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Members', path: '/members' },
    { name: 'Add Member', path: '/add-member' },
  ];

  return (
    <div className="w-64 bg-white shadow-md h-screen sticky top-0 p-5">
      <h1 className="text-2xl font-bold mb-8">Church Admin</h1>
      <ul className="space-y-4">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className={`block px-4 py-2 rounded hover:bg-blue-100 ${
                pathname === item.path ? 'bg-blue-200 font-semibold' : ''
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
