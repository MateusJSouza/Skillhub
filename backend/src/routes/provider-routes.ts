import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensure-authenticated'
import { requireRole } from '../middlewares/require-role'
import { Role } from '../generated/prisma'
import { getProviderDashboard } from '../controllers/provider-controller'

const router = Router()

// Aplicar autenticação em todas as rotas de provider
router.use(ensureAuthenticated)

router.get('/dashboard', requireRole([Role.PROVIDER]), getProviderDashboard)

export default router 