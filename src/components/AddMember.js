import React, { useState } from 'react';
import axios from 'axios';

function AddMember() {
  const [formData, setFormData] = useState({
    fullName: '',
    baptismDate: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/members', formData);
      setMessage('✅ Member added: ' + res.data.fullName);
      setFormData({ fullName: '', baptismDate: '' });
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to add member');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Member</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Baptism Date</label>
            <input
              type="date"
              name="baptismDate"
              value={formData.baptismDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400"
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Add Member
          </button>
        </form>
        {message && <p className="mt-4 text-sm text-center">{message}</p>}
      </div>
    </div>
  );
}

export default AddMember;
