import { Request, Response } from "express"
import { Service } from "../services/service"

export const createService = async (req: Request, res: Response) => {
  try {
    const { title, description, price } = req.body
    const userId = req.user?.id

    if (!title || !description || typeof price !== 'number' || isNaN(price)) {
      return res.status(400).json({ error: 'Título, descrição e preço válidos são obrigatórios' })
    }    

    if (!userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' })
    }

    const service = await Service.create({ title, description, price, userId })

    return res.status(201).json(service)
  } catch (err) {
    console.error('Erro ao criar serviço:', err)
    return res.status(500).json({ error: 'Erro interno ao criar serviço.' })
  }
}

export const listServices = async (req: Request, res: Response) => {
  try {
    const services = await Service.findAll()
    return res.json(services)
  } catch (error) {
    console.error('Erro ao listar serviços:', error)
    return res.status(500).json({ error: 'Erro interno ao listar serviços.' })
  }
}

export const getServiceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const service = await Service.findById(id)

    if (!service) {
      return res.status(404).json({ error: 'Serviço não encontrado' })
    }

    return res.json(service)
  } catch (error) {
    console.error('Erro ao buscar serviço:', error)
    return res.status(500).json({ error: 'Erro interno ao buscar serviço.' })
  }
}

export const updateService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { title, description, price } = req.body
    const userId = req.user?.id

    if (!userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' })
    }

    const service = await Service.update(id, { title, description, price }, userId)

    if (!service) {
      return res.status(404).json({ error: 'Serviço não encontrado' })
    }

    return res.json(service)
  } catch (error) {
    console.error('Erro ao atualizar serviço:', error)
    return res.status(500).json({ error: 'Erro interno ao atualizar serviço.' })
  }
}

export const deleteService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const userId = req.user?.id

    if (!userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' })
    }

    const deleted = await Service.delete(id, userId)

    if (!deleted) {
      return res.status(404).json({ error: 'Serviço não encontrado' })
    }

    return res.status(204).send()
  } catch (error) {
    console.error('Erro ao deletar serviço:', error)
    return res.status(500).json({ error: 'Erro interno ao deletar serviço.' })
  }
} 