import React from 'react';

const Topbar = () => {
  return (
    <header className="bg-white shadow px-6 py-3 flex justify-end items-center">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">Admin</span>
        <img
          src="https://ui-avatars.com/api/?name=Admin"
          alt="profile"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </header>
  );
};

export default Topbar;
