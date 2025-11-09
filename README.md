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
- **Financial Dashboard**: Track expenses, revenue, and net profit with transaction history
- **Cost Tracking**: Track costs by category (labor, equipment, fertilizer, pesticides, irrigation, transportation, certification, maintenance)
- **Cost Breakdown**: Visual breakdown of costs by category with percentages
- **Cost Analysis**: Calculate cost per hectare, cost per tree, and ROI
- **Cost Trends**: Track cost trends over time (increasing/decreasing/stable)
- **Monthly Cost Reports**: View costs by month and year
- **Market Prices**: Real-time cocoa commodity prices from major exchanges
- **Marketplace Integration**: Connect with buyers and sellers for agricultural products

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
- **Harvest Scheduling**: Optimal harvest window calculation based on plantation age and growth rate
- **Harvest Readiness Check**: Assess harvest readiness based on plantation health and weather
- **Harvest Prioritization**: Automatic prioritization of harvests by status, priority, and date
- **Harvest Efficiency Tracking**: Calculate harvest efficiency (planned vs actual yield)
- **Yield Estimation**: Estimate harvest yield based on plantation area, tree density, and health factors
- **Resource Allocation**: Allocate resources across plantations
- **Inventory Panel**: Track equipment and supplies
- **Inventory Management**: Complete inventory tracking with low stock alerts, expiry monitoring, and reorder recommendations
- **Inventory Status Dashboard**: Real-time inventory health scoring and issue detection
- **Equipment Tracker**: Monitor equipment usage and maintenance
- **Supply Chain Tracker**: Track supply chain operations from harvest to market
- **Yield Journal**: Document and track yield data over time
- **Quality Control**: Track quality tests and grading for harvests
- **Pest & Disease Management**: Monitor and manage pests, diseases, and weeds
- **Pest/Disease Tracking**: Record pest and disease incidents with severity levels
- **Treatment Recommendations**: Automatic treatment recommendations based on type and severity
- **Treatment Success Tracking**: Monitor treatment success rates and resolution times
- **Urgent Alert System**: Automatic alerts for critical pest/disease issues
- **Irrigation Tracker**: Monitor water usage and soil moisture levels
- **Irrigation Scheduling**: Optimal irrigation schedule calculation based on soil moisture and weather
- **Water Usage Tracking**: Track water consumption and efficiency
- **Soil Moisture Monitoring**: Real-time soil moisture level assessment
- **Watering Recommendations**: Smart watering recommendations based on current conditions
- **Reporting Dashboard**: Generate comprehensive reports and analytics
- **Mobile Features**: GPS tracking, offline mode, photo capture, barcode scanning
- **Training Resources**: Educational content and guides for farmers
- **Marketplace**: Buy and sell agricultural products with other farmers
- **Soil Management**: Track soil tests, pH levels, and nutrient content (N, P, K)
- **Compliance Tracker**: Monitor regulatory compliance requirements and deadlines
- **Budget Planner**: Create and track budgets by category with spending analysis
- **Labor Management**: Track labor hours, costs, and worker assignments
- **Worker Management**: Manage worker profiles, roles, skills, and availability
- **Labor Cost Analysis**: Calculate labor costs by role, track utilization, and efficiency
- **Maintenance Scheduler**: Schedule and track maintenance tasks for equipment and infrastructure
- **Equipment Tracking**: Track equipment status, maintenance history, and uptime
- **Preventive Maintenance**: Schedule preventive maintenance based on intervals
- **Maintenance Cost Tracking**: Track maintenance costs including parts and labor
- **Risk Assessment**: Identify, assess, and mitigate risks to operations
- **Risk Scoring**: Calculate risk scores based on probability and impact
- **Risk Mitigation Planning**: Generate mitigation recommendations by category
- **Risk Monitoring**: Track risk status and trends over time
- **Performance Benchmark**: Key performance indicators and operational benchmarks
- **KPI Dashboard**: Calculate and display KPI scores across categories
- **Benchmark Comparison**: Compare performance against industry averages and best-in-class
- **Performance Trends**: Track performance trends (improving/declining/stable)
- **Insurance Tracker**: Manage insurance policies and track coverage amounts
- **Crop Rotation Planner**: Plan crop rotations to optimize soil health and yields
- **Sustainability Scorecard**: Overall sustainability performance scoring and metrics
- **Photo Gallery**: Store and organize plantation photos with categories and tags
- **Loan Calculator**: Calculate loan payments and manage agricultural loans
- **Seasonal Planner**: Plan activities by season for optimal crop management
- **Compliance Checklist**: Track regulatory compliance requirements and deadlines
- **Farmer Network**: Connect with other farmers and build your agricultural network
- **Weather History**: Track historical weather data for your plantations
- **Expense Categories**: Organize expenses with custom categories and colors
- **Supplier Management**: Manage suppliers and vendors for your operations
- **Harvest Quality Tracker**: Track quality metrics and grades for harvests
- **Contract Management**: Manage contracts with suppliers, buyers, and service providers
- **Training Records**: Track training sessions and certifications for workers
- **Audit Trail**: Track all system activities and changes for compliance
- **Payment Tracker**: Track payments, invoices, and financial transactions
- **Field Notes**: Record daily observations and field activities
- **Cost Analysis**: Detailed breakdown of operational costs and expenses
- **Yield Comparison**: Compare yields across plantations and track performance
- **Harvest Calendar**: Visual calendar showing harvest schedules and events
- **Notifications Center**: Centralized notification management and alerts
- **Task Templates Library**: Pre-defined task templates for common operations

### Data Management
- **Data Export**: Export plantations, tasks, and analytics data
- **Data Import**: Import data from various formats
- **Data Management Panel**: Centralized data management interface
- **Backup & Restore**: Complete data backup and restore functionality with validation
- **Data Sync**: Online/offline sync with operation queue and retry logic
- **Sync Status Monitoring**: Track sync operations (upload, download, sync) with status
- **Offline Support**: Queue operations when offline and sync when online
- **Online Status Detection**: Automatic detection of online/offline status
- **Document Library**: Store and manage plantation-related documents (contracts, certificates, receipts, invoices, permits)
- **Document Scanner**: Scan and digitize documents with OCR capabilities (receipts, invoices, certificates, contracts)
- **Document Processing**: Automatic document type detection and text extraction
- **Document Search**: Search documents by title, tags, content, and metadata
- **Document Validation**: File size and type validation for uploads
- **Certification Manager**: Track and manage certifications (organic, fair trade, rainforest alliance, UTZ, ISO)
- **Certification Tracking**: Track certification status (active, expired, renewal-due, pending, revoked)
- **Certification Expiry Monitoring**: Automatic detection of expiring certifications
- **Certification Badges**: Visual badges showing certification status and days until expiry
- **Compliance Tracker**: Track compliance requirements across multiple categories (certification, regulatory, environmental, labor, safety, quality)
- **Compliance Rate Calculation**: Calculate overall compliance rate and track by type
- **Compliance Deadlines**: Monitor upcoming and overdue compliance deadlines
- **Compliance Status**: Track compliance status (compliant, non-compliant, pending-review, expired)
- **Report Generation**: Generate comprehensive reports (plantation summary, financial, inventory, quality, sustainability)
- **Report Export**: Export reports to JSON format with download functionality

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
- **Weather Alerts**: Proactive weather warnings with impact assessment and recommendations
- **Notification Center**: Centralized notification hub with read/unread status
- **Price Alerts**: Market price alerts with customizable thresholds

### Geospatial Features
- **Global Footprint Map**: Interactive map showing all plantations
- **Geo Insights Panel**: Regional insights and analytics
- **Location-based Filtering**: Filter plantations by location
- **Carbon-weighted Markers**: Visualize carbon impact on map

### Weather Integration
- **Weather Widget**: Real-time weather display with conditions, temperature, humidity, precipitation, and wind speed
- **7-Day Weather Forecast**: Extended weather forecast with daily conditions and temperatures
- **Weather Impact Assessment**: Automatic assessment of weather impact on plantations (positive/neutral/negative)
- **Weather Score**: Calculated weather score (0-100) based on multiple factors
- **Weather Recommendations**: Actionable recommendations based on current and forecasted weather conditions
- **Weather Alerts**: Alerts for rain, storms, drought, frost, and high winds
- **Watering Recommendations**: Smart watering suggestions based on weather and last watered date
- **Forecast Analysis**: Analyze precipitation totals, rainy days, and optimal weather days
- **Weather Trends**: Track weather patterns and trends over time

### Market Price Tracking
- **Market Price Cards**: Display current commodity prices with trends and changes
- **Price Trend Analysis**: Track price trends (up/down/stable) over time
- **Price Volatility Calculation**: Calculate market volatility for risk assessment
- **Market Recommendations**: AI-powered market insights and selling recommendations
- **Revenue Projection**: Calculate projected revenue based on yield and current prices
- **Best Sell Time Detection**: Identify optimal selling windows based on price trends
- **Price Alerts**: Set alerts for price thresholds (above/below/change)

### Marketplace
- **Buy & Sell Listings**: Create buy, sell, and trade listings for agricultural products
- **Seller Ratings**: Rate and review sellers with average rating calculations
- **Listing Management**: Manage active, pending, sold, and cancelled listings
- **Search & Filter**: Search listings by query, filter by price range and location
- **Price Sorting**: Sort listings by price (ascending/descending)
- **Rating Sorting**: Sort listings by seller rating
- **Location-Based Search**: Find listings by location
- **Marketplace Summary**: Overview of total listings, average prices, and total market value

### Quality Control
- **Quality Assessment**: Comprehensive quality grading system (Premium, Grade A, Grade B, Grade C, Reject)
- **Quality Scoring**: Weighted quality score calculation based on multiple metrics
- **Quality Metrics**: Track quality metrics with min/max ranges and weights
- **Quality Trends**: Track quality trends over time (improving/declining/stable)
- **Quality Comparison**: Compare quality assessments between harvests
- **Quality Indicators**: Visual quality grade indicators with color coding

### Certification Management
- **Certification Types**: Support for Organic, Fair Trade, Rainforest Alliance, UTZ, ISO, and custom certifications
- **Certification Status Tracking**: Monitor certification status and expiry dates
- **Expiry Alerts**: Automatic alerts for certifications expiring soon
- **Certification Summary**: Overview of all certifications by status and type
- **Days Until Expiry**: Calculate and display days until certification expiry

### Pest & Disease Management
- **Pest/Disease Records**: Track pest, disease, and weed incidents
- **Severity Assessment**: Classify issues by severity (low, medium, high, critical)
- **Treatment Status**: Track treatment progress (identified, treated, monitoring, resolved)
- **Treatment Recommendations**: Automatic treatment recommendations based on type and severity
- **Affected Area Tracking**: Monitor affected area and calculate percentage
- **Urgent Alerts**: Automatic alerts for critical issues requiring immediate attention
- **Success Rate Tracking**: Calculate treatment success rates and average resolution times
- **Historical Analysis**: Track pest/disease patterns over time

### Irrigation Management
- **Irrigation Methods**: Support for sprinkler, drip, flood, and manual irrigation
- **Soil Moisture Monitoring**: Track soil moisture levels (dry, moist, optimal, wet, waterlogged)
- **Optimal Water Calculation**: Calculate optimal water amount based on area, crop stage, and weather
- **Irrigation Scheduling**: Generate irrigation schedules based on soil moisture and crop needs
- **Water Usage Tracking**: Track water consumption and efficiency metrics
- **Watering Recommendations**: Smart recommendations for when to irrigate
- **Efficiency Analysis**: Calculate water efficiency based on moisture increase per water used
- **Historical Records**: Track irrigation history and patterns

### Soil Health Monitoring
- **Soil Testing**: Comprehensive soil tests with pH, nitrogen, phosphorus, potassium, and organic matter
- **Soil Health Scoring**: Calculate overall soil health score (0-100)
- **Nutrient Assessment**: Assess nutrient levels (deficient, low, adequate, high, excessive)
- **pH Analysis**: Assess pH levels and suitability for cocoa cultivation
- **Nutrient Recommendations**: Generate fertilizer recommendations based on deficiencies
- **Soil Type Analysis**: Analyze soil type characteristics (drainage, fertility, workability)
- **Trend Comparison**: Compare soil tests over time to track improvements
- **Soil Type Support**: Support for clay, loam, sandy, silt, and peat soils

### Location & GPS Features
- **GPS Coordinates**: Track plantation locations with latitude, longitude, and altitude
- **Distance Calculation**: Calculate distances between locations using Haversine formula
- **Location Services**: Get current location using browser geolocation API
- **Location Watching**: Watch location changes in real-time
- **Bounding Box Calculation**: Calculate bounding boxes for multiple locations
- **Nearest Location Finder**: Find nearest plantation or location
- **Radius Search**: Find locations within a specified radius
- **Coordinate Validation**: Validate and format GPS coordinates

### Labor Management
- **Worker Profiles**: Manage worker information including roles, skills, and contact details
- **Labor Records**: Track work hours, tasks, and costs per worker
- **Role-Based Tracking**: Track labor costs and hours by role (farmer, supervisor, harvester, maintenance, admin)
- **Worker Availability**: Manage worker availability schedules and find available workers
- **Labor Cost Analysis**: Calculate total labor costs, average hourly rates, and cost by role
- **Worker Utilization**: Calculate worker utilization rates and efficiency
- **Labor Efficiency**: Compare planned vs actual labor hours

### Maintenance Management
- **Equipment Tracking**: Track equipment details, status, and maintenance history
- **Maintenance Scheduling**: Schedule preventive, corrective, emergency, and inspection tasks
- **Maintenance Status**: Track maintenance status (scheduled, in-progress, completed, overdue, cancelled)
- **Due Date Monitoring**: Identify equipment due for maintenance and overdue items
- **Maintenance Cost Tracking**: Track maintenance costs including parts and labor
- **Equipment Uptime**: Calculate equipment uptime and reliability metrics
- **Maintenance Summary**: Comprehensive summary of maintenance tasks by status and type

### Risk Management
- **Risk Identification**: Identify risks across multiple categories (weather, pest-disease, market, financial, operational, compliance, equipment, labor)
- **Risk Assessment**: Assess risks with probability and impact scoring
- **Risk Scoring**: Calculate risk scores and determine risk levels (low, medium, high, critical)
- **Risk Mitigation**: Generate mitigation plans and recommendations by category
- **Risk Monitoring**: Track risk status (identified, assessed, mitigated, monitoring, resolved)
- **Risk Exposure**: Calculate overall risk exposure and trends
- **Critical Risk Alerts**: Identify and prioritize critical risks requiring immediate attention

### Performance Benchmarking
- **KPI Calculation**: Calculate Key Performance Indicator scores across multiple categories
- **Performance Metrics**: Track performance metrics with targets and benchmarks
- **Benchmark Comparison**: Compare performance against industry averages and best-in-class
- **Performance Rating**: Rate performance as excellent, good, average, or poor
- **Trend Analysis**: Track performance trends (improving, declining, stable)
- **Improvement Areas**: Identify areas needing improvement based on targets and benchmarks
- **Performance Reports**: Generate comprehensive performance benchmark reports

### Automation & Rules
- **Automation Rules**: Create and manage automation rules for routine tasks
- **Rule Triggers**: Support for time-based, stage-change, threshold-reached, and event-based triggers
- **Automation Actions**: Auto-harvest, send alerts, generate reports, backup data, update stages, create tasks
- **Rule Management**: Enable/disable rules, track execution count, monitor rule status
- **Rule Execution**: Automatic rule execution based on triggers and conditions
- **Rule Summary**: Comprehensive summary of automation rules by trigger and action

### Carbon Calculator
- **Carbon Offset Calculation**: Calculate current carbon offset based on trees and area
- **Carbon Projections**: Project carbon offset for 30 days, 90 days, and 1 year
- **Potential Increase**: Calculate potential carbon offset increase over time
- **Carbon Efficiency**: Calculate carbon efficiency per tree and per hectare
- **Efficiency Scoring**: Calculate overall carbon efficiency score
- **Carbon Savings**: Calculate carbon savings and percentage increase

### Supply Chain Management
- **Supply Chain Stages**: Track harvest → processing → storage → transport → market → delivered
- **Stage Management**: Advance items through supply chain stages with validation
- **Stage Efficiency**: Calculate efficiency for each supply chain stage
- **Supply Chain Metrics**: Track yield at each stage, average stage time, overall efficiency
- **Delayed Items**: Identify and track delayed items in the supply chain
- **Stage Progress**: Calculate progress percentage for each stage
- **Supply Chain Summary**: Comprehensive summary of supply chain operations

### Advanced Analytics
- **Efficiency Scores**: Calculate efficiency scores for yield, cost, labor, water, and carbon
- **Productivity Index**: Calculate productivity indices with benchmark comparisons
- **Growth Metrics**: Track growth rates and growth percentages over time
- **Compound Growth Rate**: Calculate compound annual growth rates
- **Efficiency Trends**: Track efficiency trends (improving, declining, stable)
- **Efficiency Reports**: Generate comprehensive efficiency reports across all metrics
- **Overall Efficiency**: Calculate overall efficiency score from multiple metrics

### Yield Optimization
- **Yield Analysis**: Analyze current yield vs potential yield and identify yield gaps
- **Optimization Tips**: AI-powered yield optimization tips with impact assessment
- **Tip Prioritization**: Prioritize tips by impact (high/medium/low) and difficulty
- **Implementation Steps**: Detailed implementation steps for each optimization tip
- **ROI Calculation**: Calculate return on investment for optimization tips
- **Estimated Increases**: Estimate yield increase percentage for each tip
- **Category-Based Tips**: Tips categorized by health, irrigation, fertilization, pest control

### AI Assistant
- **Question Answering**: Answer questions about plantation management, harvest, irrigation, fertilization, pest control, and compliance
- **Context-Aware Suggestions**: Generate suggestions based on plantation health, tasks, and conditions
- **Insights Generation**: Generate insights from plantation data, tasks, costs, and yields
- **Suggestion Prioritization**: Prioritize suggestions by importance (high/medium/low)
- **Interactive Chat**: Chat interface for asking questions and getting recommendations

### Budget & Financial Planning
- **Budget Creation**: Create budgets by category with allocated amounts
- **Budget Tracking**: Track spending against allocated budgets
- **Budget Status**: Monitor budget status (on-track, over-budget, under-budget)
- **Budget Utilization**: Calculate budget utilization percentage
- **Budget Variance**: Calculate variance between allocated and spent amounts
- **Budget Forecasting**: Forecast future spending based on current spending rates
- **Budget Summary**: Comprehensive summary of all budgets with totals and breakdowns

### Loan Management
- **Loan Calculator**: Calculate monthly payments, total payment, and total interest
- **Payment Schedule**: Generate complete payment schedules with principal and interest breakdown
- **Loan Progress**: Track loan progress and calculate remaining balance
- **Upcoming Payments**: Identify upcoming loan payments within specified timeframe
- **Overdue Payments**: Track overdue loan payments
- **Loan Status**: Monitor loan status (pending, approved, active, paid-off, defaulted)
- **Loan Summary**: Summary statistics for all loans

### Seasonal Planning
- **Current Season Detection**: Automatically detect current season (Planting, Growing, Harvest, Maintenance)
- **Seasonal Activities**: Get recommended activities for current season
- **Activity Prioritization**: Activities prioritized by importance (high/medium/low)
- **Upcoming Season**: Identify next season and days until it starts
- **Seasonal Calendar**: View activities by month and season
- **Activity Due Dates**: Check if activities are due in current month

### Farmer Network
- **Farmer Profiles**: Create and manage farmer profiles with specialties, ratings, and experience
- **Farmer Search**: Search farmers by name, location, specialty, and rating
- **Rating System**: Rate and review farmers with average rating calculations
- **Network Connections**: Manage connections with other farmers (colleagues, mentors, mentees, partners)
- **Farmer Groups**: Join and manage farmer groups by category
- **Top Rated Farmers**: Find top-rated farmers in the network
- **Network Summary**: Overview of network statistics (total farmers, groups, connections, average ratings)

### Additional Features
- **On-chain Sync**: Simulate and visualize blockchain transactions
- **Status Indicators**: Visual status indicators for plantations and tasks
- **Progress Tracking**: Visual progress bars and indicators
- **Animated Counters**: Smooth number animations for metrics
- **Loading States**: Skeleton loaders and spinners
- **Empty States**: Helpful empty state messages
- **Confirmation Dialogs**: User-friendly confirmation modals
- **Charts Gallery**: Interactive data visualizations with stage and task distribution charts
- **Reminders System**: Automatic reminders for upcoming tasks and harvest-ready plantations
- **Backup & Restore**: Complete data backup and restore functionality with full data export/import
- **Data Validation**: Automatic data quality checks and validation issue detection
- **Activity Feed**: Real-time activity feed showing recent updates, receipts, and complaints
- **Smart Recommendations**: AI-powered recommendations for overdue tasks, harvest readiness, and engagement
- **Batch Operations**: Bulk operations on selected plantations (stage updates, favorites, notes, export)
- **Timeline View**: Chronological activity timeline with plantation events, tasks, and harvests
- **Statistics Comparison**: Compare filtered vs all-time statistics with visual progress bars
- **Performance Monitor**: Real-time performance metrics including render time and memory usage
- **Data Visualizations**: Enhanced visualization panels with stage, task, and location distributions
- **Dashboard Settings**: Comprehensive settings panel for view preferences, layout, and data management
- **Help Center**: User guide with keyboard shortcuts, quick tips, and feature documentation
- **Quick Actions Panel**: One-click shortcuts for common operations
- **Analytics Dashboard**: Comprehensive analytics overview with yield, regions, and harvest time metrics
- **Market Prices Widget**: Real-time commodity prices for cocoa beans and carbon credits
- **Weather Widget**: Regional weather conditions with temperature, humidity, and rainfall data
- **Reports Generator**: Generate summary, detailed, and financial reports with one-click export
- **Export/Import**: Export data in JSON/CSV formats and import favorites and notes
- **Notification Center**: Centralized notification hub with alerts and status updates
- **Achievements System**: Unlock achievements based on plantation milestones and activities
- **Progress Tracker**: Visual progress bars for task completion, growth efficiency, and harvest rate
- **Widget Customization**: Show/hide dashboard widgets for personalized experience
- **Data Insights**: AI-powered recommendations and insights panel
- **Calendar View**: Calendar display of plantation start dates and task due dates
- **Comparison Mode**: Compare up to 3 plantations side-by-side
- **Favorites Spotlight**: Aggregated metrics and spotlight for favorite plantations
- **Enhanced Performance Overview**: Efficiency score, yield rate, engagement rate, and sustainability index
- **AI Assistant**: Interactive AI assistant with question answering and suggestions for plantation management
- **AI Suggestions**: Context-aware suggestions based on plantation health, tasks, and conditions
- **AI Insights**: Generate insights from plantation data, tasks, costs, and yields
- **Yield Optimizer**: AI-powered yield optimization tips with impact assessment (high/medium/low)
- **Compliance Tracker**: Track certifications and compliance status with compliance rate calculations
- **Risk Assessment**: Identify and mitigate risks with severity classification and mitigation strategies
- **Supply Chain Manager**: Track harvest to market with yield metrics and supply chain stages
- **Advanced Analytics**: Deep insights with efficiency scores, productivity indices, and growth metrics
- **Automation Rules**: Configure automation rules for routine tasks (auto-harvest, alerts, reports, backups)
- **Document Scanner**: Scan and digitize documents (receipts, invoices, certificates, contracts)
- **Weather Forecast**: 7-day weather outlook with temperature and precipitation forecasts
- **Carbon Calculator**: Carbon offset projections for 30 days, 90 days, and 1 year with potential increase calculations
- **Harvest Scheduler**: Upcoming harvest schedule with readiness status (ready/soon/planned) and estimated dates
- **Reporting Dashboard**: Comprehensive reporting with plantation, sustainability, and financial metrics
- **Mobile Features**: GPS tracking, offline mode, photo capture, barcode scanning, push notifications, voice notes
- **Training Resources**: Educational content and guides categorized by topic (planting, pests, harvest, soil, irrigation, certification, business, sustainability)
- **Training Progress Tracking**: Track learning progress with completion rates and notes
- **Resource Recommendations**: Get personalized training recommendations based on skill level and interests
- **Training Categories**: Resources organized by category and difficulty level (beginner, intermediate, advanced)
- **Resource Search**: Search training resources by title, description, category, and tags
- **Marketplace**: Buy and sell agricultural products with seller ratings, pricing, and location information
- **Loan Calculator**: Calculate loan payments with principal, interest rate, and term inputs (monthly payment, total payment, total interest)
- **Loan Payment Schedule**: Generate complete payment schedules with principal and interest breakdown
- **Loan Progress Tracking**: Track loan progress and remaining balance
- **Seasonal Planner**: Plan activities by season (Planting, Growing, Harvest, Maintenance) with current season highlighting
- **Seasonal Activities**: Get recommended activities for current season with priority levels
- **Compliance Checklist**: Track compliance requirements with checkboxes and completion rate (certification, regulations, quality, safety)
- **Farmer Network**: Connect with other farmers and join groups (farmer profiles, ratings, specialties, group memberships)
- **Farmer Search**: Search farmers by name, location, specialty, and rating
- **Network Connections**: Manage connections with other farmers (colleagues, mentors, partners)
- **Expense Tracker**: Track expenses with total expenses, monthly average, and receipt count metrics
- **Expense Categories**: Categorize expenses (labor, equipment, fertilizer, pesticides, irrigation, etc.)
- **Expense Trends**: Track expense trends over time (increasing/decreasing/stable)
- **Budget Planner**: Create and track budgets by category with spending analysis
- **Budget Status**: Monitor budget status (on-track, over-budget, under-budget)
- **Budget Forecasting**: Forecast future spending based on current rates
- **Crop Rotation Planner**: Plan crop rotations with years since planting tracking and rotation recommendations
- **Rotation Recommendations**: Get AI-powered rotation recommendations based on current crop and soil health
- **Rotation Benefits**: Calculate soil health, yield potential, and pest reduction benefits
- **Equipment Tracking**: Track equipment status, maintenance schedules, and utilization
- **Equipment Depreciation**: Calculate equipment depreciation and current value
- **Equipment Uptime**: Monitor equipment uptime and operational efficiency
- **Weather History**: Track historical weather data with trends and comparisons
- **Weather Trends**: Analyze temperature, precipitation, and humidity trends over time
- **Monthly Weather Summary**: Get monthly weather summaries with averages and extremes
- **Mobile Features**: Camera access, photo capture, push notifications, vibration, sharing
- **Voice Notes**: Record voice notes for plantations and tasks with transcription support
- **Barcode Scanning**: Scan QR codes and barcodes for plantations, tasks, and equipment
- **Achievement System**: Unlock achievements for milestones, harvests, sustainability, and efficiency
- **Achievement Progress**: Track progress toward unlocking achievements with progress bars
- **Soil Analysis**: Soil health metrics with pH level, nitrogen, phosphorus, and potassium measurements
- **Equipment Maintenance**: Track equipment status with operational, maintenance, and efficiency metrics
- **Weather History**: 12-month weather trends with temperature, rainfall, and humidity data
- **Expense Categories**: Spending breakdown by category with visual progress bars and percentages
- **Supplier Management**: Manage suppliers and orders with ratings, contact info, and order status tracking
- **Budget Planner**: Plan and track budget with annual budget, spent amount, and remaining balance
- **Inventory Alerts**: Low stock and expiry alerts with actionable recommendations
- **Performance Reports**: Generate monthly, quarterly, annual, and custom performance reports
- **Export Manager**: Export data in multiple formats (JSON, CSV, Excel, PDF)
- **Payment Tracker**: Track payments and loans with status (completed/pending) and totals
- **Field Notes**: Record observations and notes with plantation tags and date tracking
- **Cost Analysis**: Analyze costs with total costs, cost per plantation, cost per kg, and yield metrics
- **Yield Comparison**: Compare yields across plantations with average, max, min yields and visual progress bars
- **Revenue Forecast**: Projected revenue estimates for 30 days, 90 days, 6 months, and 1 year
- **Resource Optimizer**: Optimize resource allocation with recommendations for water, fertilizer, and labor
- **Quality Metrics**: Track quality scores with average quality, premium grade, grade A, and reject rate
- **Sustainability Report**: Environmental impact summary with carbon offset, trees protected, and sustainability score

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

### Quality & Certification
- **`quality-utils.ts`**: Quality assessment utilities (scoring, grading, trend analysis, comparison)
- **`certification-utils.ts`**: Certification management utilities (status tracking, expiry monitoring, validation)

### Harvest & Cost Management
- **`harvest-utils.ts`**: Harvest scheduling utilities (optimal window calculation, yield estimation, prioritization, readiness checks)
- **`cost-utils.ts`**: Cost tracking utilities (category breakdown, ROI calculation, trend analysis, monthly reports)

### Data Sync
- **`sync-utils.ts`**: Data synchronization utilities (online/offline detection, operation queue, retry logic, status tracking)

### Pest, Disease & Irrigation
- **`pest-disease-utils.ts`**: Pest and disease management utilities (tracking, severity assessment, treatment recommendations, success rate calculation)
- **`irrigation-utils.ts`**: Irrigation management utilities (scheduling, water calculation, moisture assessment, efficiency tracking)
- **`soil-utils.ts`**: Soil health utilities (soil testing, nutrient assessment, pH analysis, health scoring, recommendations)
- **`location-utils.ts`**: Location and GPS utilities (coordinates, distance calculation, geolocation, radius search)

### Labor & Maintenance
- **`labor-utils.ts`**: Labor management utilities (worker tracking, cost calculation, utilization, efficiency analysis)
- **`maintenance-utils.ts`**: Maintenance management utilities (scheduling, equipment tracking, cost tracking, uptime calculation)

### Risk & Performance
- **`risk-utils.ts`**: Risk management utilities (risk assessment, scoring, mitigation recommendations, exposure calculation)
- **`benchmark-utils.ts`**: Performance benchmarking utilities (KPI calculation, benchmark comparison, trend analysis, performance rating)

### Automation & Optimization
- **`automation-utils.ts`**: Automation rules utilities (rule creation, execution, trigger checking, rule management)
- **`carbon-calculator.ts`**: Carbon offset calculation utilities (projections, efficiency, savings calculation)
- **`supply-chain-utils.ts`**: Supply chain management utilities (stage tracking, efficiency calculation, metrics)
- **`analytics-utils.ts`**: Advanced analytics utilities (efficiency scores, productivity indices, growth metrics)
- **`yield-optimizer.ts`**: Yield optimization utilities (tip generation, analysis, prioritization, ROI calculation)

### Documents & Compliance
- **`document-utils.ts`**: Document management utilities (type detection, validation, search, text extraction)
- **`compliance-utils.ts`**: Compliance tracking utilities (compliance rate calculation, deadline monitoring, status tracking)
- **`training-utils.ts`**: Training resources utilities (resource management, progress tracking, recommendations, search)
- **`marketplace-utils.ts`**: Marketplace utilities (listing management, search, filtering, sorting, seller ratings)
- **`weather-forecast-utils.ts`**: Weather forecast utilities (7-day forecast, impact assessment, recommendations, analysis)

### AI & Planning
- **`ai-assistant-utils.ts`**: AI assistant utilities (question answering, suggestion generation, insights, prioritization)
- **`budget-utils.ts`**: Budget planning utilities (budget tracking, utilization, variance, forecasting)
- **`loan-utils.ts`**: Loan management utilities (payment calculation, schedule generation, progress tracking)
- **`seasonal-utils.ts`**: Seasonal planning utilities (season detection, activity recommendations, calendar)
- **`farmer-network-utils.ts`**: Farmer network utilities (profiles, search, connections, groups, ratings)
- **`expense-utils.ts`**: Expense tracking utilities (categorization, trends, monthly averages, summaries)

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
- **`WeatherWidget`**: Weather display widget with impact assessment and recommendations
- **`MarketPriceCard`**: Market price display with trends and recommendations
- **`InventoryStatus`**: Inventory health dashboard with low stock alerts
- **`BackupManager`**: Backup and restore interface
- **`NotificationCenter`**: Centralized notification hub
- **`AdvancedSearch`**: Multi-field search with filter operators
- **`CertificationBadge`**: Visual certification badge with status and expiry information
- **`QualityIndicator`**: Quality grade indicator with score display
- **`CostBreakdown`**: Visual cost breakdown by category with percentages
- **`PestDiseaseAlert`**: Alert component for pest and disease incidents with treatment recommendations
- **`SoilHealthCard`**: Soil health dashboard with pH, nutrients, and recommendations
- **`RiskCard`**: Risk assessment card with scoring and mitigation recommendations
- **`PerformanceDashboard`**: Performance dashboard with KPI scores and benchmark comparisons
- **`CarbonProjections`**: Carbon offset projections component with 30d, 90d, and 1y forecasts
- **`YieldOptimizerTips`**: Yield optimization tips component with impact assessment and implementation steps
- **`ComplianceTracker`**: Compliance tracking dashboard with compliance rate and deadline monitoring
- **`WeatherForecast`**: 7-day weather forecast component with daily conditions and recommendations
- **`AIAssistant`**: Interactive AI assistant component with question answering and suggestions
- **`BudgetPlanner`**: Budget planning dashboard with utilization tracking and variance analysis
- **`LoanCalculator`**: Loan calculator component with payment schedule and interest calculations
- **`SeasonalPlanner`**: Seasonal planning component with current season and recommended activities

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
