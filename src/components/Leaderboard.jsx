import React, { useEffect, useState } from 'react';
import { claimPoints, fetchUsers } from '../api/userApi';
import { formatPoints } from '../utils/formatter';

const defaultAvatar = 'https://via.placeholder.com/80';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState('');

  const loadUsers = async () => {
    try {
      const res = await fetchUsers();

      // Safely extract user array from res.data
      const userList = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.users)
        ? res.data.users
        : [];

      const sorted = userList.sort((a, b) => b.totalPoints - a.totalPoints);
      setUsers(sorted);
    } catch (err) {
      console.error('Failed to load users:', err);
      setUsers([]);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleClaim = async () => {
    if (!selected) return alert('Please select a user');
    try {
      await claimPoints(selected);
      loadUsers();
    } catch (err) {
      console.error('Failed to claim points:', err);
    }
  };

  const top3 = users.slice(0, 3);
  const rest = users.slice(3);

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-center mb-4">🔥 Live Rankings</h2>

      {/* Top 3 Users */}
      <div className="flex justify-center gap-6 mb-6">
        {top3.map((user, idx) => (
          <div key={user._id} className="text-center">
            <div className="relative">
              <img
                src={defaultAvatar}
                className="w-20 h-20 rounded-full border-4 border-yellow-500 mx-auto"
                alt="avatar"
              />
              <div className="absolute -top-2 -right-3 text-2xl">
                {['🥇', '🥈', '🥉'][idx]}
              </div>
            </div>
            <p className="mt-2 font-semibold">{user.name}</p>
            <p className="text-sm text-gray-600">{formatPoints(user.totalPoints)} pts</p>
          </div>
        ))}
      </div>

      {/* Claim Section */}
      <div className="flex gap-2 mb-4">
        <select
          className="border p-2 rounded w-full"
          onChange={(e) => setSelected(e.target.value)}
          value={selected}
        >
          <option value="">Select a user to claim points</option>
          {users.map((u) => (
            <option value={u._id} key={u._id}>
              {u.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleClaim}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Claim
        </button>
      </div>

      {/* Remaining Users */}
      <div className="bg-gray-50 rounded-lg p-4 max-h-[300px] overflow-y-auto">
        {rest.map((u, i) => (
          <div
            key={u._id}
            className="flex justify-between items-center border-b py-2"
          >
            <div className="flex items-center gap-3">
              <span className="w-6 text-right font-bold">{i + 4}</span>
              <img src={defaultAvatar} className="w-10 h-10 rounded-full" alt="avatar" />
              <span>{u.name}</span>
            </div>
            <span className="text-gray-700">{formatPoints(u.totalPoints)} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
