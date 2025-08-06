import prisma from '../config/prisma'

interface CreateServiceParams {
  title: string
  description: string
  price: number
  userId: string
}

interface UpdateServiceParams {
  title?: string
  description?: string
  price?: number
}

export const ServiceService = {
  create: async ({ title, description, price, userId }: CreateServiceParams) => {
    return await prisma.service.create({
      data: {
        title,
        description,
        price,
        userId
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })
  },

  findAll: async () => {
    return await prisma.service.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createAt: 'desc'
      }
    })
  },

  findById: async (id: string) => {
    return await prisma.service.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })
  },

  update: async (id: string, data: UpdateServiceParams, userId: string) => {
    // Verificar se o serviço pertence ao usuário
    const service = await prisma.service.findFirst({
      where: { id, userId }
    })

    if (!service) {
      return null
    }

    return await prisma.service.update({
      where: { id },
      data,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })
  },

  delete: async (id: string, userId: string) => {
    // Verificar se o serviço pertence ao usuário
    const service = await prisma.service.findFirst({
      where: { id, userId }
    })

    if (!service) {
      return null
    }

    await prisma.service.delete({
      where: { id }
    })

    return true
  }
} 