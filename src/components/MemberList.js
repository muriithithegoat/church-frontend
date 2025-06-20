import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchMembers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/members');
      setMembers(res.data);
    } catch (err) {
      console.error('Error fetching members:', err);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this member?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/members/${id}`);
      setMembers((prev) => prev.filter((member) => member._id !== id));
    } catch (err) {
      console.error('Failed to delete member:', err);
    }
  };

  const filteredMembers = members.filter((member) =>
    member.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Church Members</h2>
        <Link
          to="/add"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition duration-200"
        >
          + Add Member
        </Link>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search members by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="overflow-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-left text-gray-600 uppercase text-xs">
            <tr>
              <th className="p-4">Full Name</th>
              <th className="p-4">Baptism Date</th>
              <th className="p-4">Married</th>
              <th className="p-4">Spouse</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <tr key={member._id} className="hover:bg-gray-50 transition">
                  <td className="p-4">{member.fullName}</td>
                  <td className="p-4">
                    {member.baptismDate
                      ? new Date(member.baptismDate).toLocaleDateString()
                      : '—'}
                  </td>
                  <td className="p-4">
                    {member.matrimony?.isMarried ? 'Yes' : 'No'}
                  </td>
                  <td className="p-4">
                    {member.matrimony?.spouseId?.fullName || '—'}
                  </td>
                  <td className="p-4 text-center space-x-2">
                    <Link
                      to={`/edit/${member._id}`}
                      className="inline-block px-3 py-1 text-sm text-white bg-green-600 hover:bg-green-700 rounded-md"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(member._id)}
                      className="inline-block px-3 py-1 text-sm text-white bg-red-500 hover:bg-red-600 rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-400">
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
