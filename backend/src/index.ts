import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import authRoutes from './routes/auth-routes'
import protectedRoutes from './routes/protected-routes'
import adminRoutes from './routes/admin-routes'
import userRoutes from './routes/user-route'
import clientRoutes from './routes/client-routes'
import providerRoutes from './routes/provider-routes'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/auth', authRoutes)
app.use('/api/protected', protectedRoutes)
app.use('/admin', adminRoutes)
app.use('/api/user', userRoutes)
app.use('/api/client', clientRoutes)
app.use('/api/provider', providerRoutes)

app.get('/', (req, res) => {
  res.send('SkillHub API está no ar!')
})

const PORT = process.env.PORT || 3333
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
