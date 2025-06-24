import React, { useState, useEffect } from 'react';
import axios from '../api/axiosInstance';

const AddMember = () => {
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [baptismDate, setBaptismDate] = useState('');
  const [gender, setGender] = useState('');
  const [isMarried, setIsMarried] = useState(false);
  const [spouseId, setSpouseId] = useState('');
  const [marriageDate, setMarriageDate] = useState('');
  const [groups, setGroups] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios.get('/members')
      .then(res => setMembers(res.data))
      .catch(err => console.error('Failed to load members:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMember = {
      fullName,
      dateOfBirth,
      baptismDate,
      gender,
      matrimony: {
        isMarried,
        spouseId: isMarried ? spouseId : null,
        marriageDate: isMarried ? marriageDate : null
      },
      groups
    };

    try {
      await axios.post('/members', newMember);
      alert('Member added successfully!');
      setFullName('');
      setDateOfBirth('');
      setBaptismDate('');
      setGender('');
      setIsMarried(false);
      setSpouseId('');
      setMarriageDate('');
      setGroups([]);
    } catch (error) {
      console.error('Error adding member:', error);
      alert('Failed to add member.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg bg-white shadow-md dark:bg-gray-800">
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
          placeholder="Date of Birth"
          className="w-full p-2 border rounded"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
        <select
          className="w-full p-2 border rounded"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          
        </select>
        <input
          type="date"
          placeholder="Baptism Date"
          className="w-full p-2 border rounded"
          value={baptismDate}
          onChange={(e) => setBaptismDate(e.target.value)}
        />
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Groups (comma separated)"
          value={groups.join(', ')}
          onChange={(e) => setGroups(e.target.value.split(',').map(g => g.trim()))}
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
            />
          </>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Add Member
        </button>
      </form>
    </div>
  );
};

export default AddMember;
