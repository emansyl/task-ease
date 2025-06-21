# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

TaskEase is a monorepo containing both web and mobile applications that help users manage tasks by automatically processing emails to extract actionable information.

### Applications

- `apps/web/` - Next.js web application with Supabase auth and Prisma ORM
- `apps/mobile/` - Expo React Native mobile application

## Development Commands

### Root Level
```bash
npm run dev:web                    # Start web development server
```

### Web Application (`apps/web/`)
```bash
npm run dev                        # Start Next.js development server (localhost:3000)
npm run build                      # Build for production
npm run start                      # Start production server
npm run postinstall               # Generate Prisma client (runs automatically)
```

### Mobile Application (`apps/mobile/`)
```bash
npm start                         # Start Expo development server
npx expo start                    # Alternative start command
npm run android                   # Start Android emulator
npm run ios                       # Start iOS simulator
npm run web                       # Start web version
npm run lint                      # Run ESLint
npm run reset-project            # Reset to blank project template
```

## Core Architecture

### Database Schema (Prisma)
The application uses PostgreSQL with the following main entities:
- **User** - Core user entity with email and forwarding email address
- **Email** - Processed emails with AI-extracted content
- **Task** - Actionable items extracted from emails
- **Event** - Calendar events extracted from emails
- **KeyInformation** - Important non-actionable information
- **LinkOrAttachment** - URLs and file references related to tasks/events
- **TaskLog** - Processing logs for debugging AI extraction

Generated Prisma client is output to `apps/web/app/generated/prisma/`.

### AI Processing Pipeline
The core AI functionality is in `apps/web/lib/ai.ts`:
- Uses OpenAI GPT-4 to extract structured data from email content
- Categorizes emails into predefined categories (Academic/Classes, Clubs & Extracurriculars, etc.)
- Extracts tasks with due dates, urgency levels, and descriptions
- Identifies calendar events with proper time parsing
- Processes forwarded emails by focusing on original message content

### Authentication & Data Layer
- **Supabase** for authentication and real-time subscriptions
- **Prisma** for database ORM with PostgreSQL
- Server Actions for form handling and data mutations
- Middleware for session management across routes

### Email Processing
Email processing occurs via:
- Inbound email webhook at `apps/web/app/api/inbound-email/route.ts`
- SendGrid integration for email forwarding
- AI extraction pipeline that processes forwarded emails into structured data

### UI Components
- **shadcn/ui** component library with Radix UI primitives
- **Tailwind CSS** for styling
- **Next.js App Router** with TypeScript
- Custom components organized by feature (dashboard, tasks, events, email-digest)

## Key Configuration Files

- `apps/web/prisma/schema.prisma` - Database schema
- `apps/web/components.json` - shadcn/ui configuration
- `apps/web/tailwind.config.ts` - Tailwind CSS configuration
- `apps/mobile/app.json` - Expo configuration

## Environment Variables Required

### Web Application
- `DATABASE_URL` - PostgreSQL connection string
- `DIRECT_URL` - Direct database connection for migrations
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `OPENAI_API_KEY` - OpenAI API key for email processing
- `SENDGRID_API_KEY` - SendGrid API key for email forwarding

## Database Migrations

Run database migrations:
```bash
cd apps/web
npx prisma migrate dev        # Run migrations in development
npx prisma generate          # Regenerate Prisma client
npx prisma db push           # Push schema changes to database
```

## Testing Strategy

The codebase does not currently have explicit test commands configured. When adding tests, follow the existing TypeScript and React patterns established in the components.