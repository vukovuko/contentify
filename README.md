# WikiMasters

A wiki app built with Next.js 16.

## Setup

```bash
npm install
cp .env.example .env  # Add your keys
npm run dev
```

## Environment Variables

```env
DATABASE_URL=                              # Neon PostgreSQL
NEXT_PUBLIC_STACK_PROJECT_ID=              # Neon Auth
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=  # Neon Auth
STACK_SECRET_SERVER_KEY=                   # Neon Auth
```

## Stack

- Next.js 16 + React 19
- Neon PostgreSQL + Drizzle ORM
- Neon Auth (Stack Auth)
- Tailwind CSS v4
- Vercel hosting
