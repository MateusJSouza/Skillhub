import type { Request, Response, NextFunction } from 'express'
import { Role } from '../generated/prisma'

export const requireRole = (roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ error: 'Acesso negado. Permissão insuficiente.' })
    }

    next()
  }
}
