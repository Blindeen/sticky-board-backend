import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

interface TypedRequest<T> extends Request {
  body: T;
}

const prisma = new PrismaClient();

export const createUser = async (
  req: TypedRequest<{ name: string; email: string; password: string }>,
  res: Response,
) => {
  const requestBody = req.body;
  try {
    const hashedPassword = await bcrypt.hash(requestBody.password, 10);
    await prisma.user.create({
      data: { ...requestBody, password: hashedPassword },
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
    return;
  }

  res.status(201).json({ message: 'User created successfully' });
};
