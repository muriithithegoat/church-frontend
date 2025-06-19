import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import MemberList from './components/MemberList';
import AddMember from './components/AddMember';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/members" element={<MemberList />} />
            <Route path="/add-member" element={<AddMember />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
