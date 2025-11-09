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

### Plantation Management
- **Plantation Dashboard**: Comprehensive dashboard with grid/list views, filtering, sorting, and search
- **Plant Seed Modal**: Create new plantations with location, area, and initial stage configuration
- **Stage Management**: Update growth stages (seedling → vegetative → flowering → fruiting → harvest)
- **Bulk Operations**: Bulk stage advancement and multi-plantation selection
- **Plantation Cards**: Rich cards displaying health scores, age, urgent tasks, and progress indicators
- **Plantation Insights**: AI-powered insights and recommendations for plantation optimization
- **Favorites System**: Star and spotlight favorite plantations with aggregated metrics
- **Notes System**: Add and manage notes for individual plantations
- **Plantation Templates**: Pre-configured templates for quick plantation creation
- **Stage Gating**: Validation rules for stage transitions

### Task Management
- **Task Planner**: Create, assign, and track tasks with due dates and priorities
- **Recurring Tasks**: Schedule recurring tasks with flexible intervals
- **Task Kanban Board**: Visual task management with drag-and-drop
- **Task Status Tracking**: Track pending, in-progress, completed, and cancelled tasks
- **Urgent Task Detection**: Automatic detection and highlighting of overdue tasks
- **Task Analytics**: Task completion rates and productivity metrics

### Analytics & Reporting
- **Growth Analytics Hub**: Charts and visualizations for plantation growth trends
- **Yield Forecast**: Predictive analytics for harvest windows and yield estimates
- **Cohort Analysis**: Track plantations by cohort and growth stage
- **Dashboard Metrics**: Real-time KPIs including total seeds, harvested, growing, carbon offsets
- **Statistics Summary**: Comprehensive statistical overview with distributions and trends
- **Carbon Efficiency Metrics**: Per-tree and per-hectare carbon offset calculations
- **Forecast Workspace**: Advanced forecasting tools with multiple scenarios
- **Export Analytics**: Export data in CSV, JSON, and Excel formats

### Sustainability & Environmental
- **Sustainability Panel**: Track tree coverage, land use, and environmental impact
- **Carbon Offset Tracking**: Calculate and visualize carbon offsets per plantation
- **Tree Count Analytics**: Monitor tree protection and growth metrics
- **Environmental Insights**: Geo-insights and regional environmental data

### Collaboration & Community
- **Collaboration Hub**: Add collaborators, assign roles, and manage permissions
- **Shared Notes Panel**: Collaborative note-taking for plantations
- **Community Share Panel**: Share updates and achievements with the community
- **Farmer Chat Panel**: Communication tools for collaborators
- **Help Requests**: Request and track help from the community
- **Community Support**: File complaints and track resolution status

### Financial Management
- **Receipts Ledger**: Upload, store, and manage financial receipts
- **Receipt History**: View and search receipt history
- **Loan Tracker**: Request and track cooperative loans
- **Loan Request Workflow**: Complete loan application and approval process
- **Financial Dashboard**: Overview of financial transactions and expenses
- **Market Prices**: Track commodity prices and market trends

### Security & Monitoring
- **Security Panel**: Comprehensive security monitoring and controls
- **Session Guard**: Automatic session locking with countdown warnings
- **Security Events Log**: Track and audit security-related events
- **Security Monitor**: Real-time security monitoring and alerts
- **Risk Detection**: Identify and flag potential security risks
- **Activity Timeline**: Complete audit trail of user actions

### Wallet Integration
- **Wallet Manager**: Connect and manage multiple wallets
- **Wallet Performance**: Track plantation counts, harvest conversion, and carbon footprint per wallet
- **Wallet Reputation**: Reputation scoring based on plantation performance
- **Multi-wallet Dashboard**: View plantations across multiple connected wallets
- **Watchlist Management**: Add wallets to watchlist with custom labels

### Operations & Planning
- **Operations Calendar**: Calendar view for tasks, harvests, and events
- **Harvest Planner**: Plan and schedule harvest operations
- **Resource Allocation**: Allocate resources across plantations
- **Inventory Panel**: Track equipment and supplies
- **Inventory Management**: Complete inventory tracking with low stock alerts, expiry monitoring, and reorder recommendations
- **Inventory Status Dashboard**: Real-time inventory health scoring and issue detection
- **Equipment Tracker**: Monitor equipment usage and maintenance
- **Supply Chain Tracker**: Track supply chain operations
- **Yield Journal**: Document and track yield data over time

### Data Management
- **Data Export**: Export plantations, tasks, and analytics data
- **Data Import**: Import data from various formats
- **Data Management Panel**: Centralized data management interface
- **Backup & Restore**: Complete data backup and restore functionality with validation
- **Document Library**: Store and manage plantation-related documents
- **Certification Manager**: Track and manage certifications
- **Report Generation**: Generate comprehensive reports (plantation summary, task performance, financial, inventory, sustainability, yield forecast)
- **Report Export**: Export reports to PDF, HTML, and text formats

### User Experience
- **Dark Theme Support**: Full dark mode with system preference detection
- **Keyboard Shortcuts**: Power user shortcuts for common actions
- **Onboarding Tour**: Guided tour for new users
- **Global Search**: Search across plantations, tasks, and notes
- **Advanced Search**: Multi-field search with operators (contains, equals, startsWith, endsWith, greaterThan, lessThan)
- **Advanced Filters**: Multi-criteria filtering with presets
- **Quick Actions**: Quick access to common operations
- **Notification Preferences**: Customize alert and notification settings
- **Settings Panel**: Comprehensive application settings

### Alerts & Notifications
- **Alert Manager**: Centralized alert management system
- **Alert Toaster**: Toast notifications for real-time alerts
- **Alert Insights**: Actionable insights from alert patterns
- **Task Deadline Alerts**: Automatic alerts for upcoming and overdue tasks
- **Stage Change Notifications**: Notify on plantation stage transitions
- **Weather Alerts**: Weather-based alerts and recommendations
- **Notification Center**: Centralized notification hub with read/unread status
- **Price Alerts**: Market price alerts with customizable thresholds

### Geospatial Features
- **Global Footprint Map**: Interactive map showing all plantations
- **Geo Insights Panel**: Regional insights and analytics
- **Location-based Filtering**: Filter plantations by location
- **Carbon-weighted Markers**: Visualize carbon impact on map

### Weather Integration
- **Weather Widget**: Real-time weather display with conditions, temperature, humidity, precipitation, and wind speed
- **Weather Impact Assessment**: Automatic assessment of weather impact on plantations (positive/neutral/negative)
- **Weather Score**: Calculated weather score (0-100) based on multiple factors
- **Weather Recommendations**: Actionable recommendations based on current weather conditions
- **Weather Alerts**: Alerts for rain, storms, drought, frost, and high winds
- **Watering Recommendations**: Smart watering suggestions based on weather and last watered date

### Market Price Tracking
- **Market Price Cards**: Display current commodity prices with trends and changes
- **Price Trend Analysis**: Track price trends (up/down/stable) over time
- **Price Volatility Calculation**: Calculate market volatility for risk assessment
- **Market Recommendations**: AI-powered market insights and selling recommendations
- **Revenue Projection**: Calculate projected revenue based on yield and current prices
- **Best Sell Time Detection**: Identify optimal selling windows based on price trends
- **Price Alerts**: Set alerts for price thresholds (above/below/change)

### Additional Features
- **On-chain Sync**: Simulate and visualize blockchain transactions
- **Status Indicators**: Visual status indicators for plantations and tasks
- **Progress Tracking**: Visual progress bars and indicators
- **Animated Counters**: Smooth number animations for metrics
- **Loading States**: Skeleton loaders and spinners
- **Empty States**: Helpful empty state messages
- **Confirmation Dialogs**: User-friendly confirmation modals

## Tech Stack

- Next.js 16 (App Router)
- Tailwind CSS v4 + custom Cocoa Chain theme
- Reown AppKit + wagmi + viem
- Zustand for state management
- Framer Motion for animated UI
- TanStack Query for Wallet/Web3 caching
- Chart.js + react-chartjs-2 for analytics visuals
- d3-geo + world-atlas + topojson-client for geospatial rendering
- date-fns for timeline formatting and scheduling utilities
- Local security store for guardrails, risk detection, and audit events
- Engagement store (receipts, complaints, loans) for finance and support flows backed by local JSON seed data
- Local JSON + localStorage hydration for prototype data persistence

## Analytics Snapshot Overview

- **Forecast Panel:** blends yield checkpoints, growth velocities, and cohort metrics to surface upcoming harvest opportunities.
- **Global Footprint Map:** plots every plantation with carbon-weighted markers and highlights top offset regions.
- **Wallet Performance:** aggregates plantation counts, harvest conversion, carbon footprint, and outstanding tasks per wallet.
- **Collaboration Hub:** centralises collaborator insights, lets you add new contributors, and log notes that feed the activity timeline.
- **Activity Timeline:** time-orders stages, yield events, tasks, and collaboration updates for rapid situational awareness.

## Alerts

- Task deadlines are scanned every five minutes; alerts fire when a task is due in the next 24 hours or becomes overdue.
- Plantation stage changes and wallet activity (connect/disconnect, watchlist updates) publish alerts instantly.
- Delivery channels default to in-app + toast notifications, with stubbed email/SMS senders logging to the console (`src/lib/notifiers.ts`).
- Channel preferences and alert state live in `src/store/alerts.ts`. Hook up real providers by swapping the notifier implementations.

## Mock Data

- Source plantations live in `src/data/plantations.json`.
- Finance, support, and loan samples are seeded from `src/data/engagement.json`.
- State is persisted to `localStorage` via Zustand so dashboard changes survive reloads.
- Reset behaviour: clearing browser storage reverts to seed data.

## Utility Libraries

The codebase includes a comprehensive set of utility libraries for common operations:

### Core Utilities
- **`api-utils.ts`**: HTTP client with error handling and response types
- **`integration.ts`**: Service layer combining API calls with monitoring and error handling
- **`logger.ts`**: Structured logging with levels, subscriptions, and export/import
- **`constants.ts`**: Application-wide constants and configuration
- **`cn.ts`**: Tailwind CSS class name utility

### Data Processing
- **`data-pipeline.ts`**: Functional data transformation pipeline with filter, map, sort, group operations
- **`array-utils.ts`**: Array manipulation (groupBy, partition, unique, chunk, flatten, zip, etc.)
- **`object-utils.ts`**: Object manipulation (pick, omit, deepClone, deepMerge, flatten, etc.)
- **`transform-utils.ts`**: Data transformation utilities (mapArray, groupBy, partition, pluck, etc.)
- **`comparison-utils.ts`**: Comparison utilities (diff, deepDiff, isEqual, min, max, sortBy, etc.)

### Form & Validation
- **`form-utils.ts`**: Form state management with validation rules and field tracking
- **`validation.ts`**: Validation functions (email, wallet address, numbers, dates, URLs, etc.)
- **`type-utils.ts`**: Type checking and assertion utilities

### Date & Time
- **`date-utils.ts`**: Date manipulation (formatRelativeTime, isOverdue, getDaysUntil, etc.)
- **`time-utils.ts`**: Time formatting and calculations (formatDuration, getTimeAgo, isToday, etc.)
- **`timer-utils.ts`**: Timer and interval utilities

### Formatting & Display
- **`format-utils.ts`**: Number, currency, percentage, carbon offset, area, yield formatting
- **`number-utils.ts`**: Number manipulation (clamp, roundTo, formatNumber, formatCurrency, etc.)
- **`string-utils.ts`**: String manipulation (camelCase, kebabCase, truncate, capitalize, etc.)
- **`color-utils.ts`**: Color manipulation (hexToRgb, lighten, darken, generatePalette, etc.)

### Search & Filtering
- **`search-utils.ts`**: Search and ranking utilities for plantations
- **`filter-utils.ts`**: Array filtering utilities with multiple operators
- **`sort-utils.ts`**: Advanced sorting utilities (multi-field, natural sort, etc.)

### Storage & Caching
- **`storage-utils.ts`**: LocalStorage wrapper with TTL and size tracking
- **`cache-utils.ts`**: Caching utilities (Cache, LRUCache, memoize)
- **`queue-utils.ts`**: Queue implementations (Queue, PriorityQueue, CircularQueue)

### Performance & Monitoring
- **`performance-utils.ts`**: Performance monitoring (PerformanceMonitor, debounce, throttle, memoize)
- **`error-handling.ts`**: Centralized error handling and reporting

### Network & API
- **`network-utils.ts`**: Network utilities
- **`url-utils.ts`**: URL manipulation and parsing
- **`query-utils.ts`**: Query string parsing and manipulation

### Browser & DOM
- **`browser-utils.ts`**: Browser detection, viewport, clipboard, fullscreen, etc.
- **`dom-utils.ts`**: DOM manipulation utilities

### File & Crypto
- **`file-utils.ts`**: File manipulation (extension, name, size, validation, compression)
- **`crypto-utils.ts`**: Cryptographic utilities (sha256, base64, random strings, etc.)

### Export & Import
- **`export-utils.ts`**: Export to CSV, JSON, Excel, images
- **`data-export.ts`**: Data export functionality
- **`exporter.ts`**: Export utilities

### Statistics & Analytics
- **`statistics.ts`**: Statistical calculations (mean, median, variance, correlation, outliers, etc.)
- **`chart-utils.ts`**: Chart data preparation and visualization utilities

### Event Management
- **`event-utils.ts`**: Custom event emitter with debounce/throttle support

### Promise Utilities
- **`promise-utils.ts`**: Promise utilities (delay, timeout, retry, allSettled, sequential, parallel)

### Regex Utilities
- **`regex-utils.ts`**: Common regex patterns and utilities (email, URL, phone, wallet address)

### State Management
- **`state-utils.ts`**: State management utilities (createState, createReducer, combineStates)

### Theme & UI
- **`theme-utils.ts`**: Theme management (light/dark/auto) with system preference detection

### Permissions
- **`permissions.ts`**: Role-based access control (RBAC) system with permission management

### Plantation-Specific
- **`plantation-utils.ts`**: Plantation-specific utilities (age calculation, health scores, insights)

### Weather & Market
- **`weather-utils.ts`**: Weather utilities (impact assessment, watering recommendations, weather scoring, alerts)
- **`market-utils.ts`**: Market price utilities (trend analysis, volatility calculation, revenue projection, price alerts)

### Inventory & Reports
- **`inventory-utils.ts`**: Inventory management utilities (stock tracking, low stock detection, expiry monitoring, reorder calculations)
- **`backup-utils.ts`**: Backup and restore utilities (create, export, import, validate backups)
- **`report-utils.ts`**: Report generation utilities (multiple report types, PDF/HTML/text export)

### Testing
- **`testing-utils.ts`**: Testing utilities (mock data, delays, assertions, localStorage mocking)

## UI Components

### Form Components
- **`Input`**: Text input with label, error, and helper text
- **`Select`**: Dropdown select with options
- **`Textarea`**: Multi-line text input
- **`Button`**: Button with variants (primary, secondary, outline, ghost, danger)
- **`Checkbox`**: Checkbox input with label
- **`Radio`**: Radio button input
- **`Switch`**: Toggle switch component
- **`Slider`**: Range slider input
- **`Dropdown`**: Custom dropdown with search and icons

### Display Components
- **`Card`**: Card container with header, content, footer
- **`Badge`**: Badge component with variants
- **`Tag`**: Tag component for labels
- **`Chip`**: Removable chip component
- **`Avatar`**: User avatar with fallback initials
- **`Progress`**: Progress bar with variants
- **`ProgressIndicator`**: Animated progress indicator
- **`LoadingSpinner`**: Loading spinner
- **`SkeletonLoader`**: Skeleton loading state
- **`EmptyState`**: Empty state message

### Navigation Components
- **`Tabs`**: Tab navigation component
- **`Breadcrumb`**: Breadcrumb navigation
- **`Pagination`**: Pagination controls
- **`Stepper`**: Step indicator component
- **`Accordion`**: Collapsible accordion sections
- **`Timeline`**: Timeline component for events

### Feedback Components
- **`Alert`**: Alert message component
- **`Tooltip`**: Tooltip component
- **`ConfirmationDialog`**: Confirmation modal
- **`Rating`**: Star rating component

### Layout Components
- **`Divider`**: Divider component
- **`ExpandableSection`**: Collapsible content section
- **`CopyButton`**: Copy to clipboard button

### Specialized Components
- **`PlantationCard`**: Plantation display card
- **`PlantationInsights`**: Plantation insights display
- **`QuickActions`**: Quick action buttons
- **`StatisticsSummary`**: Statistics summary display
- **`DashboardMetrics`**: Dashboard metrics display
- **`CohortChart`**: Cohort analysis chart
- **`AnimatedCounter`**: Animated number counter

## Custom React Hooks

### Form Management
- **`useForm`**: Complete form state management with validation
- **`useFilters`**: Dynamic filtering system for arrays

### Data Management
- **`usePagination`**: Pagination logic with navigation controls

### General Hooks (from `hooks.ts`)
- **`usePrevious`**: Get previous value
- **`useDebounce`**: Debounce value changes
- **`useThrottle`**: Throttle value changes
- **`useLocalStorage`**: LocalStorage hook with sync
- **`useSessionStorage`**: SessionStorage hook
- **`useClickOutside`**: Detect clicks outside element
- **`useKeyPress`**: Listen for key presses
- **`useMediaQuery`**: React to media query changes
- **`useWindowSize`**: Track window dimensions
- **`useToggle`**: Toggle boolean state
- **`useCounter`**: Counter with increment/decrement
- **`useAsync`**: Handle async operations
- **`useInterval`**: Set up intervals
- **`useTimeout`**: Set up timeouts
- **`useMount`**: Run on mount
- **`useUnmount`**: Run on unmount
- **`useUpdateEffect`**: Skip first render effect
- **`useIsMounted`**: Check if component is mounted
- **`useMemoizedCallback`**: Memoized callback hook

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/            # React components
│   ├── ui/               # Base UI components
│   └── ...              # Feature components
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
├── store/                # Zustand state management
├── data/                 # Mock data files
└── types/                # TypeScript type definitions
```

## Scripts

- `npm run dev` – start the local dev server
- `npm run build` – build for production
- `npm run start` – run the compiled app
- `npm run lint` – run ESLint checks (passes on the current codebase)
