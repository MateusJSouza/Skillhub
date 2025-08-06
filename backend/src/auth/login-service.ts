import type { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../config/prisma'

export const loginService = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Senha inválida.' })
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    )

    const { password: _, ...userWithoutPassword } = user

    const response = {
      user: userWithoutPassword,
      token,
    }

    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno no servidor.' })
  }
}
