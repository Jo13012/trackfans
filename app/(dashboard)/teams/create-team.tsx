// pages/create-team.tsx

import { useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const CreateTeam = () => {
  const [name, setName] = useState('');
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (session) {
      await axios.post('/api/teams', { name, userId: session.user.id });
      setName('');
    }
  };

  return (
    <div>
      <h1>Create Team</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Team Name" 
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateTeam;
