import { Request, Response } from 'express';

export const getCurrentUser = (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Usuário não autenticado.' });
  }

  const { password: _, ...userWithoutPassword } = req.user;

  return res.status(200).json({ user: userWithoutPassword });
};
