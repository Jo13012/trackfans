// pages/team-invitations.tsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const TeamInvitations = () => {
  const [invitations, setInvitations] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchInvitations = async () => {
      if (session) {
        const response = await axios.get(`/api/invitations?id=${session.user.userId}`);
        setInvitations(response.data);
      }
    };
    fetchInvitations();
  }, [session]);

  const handleAccept = async (id: string, teamId: string) => {
    await axios.post(`/api/invitations/${id}/accept`);
    setInvitations(invitations.filter((inv) => inv.id !== id));
  };

  return (
    <div>
      <h1>Team Invitations</h1>
      <ul>
        {invitations.map((invitation) => (
          <li key={invitation.id}>
            {invitation.team.name} - {invitation.status}
            <button onClick={() => handleAccept(invitation.id, invitation.teamId)}>Accept</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamInvitations;
