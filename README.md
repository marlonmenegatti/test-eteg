# ETEG Monorepo

Monorepo com **API** (NestJS + Prisma) e **Web** (React + Vite + TanStack).

## Requisitos

- [Node.js](https://nodejs.org/) 22+
- [pnpm](https://pnpm.io/) 10+
- [Docker](https://www.docker.com/) (opcional, para banco de dados ou deploy)

## Configuração inicial

### 1. Instalar dependências

```bash
pnpm install
```

### 2. Subir o banco de dados

```bash
docker compose up -d postgres
```

### 3. Configurar variáveis de ambiente

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

**API** (`apps/api/.env`):

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/eteg"
```

**Web** (`apps/web/.env`):

```
VITE_API_URL=http://localhost:3030
```

### 4. Gerar o client do Prisma

```bash
pnpm prisma:generate
```

### 5. Executar as migrations

```bash
pnpm prisma:migrate
```

### 6. Popular o banco (seed)

```bash
pnpm prisma:seed
```

## Desenvolvimento

Iniciar a API e o frontend em modo de desenvolvimento:

```bash
pnpm dev:api
pnpm dev:web
```

- API: [http://localhost:3030](http://localhost:3030)
- Web: [http://localhost:3000](http://localhost:3000)

## Scripts disponíveis

| Comando | Descrição |
|---|---|
| `pnpm dev:api` | Inicia a API em modo desenvolvimento |
| `pnpm dev:web` | Inicia o frontend em modo desenvolvimento |
| `pnpm build:api` | Build de produção da API |
| `pnpm build:web` | Build de produção do frontend |
| `pnpm prisma:generate` | Gera o Prisma Client |
| `pnpm prisma:migrate` | Executa as migrations |
| `pnpm prisma:seed` | Popula o banco com dados iniciais |
| `pnpm prisma:studio` | Abre o Prisma Studio |
| `pnpm lint` | Verifica lint com Biome |
| `pnpm lint:fix` | Corrige problemas de lint |
| `pnpm format` | Formata o código com Biome |

## Docker (produção)

Build e execução de todos os serviços:

```bash
docker compose up --build
```

- API: [http://localhost:3030](http://localhost:3030)
- Web: [http://localhost:3000](http://localhost:3000)

## Estrutura do projeto

```
eteg-monorepo/
├── apps/
│   ├── api/          # NestJS + Prisma (PostgreSQL)
│   └── web/          # React + Vite + TanStack Router/Query
├── biome.json        # Configuração do linter/formatter
├── docker-compose.yml
├── Dockerfile.api
├── Dockerfile.web
└── package.json
```
# test-eteg
