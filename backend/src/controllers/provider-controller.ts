import type { Request, Response } from 'express'

export const getProviderDashboard = async (req: Request, res: Response) => {
  return res.status(200).json({
    message: 'Bem-vindo ao painel do prestador de serviços!',
    user: req.user,
    features: [
      'Gerenciar serviços oferecidos',
      'Ver agendamentos recebidos',
      'Definir disponibilidade',
      'Receber pagamentos'
    ]
  })
} 