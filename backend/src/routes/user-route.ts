import { Router } from 'express';
import { getCurrentUser } from '../controllers/user-controller';
import { requireAuth } from '../middlewares/require-auth';

const router = Router();

router.get('/me', requireAuth, getCurrentUser);

export default router;
