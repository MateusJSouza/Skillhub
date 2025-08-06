import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensure-authenticated'
import { requireRole } from '../middlewares/require-role'
import { getProviderDashboard } from '../controllers/provider-controller'
import { UserRole } from '../utils/user-roles'

const router = Router()

// Aplicar autenticação em todas as rotas de provider
router.use(ensureAuthenticated)

router.get('/dashboard', requireRole([UserRole.PROVIDER]), getProviderDashboard)

export default router