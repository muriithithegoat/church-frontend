import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import { Link } from 'react-router-dom';
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get('/members'); // Token is included from axiosInstance
        setMembers(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching members:', err);
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this member?')) return;
    try {
      await axios.delete(`/members/${id}`);
      setMembers((prev) => prev.filter((member) => member._id !== id));
    } catch (err) {
      console.error('Failed to delete member:', err);
    }
  };

  const filteredMembers = members.filter((member) =>
    member.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Church Members</h1>
        <Link
          to="/add"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition"
        >
          <PlusIcon className="h-5 w-5" />
          Add Member
        </Link>
      </div>

      <div className="relative w-full md:w-1/2">
        <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by full name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
        />
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="w-full min-w-[1000px] text-sm text-gray-700 dark:text-gray-200">
          <thead className="bg-gray-100 dark:bg-gray-800 text-left text-xs uppercase text-gray-600 dark:text-gray-400">
            <tr>
              <th className="p-4">Full Name</th>
              <th className="p-4">Date of Birth</th>
              <th className="p-4">Baptism Date</th>
              <th className="p-4">Groups</th>
              <th className="p-4">Married</th>
              <th className="p-4">Spouse</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-6">
                  <span className="animate-pulse text-gray-500 dark:text-gray-400">Loading members...</span>
                </td>
              </tr>
            ) : filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <tr key={member._id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                  <td className="p-4">{member.fullName}</td>
                  <td className="p-4">
                    {member.dateOfBirth
                      ? new Date(member.dateOfBirth).toLocaleDateString()
                      : '—'}
                  </td>
                  <td className="p-4">
                    {member.baptismDate
                      ? new Date(member.baptismDate).toLocaleDateString()
                      : '—'}
                  </td>
                  <td className="p-4">
                    {member.groups?.length > 0 ? member.groups.join(', ') : '—'}
                  </td>
                  <td className="p-4">{member.matrimony?.isMarried ? 'Yes' : 'No'}</td>
                  <td className="p-4">
                    {member.matrimony?.spouseId?.fullName || '—'}
                  </td>
                  <td className="p-4 text-center space-x-2">
                    <Link
                      to={`/edit/${member._id}`}
                      className="inline-flex items-center px-3 py-1 text-sm text-white bg-green-600 hover:bg-green-700 rounded-md transition"
                    >
                      <PencilIcon className="h-4 w-4 mr-1" />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(member._id)}
                      className="inline-flex items-center px-3 py-1 text-sm text-white bg-red-500 hover:bg-red-600 rounded-md transition"
                    >
                      <TrashIcon className="h-4 w-4 mr-1" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-400 dark:text-gray-500">
                  No members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberList;
