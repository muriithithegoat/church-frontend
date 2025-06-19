// src/components/EditMember.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditMember = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/members/${id}`)
      .then(res => setFormData(res.data))
      .catch(() => toast.error('Failed to load member'));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (!formData) return;

    if (name === 'isMarried') {
      setFormData({
        ...formData,
        matrimony: {
          ...formData.matrimony,
          isMarried: checked,
        },
      });
    } else if (name === 'marriageDate' || name === 'spouseId') {
      setFormData({
        ...formData,
        matrimony: {
          ...formData.matrimony,
          [name]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/members/${id}`, formData)
      .then(() => {
        toast.success('Member updated');
        navigate('/');
      })
      .catch(() => toast.error('Update failed'));
  };

  if (!formData) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Member</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          name="baptismDate"
          type="date"
          value={formData.baptismDate?.substring(0, 10)}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <label className="block">
          <input
            name="isMarried"
            type="checkbox"
            checked={formData.matrimony.isMarried}
            onChange={handleChange}
          /> Married
        </label>
        {formData.matrimony.isMarried && (
          <>
            <input
              name="spouseId"
              type="text"
              value={formData.matrimony.spouseId || ''}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            />
            <input
              name="marriageDate"
              type="date"
              value={formData.matrimony.marriageDate?.substring(0, 10) || ''}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            />
          </>
        )}
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditMember;
