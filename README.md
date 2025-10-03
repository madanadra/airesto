This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Architecture

Frontend: Next.js, React, TypeScript
Styling: TailwindCSS
Database: Supabase
ORM: Prisma

## n8n Workflow

Trigger: Webhook (Get image) -> Gemini-2.5-flash (OCR and LLM) -> JS Code (JSON Parser) -> Supabase (Create rows)

## Payment Gateway

Midtrans with Built-in Interface (Snap)