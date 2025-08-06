import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensure-authenticated'
import { requireRole } from '../middlewares/require-role'
import { Role } from '../generated/prisma'
import {
  createService,
  listServices,
  getServiceById,
  updateService,
  deleteService
} from '../controllers/service-controller'

const router = Router()

// Rotas públicas (não precisam de autenticação)
router.get('/', listServices)
router.get('/:id', getServiceById)

// Rotas que precisam de autenticação
router.use(ensureAuthenticated)

// Rotas para PROVIDER (criar, atualizar, deletar serviços)
router.post('/', requireRole([Role.PROVIDER]), createService)
router.put('/:id', requireRole([Role.PROVIDER]), updateService)
router.delete('/:id', requireRole([Role.PROVIDER]), deleteService)

export default router 