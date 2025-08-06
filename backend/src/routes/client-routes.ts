import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensure-authenticated'
import { requireRole } from '../middlewares/require-role'
import { getClientDashboard } from '../controllers/client-controller'
import { UserRole } from '../utils/user-roles'

const router = Router()

// Aplicar autenticação em todas as rotas de client
router.use(ensureAuthenticated)

router.get('/dashboard', requireRole([UserRole.CLIENT]), getClientDashboard)

export default router 