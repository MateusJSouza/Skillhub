import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensure-authenticated'
import { requireRole } from '../middlewares/require-role'
import { Role } from '../generated/prisma'
import { getClientDashboard } from '../controllers/client-controller'

const router = Router()

// Aplicar autenticação em todas as rotas de client
router.use(ensureAuthenticated)

router.get('/dashboard', requireRole([Role.CLIENT]), getClientDashboard)

export default router 