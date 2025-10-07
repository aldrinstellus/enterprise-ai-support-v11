# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Enterprise AI Support V11** - A Claude-style AI assistant interface with multi-persona support, intelligent widget rendering, and real-time conversation management. This is an advanced development branch forked from V6, ready for cutting-edge feature development and experimentation.

**Version**: 11.0.0 (forked from V6 6.0.0)
**Port**: 3011
**Status**: Advanced Development branch - Experimental features

## Application URLs

**IMPORTANT**: Always use the `/demo/` routes - these are the main application pages.

**Development Server**: http://localhost:3011

**Demo Pages** (Main Application):
- **C-Level Executive**: http://localhost:3011/demo/c-level
- **CS Manager**: http://localhost:3011/demo/cs-manager
- **Support Agent**: http://localhost:3011/demo/support-agent

**Note**: The root URL (http://localhost:3011) may redirect or show a landing page. All functionality is in the `/demo/` routes.

## Development Commands

### Core Development
```bash
npm run dev              # Start Next.js dev server with Turbopack (port 3011)
npm run dev:full         # Start both frontend and mock WebSocket server
npm run dev:ws           # Start mock WebSocket server only
npm run build            # Production build with Turbopack
npm run start            # Start production server (port 3011)
```

### Code Quality
```bash
npm run type-check       # TypeScript validation (run before commits)
npm run lint             # ESLint validation
```

### Database Operations
```bash
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema changes to database (development)
npm run db:migrate       # Create and run migrations (production)
npm run db:studio        # Open Prisma Studio for database management
```

## Technology Stack

- **Framework**: Next.js 15 with App Router and Turbopack
- **Language**: TypeScript (strict mode)
- **Frontend**: React 19 with client components
- **Database**: Prisma ORM with PostgreSQL
- **Styling**: Tailwind CSS 4 with Solar Dusk theme
- **Animations**: Framer Motion (motion/react)
- **AI Integration**: Anthropic Claude SDK (@anthropic-ai/sdk)
- **Icons**: Lucide React
- **Charts**: Recharts

## Architecture Overview

### Two-State Interface Design

The app features a unique two-state UI pattern:

1. **Empty State** (first load): Centered hero text ("AI that *actually* gets work done") with centered input
2. **Active State** (after first message): Input transitions to bottom-fixed position with 600ms smooth animation

Both states use Framer Motion for 60fps transitions.

### Persona System

The application supports 4 distinct personas with role-based interfaces:

- **Admin**: Full system access, cross-persona demo scenarios
- **C-Level Executive**: High-level metrics, executive summaries
- **CS Manager**: Team performance, workload distribution, SLA monitoring
- **Support Agent**: Ticket details, knowledge base, customer interactions

Each persona has:
- Unique badge colors and icons
- 5-9 Quick Actions tailored to their role
- Persona-specific query detection and widget rendering
- Theme customization with Solar Dusk color variants

### Widget System

The app uses a sophisticated widget rendering system based on query detection:

**Widget Types**: 19 specialized widgets including:
- Executive Summary, Agent Performance Stats, Team Workload Dashboard
- Ticket Detail, Similar Tickets Analysis, Ticket List
- Customer Risk Profile, Customer Risk List
- Knowledge Article, Knowledge Base Search
- Response Composer, Message Composer, Call Prep Notes
- SLA Performance Chart, Agent Performance Comparison
- Meeting Scheduler, Agent Dashboard

**Query Detection** (`/src/lib/query-detection.ts`):
- Pattern matching against user queries
- Persona-aware widget selection
- Priority-based widget rendering
- Returns appropriate widget type and context

### Database Schema

Comprehensive PostgreSQL schema with 15+ models including:
- **Users**: Role-based access (C_LEVEL, CS_MANAGER, SUPPORT_AGENT)
- **Tickets**: Full lifecycle tracking with SLA monitoring
- **Customers**: Tier-based management with risk scoring
- **AgentMetrics**: Performance tracking and workload management
- **Activities**: Audit logging for all ticket actions
- **Notifications**: Real-time alerts with priority levels

See `prisma/schema.prisma` for complete schema.

### API Routes

**Claude AI Integration** (`/src/app/api/chat/route.ts`):
- Streaming responses with Server-Sent Events (SSE)
- Tool calling for mock services (Zoho CRM, Desk, Slack, Calendar)
- Uses `claude-3-5-sonnet-20241022` model
- Requires `ANTHROPIC_API_KEY` in `.env.local`

### Component Architecture

```
src/
├── app/
│   ├── page.tsx              # Main chat interface with persona switcher
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Solar Dusk theme + custom CSS variables
│   ├── api/chat/route.ts     # Claude SDK integration
│   └── workflows/page.tsx    # Workflow management page
├── components/
│   ├── widgets/              # 19 specialized widget components
│   │   ├── WidgetRenderer.tsx       # Dynamic widget loader
│   │   └── WidgetSkeleton.tsx       # Loading states
│   ├── ui/
│   │   └── glowing-effect.tsx       # Mouse-following border effect
│   └── animated-background.tsx
├── types/
│   ├── persona.ts            # Persona type definitions
│   ├── widget.ts             # Widget type definitions
│   └── workflow.ts           # Workflow type definitions
├── hooks/
│   └── use-persona.ts        # Persona context provider
├── lib/
│   └── query-detection.ts    # Intelligent query parsing
└── data/
    └── demo-widget-data.ts   # Mock data for widgets
```

## Key Features

### Conversation Management
- Create, rename, pin, archive conversations
- Export as Text or JSON
- Share link generation
- Recent conversations (last 10)
- Persona-specific conversation history
- LocalStorage persistence

### Message Actions
- Typewriter streaming effect (200 chars/sec)
- Copy to clipboard with visual feedback
- Regenerate response
- Like/Dislike feedback
- Relative timestamps
- Save queries to favorites

### Real-Time Features
- Mock WebSocket server on port 3001 (for demo)
- Real-time streaming from Claude API
- Typing indicators during AI response generation

## Development Guidelines

### TypeScript Configuration
- **Strict mode enabled**: All code must be fully typed
- **Path alias**: `@/*` maps to `src/*`
- **Target**: ES2017
- Run `npm run type-check` before all commits

### Solar Dusk Theme
Warm, professional color scheme defined in `src/app/globals.css`:
- Primary: `hsl(25.96 90.48% 47.06%)` (warm orange)
- Background: `hsl(20 14% 8%)`
- Cards: `hsl(20 14% 10%)`
- Border: `hsl(20 15% 20%)`

### Adding New Widgets

1. Create widget component in `src/components/widgets/`
2. Define widget type in `src/types/widget.ts`
3. Add query patterns to `src/lib/query-detection.ts`
4. Import in `WidgetRenderer.tsx`
5. Add demo data to `src/data/demo-widget-data.ts`

### Adding New Personas

1. Define persona in persona configuration
2. Add Quick Actions specific to role
3. Configure badge color and icon
4. Add persona-specific query patterns to detection system

## Environment Variables

Required in `.env.local`:

```bash
# Claude AI (optional - app works with mock data if not provided)
ANTHROPIC_API_KEY=sk-ant-api03-...

# Database (optional - for Prisma features)
DATABASE_URL=postgresql://...

# WebSocket (optional - for real-time features)
NEXT_PUBLIC_WS_URL=ws://localhost:3001
```

## Important Notes

- **Demo Mode**: The app works fully without API keys using mock data
- **Claude SDK**: Real AI responses available when `ANTHROPIC_API_KEY` is configured (see CLAUDE-SDK-SETUP.md)
- **Database**: Prisma schema defined but database connection optional for demo
- **Port 3011**: Chosen to avoid conflicts with other project versions
- **No Backend**: All state managed in localStorage for demo purposes
- **Turbopack**: Next.js 15 uses Turbopack by default for fast builds (<1s)

## Testing Queries

Try these persona-specific queries:

**C-Level**:
- "Show me executive summary"
- "What's our team's performance?"

**CS Manager**:
- "Show team workload dashboard"
- "Compare agent performance"
- "Check SLA compliance"

**Support Agent**:
- "Show ticket TICK-001"
- "Find similar tickets"
- "Draft response for angry customer"
- "Search knowledge base for password reset"

## Documentation

- **README.md** - Project overview and features
- **QUICK-START.md** - 5-minute setup guide
- **PROJECT-STATUS.md** - Current status and roadmap
- **CLAUDE-SDK-SETUP.md** - Claude AI integration guide
- **SUMMARY.md** - Comprehensive technical summary
- **DOCS-INDEX.md** - Documentation navigation
- **CHANGELOG.md** - Version history

## Project Context

This is V11, forked from V6 for advanced feature development:
- **V1/V2**: Traditional support ticket dashboard
- **V3**: Claude-style AI chat interface with SDK integration
- **V4**: Added multi-persona system, intelligent widget rendering, conversation management (STABLE)
- **V6**: New features development branch (forked from V4)
- **V11**: Advanced experimental branch (forked from V6) - Cutting-edge features

The focus is on demonstrating how an AI assistant interface can adapt to different user roles and intelligently render contextual information based on natural language queries. V11 is the advanced experimental branch for testing next-generation features.
