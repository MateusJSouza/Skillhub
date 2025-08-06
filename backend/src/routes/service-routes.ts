import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensure-authenticated'
import { requireRole } from '../middlewares/require-role'
import { Role } from '../generated/prisma'
import { createService, listServices } from '../controllers/service-controller'
import { UserRole } from '../utils/user-roles'

const router = Router()

// Proteger todas as rotas
router.use(ensureAuthenticated)

router.post('/', requireRole([UserRole.PROVIDER]), createService)
router.get('/', listServices)

export default router
