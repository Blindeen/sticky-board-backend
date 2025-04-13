import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { config } from '../config/config';
import { TypedRequest } from './types';

const prisma = new PrismaClient();

export const create = async (
  req: TypedRequest<{ name: string; email: string; password: string }>,
  res: Response,
) => {
  const requestBody = req.body;
  const hashedPassword = await bcrypt.hash(requestBody.password, 10);
  await prisma.user.create({
    data: { ...requestBody, password: hashedPassword },
  });

  res.status(201).json({ message: 'User created successfully' });
};

export const login = async (
  req: TypedRequest<{ email: string; password: string }>,
  res: Response,
) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    res.status(401).json({ message: 'Authentication failed' });
    return;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    res.status(401).json({ message: 'Authentication failed' });
    return;
  }

  const token = jwt.sign({ id: user.id }, config.jwtSecret, {
    expiresIn: config.jwtExpirationTime,
  });
  res.status(200).json({ token });
};
