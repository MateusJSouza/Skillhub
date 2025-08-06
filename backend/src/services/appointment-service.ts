import prisma from "../config/prisma";

interface CreateAppointmentParams {
  userId: string;
  date: string;
  serviceId: string;
}

export const AppointmentService = {
  create: async ({ userId, date, serviceId }: CreateAppointmentParams) => {

    // Verificar se o serviço existe
    const service = await prisma.service.findUnique({ where: { id: serviceId } });
    if (!service) throw new Error('Serviço não encontrado');

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('Usuário não encontrado');

    // Converter a string date para Date
    const appointmentDate = new Date(date);
    if (isNaN(appointmentDate.getTime())) {
      throw new Error('Data inválida');
    }

    // Duração fixa (exemplo 1h)
    const appointmentDurationMs = 60 * 60 * 1000;

    const startNew = appointmentDate;
    const endNew = new Date(appointmentDate.getTime() + appointmentDurationMs);

    // Verificar conflito para o mesmo provider no mesmo horário
    const conflictingAppointment = await prisma.appointment.findFirst({
      where: {
        AND: [
          {
            date: {
              gte: new Date(startNew.getTime() - appointmentDurationMs), // buffer para sobreposição
              lt: endNew,
            },
          },
          {
            service: {
              userId: service.userId,  // provider do serviço
            },
          },
        ],
      },
    });

    if (conflictingAppointment) {
      throw new Error('Conflito de horário: já existe um agendamento nesse horário para este provedor');
    }

    // Criar agendamento
    return await prisma.appointment.create({
      data: {
        userId,
        serviceId,
        date: appointmentDate,
      },
      include: {
        service: true,
        user: true,
      },
    });
  },

  findByUser: async (userId: string) => {
    return await prisma.appointment.findMany({
      where: { userId },
      include: {
        service: true,  // inclui dados do serviço agendado
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },              // inclui dados básicos do usuário (cliente)
      },
      orderBy: {
        date: 'asc',    // ordena pela data do agendamento
      },
    });
  },

  findByProvider: async (providerId: string) => {
    const services = await prisma.service.findMany({
      where: { userId: providerId },
      select: { id: true }
    });

    const serviceIds = services.map(s => s.id)

    return await prisma.appointment.findMany({
      where: { serviceId: { in: serviceIds }},
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
        service: true,
      },
      orderBy: { date: 'asc' }
    })
  }
};
