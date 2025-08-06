import type { Request, Response } from 'express'
import { loginService } from '../auth/login-service'
import { registerService } from '../auth/register-service'

export const login = (req: Request, res: Response) => loginService(req, res)
export const register = (req: Request, res: Response) =>
  registerService(req, res)
