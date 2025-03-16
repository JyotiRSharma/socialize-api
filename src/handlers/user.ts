import { createJWT, hashPassword } from '../modules/auth';
import prisma from '../modules/db';
import { Request, Response } from 'express';

export const signUp = async (req: Request, res: Response) => {
  const hash = await hashPassword(req.body.password);

  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: hash,
    },
  });

  const token = createJWT(user);
  res.json({ token });
};

export const signIn = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  const token = createJWT(user);
  res.json({ token });
};
