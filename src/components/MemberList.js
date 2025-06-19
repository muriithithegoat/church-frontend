import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMembers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/members');
      setMembers(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch members');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this member?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/members/${id}`);
      setMembers(members.filter(member => member._id !== id));
      alert('Member deleted successfully');
    } catch (err) {
      alert('Failed to delete member');
    }
  };

  if (loading) return <p className="text-center mt-8">Loading members...</p>;
  if (error) return <p className="text-red-500 text-center mt-8">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Members</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Baptism Date</th>
            <th className="border border-gray-300 p-2">Married</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map(member => (
            <tr key={member._id}>
              <td className="border border-gray-300 p-2">{member.fullName}</td>
              <td className="border border-gray-300 p-2">
                {member.baptismDate ? new Date(member.baptismDate).toLocaleDateString() : 'N/A'}
              </td>
              <td className="border border-gray-300 p-2">
                {member.matrimony?.isMarried ? 'Yes' : 'No'}
              </td>
              <td className="border border-gray-300 p-2">
                <Link
                  to={`/edit/${member._id}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(member._id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberList;
