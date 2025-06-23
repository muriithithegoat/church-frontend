import React, { useState } from 'react';
import axios from '../api/axiosInstance';

import { useNavigate, Link } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      const { token, user } = res.data;

      // Save to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid email or password');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={form.email}
          onChange={handleChange}
          required
        />

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            className="w-full p-2 border rounded pr-10"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2 text-gray-600"
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        <div className="flex justify-between text-sm text-blue-600">
          <Link to="/register" className="hover:underline">
            New here? Register
          </Link>
          <Link to="/forgot-password" className="hover:underline">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
