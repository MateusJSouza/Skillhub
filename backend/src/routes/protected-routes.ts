import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensure-authenticated'

const router = Router()

router.get('/me', ensureAuthenticated, (req, res) => {
  res.status(200).json({ message: 'Acesso autorizado!', user: req.user })
})

export default router
