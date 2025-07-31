# 🧪 Desafio Técnico Front-End: CRUD de Produtos com Next.js

Aplicação web completa que implementa um CRUD (Create, Read, Update, Delete) de produtos, utilizando a [FakeStore API](https://fakestoreapi.com/). O projeto foi desenvolvido com Next.js, TypeScript e Tailwind CSS, seguindo as melhores práticas de componentização, responsividade e testabilidade.

## 🌐 Deploy

Você pode visualizar a aplicação em produção no seguinte link:  
**[dev-frontend-nextjs-gamma.vercel.app](https://vercel.com/lucas-projects-dddf5b1b/dev-frontend-nextjs/HM8eyoLuWBN1Rf7goSgNeZffMhgn)**

## ✅ Funcionalidades Implementadas

### Funcionalidades Obrigatórias
- [x] **Listagem de produtos:** Visualização de todos os produtos em um grid responsivo.
- [x] **Criação de novo produto:** Formulário completo com validação de campos e máscara de valor.
- [x] **Edição de produto:** Formulário pré-preenchido para alterar um produto existente.
- [x] **Exclusão de produto:** Com modal de confirmação para evitar exclusões acidentais.
- [x] **Visualização de um produto:** Página de detalhe individual.

### Funcionalidades Adicionais
- [x] **Tela de login fake:** Com proteção de rotas via Middleware do Next.js.
- [x] **Layout Responsivo:** Com menu hambúrguer para uma experiência otimizada em dispositivos móveis.
- [x] **Feedbacks de UI:** Toasts de sucesso/erro para ações do usuário e estados de carregamento.
- [x] **Testes Unitários e de Componentes:** Utilizando Jest e React Testing Library para garantir a qualidade do código.

---

## 🛠️ Tecnologias Utilizadas

- **Framework:** [Next.js](https://nextjs.org/) (com App Router)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **API:** [FakeStore API](https://fakestoreapi.com/)
- **Testes:** [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **Gerenciamento de Estado:** React Hooks (`useState`, `useEffect`) e Context API (para o sistema de Toasts).

---

## 🚀 Como Rodar o Projeto Localmente

Siga os passos abaixo para executar a aplicação em seu ambiente de desenvolvimento.

### Pré-requisitos
- [Node.js](https://nodejs.org/en/) (versão 18.x ou superior)
- [npm](https://www.npmjs.com/), [Yarn](https://yarnpkg.com/) ou [pnpm](https://pnpm.io/)

### Passos
1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/lucasbonadio/dev-frontend-nextjs](https://github.com/lucasbonadio/dev-frontend-nextjs)
   cd dev-frontend-nextjs
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Execute a aplicação em modo de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acesse no navegador:**
   Abra [http://localhost:3000](http://localhost:3000) para ver a aplicação rodando.

---

## 🧪 Rodando os Testes

Para executar os testes unitários e de componentes que foram criados, utilize o seguinte comando:
```bash
npm test
```
Para rodar em modo interativo (*watch mode*), que executa os testes novamente a cada alteração de arquivo:
```bash
npm run test:watch
```

---

## 🔑 Credenciais de Acesso

A aplicação utiliza um sistema de login fake para proteger as rotas. Utilize as credenciais abaixo para acessar a área de produtos:

- **Usuário:** `mor_2314`
- **Senha:** `83r5^_`

*Nota: Caso a API da FakeStore apresente instabilidade com este usuário, uma credencial alternativa é `johnd` com a senha `m38rmF`.*