import { Role } from '../../generated/prisma'

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string
        email: string
        role: Role
      }
    }
  }
}
