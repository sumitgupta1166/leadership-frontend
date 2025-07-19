import React, { useState } from 'react';
import { addUser } from '../api/userApi';

const AddUser = ({ onUserAdded }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleAdd = async () => {
    if (!name.trim()) {
      setError('Name cannot be empty.');
      return;
    }
    try {
      await addUser(name);
      setName('');
      setError('');
      onUserAdded(); // refresh leaderboard
    } catch (err) {
      console.error("❌ Error adding user: ", err);
      const message =
        err.response?.data?.message || err.response?.data || 'Something went wrong';
      setError(message);
    }
  };

  return (
    <div className="flex flex-col gap-2 mb-4">
      <div className="flex gap-2">
        <input
          className="p-2 border rounded w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter user name"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default AddUser;
