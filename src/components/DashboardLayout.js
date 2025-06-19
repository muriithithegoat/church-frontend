// src/components/DashboardLayout.js
import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
