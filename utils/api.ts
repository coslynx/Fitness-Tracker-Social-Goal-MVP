import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from './prisma';
import { GoalInput, WorkoutInput, UserInput } from '@/types';
import bcrypt from 'bcrypt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const userData: UserInput = req.body;
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await prisma.user.create({
        data: {
          ...userData,
          password: hashedPassword,
        },
      });

      return res.status(201).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to create user' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}