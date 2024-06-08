// pages/invite-members.tsx

import { useState } from 'react';
import axios from 'axios';

const InviteMembers = () => {
  const [email, setEmail] = useState('');
  const [teamId, setTeamId] = useState<string>(''); // ID de l'équipe

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/invitations', { email, teamId });
      setEmail('');
      alert('Invitation sent!');
    } catch (error) {
      console.error(error);
      alert('Error sending invitation');
    }
  };

  return (
    <div>
      <h1>Invite Members</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required
        />
        <input 
          type="text" 
          value={teamId} 
          onChange={(e) => setTeamId(e.target.value)} 
          placeholder="Team ID" 
          required
        />
        <button type="submit">Invite</button>
      </form>
    </div>
  );
};

export default InviteMembers;
