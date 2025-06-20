import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddMember = () => {
  const [fullName, setFullName] = useState('');
  const [baptismDate, setBaptismDate] = useState('');
  const [isMarried, setIsMarried] = useState(false);
  const [spouseId, setSpouseId] = useState('');
  const [marriageDate, setMarriageDate] = useState('');
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all members to use in spouse dropdown
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/members');
        setMembers(res.data);
      } catch (err) {
        console.error('Failed to fetch members:', err);
        alert('Failed to load member list');
      }
    };

    fetchMembers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const memberData = {
      fullName,
      baptismDate: baptismDate || null,
      matrimony: {
        isMarried,
        spouseId: isMarried ? spouseId || null : null,
        marriageDate: isMarried ? marriageDate || null : null
      }
    };

    try {
      await axios.post('http://localhost:5000/api/members', memberData, {
        headers: { 'Content-Type': 'application/json' }
      });
      alert('✅ Member added successfully!');
      setFullName('');
      setBaptismDate('');
      setIsMarried(false);
      setSpouseId('');
      setMarriageDate('');
    } catch (err) {
      console.error('❌ Error adding member:', err);
      alert('Failed to add member. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg bg-white shadow-md dark:bg-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold mb-6">Add New Member</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-800"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <input
          type="date"
          className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-800"
          value={baptismDate}
          onChange={(e) => setBaptismDate(e.target.value)}
        />

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isMarried}
            onChange={(e) => setIsMarried(e.target.checked)}
          />
          <label>Married</label>
        </div>

        {isMarried && (
          <>
            <select
              className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-800"
              value={spouseId}
              onChange={(e) => setSpouseId(e.target.value)}
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
              className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-800"
              value={marriageDate}
              onChange={(e) => setMarriageDate(e.target.value)}
            />
          </>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition disabled:opacity-60"
        >
          {loading ? 'Saving...' : 'Add Member'}
        </button>
      </form>
    </div>
  );
};

export default AddMember;
