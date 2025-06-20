import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddMember = () => {
  const [fullName, setFullName] = useState('');
  const [baptismDate, setBaptismDate] = useState('');
  const [isMarried, setIsMarried] = useState(false);
  const [spouseId, setSpouseId] = useState('');
  const [marriageDate, setMarriageDate] = useState('');
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/members')
      .then(res => setMembers(res.data))
      .catch(err => console.error('❌ Failed to load members', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMember = {
      fullName,
      baptismDate,
      matrimony: {
        isMarried,
        spouseId: isMarried ? spouseId : null,
        marriageDate: isMarried ? marriageDate : null
      }
    };

    try {
      await axios.post('http://localhost:5000/api/members', newMember);
      alert('✅ Member added successfully!');
      // Reset form
      setFullName('');
      setBaptismDate('');
      setIsMarried(false);
      setSpouseId('');
      setMarriageDate('');
    } catch (error) {
      console.error('❌ Error adding member:', error);
      alert('Failed to add member. Check the console for details.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg bg-white shadow-md dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Add New Member</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-2 border rounded"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="date"
          className="w-full p-2 border rounded"
          value={baptismDate}
          onChange={(e) => setBaptismDate(e.target.value)}
          required
        />
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isMarried}
            onChange={(e) => setIsMarried(e.target.checked)}
          />
          <label className="dark:text-white">Married</label>
        </div>
        {isMarried && (
          <>
            <select
              className="w-full p-2 border rounded"
              value={spouseId}
              onChange={(e) => setSpouseId(e.target.value)}
              required
            >
              <option value="">Select Spouse</option>
              {members.map((member) => (
                <option key={member._id} value={member._id}>
                  {member.fullName}
                </option>
              ))}
            </select>
            <input
              type="date"
              className="w-full p-2 border rounded"
              value={marriageDate}
              onChange={(e) => setMarriageDate(e.target.value)}
              required
            />
          </>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Add Member
        </button>
      </form>
    </div>
  );
};

export default AddMember;
