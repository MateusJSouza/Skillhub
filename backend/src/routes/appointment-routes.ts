import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensure-authenticated'
import { requireRole } from '../middlewares/require-role'
import {
  createAppointment,
  listAppointment
} from '../controllers/appointment-controller'
import { UserRole } from '../utils/user-roles'

const router = Router()

// Todas as rotas de agendamento precisam de autenticação
router.use(ensureAuthenticated)

// Rotas para CLIENT (criar e listar agendamentos)
router.post('/', requireRole([UserRole.CLIENT]), createAppointment)
router.get('/', requireRole([UserRole.CLIENT]), listAppointment)

export default router
