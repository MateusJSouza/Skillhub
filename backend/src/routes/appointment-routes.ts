import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensure-authenticated'
import { requireRole } from '../middlewares/require-role'
import { Role } from '../generated/prisma'
import {
  createAppointment,
  listAppointment
} from '../controllers/appointment-controller'

const router = Router()

// Todas as rotas de agendamento precisam de autenticação
router.use(ensureAuthenticated)

// Rotas para CLIENT (criar e listar agendamentos)
router.post('/', requireRole([Role.CLIENT]), createAppointment)
router.get('/', requireRole([Role.CLIENT]), listAppointment)

export default router
