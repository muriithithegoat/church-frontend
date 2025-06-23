import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';

import {
  UserGroupIcon,
  ChartBarIcon,
  HeartIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/members/stats/summary');
        setStats(res.data);
      } catch (err) {
        console.error('Failed to fetch stats:', err);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Dashboard</h1>
        <p className="text-gray-500 animate-pulse">Loading stats...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600 dark:text-red-400">
        <h2 className="text-xl font-bold">🚨 {error}</h2>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Members"
          value={stats.totalMembers}
          icon={<UserGroupIcon className="h-8 w-8 text-blue-500" />}
        />
        <StatCard
          title="Baptized"
          value={stats.baptizedMembers}
          icon={<ChartBarIcon className="h-8 w-8 text-green-500" />}
        />
        <StatCard
          title="Married Members"
          value={stats.marriedMembers}
          icon={<HeartIcon className="h-8 w-8 text-red-500" />}
        />
        <StatCard
          title="Families"
          value={stats.familyCount || 0}
          icon={<UsersIcon className="h-8 w-8 text-purple-500" />}
        />
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
          More insights coming soon
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          You'll be able to view family trees, age groups, gender distribution,
          and other useful stats here.
        </p>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow transition hover:shadow-lg">
    <div className="flex items-center space-x-4">
      {icon}
      <div>
        <p className="text-md font-medium text-gray-600 dark:text-gray-300">{title}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
      </div>
    </div>
  </div>
);

export default Dashboard;
