# Test SPS React - Frontend

Aplicação frontend desenvolvida em React para gerenciamento de usuários do sistema SPS.

## 📋 Pré-requisitos

- **Node.js** versão 14.0 ou superior
- **npm** ou **yarn** instalado
- **Git** (opcional)

## 🚀 Instalação

### 1. Clonar ou baixar o projeto

```bash
git clone https://github.com/dariosalles/test-sps-react.git
cd test-sps-react
```

### 2. Instalar as dependências

```bash
npm install
```

Ou com yarn:

```bash
yarn install
```

## 🔧 Executar o projeto

### Desenvolvimento

```bash
npm start
```

A aplicação abrirá automaticamente em `http://localhost:3000`

Ou com yarn:

```bash
yarn start
```

### Build para produção

```bash
npm run build
```

Ou com yarn:

```bash
yarn build
```

### Executar testes

```bash
npm test
```

## 📁 Estrutura do Projeto

```
test-sps-react/
├── public/
│   ├── index.html          # Arquivo HTML principal
│   ├── manifest.json       # Configuração PWA
│   └── robots.txt
├── src/
│   ├── components/         # Componentes reutilizáveis
│   │   ├── Footer.js
│   │   ├── Header.js
│   │   └── Modal.js
│   ├── context/            # Context API para autenticação
│   │   └── AuthContext.js
│   ├── helpers/            # Funções utilitárias
│   │   └── storageHelpers.js
│   ├── pages/              # Páginas da aplicação
│   │   ├── Dashboard.js
│   │   ├── Home.js
│   │   ├── SignIn.js
│   │   ├── UserEdit.js
│   │   └── Users.js
│   ├── routes/             # Configuração de rotas
│   │   └── PrivateRoute.js
│   ├── services/           # Serviços de API
│   │   └── UserService.js
│   ├── styles/             # Estilos CSS
│   │   ├── Dashboard.css
│   │   ├── Footer.css
│   │   ├── Header.css
│   │   ├── Modal.css
│   │   ├── SignIn.css
│   │   └── Users.css
│   ├── App.js              # Componente raiz
│   ├── index.js            # Entry point
│   └── routes.js           # Definição das rotas
├── package.json
└── README.md
```

## 🔐 Autenticação

A aplicação utiliza **JWT (JSON Web Tokens)** para autenticação:

- Token é armazenado no `localStorage`
- Token é enviado no header `Authorization: Bearer <token>`
- Sessão expira em **24 horas**
- Existe uma rota privada que protege páginas autenticadas

## 📝 Credenciais de Teste

```
Email: admin@spsgroup.com.br
Senha: 1234
```

## 🎯 Funcionalidades Principais

- ✅ Login com autenticação JWT
- ✅ Listar usuários
- ✅ Criar novo usuário
- ✅ Editar usuário existente
- ✅ Deletar usuário (com proteção para admin)
- ✅ Cache local de usuários
- ✅ Rotas protegidas
- ✅ Dashboard com informações do usuário

## 🛠️ Tecnologias Utilizadas

- **React 18.2.0** - Framework JavaScript
- **React Router DOM 6.22.3** - Roteamento
- **Axios** - Cliente HTTP
- **JWT Decode 4.0.0** - Decodificação de JWT
- **CSS3** - Estilos

## 🐛 Troubleshooting

### Erro: "Cannot GET /"
- Certifique-se de que o servidor backend está rodando
- Verifique se a URL do servidor está correta no `.env`

### Erro: "Token expirado"
- Faça login novamente
- O token expira em 24 horas

### Erro: "CORS"
- Verifique se o backend tem CORS habilitado
- Confirme a URL do servidor no `.env`

