import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma';

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado.' });
    }

    // Adiciona o usuário à requisição (tiparemos isso corretamente em seguida)
    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido.' });
  }
};
