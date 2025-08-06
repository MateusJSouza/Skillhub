import type { Request } from 'express'

// Teste para verificar se req.user está tipado corretamente
function testUserTyping(req: Request) {
  if (req.user) {
    // Deve ter tipagem correta
    const userId: string = req.user.id
    const userEmail: string = req.user.email
    const userRole: string = req.user.role

    console.log(userId, userEmail, userRole)
  }
}

export { testUserTyping }
