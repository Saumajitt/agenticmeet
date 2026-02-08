<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/OpenAI-GPT--4o-412991?style=for-the-badge&logo=openai" alt="OpenAI" />
</p>

<h1 align="center">🤖 AgenticMeet</h1>

<p align="center">
  <strong>AI-Powered Virtual Meeting Platform with Intelligent Agents</strong>
</p>

<p align="center">
  <em>Create AI agents that can join your meetings, conduct interviews, take notes, and automatically generate summaries.</em>
</p>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎯 **AI-Powered Agents**
Create custom AI agents with personalized instructions that can participate in your meetings, conduct interviews, and interact with participants in real-time.

</td>
<td width="50%">

### 🎥 **Real-Time Video Meetings**
High-quality video conferencing powered by Stream.io with seamless WebRTC integration, screen sharing, and real-time chat.

</td>
</tr>
<tr>
<td width="50%">

### 📝 **Smart Transcription**
Automatic meeting transcription with speaker identification, perfect for review and record-keeping.

</td>
<td width="50%">

### 🧠 **AI Summaries**
GPT-4o powered meeting summarization that generates structured overviews, key points, and action items.

</td>
</tr>
<tr>
<td width="50%">

### 🔐 **Secure Authentication**
Multiple OAuth providers (GitHub, Google) with Better Auth for a seamless and secure login experience.

</td>
<td width="50%">

### 💎 **Premium Features**
Polar.sh integration for subscription management and premium tier access.

</td>
</tr>
</table>

---

## 🏗️ Architecture

```mermaid
graph TB
    subgraph Client["🖥️ Client Layer"]
        UI[React 19 + Next.js 15]
        Stream[Stream Video SDK]
    end
    
    subgraph API["⚡ API Layer"]
        tRPC[tRPC Server]
        Auth[Better Auth]
    end
    
    subgraph Services["🔧 Services"]
        Inngest[Inngest Functions]
        OpenAI[OpenAI GPT-4o]
    end
    
    subgraph Data["💾 Data Layer"]
        Neon[(Neon PostgreSQL)]
        Drizzle[Drizzle ORM]
    end
    
    UI --> tRPC
    UI --> Stream
    tRPC --> Drizzle
    Drizzle --> Neon
    tRPC --> Inngest
    Inngest --> OpenAI
    Auth --> Neon
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ 
- **npm** or **pnpm**
- **PostgreSQL** database (we recommend [Neon](https://neon.tech))
- API keys for: **Stream.io**, **OpenAI**, **Polar** (optional)

### 1️⃣ Clone & Install

```bash
git clone https://github.com/Saumajitt/agenticmeet.git
cd agenticmeet
npm install
```

### 2️⃣ Environment Setup

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@host/database"

# Authentication
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="http://localhost:3000"

# OAuth Providers
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Stream.io (Video & Chat)
NEXT_PUBLIC_STREAM_VIDEO_API_KEY="your-stream-api-key"
STREAM_VIDEO_SECRET_KEY="your-stream-secret"
NEXT_PUBLIC_STREAM_CHAT_API_KEY="your-stream-chat-key"
STREAM_CHAT_SECRET_KEY="your-stream-chat-secret"

# OpenAI
OPENAI_API_KEY="your-openai-api-key"

# Polar (Payments - Optional)
POLAR_ACCESS_TOKEN="your-polar-token"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3️⃣ Database Setup

```bash
# Push schema to database
npm run db:push

# Open Drizzle Studio (optional - database GUI)
npm run db:studio
```

### 4️⃣ Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app! 🎉

---

## 📁 Project Structure

```
agenticmeet/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication pages
│   │   ├── (dashboard)/       # Dashboard & main app
│   │   │   ├── agents/        # AI agent management
│   │   │   ├── meetings/      # Meeting management
│   │   │   └── upgrade/       # Premium upgrade page
│   │   ├── api/               # API routes
│   │   └── call/              # Video call interface
│   │
│   ├── components/            # Reusable UI components
│   │   └── ui/                # shadcn/ui components
│   │
│   ├── db/                    # Database configuration
│   │   ├── index.ts           # Database connection
│   │   └── schema.ts          # Drizzle ORM schema
│   │
│   ├── inngest/               # Background job processing
│   │   ├── client.ts          # Inngest client
│   │   └── functions.ts       # AI summarization functions
│   │
│   ├── lib/                   # Utility libraries
│   │   ├── auth.ts            # Authentication config
│   │   ├── stream-video.ts    # Stream Video client
│   │   ├── stream-chat.ts     # Stream Chat client
│   │   └── polar.ts           # Polar payments
│   │
│   ├── modules/               # Feature modules
│   │   ├── agents/            # AI agents feature
│   │   ├── meetings/          # Meetings feature
│   │   ├── dashboard/         # Dashboard feature
│   │   ├── premium/           # Premium subscriptions
│   │   └── auth/              # Auth components
│   │
│   └── trpc/                  # tRPC configuration
│       ├── routers/           # API routers
│       ├── client.tsx         # React client
│       └── server.tsx         # Server utilities
│
├── public/                    # Static assets
├── drizzle.config.ts         # Drizzle configuration
└── package.json              # Dependencies & scripts
```

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript 5 |
| **UI Library** | React 19 |
| **Styling** | Tailwind CSS 4 |
| **Components** | shadcn/ui + Radix UI |
| **State Management** | TanStack Query + nuqs |
| **API** | tRPC v11 |
| **Database** | PostgreSQL (Neon) |
| **ORM** | Drizzle ORM |
| **Authentication** | Better Auth + OAuth |
| **Video/Chat** | Stream.io SDK |
| **AI/ML** | OpenAI GPT-4o |
| **Background Jobs** | Inngest |
| **Payments** | Polar.sh |
| **Forms** | React Hook Form + Zod |

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Push schema to database |
| `npm run db:studio` | Open Drizzle Studio |

---

## 🗄️ Database Schema

The app uses the following core tables:

```
┌─────────────────┐     ┌─────────────────┐
│      user       │     │     agents      │
├─────────────────┤     ├─────────────────┤
│ id              │◄────│ userId          │
│ name            │     │ name            │
│ email           │     │ instructions    │
│ image           │     │ createdAt       │
│ emailVerified   │     │ updatedAt       │
│ createdAt       │     └─────────────────┘
│ updatedAt       │              │
└─────────────────┘              │
        │                        │
        │                        ▼
        │              ┌─────────────────┐
        │              │    meetings     │
        │              ├─────────────────┤
        └──────────────│ userId          │
                       │ agentId         │
                       │ name            │
                       │ status          │
                       │ transcriptUrl   │
                       │ recordingUrl    │
                       │ summary         │
                       │ startedAt       │
                       │ endedAt         │
                       └─────────────────┘
```

**Meeting Statuses:** `upcoming` → `active` → `processing` → `completed`

---

## 🔄 Meeting Processing Flow

```mermaid
sequenceDiagram
    participant User
    participant App
    participant Stream
    participant Inngest
    participant OpenAI
    
    User->>App: Create Meeting with Agent
    App->>Stream: Initialize Call
    User->>Stream: Join Meeting
    Stream->>Stream: Record & Transcribe
    User->>Stream: End Meeting
    Stream->>App: Webhook (Meeting Ended)
    App->>Inngest: Trigger Processing
    Inngest->>Inngest: Fetch Transcript
    Inngest->>Inngest: Add Speaker Names
    Inngest->>OpenAI: Generate Summary
    OpenAI-->>Inngest: AI Summary
    Inngest->>App: Update Meeting Record
    User->>App: View Summary
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/Saumajitt">Saumajit</a>
</p>
