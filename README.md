## Cocoa Chain – Plant, Track, and Grow

A comprehensive wallet-connected dashboard for managing cocoa plantations with blockchain integration, advanced analytics, and community features.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment:**
   ```bash
   cp env.example .env.local
   # Add your Reown Project ID: NEXT_PUBLIC_PROJECT_ID=your_project_id
   ```

3. **Run the app:**
   ```bash
   npm run dev
   ```

Visit [http://localhost:3000](http://localhost:3000/) and connect your wallet to get started.

## Core Features

### Plantation Management
- **Plantation Lifecycle:** Plant seeds, track growth stages (planted → growing → harvested)
- **Health Scoring:** Automated health scores based on tasks, updates, yield, and collaborators
- **Task Management:** Kanban board, recurring tasks, and stage-triggered templates
- **Yield Tracking:** Timeline logging with photo attachments and checkpoints
- **Bulk Operations:** Bulk stage updates, selection, and batch processing
- **Favorites System:** Star plantations with localStorage persistence and spotlight dashboard
- **Advanced Filtering:** Search by name, location, stage, date range, carbon, trees, and more
- **View Modes:** Grid and list views with customizable layouts
- **Comparison Mode:** Compare up to 3 plantations side-by-side

### Analytics & Reporting
- **Dashboard Metrics:** Real-time metrics with animated counters and trend indicators
- **Statistics Summary:** Comprehensive statistics with stage distribution and engagement metrics
- **Regional Insights:** Geo-insights with heat layers and regional breakdowns
- **Yield Forecasting:** Scenario projections (best/base/worst) with confidence levels
- **Wallet Performance:** Comparative reports across multiple wallets
- **Cohort Analytics:** Harvest analytics grouped by planting cohorts
- **Data Export:** PDF/CSV export with customizable sections (overview, forecasts, wallet, sustainability, alerts)
- **Alert Intelligence:** Smart alert dashboard with insights and recommendations

### Operations & Workflow
- **Operations Calendar:** Merged view of task deadlines, stage changes, and forecast harvests
- **Task Kanban Board:** Drag & drop with swimlanes and status transitions
- **Recurring Tasks:** Scheduler with templates and automated generation
- **Stage Automation:** Stage-triggered task creation and assignment
- **Quick Actions:** Expandable action buttons for common operations
- **Keyboard Shortcuts:** ⌘K for search, ⌘N for new plantation, ⌘? for help

### Community & Collaboration
- **Help Requests:** System with categories, priorities, and status tracking
- **Collaboration Hub:** Team management with collaborator insights
- **Shared Notes:** Collaborative editing with tags and attachments
- **Community Support:** Complaint tracking and resolution workflow
- **Loan Pipeline:** Cooperative loan requests with status tracking
- **Receipt Management:** Finance receipts ledger with upload and history

### Alerts & Notifications
- **Multi-Channel:** In-app, email, and SMS notifications (stubs)
- **Smart Monitoring:** Task deadline scanning, stage change detection, wallet activity tracking
- **Notification Preferences:** Customizable channel preferences per alert type
- **Alert Insights:** AI-powered recommendations and insights panel

### User Experience
- **Global Search:** ⌘K across plantations, tasks, and requests with highlighting
- **Advanced Filters:** Stage, location, date range, carbon, trees, and boolean filters
- **Performance Monitoring:** Built-in performance tracking and optimization
- **Error Handling:** Centralized error tracking with recovery mechanisms
- **Loading States:** Skeleton loaders and animated spinners
- **Tooltips:** Contextual help with position-aware tooltips
- **Responsive Design:** Mobile-first design with adaptive layouts

## Utility Libraries

### Plantation Utilities (`src/lib/plantation-utils.ts`)
- Health score calculation
- Age and update tracking
- Urgent task detection
- Stage ETA calculations
- Plantation comparison and sorting
- Insight generation

### Date & Time Utilities (`src/lib/date-utils.ts`)
- Relative time formatting ("2 hours ago")
- Deadline calculations with overdue detection
- Date range helpers (start/end of day/week/month)
- Time-until calculations
- Date validation and formatting

### Formatting Utilities (`src/lib/format-utils.ts`)
- Number formatting (compact notation, currency, percentage)
- Carbon offset, area, and yield formatting
- Address truncation and masking
- List formatting
- Progress/health color helpers

### Statistics Utilities (`src/lib/statistics.ts`)
- Comprehensive statistics calculation
- Trend analysis
- Percentile calculations
- Correlation analysis
- Moving averages
- Variance and standard deviation
- Outlier detection
- Growth rate calculations

### Search Utilities (`src/lib/search-utils.ts`)
- Advanced filtering with multiple criteria
- Text highlighting for search results
- Relevance ranking
- Autocomplete suggestions

### Validation Utilities (`src/lib/validation.ts`)
- Email, wallet address, URL validation
- Number validation with min/max
- Date validation with ranges
- Coordinate validation
- Combined validation helpers

### Storage Utilities (`src/lib/storage-utils.ts`)
- StorageManager class with TTL support
- Prefixed keys for organization
- Expired item cleanup
- Storage usage tracking

### Chart Utilities (`src/lib/chart-utils.ts`)
- Color palette generation
- Data normalization
- Chart statistics (min, max, average, median)
- Label formatting
- Time series data creation
- Trend line calculation
- Data smoothing and anomaly detection

### Export Utilities (`src/lib/export-utils.ts`)
- CSV, JSON, XLSX export
- Table export from HTML
- Image export using html2canvas
- Data preparation helpers

### Performance Utilities (`src/lib/performance-utils.ts`)
- PerformanceMonitor class
- Async/sync measurement helpers
- Debounce and throttle functions
- Memoization utility
- Batch processing
- Retry logic with exponential backoff

### Error Handling (`src/lib/error-handling.ts`)
- Centralized error tracking
- Error subscription system
- Error boundary helpers
- Safe async/sync wrappers

### Array Utilities (`src/lib/array-utils.ts`)
- Grouping, partitioning, chunking
- Unique value extraction
- Set operations (intersection, difference, union)
- Sorting helpers
- Statistical functions (sum, average, median)

### String Utilities (`src/lib/string-utils.ts`)
- Case conversion (camelCase, kebabCase, snakeCase, pascalCase)
- Text manipulation (truncate, ellipsis, capitalize)
- HTML escaping/unescaping
- Pattern extraction (emails, URLs, hashtags, mentions)
- Data masking (email, phone, credit card)
- Slug generation

### Object Utilities (`src/lib/object-utils.ts`)
- Object manipulation (pick, omit, deepClone, deepMerge)
- Flattening/unflattening nested objects
- Path-based get/set/has operations
- Equality checking
- Key/value mapping

### Number Utilities (`src/lib/number-utils.ts`)
- Math operations (clamp, round, floor, ceil)
- Random number generation
- Number formatting with currency support
- Interpolation (lerp, inverseLerp, remap)
- Statistical functions
- Mathematical utilities (gcd, lcm, factorial, isPrime)

### Color Utilities (`src/lib/color-utils.ts`)
- Color space conversions (RGB, HSL, HEX)
- Color manipulation (lighten, darken, saturate, desaturate)
- Color mixing and palette generation
- Contrast calculation
- Readable color detection

### URL Utilities (`src/lib/url-utils.ts`)
- URL parsing and building
- Query string manipulation
- URL validation and normalization
- Domain and protocol extraction
- Path manipulation

### Crypto Utilities (`src/lib/crypto-utils.ts`)
- Hash generation (SHA-256)
- Random string/bytes generation
- Base64 encoding/decoding
- Data obfuscation
- Nonce and token generation

### Promise Utilities (`src/lib/promise-utils.ts`)
- Delay and timeout helpers
- Retry with exponential backoff
- Sequential and parallel execution
- Debounce and throttle for async functions
- Async array operations

## Components

### UI Components
- **PlantationCard:** Enhanced with health scores, urgent tasks, and summary info
- **PlantationInsights:** Displays actionable insights for plantations
- **QuickActions:** Expandable action buttons with variants
- **StatisticsSummary:** Visual statistics display with stage breakdown
- **ProgressIndicator:** Animated progress bars with multiple sizes/colors
- **Badge:** Reusable badge component with variants
- **Tooltip:** Position-aware tooltips with animations
- **LoadingSpinner:** Animated spinner with multiple sizes
- **SkeletonLoader:** Loading skeletons with pulsing animation

### Feature Components
- **DashboardMetrics:** Real-time metrics with trend indicators
- **ForecastPanel:** Yield forecasting with scenarios
- **GeoMapPanel:** Interactive map with plantation markers
- **WalletPerformancePanel:** Comparative wallet analytics
- **CollaborationHub:** Team management interface
- **SecurityPanel:** Security settings and monitoring
- **AlertManager:** Alert management and preferences

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4 with custom Cocoa Chain theme
- **Web3:** Reown AppKit + wagmi + viem
- **State:** Zustand with localStorage persistence
- **Animations:** Framer Motion
- **Charts:** Chart.js + react-chartjs-2
- **Export:** jsPDF for PDF generation
- **Geospatial:** d3-geo + world-atlas for map rendering
- **Date Handling:** date-fns for timeline formatting

## Data Persistence

- Plantations, tasks, and settings stored in `localStorage` via Zustand
- Seed data in `src/data/plantations.json` and `src/data/engagement.json`
- Favorites persisted to `localStorage` with automatic cleanup
- All stores use Zustand with persistence middleware
- Storage utilities with TTL support for cached data

## Project Structure

```
src/
├── app/              # Next.js pages and layouts
├── components/       # React components
│   ├── ui/          # Reusable UI components
│   └── ...          # Feature components
├── store/           # Zustand state stores
├── lib/             # Utility libraries
│   ├── analytics.ts
│   ├── alerts.ts
│   ├── plantation-utils.ts
│   ├── date-utils.ts
│   ├── format-utils.ts
│   ├── statistics.ts
│   ├── search-utils.ts
│   ├── validation.ts
│   ├── storage-utils.ts
│   ├── chart-utils.ts
│   ├── export-utils.ts
│   ├── performance-utils.ts
│   ├── error-handling.ts
│   ├── array-utils.ts
│   ├── string-utils.ts
│   ├── object-utils.ts
│   ├── number-utils.ts
│   ├── color-utils.ts
│   ├── url-utils.ts
│   ├── crypto-utils.ts
│   └── promise-utils.ts
└── data/            # Seed data files
```

## Scripts

- `npm run dev` – Development server with hot reload
- `npm run build` – Production build
- `npm run start` – Run production build
- `npm run lint` – Run ESLint checks

## Development

### Adding New Features
- Utilities should go in `src/lib/` with clear naming
- Components should be in `src/components/` with proper TypeScript types
- State management uses Zustand stores in `src/store/`
- Follow existing patterns for consistency

### Performance
- Built-in performance monitoring via `performance-utils`
- Use memoization for expensive calculations
- Debounce/throttle user interactions
- Lazy load heavy components

### Error Handling
- Use `error-handling.ts` utilities for centralized tracking
- Wrap async operations with `safeAsync` or `safeSync`
- Provide user-friendly error messages

## License

MIT
