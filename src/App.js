import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import MemberList from './components/MemberList';
import AddMember from './components/AddMember';
import EditMember from './components/EditMember';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <Router>
      <Routes>
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
