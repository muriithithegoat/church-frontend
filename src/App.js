import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import MemberList from './components/MemberList';
import AddMember from './components/AddMember';
import EditMember from './components/EditMember';
import Dashboard from './components/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  return (
    <Router>
       <Navbar />
      <div className="p-4"></div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="members" element={<MemberList />} />
          <Route path="add" element={<AddMember />} />
          <Route path="edit/:id" element={<EditMember />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
