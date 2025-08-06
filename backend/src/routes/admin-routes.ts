import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensure-authenticated'
import { requireRole } from '../middlewares/require-role'
import { Role } from '../generated/prisma'
import { getAdminDashboard } from '../controllers/admin-controller'

const router = Router()

// Aplicar autenticação em todas as rotas de admin
router.use(ensureAuthenticated)

router.get('/dashboard', requireRole([Role.ADMIN]), getAdminDashboard)

export default router
