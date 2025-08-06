import type { Request, Response } from 'express'

export const getAdminDashboard = async (req: Request, res: Response) => {
  return res.status(200).json({
    message: 'Bem-vindo ao painel administrativo!',
    user: req.user,
    features: [
      'Gerenciar usuários',
      'Ver estatísticas da plataforma',
      'Moderar conteúdo',
      'Configurar sistema'
    ]
  })
}
