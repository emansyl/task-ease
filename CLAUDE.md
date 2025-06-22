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

## Mobile App Architecture

### Navigation Structure
The mobile app uses **Expo Router** with stack navigation patterns:

- **Root Layout (`app/_layout.tsx`)**: Handles authentication routing and onboarding flow
- **Auth Flow (`app/(auth)/`)**: Sign-in and sign-up screens with Supabase authentication
- **Tab Navigation (`app/(tabs)/`)**: Main app interface with 4 tabs:
  - Dashboard: Overview of upcoming events and tasks due soon
  - Events: Stack navigator with list view and individual event details
  - Tasks: Stack navigator with list view and individual task details  
  - Emails: Stack navigator showing email processing status and extracted items
  - Settings: User profile and app configuration

### Key Features Implemented

#### Authentication & Onboarding
- **Supabase Integration**: Session management with `useAuth` hook
- **Onboarding Flow**: First-time user setup stored in local storage
- **Automatic Navigation**: Routes users based on auth state and onboarding completion
- **Welcome Email**: Automatically sent when user opens onboarding page with sample tasks/events
  - Email is CC'd to user's forwarding address for immediate AI processing
  - Creates actual tasks and events in user's dashboard automatically
  - User sees real-time status during onboarding process
- **Sample Email Testing**: On-demand sample emails for users to test the AI extraction

#### Email Processing Interface
- **Email List (`emails/index.tsx`)**: Shows all received emails with processing status
- **Status Indicators**: Visual badges for pending, processed, and error states
- **Extraction Counts**: Displays number of tasks and events extracted per email
- **Email Details (`emails/[id].tsx`)**: Full email content with navigation to extracted items

#### Task Management
- **Task List (`tasks/index.tsx`)**: Comprehensive task view with filtering and status management
- **Dynamic Routing (`tasks/[id].tsx`)**: Individual task details with edit capabilities
- **Status Management**: Complete, delete, and update task status inline
- **Priority System**: Visual urgency badges (high, medium, low)
- **Filtering**: By status (todo, in progress, complete) and priority level

#### Event Management  
- **Event List (`events/index.tsx`)**: Calendar view with date range filtering
- **Dynamic Routing (`events/[id].tsx`)**: Individual event details with calendar export
- **Calendar Integration**: Export to ICS format and Google Calendar
- **Time Formatting**: Smart date formatting (today, tomorrow, specific dates)

#### Dashboard
- **Quick Overview**: Upcoming events and tasks due soon
- **Navigation Links**: Direct access to individual tasks and events
- **Real-time Updates**: Refresh control and automatic data syncing

### Data Layer & API Integration

#### React Query Implementation
- **Custom Hooks (`hooks/useApi.ts`)**: Centralized API state management
- **Query Keys**: Organized caching strategy for events, tasks, emails
- **Mutations**: Create, update, delete operations with optimistic updates
- **Error Handling**: Comprehensive error states and retry mechanisms

#### API Types & Interfaces
- **TypeScript Models**: Task, Event, Email entities with full type safety
- **Status Enums**: Standardized status values across the application
- **Date Handling**: ISO string parsing with date-fns for formatting

### Authentication Flow
1. **Session Check**: App checks for existing Supabase session
2. **Onboarding Status**: Verifies if user has completed initial setup
3. **Route Logic**: 
   - No session → Sign-in screen
   - Session + no onboarding → Onboarding flow  
   - Session + onboarding → Dashboard (main app)

### Mobile-Specific Patterns
- **Stack Navigation**: Proper iOS/Android navigation with back buttons
- **Touch Interactions**: TouchableOpacity for all interactive elements
- **Loading States**: Skeleton loaders and activity indicators
- **Pull-to-Refresh**: Standard mobile refresh patterns
- **Modal Sheets**: Filter and action modals using React Native Modal
- **Platform Optimization**: Native feeling navigation and transitions

### Current File Structure
```
apps/mobile/
├── app/
│   ├── _layout.tsx              # Root layout with auth routing
│   ├── index.tsx                # Landing/redirect page
│   ├── (auth)/
│   │   ├── sign-in.tsx          # Login screen
│   │   └── sign-up.tsx          # Registration screen
│   ├── (tabs)/
│   │   ├── _layout.tsx          # Tab navigation layout
│   │   ├── dashboard.tsx        # Main dashboard
│   │   ├── events/
│   │   │   ├── _layout.tsx      # Events stack navigator
│   │   │   ├── index.tsx        # Events list
│   │   │   └── [id].tsx         # Individual event details
│   │   ├── tasks/
│   │   │   ├── _layout.tsx      # Tasks stack navigator
│   │   │   ├── index.tsx        # Tasks list
│   │   │   └── [id].tsx         # Individual task details
│   │   ├── emails/
│   │   │   ├── _layout.tsx      # Emails stack navigator
│   │   │   ├── index.tsx        # Emails list
│   │   │   └── [id].tsx         # Individual email details
│   │   └── settings.tsx         # Settings page
│   └── onboarding.tsx           # First-time user setup
├── hooks/
│   ├── useAuth.ts               # Authentication management
│   ├── useAuthActions.ts        # Auth action handlers
│   └── useApi.ts                # React Query API hooks
├── lib/
│   ├── api.ts                   # API client and types
│   ├── supabase.ts              # Supabase configuration
│   ├── storage.ts               # Local storage utilities
│   └── email.ts                 # Email formatting utilities
├── providers/
│   └── QueryProvider.tsx       # React Query provider
└── components/
    └── LoadingSkeleton.tsx      # Reusable loading component
```

### Features Status & Improvements Needed

#### ✅ Currently Implemented
- Complete authentication flow with Supabase
- Stack navigation for events, tasks, and emails
- Email processing status tracking
- Task management with priority and status filtering
- Event management with calendar export
- Dashboard overview with quick access
- Real-time data syncing with React Query
- Pull-to-refresh functionality
- Loading states and error handling
- **Automatic welcome emails** with sample tasks and events
  - Welcome emails are sent immediately when user opens onboarding page
  - Emails are automatically processed by AI to populate dashboard
  - Users see real-time status and immediate extraction results
- **Sample email testing** for immediate AI extraction demonstration
- **Professional email templates** using React Email components

#### 🚧 Areas for Enhancement
- **Push Notifications**: Real-time alerts for new emails and due tasks
- **Offline Capability**: Data caching for offline access
- **Search Functionality**: Global search across tasks, events, and emails
- **User Settings**: Email forwarding configuration and preferences
- **Task Creation**: Manual task creation from mobile app
- **Calendar Integration**: Native calendar sync beyond export
- **Triage Interface**: AI-suggested task approval/rejection workflow
- **Dark Mode**: Theme switching capability
- **Data Export**: Bulk export of tasks and events
- **Performance Optimization**: Image optimization and lazy loading

## Core Architecture

### Database Schema (Prisma)
The application uses PostgreSQL with the following main entities:
- **User** - Core user entity with email and forwarding email username
  - `forwardingemail` field stores only the username portion
  - Full address: `{username}@inbox.usetaskease.com` (production) or `{username}@inbox.dev.usetaskease.com` (development)
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

### Mobile Application
- `EXPO_PUBLIC_SUPABASE_URL` - Supabase project URL (same as web)
- `EXPO_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key (same as web)
- `EXPO_PUBLIC_API_URL` - Base URL for API requests to web application

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