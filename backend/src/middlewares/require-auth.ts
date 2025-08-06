import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma';
import { UserRole } from '../utils/user-roles';

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      role: UserRole;
      email: string;
    };

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado.' });
    }

    // Aqui a mágica do TypeScript: isso atribui req.user do tipo Express.User definido no global.d.ts
    req.user = {
      id: user.id,
      role: user.role as UserRole,
      email: user.email,
    };

    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido.' });
  }
};
