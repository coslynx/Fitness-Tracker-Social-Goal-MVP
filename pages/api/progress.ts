import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/utils/api';
import { WorkoutInput } from '@/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const workoutData: WorkoutInput = req.body;
      const userId = parseInt(req.query.userId as string);

      if (isNaN(userId)) {
        return res.status(400).json({ message: 'Invalid userId' });
      }

      const workout = await prisma.workout.create({
        data: {
          ...workoutData,
          userId,
        },
      });

      return res.status(201).json(workout);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to create workout' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}