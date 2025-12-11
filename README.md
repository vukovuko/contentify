# WikiMasters

A modern, full-stack wiki application built with Next.js 16 and React 19. Create, edit, and share knowledge with your community.

## Features

- **Markdown Editor** - Rich editing experience with live preview using MDEditor
- **AI Summaries** - Automatic article summaries generated on save
- **File Uploads** - Attach images and files to articles via Vercel Blob
- **Pageview Tracking** - Redis-powered analytics with milestone celebration emails
- **Authentication** - Secure user auth via Neon Auth (Stack Auth)
- **Caching** - Fast page loads with Upstash Redis caching
- **Responsive Design** - Clean UI with shadcn/ui components

## Setup

```bash
npm install
cp .env.example .env  # Add your keys
npm run dev
```

## Tech Stack

Next.js 16 / React 19 / Tailwind v4 / Neon PostgreSQL / Drizzle ORM / Upstash Redis / Vercel Blob / Resend / Vercel AI SDK
