import prisma from '../config/prisma';

interface CreateAppointmentParams {
  userId: string;
  date: string;
  serviceId: string;
}

export const AppointmentService = {
  create: async ({ userId, date, serviceId }: CreateAppointmentParams) => {
    // Verificar se o serviço existe
    const service = await prisma.service.findUnique({
      where: { id: serviceId }
    });

    if (!service) {
      throw new Error('Serviço não encontrado');
    }

    // Verificar se o usuário existe
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return await prisma.appointment.create({
      data: {
        userId,
        serviceId,
        date: new Date(date)
      },
      include: {
        service: true,
        user: true
      }
    });
  },

  findByUser: async (userId: string) => {
    return await prisma.appointment.findMany({
      where: { userId },
      include: {
        service: true
      },
      orderBy: { date: 'asc' },
    });
  },
};
