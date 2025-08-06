# SkillHub - Marketplace de Serviços

Uma plataforma completa de marketplace que conecta profissionais e clientes. Desenvolvida com Node.js/TypeScript no backend e React no frontend, oferece um sistema robusto de autenticação, gerenciamento de usuários e uma interface moderna para contratação de serviços.

## 🚀 Tecnologias

### Backend
- **Node.js** - Runtime JavaScript
- **TypeScript** - Linguagem tipada
- **Express** - Framework web
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação
- **bcrypt** - Criptografia de senhas

### Frontend
- **React** - Biblioteca JavaScript
- **TypeScript** - Linguagem tipada
- **Vite** - Build tool
- **Tailwind CSS** - Framework CSS

## 📁 Estrutura do Projeto

```
skillhub/
├── backend/          # API REST
│   ├── src/
│   │   ├── auth/     # Autenticação
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── config/
│   └── prisma/       # Schema do banco
├── frontend/         # Interface web
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
└── README.md
```

## 🛠️ Instalação

### Backend

```bash
cd backend
npm install
```

Configure o arquivo `.env`:
```env
PORT=3333
DATABASE_URL="sua_conexao_postgresql"
JWT_SECRET="seu_jwt_secret"
```

Execute as migrações:
```bash
npx prisma migrate dev
```

Inicie o servidor:
```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## 🔐 Funcionalidades

- ✅ Sistema de autenticação (registro/login)
- ✅ Gerenciamento de usuários
- ✅ API RESTful
- ✅ Interface responsiva
- 🔄 Marketplace de serviços (em desenvolvimento)
- 🔄 Sistema de pagamentos (em desenvolvimento)

## 📝 Scripts Disponíveis

### Backend
- `npm run dev` - Inicia em modo desenvolvimento
- `npm run build` - Compila para produção
- `npm start` - Executa versão compilada
- `npm test` - Executa os testes

### Frontend
- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Compila para produção
- `npm run preview` - Visualiza build de produção

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Mateus Jesus** - [GitHub](https://github.com/MateusJSouza)

---

⭐ Se este projeto te ajudou, deixe uma estrela! 
