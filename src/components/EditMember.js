import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';

const EditMember = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    dateOfBirth: '',
    baptismDate: '',
    gender: '',
    matrimony: {
      isMarried: false,
      spouseId: '',
      marriageDate: ''
    },
    groups: []
  });
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/members/${id}`);
      setForm({
        ...res.data,
        matrimony: {
          isMarried: res.data.matrimony?.isMarried || false,
          spouseId: res.data.matrimony?.spouseId || '',
          marriageDate: res.data.matrimony?.marriageDate || ''
        },
        groups: res.data.groups || []
      });

      const memberRes = await axios.get('/members');
      setMembers(memberRes.data);
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`/members/${id}`, form);
    navigate('/members');
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg bg-white shadow-md dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Edit Member</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="dateOfBirth"
          value={form.dateOfBirth?.slice(0, 10)}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          
        </select>
        <input
          type="date"
          name="baptismDate"
          value={form.baptismDate?.slice(0, 10)}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Groups (comma separated)"
          value={form.groups.join(', ')}
          onChange={(e) => setForm({ ...form, groups: e.target.value.split(',').map(g => g.trim()) })}
        />
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={form.matrimony.isMarried}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                matrimony: {
                  ...prev.matrimony,
                  isMarried: e.target.checked
                }
              }))
            }
          />
          <label className="dark:text-white">Married</label>
        </div>
        {form.matrimony.isMarried && (
          <>
            <select
              value={form.matrimony.spouseId}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  matrimony: {
                    ...prev.matrimony,
                    spouseId: e.target.value
                  }
                }))
              }
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
              value={form.matrimony.marriageDate?.slice(0, 10)}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  matrimony: {
                    ...prev.matrimony,
                    marriageDate: e.target.value
                  }
                }))
              }
              className="w-full p-2 border rounded"
            />
          </>
        )}
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditMember;
