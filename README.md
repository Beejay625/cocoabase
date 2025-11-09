## Cocoa Chain – Plant, Track, and Grow

Cocoa Chain is a wallet-connected dashboard for planting, tracking, and visualising digital cocoa plantations. It runs on Next.js (App Router) with Tailwind CSS, Reown AppKit (WalletConnect), wagmi, Zustand, and Framer Motion.

## Prerequisites

- Node.js 18+
- npm 9+
- Reown (WalletConnect) Project ID – create one at [reown.com](https://reown.com/) and copy the **Project ID**

## Environment Setup

1. Copy `env.example` to `.env.local`:

   ```bash
   cp env.example .env.local
   ```

2. Replace the placeholder value with your Reown AppKit Project ID:

   ```bash
   NEXT_PUBLIC_PROJECT_ID=REPLACE_WITH_REOWN_PROJECT_ID
   ```

This variable enables WalletConnect/AppKit across the app. Without it, the dashboard will throw an error on boot.

## Install Dependencies

```bash
npm install
```

## Run the App

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000/) to see the dashboard.

The default landing page becomes the Cocoa Chain experience once the UI components are scaffolded (see project plan).

## Core Features

- Wallet login via Reown AppKit + WalletConnect (wagmi)
- Multi-wallet dashboard with watchlist, labels, and per-wallet filters
- Growth analytics hub with charts (Chart.js) and regional insights
- Plantation management: plant seeds, update stages, track notes
- Plantation task planner with due-date tracking and status transitions
- Sustainability analytics tracking tree coverage, land use, and carbon offsets
- Alerting engine for task deadlines, stage changes, and wallet activity (in-app, email, SMS stubs)
- On-chain sync simulator to visualise transaction lifecycle
- Social sharing panel for community updates

## Tech Stack

- Next.js 16 (App Router)
- Tailwind CSS v4 + custom Cocoa Chain theme
- Reown AppKit + wagmi + viem
- Zustand for state management
- Framer Motion for animated UI
- TanStack Query for Wallet/Web3 caching
- Chart.js + react-chartjs-2 for analytics visuals
- Local JSON + localStorage hydration for prototype data persistence

## Alerts

- Task deadlines are scanned every five minutes; alerts fire when a task is due in the next 24 hours or becomes overdue.
- Plantation stage changes and wallet activity (connect/disconnect, watchlist updates) publish alerts instantly.
- Delivery channels default to in-app + toast notifications, with stubbed email/SMS senders logging to the console (`src/lib/notifiers.ts`).
- Channel preferences and alert state live in `src/store/alerts.ts`. Hook up real providers by swapping the notifier implementations.

## Mock Data

- Source plantations live in `src/data/plantations.json`.
- State is persisted to `localStorage` via Zustand so dashboard changes survive reloads.
- Reset behaviour: clearing browser storage reverts to seed data.

## Scripts

- `npm run dev` – start the local dev server
- `npm run build` – build for production
- `npm run start` – run the compiled app
- `npm run lint` – run ESLint checks
