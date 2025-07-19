import React, { useState } from 'react';
import AddUser from './components/AddUser.jsx';
import Leaderboard from './components/Leaderboard.jsx';

const App = () => {
  const [refresh, setRefresh] = useState(false);
  return (
    <div className="min-h-screen p-4 max-w-3xl mx-auto bg-gradient-to-br from-yellow-50 to-orange-100">
      <h1 className="text-3xl font-bold text-center mb-6">🏆 Leaderboard</h1>
      <AddUser onUserAdded={() => setRefresh(!refresh)} />
      <Leaderboard key={refresh} />
    </div>
  );
};

export default App;