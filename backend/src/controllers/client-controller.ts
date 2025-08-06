import type { Request, Response } from 'express'

export const getClientDashboard = async (req: Request, res: Response) => {
  return res.status(200).json({
    message: 'Bem-vindo ao painel do cliente!',
    user: req.user,
    features: [
      'Buscar serviços',
      'Agendar consultas',
      'Ver histórico de agendamentos',
      'Avaliar profissionais'
    ]
  })
} 