import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with actual backend route
      const res = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setMessage(res.data.message);
    } catch (err) {
      console.error(err);
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg bg-white shadow">
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          className="w-full px-4 py-2 border rounded"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Send Reset Link
        </button>
        {message && <p className="text-sm text-gray-600 mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
