# Atlas — Personalized Learning Robot (Frontend)

Atlas is the web interface for the Personalized Robot learning platform. It gives
students an adaptive, AI-guided study space and gives teachers and administrators
the tools to manage content, follow progress and understand how the learning
model makes its decisions.

Built with **Next.js 13**, **React 18** and **TypeScript**, it talks to the
platform's FastAPI backend over the v1 REST API.

---

## Features

### Students
- **Personal dashboard** – progress summary, mastery overview and the next recommended skill.
- **Guided learning (`/learn`)** – tutor-led lessons with streaming answers, hints, Markdown and LaTeX math rendering.
- **Learn Anything (`/selflearn`)** – self-directed study sessions on any topic.
- **Adaptive practice** – questions picked by the knowledge-tracing model, with a session summary at the end.
- **Mastery tracking** – per-skill mastery estimates (DKT / BKT) shown as charts.
- **Study history** – a record of past sessions and interactions.
- **Study breaks** – short break activities (breathing exercise, 2048, memory match, flappy bird, rest video).

### Teachers
- **Class dashboard** and **student list** with a detailed page for each student.
- **Mastery heatmap** across students and skills.
- **AI decisions (explainability)** – shows why the model recommended what it did.
- **Skills, skill graph and questions** – create and edit content, including CSV import and a prerequisite graph view.
- **Knowledge base** and **analytics**.

### Administrators
- **Admin dashboard** and **user management**.
- **Hardware** and **voice** panels for the physical robot.
- Full access to skills, questions, knowledge base, history and analytics.

### Platform
- JWT authentication with role-based routing (`student`, `teacher`, `admin`).
- Session expiry handling, toast notifications and a responsive, mobile-friendly layout.
- Docker image for production deployment.

---

## Tech Stack

| Area            | Tools                                                   |
| --------------- | ------------------------------------------------------- |
| Framework       | Next.js 13 (Pages Router), React 18                     |
| Language        | TypeScript                                              |
| Data fetching   | Axios, SWR                                              |
| Charts          | Recharts                                                |
| Content         | react-markdown, remark-gfm, remark-math, rehype-katex   |
| Styling         | Global CSS (`styles/globals.css`), Kodchasan font        |
| Deployment      | Docker (multi-stage, Node 18 Alpine)                    |

---

## Getting Started

### Prerequisites
- Node.js 18 or newer
- npm
- A running instance of the backend API

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example file and edit it:

```bash
cp .env.local.example .env.local
```

On Windows PowerShell:

```powershell
Copy-Item .env.local.example .env.local
```

| Variable                      | Required | Description                                                                 |
| ----------------------------- | -------- | --------------------------------------------------------------------------- |
| `NEXT_PUBLIC_API_BASE_URL`    | Yes      | Base URL of the backend API, e.g. `http://localhost:8000` for local work.   |
| `NEXT_PUBLIC_YOUTUBE_API_KEY` | No       | YouTube Data API v3 key used for search in the study-break rest video.      |

> `NEXT_PUBLIC_*` values are bundled into the browser code, so never put private
> secrets in them. Restrict the YouTube key by HTTP referrer.

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Production build

```bash
npm run build
```

```bash
npm start
```

---

## Running with Docker

```bash
docker build --build-arg NEXT_PUBLIC_API_BASE_URL=http://localhost:8000 -t atlas-frontend .
```

```bash
docker run -p 3000:3000 atlas-frontend
```

`NEXT_PUBLIC_*` variables are read at build time, so pass them as `--build-arg`
values rather than runtime environment variables.

---

## Project Structure

```
frontend-robot/
├── components/          Shared UI (layout, navigation, skill graph, toasts, study breaks…)
│   └── StudyBreak/      Break activities and the study-break modal
├── docs/                API binding plan and implementation tracker
├── lib/
│   ├── api.ts           API client for the backend v1 endpoints
│   ├── teacher-api.ts   Teacher-specific API calls
│   ├── session.ts       Token storage, current user and role helpers
│   ├── speech.ts        Browser speech recognition / synthesis helpers
│   └── graphLayout.ts   Layout logic for the skill graph
├── pages/
│   ├── dashboard/       Student, teacher and admin dashboards, user management
│   ├── teacher/         Students, heatmap and explainability views
│   ├── skills/          Skill graph
│   └── *.tsx            Learn, practice, mastery, tutor, knowledge, analytics…
├── public/              Static assets
├── styles/globals.css   Application styles
└── Dockerfile
```

---

## Pages by Role

| Role    | Main pages                                                                                                   |
| ------- | ------------------------------------------------------------------------------------------------------------ |
| Student | `/dashboard/student`, `/learn`, `/selflearn`, `/mastery`, `/history`                                          |
| Teacher | `/dashboard/teacher`, `/teacher/students`, `/teacher/heatmap`, `/teacher/explainability`, `/skills`, `/skills/graph`, `/questions`, `/knowledge`, `/history`, `/analytics` |
| Admin   | `/dashboard/admin`, `/dashboard/users`, `/skills`, `/skills/graph`, `/questions`, `/history`, `/hardware`, `/voice`, `/knowledge`, `/analytics` |
| Public  | `/`, `/login`, `/register`, `/about`, `/contact`                                                              |

---

## Documentation

- [Docs index](docs/README.md)
- [API binding plan](docs/API_BINDING_PLAN.md) – which backend endpoints each page uses
- [Implementation tracker](docs/IMPLEMENTATION_TRACKER.md) – status of frontend work
- [Implementation plan](IMPLEMENTATION_PLAN.md)

---

## Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the development server         |
| `npm run build` | Create an optimized production build |
| `npm start`     | Serve the production build on port 3000 |
