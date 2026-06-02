# frontend-robot

Next.js frontend for the **Atlas · Personalized Robot Learning Platform**.

Design: **Direction A — Editorial Warm** (cream + warm ink + terracotta,
serif display over modern sans).

## Quick start

```bash
npm install
cp .env.local.example .env.local   # edit if your backend isn't on :8000
npm run dev
```

Open <http://localhost:3000>.

## Pages

| Route        | Artboard | Description                                |
| ------------ | -------- | ------------------------------------------ |
| `/`          | A1       | Landing — hero + robot canvas              |
| `/login`     | A2       | Sign in — editorial split with role picker |
| `/dashboard` | A3       | Student dashboard — today's lesson, mastery, engagement, Ask Atlas |
| `/practice`  | A4       | Practice — adaptive question + hint panel  |
| `/tutor`     | A5       | AI tutor chat — conversations + thread     |

## Stack

- Next.js 14 (pages router) + TypeScript
- Inter (sans) · Instrument Serif (display) · JetBrains Mono (mono)
- Recharts for the engagement sparkline
- Axios + SWR for the API client (`lib/api.ts`)

## Environment

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

The token is stored under `localStorage["atlas_token"]` and attached as
`Authorization: Bearer …` to every outgoing request.

## Project layout

```
components/
  Nav.tsx        # marketing + app nav
  Robot.tsx      # editorial robot SVG
lib/
  api.ts         # axios instance + auth helpers
pages/
  _app.tsx
  _document.tsx
  index.tsx      # A1
  login.tsx      # A2
  dashboard.tsx  # A3
  practice.tsx   # A4
  tutor.tsx      # A5
styles/
  globals.css    # design tokens + base styles
```
