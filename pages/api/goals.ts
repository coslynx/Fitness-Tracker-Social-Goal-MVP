import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/utils/api';
import { GoalInput, Goal } from '@/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Goal | { message: string }>
) {
  if (req.method === 'POST') {
    try {
      const goalData: GoalInput = req.body;
      const userId = parseInt(req.query.userId as string);

      if (isNaN(userId)) {
        return res.status(400).json({ message: 'Invalid userId' });
      }

      const goal = await prisma.goal.create({
        data: {
          ...goalData,
          userId,
        },
      });

      return res.status(201).json(goal);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to create goal' });
    }
  } else if (req.method === 'GET') {
    try {
      const userId = parseInt(req.query.userId as string);

      if (isNaN(userId)) {
        return res.status(400).json({ message: 'Invalid userId' });
      }

      const goals = await prisma.goal.findMany({
        where: {
          userId,
        },
      });

      return res.status(200).json(goals);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to retrieve goals' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}