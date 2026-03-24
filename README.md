## <a name="introduction">💰 Introdução</a>

**Poupa+** é um dashboard de gestão financeira pessoal moderno e intuitivo, desenvolvido para usuários que desejam organizar suas finanças, acompanhar receitas e despesas e ter uma visão clara da sua saúde financeira em tempo real.

O projeto foi pensado como uma solução centralizada para que qualquer pessoa possa **registrar transações, categorizar movimentações e visualizar gráficos interativos** com dados do mês atual, mês anterior ou do ano inteiro — tudo em uma interface limpa e responsiva.

A aplicação prioriza **segurança (multi-usuário), organização de código e performance**, utilizando o que há de mais moderno no ecossistema Next.js com integração nativa a banco de dados Serverless e ORM tipado.

🔗 [Acesse o projeto aqui](https://poupamais-five.vercel.app/)

---

## <a name="tech-stack">⚙️ Tecnologias</a>

- **Next.js** – Framework React com App Router para renderização híbrida e alta performance.
- **TypeScript** – Tipagem estática para um desenvolvimento seguro e livre de bugs comuns.
- **Tailwind CSS** – Estilização utilitária focada em interfaces modernas e responsivas.
- **ShadCN** – Componentes acessíveis e customizáveis para uma UI consistente.
- **Neon PostgreSQL** – Banco de dados relacional serverless para armazenamento escalável.
- **Neon Auth** – Sistema de autenticação robusto para isolamento de dados por usuário.
- **Prisma** – ORM moderno para acesso seguro e tipado ao banco de dados.

---

## <a name="features">🚀 Funcionalidades</a>

👉 **Isolamento de Dados (Multi-tenant):**
Cada usuário possui seus próprios dados privados. Transações e categorias são visíveis apenas para você.

👉 **Criação de Transações:**
Registre Créditos e Débitos de forma rápida, com nome, valor, categoria e data. O saldo é atualizado em tempo real.

👉 **Painel de Overview:**
Tela principal com visão geral das movimentações, saldo consolidado e agrupamento por categorias — tudo atualizado instantaneamente.

👉 **Gráfico Financeiro Interativo:**
Visualize seus dados financeiros por mês atual, mês anterior ou visão anual completa para entender sua evolução ao longo do tempo.

👉 **Tela de Transações:**
Tabela completa com busca textual e filtros avançados para localizar transações específicas com facilidade. Também permite excluir registros.

👉 **Gerenciamento de Categorias e Moeda:**
Na tela de Gerenciar, o usuário pode definir sua moeda padrão e administrar as categorias personalizadas criadas ao longo do uso.

👉 **Design Responsivo:**
Totalmente adaptado para diferentes tamanhos de tela, do desktop ao mobile.

---

## <a name="architecture">🧠 Arquitetura e Boas Práticas</a>

- **Estrutura Modular:** Separação clara entre camadas de dados, lógica de negócio e componentes de interface.
- **Server-First:** Prioridade para Server Components, reduzindo o envio de JavaScript desnecessário ao cliente.
- **ORM Tipado com Prisma:** Consultas seguras com tipagem automática gerada a partir do schema do banco.
- **Segurança de Sessão:** Verificação de autenticação em todas as rotas protegidas e operações de escrita.

---

## <a name="screens">🖥️ Telas da Aplicação</a>

| Tela | Descrição |
|------|-----------|
| **Painel** | Overview com saldo em tempo real, criação de transações e agrupamento por categorias |
| **Transações** | Tabela completa com busca, filtros e exclusão de registros |
| **Gerenciar** | Configuração de moeda padrão e gerenciamento de categorias |

---

## <a name="use-cases">🏢 Casos de Uso</a>

- **Controle Pessoal:** Organize receitas e despesas do dia a dia com clareza.
- **Planejamento Mensal:** Acompanhe seus gastos por categoria e tome decisões mais conscientes.
- **Visão Anual:** Identifique padrões financeiros ao longo dos meses com o gráfico anual.
- **Organização por Categorias:** Crie categorias personalizadas para refletir sua realidade financeira.

---

## <a name="quick-start">⚡ Executando o Projeto</a>

Siga os passos abaixo para rodar o projeto localmente.

### Pré-requisitos

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)

### Clonando o repositório

```bash
git clone https://github.com/O-Gui-Carvalho/PoupaMais.git
cd poupa-mais
```

### Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto com suas credenciais:

```bash
DATABASE_URL=seu_link_do_neon
NEON_AUTH_BASE_URL=seu_link_de_auth
NEON_AUTH_COOKIE_SECRET=sua_chave_secreta
```

### Instalando dependências

```bash
npm install
```

### Sincronizando o banco de dados

Execute as migrations do Prisma para criar as tabelas necessárias:

```bash
npx prisma migrate dev
```

### Executando em ambiente de desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para visualizar o projeto.
