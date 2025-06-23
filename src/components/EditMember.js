import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axiosInstance';


const EditMember = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState({
    fullName: '',
    baptismDate: '',
    matrimony: {
      isMarried: false,
      spouseId: ''
    }
  });
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/members/${id}`);
        setMember(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch member:', err);
      }
    };

    const fetchAllMembers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/members');
        setMembers(res.data);
      } catch (err) {
        console.error('Failed to fetch members:', err);
      }
    };

    fetchMember();
    fetchAllMembers();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'isMarried') {
      setMember((prev) => ({
        ...prev,
        matrimony: {
          ...prev.matrimony,
          isMarried: checked,
        }
      }));
    } else if (name === 'spouseId') {
      setMember((prev) => ({
        ...prev,
        matrimony: {
          ...prev.matrimony,
          spouseId: value,
        }
      }));
    } else {
      setMember((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/members/${id}`, member);
      alert('Member updated!');
      navigate('/');
    } catch (err) {
      console.error('Failed to update member:', err);
      alert('Failed to update member');
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-500">Loading...</div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Edit Member</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={member.fullName}
            onChange={handleChange}
            className="w-full p-2 border rounded shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Baptism Date</label>
          <input
            type="date"
            name="baptismDate"
            value={member.baptismDate?.split('T')[0] || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded shadow-sm"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="isMarried"
            checked={member.matrimony.isMarried}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="font-medium">Married</label>
        </div>

        {member.matrimony.isMarried && (
          <div>
            <label className="block mb-1 font-medium">Spouse</label>
            <select
              name="spouseId"
              value={member.matrimony.spouseId || ''}
              onChange={handleChange}
              className="w-full p-2 border rounded shadow-sm"
            >
              <option value="">Select Spouse</option>
              {members
                .filter((m) => m._id !== id)
                .map((m) => (
                  <option key={m._id} value={m._id}>
                    {m.fullName}
                  </option>
                ))}
            </select>
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditMember;
