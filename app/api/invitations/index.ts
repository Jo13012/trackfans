// pages/api/invitations/index.ts

import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, teamId } = req.body;

    const user = await prismadb.user.findUnique({ where: { userId } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const invitation = await prismadb.invitation.create({
      data: {
        teamId,
        userId: userId,
      },
    });

    res.status(201).json(invitation);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
