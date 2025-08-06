import type { Request, Response } from 'express'

import bcrypt from 'bcrypt'
import prisma from '../config/prisma'
import { Role } from '../generated/prisma'

export const registerService = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } })

    if (existingUser) {
      return res.status(400).json({ error: 'Email já está em uso.' })
    }

    // Validar se o role é válido
    const validRoles = Object.values(Role)
    const userRole = role && validRoles.includes(role) ? role : Role.CLIENT

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: userRole,
      },
    })

    const { password: _, ...userWithoutPassword } = user

    return res.status(201).json({ user: userWithoutPassword })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Erro interno no servidor.' })
  }
}
