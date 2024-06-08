// pages/api/invitations/[id]/accept.ts

import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { id } = req.query;

    const invitation = await prismadb.invitation.update({
      where: { id: String(id) },
      data: { status: 'accepted' },
    });

    if (invitation.userId) {
      await prismadb.teamMember.create({
        data: {
          userId: invitation.userId,
          teamId: invitation.teamId,
          role: 'member',
        },
      });
    }

    res.status(200).json(invitation);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
