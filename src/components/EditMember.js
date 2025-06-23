import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axiosInstance';

const EditMember = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    baptismDate: '',
    dateOfBirth: '',
    groups: '',
    isMarried: false,
    spouseId: '',
    marriageDate: '',
  });

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch current member + other members
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [memberRes, allMembersRes] = await Promise.all([
          axios.get(`/members/${id}`),
          axios.get('/members'),
        ]);

        const member = memberRes.data;

        setForm({
          fullName: member.fullName || '',
          baptismDate: member.baptismDate?.split('T')[0] || '',
          dateOfBirth: member.dateOfBirth?.split('T')[0] || '',
          groups: member.groups ? member.groups.join(', ') : '',
          isMarried: member.matrimony?.isMarried || false,
          spouseId: member.matrimony?.spouseId?._id || '',
          marriageDate: member.matrimony?.marriageDate?.split('T')[0] || '',
        });

        setMembers(allMembersRes.data.filter((m) => m._id !== id)); // exclude self
        setLoading(false);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load member data');
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedMember = {
      fullName: form.fullName,
      baptismDate: form.baptismDate || null,
      dateOfBirth: form.dateOfBirth || null,
      groups: form.groups.split(',').map((g) => g.trim()).filter((g) => g),
      matrimony: {
        isMarried: form.isMarried,
        spouseId: form.isMarried ? form.spouseId : null,
        marriageDate: form.isMarried ? form.marriageDate || null : null,
      },
    };

    try {
      await axios.put(`/members/${id}`, updatedMember);
      navigate('/members');
    } catch (err) {
      console.error('Error updating member:', err);
      setError('Failed to update member');
    }
  };

  if (loading) {
    return <p className="p-6 text-gray-600 dark:text-gray-300">Loading member...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Edit Member</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Full Name"
          required
        />
        <input
          type="date"
          name="baptismDate"
          value={form.baptismDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="dateOfBirth"
          value={form.dateOfBirth}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="groups"
          value={form.groups}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Groups (comma-separated)"
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isMarried"
            checked={form.isMarried}
            onChange={handleChange}
          />
          <label className="text-gray-800 dark:text-gray-200">Married</label>
        </div>
        {form.isMarried && (
          <>
            <select
              name="spouseId"
              value={form.spouseId}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Spouse</option>
              {members.map((m) => (
                <option key={m._id} value={m._id}>
                  {m.fullName}
                </option>
              ))}
            </select>
            <input
              type="date"
              name="marriageDate"
              value={form.marriageDate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditMember;
