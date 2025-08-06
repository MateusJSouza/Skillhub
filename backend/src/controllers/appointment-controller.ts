import { Request, Response } from "express"
import { AppointmentService } from "../services/appointment-service";

export const createAppointment = async (req: Request, res: Response) => {
  try {
    const { date, serviceId } = req.body;
    const userId = req.user?.id

    if (!date || !serviceId) {
      return res.status(400).json({ error: 'Data e serviço do agendamento são obrigatórios' })
    }

    if (!userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' })
    }

    const appointment = await AppointmentService.create({ userId, date, serviceId })

    return res.status(201).json(appointment)
  } catch (err) {
    console.error('Erro ao criar agendamento:', err);
    
    if (err instanceof Error) {
      if (err.message.includes('não encontrado')) {
        return res.status(404).json({ error: err.message })
      }
    }
    
    return res.status(500).json({ error: 'Erro interno ao criar agendamento.' })
  }
}

export const listAppointment = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' })
    }
    
    const appointments = await AppointmentService.findByUser(userId);
    
    return res.json(appointments);
  } catch (error) {
    console.error('Erro ao listar agendamentos:', error);
    return res.status(500).json({ error: 'Erro interno ao listar agendamentos.' });
  }
};