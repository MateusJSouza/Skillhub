import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensure-authenticated';
import { requireRole } from '../middlewares/require-role';
import { UserRole } from '../utils/user-roles';
import { getAdminDashboard } from '../controllers/admin-controller';

const router = Router();

// Aplica autenticação em todas as rotas
router.use(ensureAuthenticated);

// Apenas usuários com role ADMIN podem acessar
router.get('/dashboard', requireRole([UserRole.ADMIN]), getAdminDashboard);

export default router;
