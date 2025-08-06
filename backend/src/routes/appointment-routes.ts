import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensure-authenticated'
import { requireRole } from '../middlewares/require-role'
import {
  createAppointment,
  listAppointment,
  listProviderAppointments
} from '../controllers/appointment-controller'
import { UserRole } from '../utils/user-roles'

const router = Router()

router.use(ensureAuthenticated)

// CLIENT pode criar e listar os próprios agendamentos
router.post('/', requireRole([UserRole.CLIENT]), createAppointment)
router.get('/', requireRole([UserRole.CLIENT]), listAppointment)

// PROVIDER pode listar os agendamentos dos seus clientes
router.get('/provider', requireRole([UserRole.PROVIDER]), listProviderAppointments)

export default router;
