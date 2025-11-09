"use client";

import Sidebar from "@/components/sidebar";
import TopBar from "@/components/top-bar";
import PlantationCard from "@/components/plantation-card";
import PlantSeedModal from "@/components/plant-seed-modal";
import UpdateStatusModal from "@/components/update-status-modal";
import AnalyticsPanel from "@/components/analytics-panel";
import SustainabilityPanel from "@/components/sustainability-panel";
import WalletManager from "@/components/wallet-manager";
import OnchainSyncPanel from "@/components/onchain-sync-panel";
import CommunitySharePanel from "@/components/community-share-panel";
import PlantationTaskPanel from "@/components/plantation-task-panel";
import AlertsPanel from "@/components/alerts-panel";
import AlertManager from "@/components/alert-manager";
import AlertToaster from "@/components/alert-toaster";
import CohortChart from "@/components/cohort-chart";
import RecurringTaskModal from "@/components/recurring-task-modal";
import RecurringTaskScheduler from "@/components/recurring-task-scheduler";
import BulkStagePanel from "@/components/bulk-stage-panel";
import DashboardMetrics, {
  type DashboardMetric,
} from "@/components/dashboard-metrics";
import ForecastPanel from "@/components/forecast-panel";
import ForecastWorkspace from "@/components/forecast-workspace";
import GeoMapPanel from "@/components/geo-map-panel";
import GeoInsightsPanel from "@/components/geo-insights-panel";
import ReceiptHistoryPanel from "@/components/receipt-history-panel";
import ReceiptUploadModal from "@/components/receipt-upload-modal";
import ComplaintModal from "@/components/complaint-modal";
import CommunitySupportPanel from "@/components/community-support-panel";
import LoanRequestModal from "@/components/loan-request-modal";
import LoanTrackerPanel from "@/components/loan-tracker-panel";
import WalletPerformancePanel from "@/components/wallet-performance-panel";
import CollaborationHub from "@/components/collaboration-hub";
import PlantationActivityTimeline from "@/components/plantation-activity-timeline";
import SecurityPanel from "@/components/security-panel";
import SecurityEventsPanel from "@/components/security-events-panel";
import SecurityMonitor from "@/components/security-monitor";
import SessionGuard from "@/components/session-guard";
import ExportSummaryModal from "@/components/export-summary-modal";
import AlertInsightsPanel from "@/components/alert-insights-panel";
import TaskKanbanBoard from "@/components/task-kanban-board";
import StageTemplatePanel from "@/components/stage-template-panel";
import Modal from "@/components/ui/modal";
import WeatherWidget from "@/components/weather-widget";
import SettingsPanel from "@/components/settings-panel";
import ActivityFeed from "@/components/activity-feed";
import PlantationTemplates from "@/components/plantation-templates";
import AdvancedFilters from "@/components/advanced-filters";
import InventoryPanel from "@/components/inventory-panel";
import FinancialDashboard from "@/components/financial-dashboard";
import MarketPrices from "@/components/market-prices";
import DocumentLibrary from "@/components/document-library";
import HarvestPlanner from "@/components/harvest-planner";
import EquipmentTracker from "@/components/equipment-tracker";
import WeatherAlertsPanel from "@/components/weather-alerts-panel";
import SupplyChainTracker from "@/components/supply-chain-tracker";
import CertificationManager from "@/components/certification-manager";
import ResourceAllocation from "@/components/resource-allocation";
import QualityControlPanel from "@/components/quality-control-panel";
import PestDiseaseManager from "@/components/pest-disease-manager";
import IrrigationTracker from "@/components/irrigation-tracker";
import ReportingDashboard from "@/components/reporting-dashboard";
import MobileFeatures from "@/components/mobile-features";
import TrainingResources from "@/components/training-resources";
import MarketplacePanel from "@/components/marketplace-panel";
import SoilManagementPanel from "@/components/soil-management-panel";
import ComplianceTracker from "@/components/compliance-tracker";
import BudgetPlanner from "@/components/budget-planner";
import LaborManagement from "@/components/labor-management";
import MaintenanceScheduler from "@/components/maintenance-scheduler";
import RiskAssessmentPanel from "@/components/risk-assessment-panel";
import PerformanceBenchmark from "@/components/performance-benchmark";
import InsuranceTracker from "@/components/insurance-tracker";
import CropRotationPlanner from "@/components/crop-rotation-planner";
import SustainabilityScorecard from "@/components/sustainability-scorecard";
import PhotoGallery from "@/components/photo-gallery";
import LoanCalculator from "@/components/loan-calculator";
import SeasonalPlanner from "@/components/seasonal-planner";
import ComplianceChecklist from "@/components/compliance-checklist";
import FarmerNetwork from "@/components/farmer-network";
import WeatherHistory from "@/components/weather-history";
import ExpenseCategories from "@/components/expense-categories";
import SupplierManagement from "@/components/supplier-management";
import HarvestQualityTracker from "@/components/harvest-quality-tracker";
import ContractManagement from "@/components/contract-management";
import TrainingRecords from "@/components/training-records";
import AuditTrail from "@/components/audit-trail";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAccount } from "wagmi";
import {
  usePlantationsStore,
  type Plantation,
  type GrowthStage,
  type PlantationDraft,
  type TaskStatus,
} from "@/store/plantations";
import { useWalletStore } from "@/store/wallets";
import { useSecurityStore } from "@/store/security";
import {
  useEngagementStore,
  computeReceiptTotals,
  computeComplaintStats,
  computeLoanMetrics,
} from "@/store/engagement";
import { buildAnalyticsSnapshot } from "@/lib/analytics";

const FRIENDLY_WELCOME_NOTE =
  "Welcome back to the grove — harvest insights refresh in real-time.";

export default function DashboardPage() {
  const { address, status } = useAccount();
  const plantations = usePlantationsStore((state) => state.plantations);
  const addPlantation = usePlantationsStore((state) => state.addPlantation);
  const updateStage = usePlantationsStore((state) => state.updateStage);
  const updateTaskStatus = usePlantationsStore(
    (state) => state.updateTaskStatus
  );
  const setTaskAssignee = usePlantationsStore(
    (state) => state.setTaskAssignee
  );
  const updateStages = usePlantationsStore((state) => state.updateStages);
  const recordCollaboratorNote = usePlantationsStore(
    (state) => state.recordCollaboratorNote
  );
  const addCollaborator = usePlantationsStore(
    (state) => state.addCollaborator
  );
  const recurringTemplates = usePlantationsStore(
    (state) => state.recurringTemplates
  );
  const recordSecurityEvent = useSecurityStore(
    (state) => state.recordEvent
  );
  const getPlantationsByWallet = usePlantationsStore(
    (state) => state.getPlantationsByWallet
  );
  const setConnectedWallet = useWalletStore(
    (state) => state.setConnectedWallet
  );
  const activeAddresses = useWalletStore((state) => state.activeAddresses);
  const receipts = useEngagementStore((state) => state.receipts);
  const complaints = useEngagementStore((state) => state.complaints);
  const loans = useEngagementStore((state) => state.loans);

  const [isPlantModalOpen, setPlantModalOpen] = useState(false);
  const [updateTarget, setUpdateTarget] = useState<Plantation | null>(null);
  const [isRecurringModalOpen, setRecurringModalOpen] = useState(false);
  const [isReceiptModalOpen, setReceiptModalOpen] = useState(false);
  const [isComplaintModalOpen, setComplaintModalOpen] = useState(false);
  const [isLoanModalOpen, setLoanModalOpen] = useState(false);
  const [isExportModalOpen, setExportModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [stageFilter, setStageFilter] = useState<GrowthStage | "all">("all");
  const [sortBy, setSortBy] = useState<"date" | "name" | "stage">("date");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedPlantations, setSelectedPlantations] = useState<Set<string>>(
    new Set()
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [dateRangeFilter, setDateRangeFilter] = useState<{
    start?: string;
    end?: string;
  }>({});
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [favoritesHydrated, setFavoritesHydrated] = useState(false);
  const [quickFilterPreset, setQuickFilterPreset] = useState<string | null>(null);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [comparisonPlantations, setComparisonPlantations] = useState<Set<string>>(new Set());
  const [showCalendarView, setShowCalendarView] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [notes, setNotes] = useState<Map<string, string>>(new Map());
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [notesTargetId, setNotesTargetId] = useState<string | null>(null);
  const [notesInput, setNotesInput] = useState<string>("");
  const [dashboardLayout, setDashboardLayout] = useState<"default" | "compact" | "spacious">("default");
  const [showDataInsights, setShowDataInsights] = useState(true);
  const [widgetVisibility, setWidgetVisibility] = useState({
    quickStats: true,
    performanceMetrics: true,
    dataInsights: true,
    recentActivity: true,
    favoritesSpotlight: true,
  });
  const [showNotificationCenter, setShowNotificationCenter] = useState(false);
  const [exportFormat, setExportFormat] = useState<"json" | "csv" | "pdf">("json");
  const [showAchievements, setShowAchievements] = useState(false);
  const [showProgressTracker, setShowProgressTracker] = useState(false);
  const [showMarketPrices, setShowMarketPrices] = useState(false);
  const [showWeatherWidget, setShowWeatherWidget] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState<"summary" | "detailed" | "financial">("summary");
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [showCollaborationTools, setShowCollaborationTools] = useState(false);
  const [showTimelineView, setShowTimelineView] = useState(false);
  const [dashboardTheme, setDashboardTheme] = useState<"light" | "dark" | "auto">("light");
  const [showStatisticsComparison, setShowStatisticsComparison] = useState(false);
  const [showQuickActionsPanel, setShowQuickActionsPanel] = useState(false);
  const [showHelpCenter, setShowHelpCenter] = useState(false);
  const [showAnalyticsDashboard, setShowAnalyticsDashboard] = useState(false);
  const [showPerformanceMonitor, setShowPerformanceMonitor] = useState(false);
  const [showDataVisualization, setShowDataVisualization] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [showImportWizard, setShowImportWizard] = useState(false);
  const [showDashboardSettings, setShowDashboardSettings] = useState(false);
  const [showActivityFeed, setShowActivityFeed] = useState(false);
  const [showSmartRecommendations, setShowSmartRecommendations] = useState(false);
  const [showBatchOperations, setShowBatchOperations] = useState(false);
  const [showDataInsightsAdvanced, setShowDataInsightsAdvanced] = useState(false);
  const [showChartsGallery, setShowChartsGallery] = useState(false);
  const [showTagsManager, setShowTagsManager] = useState(false);
  const [showReminders, setShowReminders] = useState(false);
  const [showBackupRestore, setShowBackupRestore] = useState(false);
  const [showDataValidation, setShowDataValidation] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showDocumentScanner, setShowDocumentScanner] = useState(false);
  const [showComplianceTracker, setShowComplianceTracker] = useState(false);
  const [showYieldOptimizer, setShowYieldOptimizer] = useState(false);
  const [showRiskAssessment, setShowRiskAssessment] = useState(false);
  const [showSupplyChainManager, setShowSupplyChainManager] = useState(false);
  const [showAdvancedAnalytics, setShowAdvancedAnalytics] = useState(false);
  const [showAutomationRules, setShowAutomationRules] = useState(false);
  const [showWeatherForecast, setShowWeatherForecast] = useState(false);
  const [showCarbonCalculator, setShowCarbonCalculator] = useState(false);
  const [showHarvestScheduler, setShowHarvestScheduler] = useState(false);
  const [showExpenseTracker, setShowExpenseTracker] = useState(false);
  const [showCropRotation, setShowCropRotation] = useState(false);
  const [showSoilAnalysis, setShowSoilAnalysis] = useState(false);
  const [showEquipmentMaintenance, setShowEquipmentMaintenance] = useState(false);
  const [showFinancialPlanner, setShowFinancialPlanner] = useState(false);
  const [showTaskTemplates, setShowTaskTemplates] = useState(false);
  const [showDataSync, setShowDataSync] = useState(false);
  const [showHealthMonitor, setShowHealthMonitor] = useState(false);
  const [showCommunityHub, setShowCommunityHub] = useState(false);
  const [showBudgetPlanner, setShowBudgetPlanner] = useState(false);
  const [showInventoryAlerts, setShowInventoryAlerts] = useState(false);
  const [showPerformanceReports, setShowPerformanceReports] = useState(false);
  const [showExportManager, setShowExportManager] = useState(false);
  const previousConnectionRef = useRef<{
    connected: boolean;
    address?: string;
  }>({ connected: false, address: undefined });

  const isConnected = status === "connected" && Boolean(address);

  const walletPlantations = useMemo(() => {
    if (!address) {
      return plantations;
    }

    const ownPlantations = getPlantationsByWallet(address);
    return ownPlantations.length ? ownPlantations : plantations;
  }, [address, getPlantationsByWallet, plantations]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    try {
      const stored = window.localStorage.getItem("cocoa-favorite-plantations");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setFavorites(new Set<string>(parsed));
        }
      }
    } catch (error) {
      console.warn("[dashboard] failed to hydrate favorites", error);
    } finally {
      setFavoritesHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!favoritesHydrated || typeof window === "undefined") {
      return;
    }
    try {
      const serialized = JSON.stringify(Array.from(favorites));
      window.localStorage.setItem("cocoa-favorite-plantations", serialized);
    } catch (error) {
      console.warn("[dashboard] failed to persist favorites", error);
    }
  }, [favorites, favoritesHydrated]);

  useEffect(() => {
    if (status === "connected" && address) {
      setConnectedWallet(address);
      return;
    }
    if (status !== "connecting") {
      setConnectedWallet(undefined);
    }
  }, [status, address, setConnectedWallet]);

  useEffect(() => {
    const wasConnected = previousConnectionRef.current.connected;
    const previousAddress = previousConnectionRef.current.address;
    const isNowConnected = status === "connected" && Boolean(address);

    if (isNowConnected && address && (!wasConnected || previousAddress !== address)) {
      recordSecurityEvent({
        type: "wallet_connected",
        message: `Wallet ${address.slice(0, 6)}…${address.slice(-4)} connected.`,
      });
    } else if (!isNowConnected && wasConnected && previousAddress) {
      recordSecurityEvent({
        type: "wallet_disconnected",
        message: `Wallet ${previousAddress.slice(0, 6)}…${previousAddress.slice(-4)} disconnected.`,
      });
    }

    previousConnectionRef.current = {
      connected: isNowConnected,
      address: isNowConnected ? address ?? undefined : undefined,
    };
  }, [status, address, recordSecurityEvent]);

  const normalizedFilters = activeAddresses;

  const filteredPlantations = useMemo(() => {
    let result = plantations;

    // Filter by wallet addresses
    if (normalizedFilters.length > 0) {
      result = result.filter((plantation) =>
      normalizedFilters.includes(plantation.walletAddress.toLowerCase())
    );
    } else if (isConnected) {
      result = walletPlantations;
    }

    // Filter by stage
    if (stageFilter !== "all") {
      result = result.filter((plantation) => plantation.stage === stageFilter);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (plantation) =>
          plantation.seedName.toLowerCase().includes(query) ||
          plantation.location?.toLowerCase().includes(query) ||
          plantation.notes?.toLowerCase().includes(query)
      );
    }

    // Filter by location
    if (locationFilter.trim()) {
      const location = locationFilter.toLowerCase();
      result = result.filter(
        (plantation) =>
          plantation.location?.toLowerCase().includes(location)
      );
    }

    // Filter by date range
    if (dateRangeFilter.start || dateRangeFilter.end) {
      result = result.filter((plantation) => {
        const startDate = plantation.startDate;
        if (dateRangeFilter.start && startDate < dateRangeFilter.start) {
          return false;
        }
        if (dateRangeFilter.end && startDate > dateRangeFilter.end) {
          return false;
        }
        return true;
      });
    }

    // Sort
    const sorted = [...result].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.seedName.localeCompare(b.seedName);
        case "stage":
          const stageOrder: GrowthStage[] = ["planted", "growing", "harvested"];
  return (
            stageOrder.indexOf(a.stage) - stageOrder.indexOf(b.stage)
          );
        case "date":
        default:
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
      }
    });

    return sorted;
  }, [
    normalizedFilters,
    plantations,
    isConnected,
    walletPlantations,
    stageFilter,
    searchQuery,
    sortBy,
    locationFilter,
    dateRangeFilter,
  ]);

  const favoritePlantations = useMemo(() => {
    if (!favoritesHydrated || favorites.size === 0) {
      return [];
    }
    return plantations.filter((plantation) => favorites.has(plantation.id));
  }, [favoritesHydrated, favorites, plantations]);

  const favoriteSummary = useMemo(() => {
    if (favoritePlantations.length === 0) {
      return null;
    }

    const harvested = favoritePlantations.filter(
      (plantation) => plantation.stage === "harvested"
    ).length;
    const growing = favoritePlantations.filter(
      (plantation) => plantation.stage === "growing"
    ).length;
    const planted = favoritePlantations.length - harvested - growing;

    const totalCarbon = favoritePlantations.reduce(
      (acc, plantation) => acc + plantation.carbonOffsetTons,
      0
    );
    const totalArea = favoritePlantations.reduce(
      (acc, plantation) => acc + plantation.areaHectares,
      0
    );
    const totalTrees = favoritePlantations.reduce(
      (acc, plantation) => acc + plantation.treeCount,
      0
    );

    const recentlyUpdated = [...favoritePlantations]
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )
      .slice(0, 3);

    return {
      count: favoritePlantations.length,
      distribution: { planted, growing, harvested },
      carbon: totalCarbon,
      area: totalArea,
      trees: totalTrees,
      recentlyUpdated,
    };
  }, [favoritePlantations]);

  const primaryPlantationId = filteredPlantations[0]?.id;

  const stats = useMemo(() => {
    const totalSeeds = filteredPlantations.length;
    const harvested = filteredPlantations.filter(
      (plantation) => plantation.stage === "harvested"
    ).length;
    const growing = filteredPlantations.filter(
      (plantation) => plantation.stage === "growing"
    ).length;

    return { totalSeeds, harvested, growing };
  }, [filteredPlantations]);

  const dashboardWelcomeNote = useMemo(() => {
    if (!stats.totalSeeds) {
      if (isConnected) {
        return "You're connected — plant your first seed to activate insights.";
      }
      return FRIENDLY_WELCOME_NOTE;
    }

    const fragments: string[] = [];

    if (stats.harvested) {
      fragments.push(`${stats.harvested} ready for harvest`);
    }

    if (stats.growing) {
      fragments.push(`${stats.growing} in active growth`);
    }

    const suffix = fragments.length
      ? ` with ${fragments.join(" and ")}`
      : "";

    return `${FRIENDLY_WELCOME_NOTE} Overseeing ${stats.totalSeeds} plantations${suffix}.`;
  }, [isConnected, stats.totalSeeds, stats.harvested, stats.growing]);

  useEffect(() => {
    console.debug("[dashboard] welcome-note", dashboardWelcomeNote);
  }, [dashboardWelcomeNote]);

  // Performance monitoring
  useEffect(() => {
    const startTime = performance.now();
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      if (renderTime > 100) {
        console.warn(`[dashboard] Slow render detected: ${renderTime.toFixed(2)}ms`);
      }
    };
  });

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        const searchInput = document.querySelector(
          'input[placeholder="Search plantations..."]'
        ) as HTMLInputElement;
        searchInput?.focus();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "n") {
        e.preventDefault();
        setPlantModalOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const analyticsSnapshot = useMemo(
    () => buildAnalyticsSnapshot(filteredPlantations),
    [filteredPlantations]
  );

  const receiptTotals = useMemo(
    () => computeReceiptTotals(receipts),
    [receipts]
  );
  const complaintStats = useMemo(
    () => computeComplaintStats(complaints),
    [complaints]
  );
  const loanMetrics = useMemo(
    () => computeLoanMetrics(loans),
    [loans]
  );
  const primaryLoanCurrency = loanMetrics.latest?.currency ?? "USD";
  const openSupportCount =
    complaintStats.counts.open + complaintStats.counts.in_progress;

  const formatCurrency = useCallback(
    (value: number, currency: string) =>
      new Intl.NumberFormat(undefined, {
        style: "currency",
        currency,
        currencyDisplay: "narrowSymbol",
        maximumFractionDigits: 2,
      }).format(value),
    []
  );

  const taskSummary = useMemo(() => {
    const nowTime = new Date().getTime();
    const soonThreshold = nowTime + 1000 * 60 * 60 * 24 * 3; // 3 days
    let active = 0;
    let dueSoon = 0;
    let overdue = 0;

    filteredPlantations.forEach((plantation) => {
      plantation.tasks.forEach((task) => {
        if (task.status === "completed") {
          return;
        }
        active += 1;
        const dueTime = new Date(task.dueDate).getTime();
        if (Number.isNaN(dueTime)) {
          return;
        }
        if (dueTime < nowTime) {
          overdue += 1;
        } else if (dueTime <= soonThreshold) {
          dueSoon += 1;
        }
      });
    });

    return { active, dueSoon, overdue };
  }, [filteredPlantations]);

  const carbonTotals = analyticsSnapshot.sustainability.totals;
  const carbonPerTree =
    carbonTotals.treeCount > 0
      ? carbonTotals.carbonOffsetTons / carbonTotals.treeCount
      : null;
  const carbonPerHectare =
    carbonTotals.areaHectares > 0
      ? carbonTotals.carbonOffsetTons / carbonTotals.areaHectares
      : null;

  const nextForecast = analyticsSnapshot.yieldForecasts[0];

  const dashboardMetrics = useMemo(() => {
    const receiptCurrency = receiptTotals.latest?.currency ?? "USD";
    const financeValue = receiptTotals.count
      ? formatCurrency(receiptTotals.totalAmount, receiptCurrency)
      : "—";
    const financeCaption =
      receiptTotals.count === 0
        ? "No receipts logged yet"
        : `${receiptTotals.count} receipt${receiptTotals.count === 1 ? "" : "s"} logged`;

    const loanPipelineTotal =
      loanMetrics.totals.pending + loanMetrics.totals.approved;
    const loanValue = loanMetrics.count
      ? formatCurrency(loanPipelineTotal, primaryLoanCurrency)
      : "—";

    const plantationCaption =
      stats.totalSeeds === 0
        ? isConnected
          ? "Plant your first cocoa seed"
          : "Connect your wallet to start tracking"
        : [
            stats.harvested ? `${stats.harvested} harvested` : null,
            stats.growing ? `${stats.growing} growing` : null,
          ]
            .filter(Boolean)
            .join(" • ") || "Monitoring plantation lifecycle";

    const plantationTrendLabel =
      stats.totalSeeds === 0
        ? "Awaiting first plantation"
        : stats.harvested
        ? `${stats.harvested} harvested`
        : "First harvest pending";

    const plantationTrendDirection =
      stats.harvested > 0
        ? "up"
        : stats.totalSeeds > 0
        ? "neutral"
        : "down";

    const metrics: DashboardMetric[] = [
      {
        id: "plantations",
        label: "Plantations Tracked",
        value: stats.totalSeeds.toString(),
        caption: plantationCaption,
        icon: "🌱",
        trendLabel: plantationTrendLabel,
        trendDirection: plantationTrendDirection,
        emphasis: true,
      },
      {
        id: "finance",
        label: "Finance Receipts",
        value: financeValue,
        caption: financeCaption,
        icon: "📄",
        trendLabel: receiptTotals.latest
          ? `Latest ${new Date(
              receiptTotals.latest.uploadedAt
            ).toLocaleDateString()}`
          : "Awaiting first upload",
        trendDirection: receiptTotals.latest ? "up" : "neutral",
      },
      {
        id: "support",
        label: "Support Tickets",
        value: openSupportCount.toString(),
        caption: `${complaintStats.counts.resolved} resolved`,
        icon: "🛠️",
        trendLabel: complaintStats.highPriorityOpen
          ? `${complaintStats.highPriorityOpen} high priority`
          : "No urgent cases",
        trendDirection: complaintStats.highPriorityOpen ? "down" : "up",
      },
      {
        id: "loan-pipeline",
        label: "Loan Pipeline",
        value: loanValue,
        caption: `${loanMetrics.byStatus.pending} pending`,
        icon: "💰",
        trendLabel: loanMetrics.byStatus.approved
          ? `${loanMetrics.byStatus.approved} approved`
          : "Awaiting review",
        trendDirection: loanMetrics.byStatus.approved ? "up" : "neutral",
      },
    ];

    if (nextForecast) {
      metrics.push({
        id: "next-harvest",
        label: "Next Harvest",
        value: `${nextForecast.projectedYieldKg.toLocaleString()} kg`,
        caption: `Projected by ${new Date(
          nextForecast.projectionDate
        ).toLocaleDateString()}`,
        icon: "🚚",
        trendLabel: `${nextForecast.confidence.toUpperCase()} confidence`,
        trendDirection:
          nextForecast.confidence === "high"
            ? "up"
            : nextForecast.confidence === "low"
            ? "down"
            : "neutral",
      });
    }

    metrics.push(
      {
        id: "tasks",
        label: "Active Tasks",
        value: taskSummary.active.toString(),
        caption: `${taskSummary.dueSoon} due soon`,
        icon: "🗓️",
        trendLabel: taskSummary.overdue
          ? `${taskSummary.overdue} overdue`
          : "All on track",
        trendDirection: taskSummary.overdue
          ? "down"
          : taskSummary.dueSoon
          ? "neutral"
          : "up",
      },
      {
        id: "carbon",
        label: "Carbon Offset",
        value: `${carbonTotals.carbonOffsetTons.toLocaleString()} tCO₂`,
        caption: `${carbonTotals.treeCount.toLocaleString()} trees`,
        icon: "🌍",
        trendLabel: `${carbonTotals.areaHectares.toLocaleString()} ha protected`,
        trendDirection: "up",
      },
      {
        id: "carbon-intensity",
        label: "Carbon Efficiency",
        value:
          carbonPerTree != null
            ? `${(carbonPerTree * 1000).toFixed(1)} kg/tree`
            : "—",
        caption:
          carbonPerHectare != null
            ? `${carbonPerHectare.toFixed(2)} tCO₂ per ha`
            : "Awaiting data",
        icon: "♻️",
        trendLabel:
          carbonPerTree != null && carbonPerHectare != null
            ? `Per-tree & per-ha offsets refreshed`
            : "Need more sustainability data",
        trendDirection:
          carbonPerTree != null && carbonPerHectare != null ? "up" : "neutral",
      }
    );

    return metrics;
  }, [
    stats.totalSeeds,
    stats.harvested,
    stats.growing,
    isConnected,
    receiptTotals,
    formatCurrency,
    openSupportCount,
    complaintStats,
    loanMetrics,
    primaryLoanCurrency,
    nextForecast,
    taskSummary.active,
    taskSummary.dueSoon,
    taskSummary.overdue,
    carbonTotals.carbonOffsetTons,
    carbonTotals.treeCount,
    carbonTotals.areaHectares,
  ]);

  const handlePlantSeedClick = () => {
    setPlantModalOpen(true);
  };

  const handlePlantSeedSubmit = (draft: PlantationDraft) => {
    addPlantation(draft);
  };

  const handleAdvanceStage = (
    plantation: Plantation,
    nextStage: GrowthStage
  ) => {
    updateStage(plantation.id, nextStage);
  };

  const handleBulkStageUpdate = (
    plantationIds: string[],
    nextStage: GrowthStage,
    note?: string
  ) => {
    updateStages(plantationIds, nextStage, note);
  };

  const handleUpdateRequest = (plantation: Plantation) => {
    setUpdateTarget(plantation);
  };

  const handleUpdateSubmit = (nextStage: GrowthStage, note?: string) => {
    if (!updateTarget) return;
    updateStage(updateTarget.id, nextStage, note);
    setUpdateTarget(null);
  };

  const handleTaskStatusChange = useCallback(
    (plantationId: string, taskId: string, status: TaskStatus) => {
      updateTaskStatus(plantationId, taskId, status);
    },
    [updateTaskStatus]
  );

  const handleTaskAssign = useCallback(
    (plantationId: string, taskId: string, assigneeId?: string) => {
      setTaskAssignee(plantationId, taskId, assigneeId);
    },
    [setTaskAssignee]
  );

  const handleCloseModals = () => {
    setPlantModalOpen(false);
    setUpdateTarget(null);
  };

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsRefreshing(false);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchQuery("");
    setStageFilter("all");
    setSortBy("date");
    setLocationFilter("");
    setDateRangeFilter({});
    setShowAdvancedFilters(false);
  }, []);

  const handleToggleSelection = useCallback((plantationId: string) => {
    setSelectedPlantations((prev) => {
      const next = new Set(prev);
      if (next.has(plantationId)) {
        next.delete(plantationId);
      } else {
        next.add(plantationId);
      }
      return next;
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    if (selectedPlantations.size === filteredPlantations.length) {
      setSelectedPlantations(new Set());
    } else {
      setSelectedPlantations(
        new Set(filteredPlantations.map((p) => p.id))
      );
    }
  }, [filteredPlantations, selectedPlantations.size]);

  const handleBulkAdvanceStage = useCallback(
    (nextStage: GrowthStage) => {
      const ids = Array.from(selectedPlantations);
      if (ids.length > 0) {
        updateStages(ids, nextStage);
        setSelectedPlantations(new Set());
      }
    },
    [selectedPlantations, updateStages]
  );

  const handleToggleFavorite = useCallback((plantationId: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(plantationId)) {
        next.delete(plantationId);
      } else {
        next.add(plantationId);
      }
      return next;
    });
  }, []);

  const handleQuickFilterPreset = useCallback((preset: string) => {
    setQuickFilterPreset(preset);
    switch (preset) {
      case "recent":
        setSortBy("date");
        setStageFilter("all");
        setDateRangeFilter({
          start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
        });
        break;
      case "growing":
        setStageFilter("growing");
        setSortBy("date");
        break;
      case "harvest-ready":
        setStageFilter("growing");
        setSortBy("date");
        break;
      case "favorites":
        // Filter will be handled by favorites filter
        setSortBy("date");
        setStageFilter("all");
        break;
      case "needs-attention":
        setStageFilter("all");
        setSortBy("date");
        break;
      default:
        setQuickFilterPreset(null);
    }
  }, []);

  const handleToggleComparison = useCallback((plantationId: string) => {
    if (!comparisonMode) {
      setComparisonMode(true);
    }
    setComparisonPlantations((prev) => {
      const next = new Set(prev);
      if (next.has(plantationId)) {
        next.delete(plantationId);
        if (next.size === 0) {
          setComparisonMode(false);
        }
      } else {
        if (next.size >= 3) {
          return next; // Max 3 for comparison
        }
        next.add(plantationId);
      }
      return next;
    });
  }, [comparisonMode]);

  const recentActivity = useMemo(() => {
    const activities: Array<{
      id: string;
      type: string;
      message: string;
      timestamp: string;
      plantationId?: string;
    }> = [];

    filteredPlantations.forEach((plantation) => {
      activities.push({
        id: `activity-${plantation.id}-update`,
        type: "update",
        message: `${plantation.seedName} updated`,
        timestamp: plantation.updatedAt,
        plantationId: plantation.id,
      });
    });

    return activities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10);
  }, [filteredPlantations]);

  const handleOpenNotes = useCallback((plantationId: string) => {
    setNotesTargetId(plantationId);
    setNotesInput(notes.get(plantationId) || "");
    setShowNotesModal(true);
  }, [notes]);

  const handleSaveNote = useCallback((plantationId: string, note: string) => {
    setNotes((prev) => {
      const next = new Map(prev);
      if (note.trim()) {
        next.set(plantationId, note.trim());
      } else {
        next.delete(plantationId);
      }
      return next;
    });
    setShowNotesModal(false);
    setNotesTargetId(null);
  }, []);

  const calendarEvents = useMemo(() => {
    const events: Array<{
      date: string;
      plantations: Plantation[];
      tasks: Array<{ plantationId: string; task: any }>;
    }> = [];

    filteredPlantations.forEach((plantation) => {
      // Add plantation start date
      const startDate = plantation.startDate.split("T")[0];
      const existingEvent = events.find((e) => e.date === startDate);
      if (existingEvent) {
        existingEvent.plantations.push(plantation);
      } else {
        events.push({
          date: startDate,
          plantations: [plantation],
          tasks: [],
        });
      }

      // Add tasks
      plantation.tasks.forEach((task) => {
        const taskDate = task.dueDate.split("T")[0];
        const existingEvent = events.find((e) => e.date === taskDate);
        if (existingEvent) {
          existingEvent.tasks.push({ plantationId: plantation.id, task });
        } else {
          events.push({
            date: taskDate,
            plantations: [],
            tasks: [{ plantationId: plantation.id, task }],
          });
        }
      });
    });

    return events.sort((a, b) => a.date.localeCompare(b.date));
  }, [filteredPlantations]);

  const dataInsights = useMemo(() => {
    const insights: Array<{
      type: "success" | "warning" | "info";
      title: string;
      message: string;
      icon: string;
    }> = [];

    // Harvest rate insight
    if (stats.harvested > 0 && stats.totalSeeds > 0) {
      const harvestRate = (stats.harvested / stats.totalSeeds) * 100;
      if (harvestRate >= 50) {
        insights.push({
          type: "success",
          title: "Excellent Harvest Rate",
          message: `${harvestRate.toFixed(0)}% of plantations have been harvested.`,
          icon: "🎉",
        });
      } else if (harvestRate < 20) {
        insights.push({
          type: "warning",
          title: "Low Harvest Rate",
          message: `Only ${harvestRate.toFixed(0)}% harvested. Consider reviewing growing plantations.`,
          icon: "⚠️",
        });
      }
    }

    // Task insights
    if (taskSummary.overdue > 0) {
      insights.push({
        type: "warning",
        title: "Overdue Tasks",
        message: `${taskSummary.overdue} task${taskSummary.overdue > 1 ? "s" : ""} ${taskSummary.overdue > 1 ? "are" : "is"} overdue.`,
        icon: "⏰",
      });
    }

    // Carbon offset insight
    if (carbonTotals.carbonOffsetTons > 100) {
      insights.push({
        type: "success",
        title: "Significant Carbon Impact",
        message: `Your plantations have offset ${carbonTotals.carbonOffsetTons.toLocaleString()} tons of CO₂.`,
        icon: "🌍",
      });
    }

    // Growing plantations insight
    if (stats.growing > stats.harvested && stats.growing > 0) {
      insights.push({
        type: "info",
        title: "Active Growth Phase",
        message: `${stats.growing} plantation${stats.growing > 1 ? "s are" : " is"} in active growth.`,
        icon: "🌱",
      });
    }

    return insights.slice(0, 5);
  }, [stats, taskSummary, carbonTotals]);

  const handleExportData = useCallback(() => {
    const exportData = {
      plantations: filteredPlantations,
      receipts,
      complaints,
      loans,
      favorites: Array.from(favorites),
      notes: Object.fromEntries(notes),
      exportDate: new Date().toISOString(),
      version: "1.0",
    };

    if (exportFormat === "json") {
      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `cocoa-chain-export-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else if (exportFormat === "csv") {
      const csvRows: string[] = [];
      csvRows.push("ID,Seed Name,Location,Stage,Start Date,Updated At,Tree Count,Area (ha),Carbon Offset (tCO₂)");
      filteredPlantations.forEach((p) => {
        csvRows.push(
          `${p.id},"${p.seedName}","${p.location || ""}",${p.stage},${p.startDate},${p.updatedAt},${p.treeCount},${p.areaHectares},${p.carbonOffsetTons}`
        );
      });
      const csv = csvRows.join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `cocoa-chain-export-${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }, [filteredPlantations, receipts, complaints, loans, favorites, notes, exportFormat]);

  const handleImportData = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);
        
        if (data.favorites && Array.isArray(data.favorites)) {
          setFavorites(new Set(data.favorites));
        }
        if (data.notes && typeof data.notes === "object") {
          setNotes(new Map(Object.entries(data.notes)));
        }
        
        alert("Data imported successfully!");
      } catch (error) {
        alert("Failed to import data. Please check the file format.");
        console.error("Import error:", error);
      }
    };
    reader.readAsText(file);
  }, []);

  const handleShareDashboard = useCallback(() => {
    const shareData = {
      title: "Cocoa Chain Dashboard",
      text: `View my ${stats.totalSeeds} plantations with ${stats.harvested} harvested!`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData).catch((error) => {
        console.error("Error sharing:", error);
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Dashboard URL copied to clipboard!");
    }
  }, [stats]);

  const achievements = useMemo(() => {
    const achieved: Array<{
      id: string;
      title: string;
      description: string;
      icon: string;
      unlocked: boolean;
    }> = [];

    // First plantation achievement
    if (stats.totalSeeds >= 1) {
      achieved.push({
        id: "first-plantation",
        title: "First Steps",
        description: "Planted your first cocoa seed",
        icon: "🌱",
        unlocked: true,
      });
    }

    // Harvest achievement
    if (stats.harvested >= 1) {
      achieved.push({
        id: "first-harvest",
        title: "Harvest Master",
        description: "Completed your first harvest",
        icon: "🚚",
        unlocked: true,
      });
    }

    // Multiple plantations
    if (stats.totalSeeds >= 5) {
      achieved.push({
        id: "five-plantations",
        title: "Growing Collection",
        description: "Managed 5+ plantations",
        icon: "🌳",
        unlocked: true,
      });
    }

    // Carbon offset achievement
    if (carbonTotals.carbonOffsetTons >= 50) {
      achieved.push({
        id: "carbon-hero",
        title: "Carbon Hero",
        description: "Offset 50+ tons of CO₂",
        icon: "🌍",
        unlocked: true,
      });
    }

    // Task completion achievement
    const completedTasks = filteredPlantations.reduce(
      (acc, p) =>
        acc + p.tasks.filter((t) => t.status === "completed").length,
      0
    );
    if (completedTasks >= 10) {
      achieved.push({
        id: "task-master",
        title: "Task Master",
        description: "Completed 10+ tasks",
        icon: "✅",
        unlocked: true,
      });
    }

    // Favorites achievement
    if (favorites.size >= 3) {
      achieved.push({
        id: "favorite-collector",
        title: "Favorite Collector",
        description: "Starred 3+ plantations",
        icon: "⭐",
        unlocked: true,
      });
    }

    return achieved;
  }, [stats, carbonTotals, filteredPlantations, favorites]);

  const progressMetrics = useMemo(() => {
    const totalPossibleTasks = filteredPlantations.reduce(
      (acc, p) => acc + p.tasks.length,
      0
    );
    const completedTasks = filteredPlantations.reduce(
      (acc, p) =>
        acc + p.tasks.filter((t) => t.status === "completed").length,
      0
    );
    const taskCompletionRate =
      totalPossibleTasks > 0
        ? (completedTasks / totalPossibleTasks) * 100
        : 0;

    const averageGrowthDays = analyticsSnapshot.averageDaysToHarvest || 0;
    const targetGrowthDays = 180; // 6 months target
    const growthProgress =
      averageGrowthDays > 0
        ? Math.min((averageGrowthDays / targetGrowthDays) * 100, 100)
        : 0;

    const harvestProgress =
      stats.totalSeeds > 0 ? (stats.harvested / stats.totalSeeds) * 100 : 0;

    return {
      taskCompletion: {
        value: taskCompletionRate,
        label: "Task Completion",
        current: completedTasks,
        total: totalPossibleTasks,
      },
      growthProgress: {
        value: growthProgress,
        label: "Growth Efficiency",
        current: averageGrowthDays,
        target: targetGrowthDays,
        unit: "days",
      },
      harvestProgress: {
        value: harvestProgress,
        label: "Harvest Rate",
        current: stats.harvested,
        total: stats.totalSeeds,
      },
    };
  }, [filteredPlantations, analyticsSnapshot, stats]);

  const marketPrices = useMemo(() => {
    return {
      cocoa: {
        price: 2850,
        currency: "USD",
        unit: "ton",
        change: "+2.3%",
        trend: "up" as const,
      },
      carbon: {
        price: 45,
        currency: "USD",
        unit: "tCO₂",
        change: "+1.8%",
        trend: "up" as const,
      },
      lastUpdated: new Date().toISOString(),
    };
  }, []);

  const weatherData = useMemo(() => {
    const regions = Array.from(
      new Set(
        filteredPlantations
          .map((p) => p.location?.split(",")[1]?.trim() || "Unknown")
          .filter(Boolean)
      )
    );

    return regions.slice(0, 3).map((region) => ({
      region,
      temperature: 28 + Math.floor(Math.random() * 5),
      humidity: 75 + Math.floor(Math.random() * 10),
      rainfall: Math.floor(Math.random() * 20),
      condition: ["Sunny", "Partly Cloudy", "Cloudy"][
        Math.floor(Math.random() * 3)
      ] as string,
    }));
  }, [filteredPlantations]);

  const generateReport = useCallback(
    (type: "summary" | "detailed" | "financial") => {
      const report = {
        type,
        generatedAt: new Date().toISOString(),
        summary: {
          totalPlantations: stats.totalSeeds,
          harvested: stats.harvested,
          growing: stats.growing,
          totalCarbon: carbonTotals.carbonOffsetTons,
          totalTrees: carbonTotals.treeCount,
          totalArea: carbonTotals.areaHectares,
        },
        financial: {
          receipts: receiptTotals,
          loans: loanMetrics,
        },
        tasks: {
          active: taskSummary.active,
          overdue: taskSummary.overdue,
          dueSoon: taskSummary.dueSoon,
        },
        engagement: {
          complaints: complaintStats,
          receipts: receiptTotals.count,
          loans: loanMetrics.count,
        },
      };

      const blob = new Blob([JSON.stringify(report, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `cocoa-chain-report-${type}-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
    [
      stats,
      carbonTotals,
      receiptTotals,
      loanMetrics,
      taskSummary,
      complaintStats,
    ]
  );

  const timelineEvents = useMemo(() => {
    const events: Array<{
      id: string;
      date: string;
      type: "plantation" | "task" | "harvest" | "update";
      title: string;
      description: string;
      plantationId?: string;
    }> = [];

    filteredPlantations.forEach((plantation) => {
      // Plantation start
      events.push({
        id: `timeline-${plantation.id}-start`,
        date: plantation.startDate,
        type: "plantation",
        title: `Planted: ${plantation.seedName}`,
        description: plantation.location || "Location not specified",
        plantationId: plantation.id,
      });

      // Stage updates
      if (plantation.updatedAt !== plantation.startDate) {
        events.push({
          id: `timeline-${plantation.id}-update`,
          date: plantation.updatedAt,
          type: "update",
          title: `Updated: ${plantation.seedName}`,
          description: `Stage: ${plantation.stage}`,
          plantationId: plantation.id,
        });
      }

      // Tasks
      plantation.tasks.forEach((task) => {
        events.push({
          id: `timeline-${plantation.id}-task-${task.id}`,
          date: task.dueDate,
          type: "task",
          title: task.title,
          description: `${plantation.seedName} • Status: ${task.status}`,
          plantationId: plantation.id,
        });
      });

      // Harvests
      if (plantation.stage === "harvested") {
        events.push({
          id: `timeline-${plantation.id}-harvest`,
          date: plantation.updatedAt,
          type: "harvest",
          title: `Harvested: ${plantation.seedName}`,
          description: `Yield timeline: ${plantation.yieldTimeline.length} checkpoints`,
          plantationId: plantation.id,
        });
      }
    });

    return events.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [filteredPlantations]);

  const statisticsComparison = useMemo(() => {
    const allTimeStats = {
      totalPlantations: plantations.length,
      totalHarvested: plantations.filter((p) => p.stage === "harvested").length,
      totalCarbon: plantations.reduce(
        (acc, p) => acc + p.carbonOffsetTons,
        0
      ),
      totalTasks: plantations.reduce((acc, p) => acc + p.tasks.length, 0),
    };

    const filteredStats = {
      totalPlantations: filteredPlantations.length,
      totalHarvested: filteredPlantations.filter((p) => p.stage === "harvested")
        .length,
      totalCarbon: filteredPlantations.reduce(
        (acc, p) => acc + p.carbonOffsetTons,
        0
      ),
      totalTasks: filteredPlantations.reduce(
        (acc, p) => acc + p.tasks.length,
        0
      ),
    };

    return {
      allTime: allTimeStats,
      filtered: filteredStats,
      percentage: {
        plantations:
          (filteredStats.totalPlantations / Math.max(allTimeStats.totalPlantations, 1)) *
          100,
        harvested:
          (filteredStats.totalHarvested / Math.max(allTimeStats.totalHarvested, 1)) *
          100,
        carbon:
          (filteredStats.totalCarbon / Math.max(allTimeStats.totalCarbon, 1)) *
          100,
        tasks:
          (filteredStats.totalTasks / Math.max(allTimeStats.totalTasks, 1)) *
          100,
      },
    };
  }, [plantations, filteredPlantations]);

  const quickActions = useMemo(() => {
    return [
      {
        id: "plant-seed",
        label: "Plant Seed",
        icon: "🌱",
        action: () => setPlantModalOpen(true),
        color: "leaf",
      },
      {
        id: "upload-receipt",
        label: "Upload Receipt",
        icon: "📄",
        action: () => setReceiptModalOpen(true),
        color: "blue",
      },
      {
        id: "file-complaint",
        label: "File Complaint",
        icon: "🛠️",
        action: () => setComplaintModalOpen(true),
        color: "orange",
      },
      {
        id: "request-loan",
        label: "Request Loan",
        icon: "💰",
        action: () => setLoanModalOpen(true),
        color: "green",
      },
      {
        id: "export-data",
        label: "Export Data",
        icon: "📤",
        action: handleExportData,
        color: "purple",
      },
      {
        id: "generate-report",
        label: "Generate Report",
        icon: "📋",
        action: () => {
          setShowReports(true);
          generateReport("summary");
        },
        color: "indigo",
      },
    ];
  }, [handleExportData, generateReport]);

  const analyticsSummary = useMemo(() => {
    const totalYield = analyticsSnapshot.yieldForecasts.reduce(
      (acc, f) => acc + f.projectedYieldKg,
      0
    );
    const avgYield = analyticsSnapshot.yieldForecasts.length > 0
      ? totalYield / analyticsSnapshot.yieldForecasts.length
      : 0;

    return {
      totalYield,
      avgYield,
      activeRegions: analyticsSnapshot.activeRegions.length,
      cohortCount: analyticsSnapshot.cohortPerformance.length,
      avgDaysToHarvest: analyticsSnapshot.averageDaysToHarvest || 0,
    };
  }, [analyticsSnapshot]);

  const performanceMetrics = useMemo(() => {
    const renderTime = performance.now();
    const memoryInfo = (performance as any).memory;
    const memoryUsage = memoryInfo
      ? {
          used: Math.round(memoryInfo.usedJSHeapSize / 1048576),
          total: Math.round(memoryInfo.totalJSHeapSize / 1048576),
          limit: Math.round(memoryInfo.jsHeapSizeLimit / 1048576),
        }
      : null;

    return {
      renderTime: Math.round(renderTime),
      memoryUsage,
      plantationsLoaded: filteredPlantations.length,
      componentsRendered: 1,
      lastUpdate: new Date().toISOString(),
    };
  }, [filteredPlantations]);

  const dataVisualizationMetrics = useMemo(() => {
    const stageDistribution = {
      planted: filteredPlantations.filter((p) => p.stage === "planted").length,
      growing: filteredPlantations.filter((p) => p.stage === "growing").length,
      harvested: filteredPlantations.filter((p) => p.stage === "harvested").length,
    };

    const locationDistribution = filteredPlantations.reduce((acc, p) => {
      const location = p.location?.split(",")[1]?.trim() || "Unknown";
      acc[location] = (acc[location] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const taskStatusDistribution = {
      pending: filteredPlantations.reduce(
        (acc, p) => acc + p.tasks.filter((t) => t.status === "pending").length,
        0
      ),
      in_progress: filteredPlantations.reduce(
        (acc, p) => acc + p.tasks.filter((t) => t.status === "in_progress").length,
        0
      ),
      completed: filteredPlantations.reduce(
        (acc, p) => acc + p.tasks.filter((t) => t.status === "completed").length,
        0
      ),
    };

    return {
      stageDistribution,
      locationDistribution,
      taskStatusDistribution,
    };
  }, [filteredPlantations]);

  const smartRecommendations = useMemo(() => {
    const recommendations: Array<{
      id: string;
      type: "action" | "warning" | "info" | "success";
      title: string;
      description: string;
      action?: () => void;
      icon: string;
    }> = [];

    // Check for overdue tasks
    if (taskSummary.overdue > 0) {
      recommendations.push({
        id: "overdue-tasks",
        type: "warning",
        title: "Overdue Tasks Detected",
        description: `${taskSummary.overdue} task${taskSummary.overdue > 1 ? "s" : ""} ${taskSummary.overdue > 1 ? "are" : "is"} overdue. Consider updating their status.`,
        icon: "⏰",
        action: () => {
          setStageFilter("all");
          setSearchQuery("");
        },
      });
    }

    // Check for plantations ready for harvest
    const readyForHarvest = filteredPlantations.filter(
      (p) => p.stage === "growing" && p.tasks.every((t) => t.status === "completed")
    );
    if (readyForHarvest.length > 0) {
      recommendations.push({
        id: "harvest-ready",
        type: "action",
        title: "Plantations Ready for Harvest",
        description: `${readyForHarvest.length} plantation${readyForHarvest.length > 1 ? "s" : ""} ${readyForHarvest.length > 1 ? "are" : "is"} ready to be marked as harvested.`,
        icon: "🚚",
        action: () => {
          setStageFilter("growing");
        },
      });
    }

    // Check for low engagement
    const engagementRate =
      (receipts.length + complaints.length + loans.length) /
      Math.max(stats.totalSeeds, 1);
    if (engagementRate < 0.5 && stats.totalSeeds > 3) {
      recommendations.push({
        id: "low-engagement",
        type: "info",
        title: "Boost Engagement",
        description: "Consider uploading receipts, filing complaints, or requesting loans to increase engagement.",
        icon: "💡",
        action: () => setShowQuickActionsPanel(true),
      });
    }

    // Check for high carbon offset achievement
    if (carbonTotals.carbonOffsetTons > 100) {
      recommendations.push({
        id: "carbon-milestone",
        type: "success",
        title: "Carbon Milestone Achieved!",
        description: `Congratulations! You've offset ${carbonTotals.carbonOffsetTons.toLocaleString()} tons of CO₂.`,
        icon: "🎉",
      });
    }

    // Check for missing location data
    const missingLocations = filteredPlantations.filter((p) => !p.location);
    if (missingLocations.length > 0) {
      recommendations.push({
        id: "missing-locations",
        type: "info",
        title: "Incomplete Location Data",
        description: `${missingLocations.length} plantation${missingLocations.length > 1 ? "s" : ""} ${missingLocations.length > 1 ? "are" : "is"} missing location information.`,
        icon: "📍",
      });
    }

    return recommendations.slice(0, 5);
  }, [
    taskSummary.overdue,
    filteredPlantations,
    receipts.length,
    complaints.length,
    loans.length,
    stats.totalSeeds,
    carbonTotals.carbonOffsetTons,
  ]);

  const activityFeedItems = useMemo(() => {
    const activities: Array<{
      id: string;
      type: string;
      title: string;
      description: string;
      timestamp: string;
      icon: string;
    }> = [];

    // Recent plantation updates
    filteredPlantations
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 5)
      .forEach((plantation) => {
        activities.push({
          id: `activity-${plantation.id}`,
          type: "update",
          title: `${plantation.seedName} updated`,
          description: `Stage: ${plantation.stage} • ${plantation.location || "Location not set"}`,
          timestamp: plantation.updatedAt,
          icon: "🌱",
        });
      });

    // Recent receipts
    receipts
      .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
      .slice(0, 3)
      .forEach((receipt) => {
        activities.push({
          id: `activity-receipt-${receipt.id}`,
          type: "receipt",
          title: `Receipt uploaded: ${receipt.title}`,
          description: `${formatCurrency(receipt.amount, receipt.currency)}`,
          timestamp: receipt.uploadedAt,
          icon: "📄",
        });
      });

    // Recent complaints
    complaints
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 3)
      .forEach((complaint) => {
        activities.push({
          id: `activity-complaint-${complaint.id}`,
          type: "complaint",
          title: `Complaint filed: ${complaint.subject}`,
          description: `Status: ${complaint.status} • Priority: ${complaint.priority}`,
          timestamp: complaint.createdAt,
          icon: "🛠️",
        });
      });

    return activities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10);
  }, [filteredPlantations, receipts, complaints, formatCurrency]);

  const chartData = useMemo(() => {
    return {
      stagePie: {
        labels: ["Planted", "Growing", "Harvested"],
        data: [
          dataVisualizationMetrics.stageDistribution.planted,
          dataVisualizationMetrics.stageDistribution.growing,
          dataVisualizationMetrics.stageDistribution.harvested,
        ],
      },
      taskBar: {
        labels: ["Pending", "In Progress", "Completed"],
        data: [
          dataVisualizationMetrics.taskStatusDistribution.pending,
          dataVisualizationMetrics.taskStatusDistribution.in_progress,
          dataVisualizationMetrics.taskStatusDistribution.completed,
        ],
      },
      carbonLine: {
        labels: filteredPlantations.slice(0, 10).map((p) => p.seedName),
        data: filteredPlantations.slice(0, 10).map((p) => p.carbonOffsetTons),
      },
    };
  }, [filteredPlantations, dataVisualizationMetrics]);

  const reminders = useMemo(() => {
    const items: Array<{
      id: string;
      title: string;
      description: string;
      dueDate: string;
      type: "task" | "harvest" | "maintenance";
      plantationId?: string;
    }> = [];

    filteredPlantations.forEach((plantation) => {
      plantation.tasks.forEach((task) => {
        if (task.status !== "completed") {
          const dueDate = new Date(task.dueDate);
          const daysUntilDue = Math.ceil(
            (dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
          );
          if (daysUntilDue <= 7) {
            items.push({
              id: `reminder-${plantation.id}-${task.id}`,
              title: task.title,
              description: `${plantation.seedName} • Due in ${daysUntilDue} day${daysUntilDue !== 1 ? "s" : ""}`,
              dueDate: task.dueDate,
              type: "task",
              plantationId: plantation.id,
            });
          }
        }
      });

      if (plantation.stage === "growing") {
        const daysSinceStart = Math.ceil(
          (Date.now() - new Date(plantation.startDate).getTime()) /
            (1000 * 60 * 60 * 24)
        );
        if (daysSinceStart >= 150) {
          items.push({
            id: `reminder-harvest-${plantation.id}`,
            title: "Ready for Harvest Check",
            description: `${plantation.seedName} has been growing for ${daysSinceStart} days`,
            dueDate: new Date().toISOString(),
            type: "harvest",
            plantationId: plantation.id,
          });
        }
      }
    });

    return items.sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );
  }, [filteredPlantations]);

  const dataValidationIssues = useMemo(() => {
    const issues: Array<{
      id: string;
      type: "warning" | "error";
      message: string;
      plantationId?: string;
    }> = [];

    filteredPlantations.forEach((plantation) => {
      if (!plantation.location) {
        issues.push({
          id: `validation-${plantation.id}-location`,
          type: "warning",
          message: `${plantation.seedName} is missing location data`,
          plantationId: plantation.id,
        });
      }
      if (plantation.treeCount === 0) {
        issues.push({
          id: `validation-${plantation.id}-trees`,
          type: "warning",
          message: `${plantation.seedName} has no tree count specified`,
          plantationId: plantation.id,
        });
      }
      if (plantation.areaHectares === 0) {
        issues.push({
          id: `validation-${plantation.id}-area`,
          type: "warning",
          message: `${plantation.seedName} has no area specified`,
          plantationId: plantation.id,
        });
      }
    });

    return issues;
  }, [filteredPlantations]);

  const yieldOptimizationTips = useMemo(() => {
    const tips: Array<{
      id: string;
      title: string;
      description: string;
      impact: "high" | "medium" | "low";
      icon: string;
    }> = [];

    // Check for plantations with low tree count
    const lowTreeCount = filteredPlantations.filter(
      (p) => p.treeCount > 0 && p.treeCount < 50
    );
    if (lowTreeCount.length > 0) {
      tips.push({
        id: "tree-density",
        title: "Increase Tree Density",
        description: `${lowTreeCount.length} plantation${lowTreeCount.length > 1 ? "s" : ""} could benefit from higher tree density for better yields.`,
        impact: "high",
        icon: "🌳",
      });
    }

    // Check for incomplete tasks
    const incompleteTasks = filteredPlantations.reduce(
      (acc, p) => acc + p.tasks.filter((t) => t.status !== "completed").length,
      0
    );
    if (incompleteTasks > 0) {
      tips.push({
        id: "complete-tasks",
        title: "Complete Pending Tasks",
        description: `${incompleteTasks} incomplete task${incompleteTasks > 1 ? "s" : ""} may be affecting yield potential.`,
        impact: "medium",
        icon: "✅",
      });
    }

    // Check for plantations ready for harvest
    const readyForHarvest = filteredPlantations.filter(
      (p) => p.stage === "growing" && p.tasks.every((t) => t.status === "completed")
    );
    if (readyForHarvest.length > 0) {
      tips.push({
        id: "harvest-ready",
        title: "Harvest Ready Plantations",
        description: `${readyForHarvest.length} plantation${readyForHarvest.length > 1 ? "s" : ""} ${readyForHarvest.length > 1 ? "are" : "is"} ready for harvest.`,
        impact: "high",
        icon: "🚚",
      });
    }

    return tips.slice(0, 5);
  }, [filteredPlantations]);

  const complianceStatus = useMemo(() => {
    const certifications = filteredPlantations.reduce((acc, p) => {
      // Mock certification check
      return acc + (p.carbonOffsetTons > 10 ? 1 : 0);
    }, 0);

    return {
      certified: certifications,
      total: filteredPlantations.length,
      complianceRate: filteredPlantations.length > 0
        ? (certifications / filteredPlantations.length) * 100
        : 0,
    };
  }, [filteredPlantations]);

  const riskAssessment = useMemo(() => {
    const risks: Array<{
      id: string;
      type: "high" | "medium" | "low";
      title: string;
      description: string;
      mitigation: string;
      icon: string;
    }> = [];

    // Check for overdue tasks
    if (taskSummary.overdue > 0) {
      risks.push({
        id: "overdue-tasks-risk",
        type: "high",
        title: "Overdue Tasks Risk",
        description: `${taskSummary.overdue} overdue task${taskSummary.overdue > 1 ? "s" : ""} may impact plantation health.`,
        mitigation: "Complete overdue tasks immediately to prevent yield loss.",
        icon: "⚠️",
      });
    }

    // Check for low tree density
    const lowDensity = filteredPlantations.filter(
      (p) => p.treeCount > 0 && p.treeCount < 30
    );
    if (lowDensity.length > 0) {
      risks.push({
        id: "low-density-risk",
        type: "medium",
        title: "Low Tree Density",
        description: `${lowDensity.length} plantation${lowDensity.length > 1 ? "s" : ""} have low tree density.`,
        mitigation: "Consider planting more trees to improve yield potential.",
        icon: "🌳",
      });
    }

    // Check for missing location data
    const missingLocations = filteredPlantations.filter((p) => !p.location);
    if (missingLocations.length > 0) {
      risks.push({
        id: "missing-data-risk",
        type: "low",
        title: "Incomplete Data",
        description: `${missingLocations.length} plantation${missingLocations.length > 1 ? "s" : ""} missing location data.`,
        mitigation: "Add location data for better tracking and analytics.",
        icon: "📍",
      });
    }

    return risks;
  }, [filteredPlantations, taskSummary.overdue]);

  const supplyChainMetrics = useMemo(() => {
    const harvested = filteredPlantations.filter(
      (p) => p.stage === "harvested"
    );
    const totalYield = harvested.reduce(
      (acc, p) =>
        acc +
        (p.yieldTimeline.length > 0
          ? p.yieldTimeline[p.yieldTimeline.length - 1].yieldKg
          : 0),
      0
    );

    return {
      harvestedCount: harvested.length,
      totalYield,
      avgYieldPerPlantation:
        harvested.length > 0 ? totalYield / harvested.length : 0,
      readyForMarket: harvested.filter((p) => {
        const latestYield =
          p.yieldTimeline.length > 0
            ? p.yieldTimeline[p.yieldTimeline.length - 1]
            : null;
        return latestYield && latestYield.yieldKg > 0;
      }).length,
    };
  }, [filteredPlantations]);

  const advancedAnalytics = useMemo(() => {
    const avgGrowthTime = analyticsSnapshot.averageDaysToHarvest || 0;
    const harvestRate =
      filteredPlantations.length > 0
        ? (filteredPlantations.filter((p) => p.stage === "harvested").length /
            filteredPlantations.length) *
          100
        : 0;

    return {
      avgGrowthTime,
      harvestRate,
      efficiencyScore: Math.min(
        (harvestRate / 100) * (avgGrowthTime > 0 ? 180 / avgGrowthTime : 0) *
          100,
        100
      ),
      productivityIndex:
        (carbonTotals.carbonOffsetTons / Math.max(carbonTotals.treeCount, 1)) *
        1000,
    };
  }, [filteredPlantations, analyticsSnapshot, carbonTotals]);

  const showEmptyState =
    filteredPlantations.length === 0 &&
    (isConnected || normalizedFilters.length > 0);

  const showConnectOverlay =
    !isConnected && normalizedFilters.length === 0 && status !== "connecting";

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0b1d3a] via-[#10254a] to-[#081122] text-cocoa-100">
      <Sidebar />

      <div className="relative flex flex-1 flex-col">
        <AlertManager />
        <SecurityMonitor />
        <SessionGuard />
        <RecurringTaskScheduler />
        <AlertToaster />
        <TopBar
          walletAddress={address}
          totalSeeds={stats.totalSeeds}
          harvested={stats.harvested}
          growing={stats.growing}
          carbonOffsetTons={carbonTotals.carbonOffsetTons}
          treeCount={carbonTotals.treeCount}
          carbonEfficiency={{
            perTreeKg: carbonPerTree != null ? carbonPerTree * 1000 : null,
            perHectareTons: carbonPerHectare,
          }}
          onPlantSeed={handlePlantSeedClick}
          onUploadReceipt={() => setReceiptModalOpen(true)}
          onFileComplaint={() => setComplaintModalOpen(true)}
          onRequestLoan={() => setLoanModalOpen(true)}
          welcomeNote={dashboardWelcomeNote}
        />

        <main className="relative flex-1 overflow-y-auto px-6 py-8">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#10254a] via-[#0b1d3a]/70 to-transparent" />
          <div className="relative space-y-10">
            {showConnectOverlay && (
              <motion.section
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-3xl bg-white/80 px-10 py-16 text-center shadow-lg shadow-cocoa-900/10 backdrop-blur"
              >
                <span className="text-5xl">🌴</span>
                <h2 className="text-2xl font-semibold text-cocoa-900">
                  Connect your wallet to start planting
                </h2>
                <p className="text-sm text-cocoa-600">
                  Link your wallet to claim your plantations, plant new seeds,
                  and update growth progress in real time.
                </p>
              </motion.section>
            )}

            {showEmptyState ? (
            <motion.section
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto flex max-w-3xl flex-col items-center gap-5 rounded-3xl bg-white/80 px-10 py-16 text-center shadow-lg shadow-cocoa-900/10 backdrop-blur"
            >
              <span className="text-5xl">🌱</span>
              <h2 className="text-2xl font-semibold text-cocoa-900">
                Your field is ready
              </h2>
              <p className="text-sm text-cocoa-600">
                Plant your first cocoa seed to begin tracking its journey from
                sprout to harvest.
              </p>
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={handlePlantSeedClick}
                className="rounded-full bg-leaf-500 px-6 py-2 text-sm font-semibold text-cream-50 shadow-lg transition hover:bg-leaf-600 focus:outline-none focus:ring-2 focus:ring-leaf-400 focus:ring-offset-2 focus:ring-offset-cream-50"
              >
                Plant your first seed
              </motion.button>
            </motion.section>
          ) : (
              <>
                <DashboardMetrics metrics={dashboardMetrics} />
                
                {/* Comprehensive Statistics Summary */}
                <motion.section
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid gap-4 rounded-3xl border border-cream-200 bg-white/90 p-6 shadow-sm shadow-cocoa-900/5 backdrop-blur sm:grid-cols-2 lg:grid-cols-4"
                >
                  {/* Total Plantations */}
                  <div className="flex flex-col gap-1 rounded-2xl border border-cream-200 bg-gradient-to-br from-leaf-50/80 to-green-50/80 p-4 shadow-sm">
                    <span className="text-xs uppercase tracking-[0.2em] text-cocoa-400">
                      Total Plantations
                    </span>
                    <span className="text-3xl font-bold text-leaf-700">
                      {stats.totalSeeds}
                    </span>
                    <div className="mt-2 flex gap-2 text-xs text-cocoa-500">
                      <span className="rounded-full bg-white/70 px-2 py-0.5">
                        {stats.harvested} harvested
                      </span>
                      <span className="rounded-full bg-white/70 px-2 py-0.5">
                        {stats.growing} growing
                      </span>
        </div>
                  </div>

                  {/* Active Tasks */}
                  <div className="flex flex-col gap-1 rounded-2xl border border-cream-200 bg-gradient-to-br from-blue-50/80 to-cyan-50/80 p-4 shadow-sm">
                    <span className="text-xs uppercase tracking-[0.2em] text-cocoa-400">
                      Active Tasks
                    </span>
                    <span className="text-3xl font-bold text-blue-700">
                      {taskSummary.active}
                    </span>
                    <div className="mt-2 flex gap-2 text-xs text-cocoa-500">
                      {taskSummary.overdue > 0 && (
                        <span className="rounded-full bg-rose-100 px-2 py-0.5 text-rose-700">
                          {taskSummary.overdue} overdue
                        </span>
                      )}
                      {taskSummary.dueSoon > 0 && (
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-amber-700">
                          {taskSummary.dueSoon} due soon
                        </span>
                      )}
                      {taskSummary.overdue === 0 && taskSummary.dueSoon === 0 && (
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-green-700">
                          All on track
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Carbon Offset */}
                  <div className="flex flex-col gap-1 rounded-2xl border border-cream-200 bg-gradient-to-br from-emerald-50/80 to-teal-50/80 p-4 shadow-sm">
                    <span className="text-xs uppercase tracking-[0.2em] text-cocoa-400">
                      Carbon Offset
                    </span>
                    <span className="text-3xl font-bold text-emerald-700">
                      {carbonTotals.carbonOffsetTons.toLocaleString(undefined, {
                        maximumFractionDigits: 1,
                      })}
                    </span>
                    <span className="text-xs font-semibold text-emerald-600">
                      tCO₂
                    </span>
                    <div className="mt-2 flex gap-2 text-xs text-cocoa-500">
                      <span className="rounded-full bg-white/70 px-2 py-0.5">
                        {carbonTotals.treeCount.toLocaleString()} trees
                      </span>
                      <span className="rounded-full bg-white/70 px-2 py-0.5">
                        {carbonTotals.areaHectares.toLocaleString(undefined, {
                          maximumFractionDigits: 1,
                        })}{" "}
                        ha
                      </span>
                    </div>
                  </div>

                  {/* Finance Receipts */}
                  <div className="flex flex-col gap-1 rounded-2xl border border-cream-200 bg-gradient-to-br from-purple-50/80 to-pink-50/80 p-4 shadow-sm">
                    <span className="text-xs uppercase tracking-[0.2em] text-cocoa-400">
                      Finance Receipts
                    </span>
                    <span className="text-3xl font-bold text-purple-700">
                      {receiptTotals.count}
                    </span>
                    <span className="text-xs font-semibold text-purple-600">
                      {receiptTotals.totalAmount > 0
                        ? formatCurrency(
                            receiptTotals.totalAmount,
                            receiptTotals.currency
                          )
                        : "No receipts"}
                    </span>
                    {receiptTotals.latest && (
                      <p className="mt-2 text-xs text-cocoa-500">
                        Latest: {new Date(receiptTotals.latest.uploadedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </motion.section>

                {/* Enhanced Performance Overview */}
                <motion.section
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-3xl border border-cream-200 bg-gradient-to-br from-indigo-50/80 via-purple-50/80 to-pink-50/80 p-6 shadow-sm backdrop-blur"
                >
                  <div className="mb-4">
                    <h2 className="text-lg font-semibold text-cocoa-900">
                      Performance Overview
                    </h2>
                    <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
                      Key metrics at a glance
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-2xl border border-indigo-200 bg-white/90 p-4 shadow-sm">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs uppercase tracking-[0.2em] text-cocoa-400">
                          Efficiency Score
                        </span>
                        <span className="text-lg">📈</span>
                      </div>
                      <span className="text-3xl font-bold text-indigo-700">
                        {Math.round(
                          (progressMetrics.taskCompletion.value +
                            progressMetrics.harvestProgress.value) /
                            2
                        )}
                        %
                      </span>
                      <p className="mt-2 text-xs text-cocoa-500">
                        Combined performance index
                      </p>
                    </div>
                    <div className="rounded-2xl border border-purple-200 bg-white/90 p-4 shadow-sm">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs uppercase tracking-[0.2em] text-cocoa-400">
                          Avg Yield Rate
                        </span>
                        <span className="text-lg">🌾</span>
                      </div>
                      <span className="text-3xl font-bold text-purple-700">
                        {analyticsSnapshot.yieldForecasts.length > 0
                          ? Math.round(
                              analyticsSnapshot.yieldForecasts.reduce(
                                (acc, f) => acc + f.projectedYieldKg,
                                0
                              ) / analyticsSnapshot.yieldForecasts.length
                            )
                          : 0}
                        kg
                      </span>
                      <p className="mt-2 text-xs text-cocoa-500">
                        Per plantation average
                      </p>
                    </div>
                    <div className="rounded-2xl border border-pink-200 bg-white/90 p-4 shadow-sm">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs uppercase tracking-[0.2em] text-cocoa-400">
                          Engagement Rate
                        </span>
                        <span className="text-lg">💬</span>
                      </div>
                      <span className="text-3xl font-bold text-pink-700">
                        {Math.round(
                          ((receipts.length + complaints.length + loans.length) /
                            Math.max(stats.totalSeeds, 1)) *
                            100
                        )}
                        %
                      </span>
                      <p className="mt-2 text-xs text-cocoa-500">
                        Active participation level
                      </p>
                    </div>
                    <div className="rounded-2xl border border-teal-200 bg-white/90 p-4 shadow-sm">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs uppercase tracking-[0.2em] text-cocoa-400">
                          Sustainability Index
                        </span>
                        <span className="text-lg">♻️</span>
                      </div>
                      <span className="text-3xl font-bold text-teal-700">
                        {carbonTotals.treeCount > 0
                          ? (
                              (carbonTotals.carbonOffsetTons /
                                carbonTotals.treeCount) *
                              1000
                            ).toFixed(1)
                          : "0.0"}
                      </span>
                      <p className="mt-2 text-xs text-cocoa-500">
                        kg CO₂ per tree
                      </p>
                    </div>
                  </div>
                </motion.section>

                {/* Quick Stats Summary */}
                {widgetVisibility.quickStats && (
                  <motion.section
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid gap-4 rounded-3xl border border-cream-200 bg-white/90 p-6 shadow-sm shadow-cocoa-900/5 backdrop-blur sm:grid-cols-2 lg:grid-cols-4"
                  >
                  <div className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-[0.2em] text-cocoa-400">
                      Total Plantations
                    </span>
                    <span className="text-2xl font-bold text-cocoa-900">
                      {stats.totalSeeds}
                    </span>
                    <span className="text-xs text-cocoa-500">
                      {stats.harvested} harvested • {stats.growing} growing
                    </span>
        </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-[0.2em] text-cocoa-400">
                      Active Tasks
                    </span>
                    <span className="text-2xl font-bold text-cocoa-900">
                      {taskSummary.active}
                    </span>
                    <span className="text-xs text-cocoa-500">
                      {taskSummary.dueSoon} due soon • {taskSummary.overdue} overdue
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-[0.2em] text-cocoa-400">
                      Carbon Offset
                    </span>
                    <span className="text-2xl font-bold text-leaf-600">
                      {carbonTotals.carbonOffsetTons.toLocaleString()} tCO₂
                    </span>
                    <span className="text-xs text-cocoa-500">
                      {carbonTotals.treeCount.toLocaleString()} trees protected
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-[0.2em] text-cocoa-400">
                      Finance Receipts
                    </span>
                    <span className="text-2xl font-bold text-cocoa-900">
                      {receiptTotals.count}
                    </span>
                    <span className="text-xs text-cocoa-500">
                      {receiptTotals.totalAmount > 0
                        ? formatCurrency(
                            receiptTotals.totalAmount,
                            receiptTotals.currency
                          )
                        : "No receipts logged"}
                    </span>
                  </div>
                </motion.section>
                )}

                {favoriteSummary && widgetVisibility.favoritesSpotlight && (
                  <motion.section
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-4 rounded-3xl border border-cream-200 bg-white/85 p-6 shadow-sm shadow-cocoa-900/5 backdrop-blur"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h2 className="text-lg font-semibold text-cocoa-900">
                          Favorites spotlight
                        </h2>
                        <p className="text-xs uppercase tracking-[0.2em] text-cocoa-400">
                          {favoriteSummary.count} starred plantations
                        </p>
                      </div>
                      <span className="rounded-full bg-leaf-50 px-3 py-1 text-xs font-semibold text-leaf-700">
                        {favoriteSummary.distribution.harvested} harvested •{" "}
                        {favoriteSummary.distribution.growing} growing •{" "}
                        {favoriteSummary.distribution.planted} planted
                      </span>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="rounded-2xl border border-cream-200 bg-white/80 p-4 shadow-sm">
                        <span className="text-xs uppercase tracking-[0.2em] text-cocoa-400">
                          Carbon offset
                        </span>
                        <p className="mt-1 text-2xl font-bold text-leaf-600">
                          {favoriteSummary.carbon.toLocaleString(undefined, {
                            maximumFractionDigits: 1,
                          })}{" "}
                          tCO₂
                        </p>
                        <p className="text-xs text-cocoa-500">
                          {favoriteSummary.trees.toLocaleString()} trees •{" "}
                          {favoriteSummary.area.toLocaleString(undefined, {
                            maximumFractionDigits: 1,
                          })}{" "}
                          ha protected
                        </p>
                      </div>
                      <div className="rounded-2xl border border-cream-200 bg-white/80 p-4 shadow-sm">
                        <span className="text-xs uppercase tracking-[0.2em] text-cocoa-400">
                          Engagement outlook
                        </span>
                        <p className="mt-1 text-sm text-cocoa-600">
                          Keep an eye on these favorite plantations to prioritise
                          harvest readiness and collaboration touch points.
                        </p>
                        <p className="mt-3 text-xs text-cocoa-500">
                          Tip: use the comparison mode to benchmark star performers.
                        </p>
                      </div>
                      <div className="rounded-2xl border border-cream-200 bg-white/80 p-4 shadow-sm">
                        <span className="text-xs uppercase tracking-[0.2em] text-cocoa-400">
                          Recently updated
                        </span>
                        <ul className="mt-2 space-y-2 text-sm text-cocoa-700">
                          {favoriteSummary.recentlyUpdated.map((plantation) => (
                            <li key={plantation.id} className="flex flex-col">
                              <span className="font-semibold">
                                {plantation.seedName}
                              </span>
                              <span className="text-[11px] text-cocoa-500">
                                {plantation.stage} •{" "}
                                {new Date(
                                  plantation.updatedAt
                                ).toLocaleString()}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.section>
                )}

                <div className="flex flex-wrap items-center justify-end gap-3">
                  <div className="flex items-center gap-2 rounded-full border border-cream-300 bg-white/90 px-3 py-1.5 shadow-sm">
                    <label className="text-xs font-semibold text-cocoa-600">
                      Export format:
                    </label>
                    <select
                      value={exportFormat}
                      onChange={(e) =>
                        setExportFormat(e.target.value as "json" | "csv" | "pdf")
                      }
                      className="border-0 bg-transparent text-xs font-semibold text-cocoa-700 focus:outline-none"
                      aria-label="Export format"
                    >
                      <option value="json">JSON</option>
                      <option value="csv">CSV</option>
                    </select>
                  </div>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleExportData}
                    className="flex items-center gap-2 rounded-full border border-cocoa-200 bg-white/90 px-4 py-2 text-sm font-semibold text-cocoa-700 shadow-sm transition hover:border-cocoa-300 hover:text-cocoa-900 focus:outline-none focus:ring-2 focus:ring-cocoa-200 focus:ring-offset-2 focus:ring-offset-white"
                  >
                    📤 Export Data
                  </motion.button>
                  <label className="flex cursor-pointer items-center gap-2 rounded-full border border-cocoa-200 bg-white/90 px-4 py-2 text-sm font-semibold text-cocoa-700 shadow-sm transition hover:border-cocoa-300 hover:text-cocoa-900 focus-within:ring-2 focus-within:ring-cocoa-200">
                    📥 Import
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportData}
                      className="hidden"
                    />
                  </label>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleShareDashboard}
                    className="flex items-center gap-2 rounded-full border border-cocoa-200 bg-white/90 px-4 py-2 text-sm font-semibold text-cocoa-700 shadow-sm transition hover:border-cocoa-300 hover:text-cocoa-900 focus:outline-none focus:ring-2 focus:ring-cocoa-200"
                  >
                    🔗 Share
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowNotificationCenter(!showNotificationCenter)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-cocoa-200 ${
                      showNotificationCenter
                        ? "border-cocoa-900 bg-cocoa-900 text-white"
                        : "border-cocoa-200 bg-white/90 text-cocoa-700 hover:border-cocoa-300"
                    }`}
                  >
                    🔔 Notifications
                    {taskSummary.overdue > 0 && (
                      <span className="rounded-full bg-rose-500 px-1.5 py-0.5 text-xs text-white">
                        {taskSummary.overdue}
                      </span>
                    )}
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowAchievements(!showAchievements)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-cocoa-200 ${
                      showAchievements
                        ? "border-cocoa-900 bg-cocoa-900 text-white"
                        : "border-cocoa-200 bg-white/90 text-cocoa-700 hover:border-cocoa-300"
                    }`}
                  >
                    🏆 Achievements
                    {achievements.length > 0 && (
                      <span className="rounded-full bg-gold-500 px-1.5 py-0.5 text-xs text-white">
                        {achievements.length}
                      </span>
                    )}
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowProgressTracker(!showProgressTracker)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-cocoa-200 ${
                      showProgressTracker
                        ? "border-cocoa-900 bg-cocoa-900 text-white"
                        : "border-cocoa-200 bg-white/90 text-cocoa-700 hover:border-cocoa-300"
                    }`}
                  >
                    📊 Progress Tracker
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowMarketPrices(!showMarketPrices)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-cocoa-200 ${
                      showMarketPrices
                        ? "border-cocoa-900 bg-cocoa-900 text-white"
                        : "border-cocoa-200 bg-white/90 text-cocoa-700 hover:border-cocoa-300"
                    }`}
                  >
                    💹 Market Prices
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowWeatherWidget(!showWeatherWidget)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-cocoa-200 ${
                      showWeatherWidget
                        ? "border-cocoa-900 bg-cocoa-900 text-white"
                        : "border-cocoa-200 bg-white/90 text-cocoa-700 hover:border-cocoa-300"
                    }`}
                  >
                    🌤️ Weather
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowReports(!showReports)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-cocoa-200 ${
                      showReports
                        ? "border-cocoa-900 bg-cocoa-900 text-white"
                        : "border-cocoa-200 bg-white/90 text-cocoa-700 hover:border-cocoa-300"
                    }`}
                  >
                    📋 Reports
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowTimelineView(!showTimelineView)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-cocoa-200 ${
                      showTimelineView
                        ? "border-cocoa-900 bg-cocoa-900 text-white"
                        : "border-cocoa-200 bg-white/90 text-cocoa-700 hover:border-cocoa-300"
                    }`}
                  >
                    📅 Timeline
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowStatisticsComparison(!showStatisticsComparison)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-cocoa-200 ${
                      showStatisticsComparison
                        ? "border-cocoa-900 bg-cocoa-900 text-white"
                        : "border-cocoa-200 bg-white/90 text-cocoa-700 hover:border-cocoa-300"
                    }`}
                  >
                    📊 Compare Stats
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-cocoa-200 ${
                      showAdvancedSearch
                        ? "border-cocoa-900 bg-cocoa-900 text-white"
                        : "border-cocoa-200 bg-white/90 text-cocoa-700 hover:border-cocoa-300"
                    }`}
                  >
                    🔍 Advanced Search
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowCollaborationTools(!showCollaborationTools)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-cocoa-200 ${
                      showCollaborationTools
                        ? "border-cocoa-900 bg-cocoa-900 text-white"
                        : "border-cocoa-200 bg-white/90 text-cocoa-700 hover:border-cocoa-300"
                    }`}
                  >
                    👥 Collaboration
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowQuickActionsPanel(!showQuickActionsPanel)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-cocoa-200 ${
                      showQuickActionsPanel
                        ? "border-cocoa-900 bg-cocoa-900 text-white"
                        : "border-cocoa-200 bg-white/90 text-cocoa-700 hover:border-cocoa-300"
                    }`}
                  >
                    ⚡ Quick Actions
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowAnalyticsDashboard(!showAnalyticsDashboard)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-cocoa-200 ${
                      showAnalyticsDashboard
                        ? "border-cocoa-900 bg-cocoa-900 text-white"
                        : "border-cocoa-200 bg-white/90 text-cocoa-700 hover:border-cocoa-300"
                    }`}
                  >
                    📈 Analytics
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowHelpCenter(!showHelpCenter)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-cocoa-200 ${
                      showHelpCenter
                        ? "border-cocoa-900 bg-cocoa-900 text-white"
                        : "border-cocoa-200 bg-white/90 text-cocoa-700 hover:border-cocoa-300"
                    }`}
                  >
                    ❓ Help
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowPerformanceMonitor(!showPerformanceMonitor)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-cocoa-200 ${
                      showPerformanceMonitor
                        ? "border-cocoa-900 bg-cocoa-900 text-white"
                        : "border-cocoa-200 bg-white/90 text-cocoa-700 hover:border-cocoa-300"
                    }`}
                  >
                    ⚡ Performance
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowDataVisualization(!showDataVisualization)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-cocoa-200 ${
                      showDataVisualization
                        ? "border-cocoa-900 bg-cocoa-900 text-white"
                        : "border-cocoa-200 bg-white/90 text-cocoa-700 hover:border-cocoa-300"
                    }`}
                  >
                    📊 Visualizations
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowDashboardSettings(!showDashboardSettings)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-cocoa-200 ${
                      showDashboardSettings
                        ? "border-cocoa-900 bg-cocoa-900 text-white"
                        : "border-cocoa-200 bg-white/90 text-cocoa-700 hover:border-cocoa-300"
                    }`}
                  >
                    ⚙️ Settings
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowChartsGallery(!showChartsGallery)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-cocoa-200 ${
                      showChartsGallery
                        ? "border-cocoa-900 bg-cocoa-900 text-white"
                        : "border-cocoa-200 bg-white/90 text-cocoa-700 hover:border-cocoa-300"
                    }`}
                  >
                    📈 Charts Gallery
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowReminders(!showReminders)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-cocoa-200 ${
                      showReminders
                        ? "border-cocoa-900 bg-cocoa-900 text-white"
                        : "border-cocoa-200 bg-white/90 text-cocoa-700 hover:border-cocoa-300"
                    }`}
                  >
                    ⏰ Reminders
                    {reminders.length > 0 && (
                      <span className="rounded-full bg-amber-500 px-1.5 py-0.5 text-xs text-white">
                        {reminders.length}
                      </span>
                    )}
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowBackupRestore(!showBackupRestore)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-cocoa-200 ${
                      showBackupRestore
                        ? "border-cocoa-900 bg-cocoa-900 text-white"
                        : "border-cocoa-200 bg-white/90 text-cocoa-700 hover:border-cocoa-300"
                    }`}
                  >
                    💾 Backup & Restore
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowDataValidation(!showDataValidation)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-cocoa-200 ${
                      showDataValidation
                        ? "border-cocoa-900 bg-cocoa-900 text-white"
                        : "border-cocoa-200 bg-white/90 text-cocoa-700 hover:border-cocoa-300"
                    }`}
                  >
                    ✅ Data Validation
                    {dataValidationIssues.length > 0 && (
                      <span className="rounded-full bg-rose-500 px-1.5 py-0.5 text-xs text-white">
                        {dataValidationIssues.length}
                      </span>
                    )}
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowRiskAssessment(!showRiskAssessment)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-cocoa-200 ${
                      showRiskAssessment
                        ? "border-cocoa-900 bg-cocoa-900 text-white"
                        : "border-cocoa-200 bg-white/90 text-cocoa-700 hover:border-cocoa-300"
                    }`}
                  >
                    ⚠️ Risk Assessment
                    {riskAssessment.filter((r) => r.type === "high").length > 0 && (
                      <span className="rounded-full bg-rose-500 px-1.5 py-0.5 text-xs text-white">
                        {riskAssessment.filter((r) => r.type === "high").length}
                      </span>
                    )}
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowSupplyChainManager(!showSupplyChainManager)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-cocoa-200 ${
                      showSupplyChainManager
                        ? "border-cocoa-900 bg-cocoa-900 text-white"
                        : "border-cocoa-200 bg-white/90 text-cocoa-700 hover:border-cocoa-300"
                    }`}
                  >
                    🔗 Supply Chain
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowAdvancedAnalytics(!showAdvancedAnalytics)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-cocoa-200 ${
                      showAdvancedAnalytics
                        ? "border-cocoa-900 bg-cocoa-900 text-white"
                        : "border-cocoa-200 bg-white/90 text-cocoa-700 hover:border-cocoa-300"
                    }`}
                  >
                    📊 Advanced Analytics
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowAutomationRules(!showAutomationRules)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-cocoa-200 ${
                      showAutomationRules
                        ? "border-cocoa-900 bg-cocoa-900 text-white"
                        : "border-cocoa-200 bg-white/90 text-cocoa-700 hover:border-cocoa-300"
                    }`}
                  >
                    ⚙️ Automation Rules
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowDocumentScanner(!showDocumentScanner)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-cocoa-200 ${
                      showDocumentScanner
                        ? "border-cocoa-900 bg-cocoa-900 text-white"
                        : "border-cocoa-200 bg-white/90 text-cocoa-700 hover:border-cocoa-300"
                    }`}
                  >
                    📄 Document Scanner
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowWeatherForecast(!showWeatherForecast)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-cocoa-200 ${
                      showWeatherForecast
                        ? "border-cocoa-900 bg-cocoa-900 text-white"
                        : "border-cocoa-200 bg-white/90 text-cocoa-700 hover:border-cocoa-300"
                    }`}
                  >
                    🌤️ Weather Forecast
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowCarbonCalculator(!showCarbonCalculator)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-cocoa-200 ${
                      showCarbonCalculator
                        ? "border-cocoa-900 bg-cocoa-900 text-white"
                        : "border-cocoa-200 bg-white/90 text-cocoa-700 hover:border-cocoa-300"
                    }`}
                  >
                    🌿 Carbon Calculator
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowHarvestScheduler(!showHarvestScheduler)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-cocoa-200 ${
                      showHarvestScheduler
                        ? "border-cocoa-900 bg-cocoa-900 text-white"
                        : "border-cocoa-200 bg-white/90 text-cocoa-700 hover:border-cocoa-300"
                    }`}
                  >
                    📅 Harvest Scheduler
                    {harvestSchedule.length > 0 && (
                      <span className="rounded-full bg-green-500 px-1.5 py-0.5 text-xs text-white">
                        {harvestSchedule.length}
                      </span>
                    )}
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowBudgetPlanner(!showBudgetPlanner)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-cocoa-200 ${
                      showBudgetPlanner
                        ? "border-cocoa-900 bg-cocoa-900 text-white"
                        : "border-cocoa-200 bg-white/90 text-cocoa-700 hover:border-cocoa-300"
                    }`}
                  >
                    💵 Budget Planner
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowInventoryAlerts(!showInventoryAlerts)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-cocoa-200 ${
                      showInventoryAlerts
                        ? "border-cocoa-900 bg-cocoa-900 text-white"
                        : "border-cocoa-200 bg-white/90 text-cocoa-700 hover:border-cocoa-300"
                    }`}
                  >
                    📦 Inventory Alerts
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowPerformanceReports(!showPerformanceReports)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-cocoa-200 ${
                      showPerformanceReports
                        ? "border-cocoa-900 bg-cocoa-900 text-white"
                        : "border-cocoa-200 bg-white/90 text-cocoa-700 hover:border-cocoa-300"
                    }`}
                  >
                    📊 Performance Reports
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowExportManager(!showExportManager)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-cocoa-200 ${
                      showExportManager
                        ? "border-cocoa-900 bg-cocoa-900 text-white"
                        : "border-cocoa-200 bg-white/90 text-cocoa-700 hover:border-cocoa-300"
                    }`}
                  >
                    📤 Export Manager
                  </motion.button>
                </div>
                {/* Achievements Panel */}
                {showAchievements && (
                  <motion.section
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl border border-cream-200 bg-gradient-to-br from-gold-50/80 via-amber-50/80 to-yellow-50/80 p-6 shadow-lg backdrop-blur"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-cocoa-900">
                          Achievements
                        </h2>
                        <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
                          {achievements.length} unlocked
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowAchievements(false)}
                        className="rounded-full p-2 text-cocoa-400 transition hover:bg-white/50"
                        aria-label="Close achievements"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {achievements.length === 0 ? (
                        <div className="col-span-full rounded-2xl border border-cream-200 bg-white/80 p-6 text-center">
                          <span className="text-4xl">🔒</span>
                          <p className="mt-2 text-sm text-cocoa-600">
                            Keep planting and managing to unlock achievements!
                          </p>
                        </div>
                      ) : (
                        achievements.map((achievement) => (
                          <motion.div
                            key={achievement.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex items-start gap-3 rounded-2xl border border-gold-200 bg-white/90 p-4 shadow-sm"
                          >
                            <span className="text-3xl">{achievement.icon}</span>
                            <div className="flex-1">
                              <h3 className="font-semibold text-cocoa-900">
                                {achievement.title}
                              </h3>
                              <p className="mt-1 text-xs text-cocoa-600">
                                {achievement.description}
                              </p>
                              <span className="mt-2 inline-block rounded-full bg-gold-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gold-700">
                                Unlocked
                              </span>
                            </div>
                          </motion.div>
                        ))
                      )}
                    </div>
                  </motion.section>
                )}

                {/* Progress Tracker */}
                {showProgressTracker && (
                  <motion.section
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl border border-cream-200 bg-white/90 p-6 shadow-lg"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-cocoa-900">
                          Progress Tracker
                        </h2>
                        <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
                          Track your plantation journey
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowProgressTracker(false)}
                        className="rounded-full p-2 text-cocoa-400 transition hover:bg-cream-100"
                        aria-label="Close progress tracker"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="space-y-6">
                      {/* Task Completion Progress */}
                      <div>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="font-semibold text-cocoa-700">
                            {progressMetrics.taskCompletion.label}
                          </span>
                          <span className="text-cocoa-600">
                            {progressMetrics.taskCompletion.current} /{" "}
                            {progressMetrics.taskCompletion.total}
                          </span>
                        </div>
                        <div className="h-3 overflow-hidden rounded-full bg-cream-200">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width: `${progressMetrics.taskCompletion.value}%`,
                            }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-leaf-500"
                          />
                        </div>
                        <p className="mt-1 text-xs text-cocoa-500">
                          {Math.round(progressMetrics.taskCompletion.value)}% complete
                        </p>
                      </div>

                      {/* Growth Efficiency Progress */}
                      <div>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="font-semibold text-cocoa-700">
                            {progressMetrics.growthProgress.label}
                          </span>
                          <span className="text-cocoa-600">
                            {Math.round(progressMetrics.growthProgress.current)}{" "}
                            {progressMetrics.growthProgress.unit} /{" "}
                            {progressMetrics.growthProgress.target}{" "}
                            {progressMetrics.growthProgress.unit}
                          </span>
                        </div>
                        <div className="h-3 overflow-hidden rounded-full bg-cream-200">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width: `${progressMetrics.growthProgress.value}%`,
                            }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-blue-500"
                          />
                        </div>
                        <p className="mt-1 text-xs text-cocoa-500">
                          {Math.round(progressMetrics.growthProgress.value)}% of target
                          efficiency
                        </p>
                      </div>

                      {/* Harvest Progress */}
                      <div>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="font-semibold text-cocoa-700">
                            {progressMetrics.harvestProgress.label}
                          </span>
                          <span className="text-cocoa-600">
                            {progressMetrics.harvestProgress.current} /{" "}
                            {progressMetrics.harvestProgress.total}
                          </span>
                        </div>
                        <div className="h-3 overflow-hidden rounded-full bg-cream-200">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width: `${progressMetrics.harvestProgress.value}%`,
                            }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-gold-500"
                          />
                        </div>
                        <p className="mt-1 text-xs text-cocoa-500">
                          {Math.round(progressMetrics.harvestProgress.value)}% harvest rate
                        </p>
                      </div>
                    </div>
                  </motion.section>
                )}

                {/* Market Prices Panel */}
                {showMarketPrices && (
                  <motion.section
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl border border-cream-200 bg-gradient-to-br from-green-50/80 to-emerald-50/80 p-6 shadow-lg backdrop-blur"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-cocoa-900">
                          Market Prices
                        </h2>
                        <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
                          Real-time commodity prices
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowMarketPrices(false)}
                        className="rounded-full p-2 text-cocoa-400 transition hover:bg-white/50"
                        aria-label="Close market prices"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-2xl border border-green-200 bg-white/90 p-5 shadow-sm">
                        <div className="mb-3 flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-semibold text-cocoa-900">
                              Cocoa Beans
                            </h3>
                            <p className="text-xs text-cocoa-500">Per ton</p>
                          </div>
                          <span className="text-2xl">🍫</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-green-700">
                            {formatCurrency(marketPrices.cocoa.price, marketPrices.cocoa.currency)}
                          </span>
                          <span className="text-sm font-semibold text-green-600">
                            /{marketPrices.cocoa.unit}
                          </span>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <span
                            className={`rounded-full px-2 py-1 text-xs font-semibold ${
                              marketPrices.cocoa.trend === "up"
                                ? "bg-green-100 text-green-700"
                                : "bg-rose-100 text-rose-700"
                            }`}
                          >
                            {marketPrices.cocoa.change}
                          </span>
                          <span className="text-xs text-cocoa-500">
                            {marketPrices.cocoa.trend === "up" ? "↑" : "↓"} Today
                          </span>
                        </div>
                      </div>
                      <div className="rounded-2xl border border-blue-200 bg-white/90 p-5 shadow-sm">
                        <div className="mb-3 flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-semibold text-cocoa-900">
                              Carbon Credits
                            </h3>
                            <p className="text-xs text-cocoa-500">Per ton CO₂</p>
                          </div>
                          <span className="text-2xl">🌍</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-blue-700">
                            {formatCurrency(marketPrices.carbon.price, marketPrices.carbon.currency)}
                          </span>
                          <span className="text-sm font-semibold text-blue-600">
                            /{marketPrices.carbon.unit}
                          </span>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <span
                            className={`rounded-full px-2 py-1 text-xs font-semibold ${
                              marketPrices.carbon.trend === "up"
                                ? "bg-green-100 text-green-700"
                                : "bg-rose-100 text-rose-700"
                            }`}
                          >
                            {marketPrices.carbon.change}
                          </span>
                          <span className="text-xs text-cocoa-500">
                            {marketPrices.carbon.trend === "up" ? "↑" : "↓"} Today
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-4 text-center text-xs text-cocoa-500">
                      Last updated: {new Date(marketPrices.lastUpdated).toLocaleString()}
                    </p>
                  </motion.section>
                )}

                {/* Weather Widget */}
                {showWeatherWidget && weatherData.length > 0 && (
                  <motion.section
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl border border-cream-200 bg-gradient-to-br from-sky-50/80 to-blue-50/80 p-6 shadow-lg backdrop-blur"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-cocoa-900">
                          Weather Conditions
                        </h2>
                        <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
                          Regional forecasts
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowWeatherWidget(false)}
                        className="rounded-full p-2 text-cocoa-400 transition hover:bg-white/50"
                        aria-label="Close weather"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {weatherData.map((weather, index) => (
                        <div
                          key={index}
                          className="rounded-2xl border border-blue-200 bg-white/90 p-4 shadow-sm"
                        >
                          <h3 className="mb-2 text-sm font-semibold text-cocoa-900">
                            {weather.region}
                          </h3>
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">
                              {weather.condition === "Sunny"
                                ? "☀️"
                                : weather.condition === "Partly Cloudy"
                                ? "⛅"
                                : "☁️"}
                            </span>
                            <div className="flex-1">
                              <p className="text-2xl font-bold text-blue-700">
                                {weather.temperature}°C
                              </p>
                              <p className="text-xs text-cocoa-600">
                                {weather.condition}
                              </p>
                            </div>
                          </div>
                          <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-cocoa-600">
                            <div>
                              <span className="font-semibold">Humidity:</span>{" "}
                              {weather.humidity}%
                            </div>
                            <div>
                              <span className="font-semibold">Rainfall:</span>{" "}
                              {weather.rainfall}mm
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.section>
                )}

                {/* Reports Panel */}
                {showReports && (
                  <motion.section
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl border border-cream-200 bg-white/90 p-6 shadow-lg"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-cocoa-900">
                          Generate Reports
                        </h2>
                        <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
                          Export comprehensive analytics
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowReports(false)}
                        className="rounded-full p-2 text-cocoa-400 transition hover:bg-cream-100"
                        aria-label="Close reports"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-3">
                        {[
                          { id: "summary", label: "📊 Summary Report", icon: "📊" },
                          {
                            id: "detailed",
                            label: "📋 Detailed Report",
                            icon: "📋",
                          },
                          {
                            id: "financial",
                            label: "💰 Financial Report",
                            icon: "💰",
                          },
                        ].map((report) => (
                          <button
                            key={report.id}
                            type="button"
                            onClick={() => {
                              generateReport(
                                report.id as "summary" | "detailed" | "financial"
                              );
                            }}
                            className={`flex flex-col items-center gap-2 rounded-xl border p-4 transition ${
                              selectedReportType === report.id
                                ? "border-cocoa-900 bg-cocoa-900 text-white"
                                : "border-cream-300 bg-white text-cocoa-700 hover:border-cocoa-300"
                            }`}
                          >
                            <span className="text-2xl">{report.icon}</span>
                            <span className="text-xs font-semibold">{report.label}</span>
                          </button>
                        ))}
                      </div>
                      <div className="rounded-2xl border border-cream-200 bg-cream-50/70 p-4 text-sm text-cocoa-600">
                        <p className="font-semibold text-cocoa-900">
                          Report includes:
                        </p>
                        <ul className="mt-2 space-y-1 text-xs">
                          <li>• Plantation statistics and metrics</li>
                          <li>• Task completion and status</li>
                          <li>• Financial summaries (receipts & loans)</li>
                          <li>• Engagement metrics (complaints & support)</li>
                          <li>• Carbon offset and sustainability data</li>
                        </ul>
                      </div>
                    </div>
                  </motion.section>
                )}

                {/* Timeline View */}
                {showTimelineView && (
                  <motion.section
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl border border-cream-200 bg-white/90 p-6 shadow-lg"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-cocoa-900">
                          Activity Timeline
                        </h2>
                        <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
                          Chronological event history
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowTimelineView(false)}
                        className="rounded-full p-2 text-cocoa-400 transition hover:bg-cream-100"
                        aria-label="Close timeline"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="space-y-4">
                      {timelineEvents.slice(0, 20).map((event, index) => (
                        <div
                          key={event.id}
                          className="flex gap-4 rounded-2xl border border-cream-200 bg-cream-50/70 p-4"
                        >
                          <div className="flex flex-col items-center">
                            <div
                              className={`h-3 w-3 rounded-full ${
                                event.type === "plantation"
                                  ? "bg-leaf-500"
                                  : event.type === "harvest"
                                  ? "bg-gold-500"
                                  : event.type === "task"
                                  ? "bg-blue-500"
                                  : "bg-purple-500"
                              }`}
                            />
                            {index < timelineEvents.slice(0, 20).length - 1 && (
                              <div className="h-full w-0.5 bg-cream-300" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-semibold text-cocoa-900">
                                  {event.title}
                                </h3>
                                <p className="mt-1 text-sm text-cocoa-600">
                                  {event.description}
                                </p>
                              </div>
                              <span className="text-xs text-cocoa-500">
                                {new Date(event.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                      {timelineEvents.length === 0 && (
                        <p className="py-8 text-center text-sm text-cocoa-500">
                          No timeline events found
                        </p>
                      )}
                    </div>
                  </motion.section>
                )}

                {/* Statistics Comparison */}
                {showStatisticsComparison && (
                  <motion.section
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl border border-cream-200 bg-gradient-to-br from-violet-50/80 to-fuchsia-50/80 p-6 shadow-lg backdrop-blur"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-cocoa-900">
                          Statistics Comparison
                        </h2>
                        <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
                          Filtered vs All-time stats
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowStatisticsComparison(false)}
                        className="rounded-full p-2 text-cocoa-400 transition hover:bg-white/50"
                        aria-label="Close comparison"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <div className="rounded-2xl border border-violet-200 bg-white/90 p-4 shadow-sm">
                        <div className="mb-2 text-xs uppercase tracking-[0.2em] text-cocoa-400">
                          Plantations
                        </div>
                        <div className="mb-2 flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-violet-700">
                            {statisticsComparison.filtered.totalPlantations}
                          </span>
                          <span className="text-sm text-cocoa-500">
                            / {statisticsComparison.allTime.totalPlantations}
                          </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-cream-200">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width: `${statisticsComparison.percentage.plantations}%`,
                            }}
                            className="h-full bg-violet-500"
                          />
                        </div>
                        <p className="mt-2 text-xs text-cocoa-500">
                          {Math.round(statisticsComparison.percentage.plantations)}% of
                          total
                        </p>
                      </div>
                      <div className="rounded-2xl border border-fuchsia-200 bg-white/90 p-4 shadow-sm">
                        <div className="mb-2 text-xs uppercase tracking-[0.2em] text-cocoa-400">
                          Harvested
                        </div>
                        <div className="mb-2 flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-fuchsia-700">
                            {statisticsComparison.filtered.totalHarvested}
                          </span>
                          <span className="text-sm text-cocoa-500">
                            / {statisticsComparison.allTime.totalHarvested}
                          </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-cream-200">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width: `${statisticsComparison.percentage.harvested}%`,
                            }}
                            className="h-full bg-fuchsia-500"
                          />
                        </div>
                        <p className="mt-2 text-xs text-cocoa-500">
                          {Math.round(statisticsComparison.percentage.harvested)}% of
                          total
                        </p>
                      </div>
                      <div className="rounded-2xl border border-indigo-200 bg-white/90 p-4 shadow-sm">
                        <div className="mb-2 text-xs uppercase tracking-[0.2em] text-cocoa-400">
                          Carbon Offset
                        </div>
                        <div className="mb-2 flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-indigo-700">
                            {statisticsComparison.filtered.totalCarbon.toFixed(1)}
                          </span>
                          <span className="text-sm text-cocoa-500">
                            / {statisticsComparison.allTime.totalCarbon.toFixed(1)} tCO₂
                          </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-cream-200">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width: `${statisticsComparison.percentage.carbon}%`,
                            }}
                            className="h-full bg-indigo-500"
                          />
                        </div>
                        <p className="mt-2 text-xs text-cocoa-500">
                          {Math.round(statisticsComparison.percentage.carbon)}% of total
                        </p>
                      </div>
                      <div className="rounded-2xl border border-cyan-200 bg-white/90 p-4 shadow-sm">
                        <div className="mb-2 text-xs uppercase tracking-[0.2em] text-cocoa-400">
                          Tasks
                        </div>
                        <div className="mb-2 flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-cyan-700">
                            {statisticsComparison.filtered.totalTasks}
                          </span>
                          <span className="text-sm text-cocoa-500">
                            / {statisticsComparison.allTime.totalTasks}
                          </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-cream-200">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width: `${statisticsComparison.percentage.tasks}%`,
                            }}
                            className="h-full bg-cyan-500"
                          />
                        </div>
                        <p className="mt-2 text-xs text-cocoa-500">
                          {Math.round(statisticsComparison.percentage.tasks)}% of total
                        </p>
                      </div>
                    </div>
                  </motion.section>
                )}

                {/* Advanced Search */}
                {showAdvancedSearch && (
                  <motion.section
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl border border-cream-200 bg-white/90 p-6 shadow-lg"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-cocoa-900">
                          Advanced Search
                        </h2>
                        <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
                          Multi-criteria search filters
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowAdvancedSearch(false)}
                        className="rounded-full p-2 text-cocoa-400 transition hover:bg-cream-100"
                        aria-label="Close advanced search"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-cocoa-700">
                            Search in:
                          </label>
                          <div className="space-y-2">
                            {[
                              "Seed Name",
                              "Location",
                              "Notes",
                              "Tasks",
                              "Collaborators",
                            ].map((field) => (
                              <label
                                key={field}
                                className="flex items-center gap-2 text-sm text-cocoa-600"
                              >
                                <input
                                  type="checkbox"
                                  defaultChecked
                                  className="h-4 w-4 rounded border-cream-300 text-leaf-500 focus:ring-2 focus:ring-leaf-400"
                                />
                                {field}
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-cocoa-700">
                            Filter by metrics:
                          </label>
                          <div className="space-y-2">
                            <label className="block text-sm text-cocoa-600">
                              Min trees:
                              <input
                                type="number"
                                min="0"
                                className="mt-1 w-full rounded-xl border border-cream-300 bg-white px-3 py-1.5 text-sm focus:border-cocoa-400 focus:outline-none focus:ring-2 focus:ring-cocoa-200"
                                placeholder="Any"
                              />
                            </label>
                            <label className="block text-sm text-cocoa-600">
                              Min carbon offset (tCO₂):
                              <input
                                type="number"
                                min="0"
                                step="0.1"
                                className="mt-1 w-full rounded-xl border border-cream-300 bg-white px-3 py-1.5 text-sm focus:border-cocoa-400 focus:outline-none focus:ring-2 focus:ring-cocoa-200"
                                placeholder="Any"
                              />
                            </label>
                            <label className="block text-sm text-cocoa-600">
                              Min area (ha):
                              <input
                                type="number"
                                min="0"
                                step="0.1"
                                className="mt-1 w-full rounded-xl border border-cream-300 bg-white px-3 py-1.5 text-sm focus:border-cocoa-400 focus:outline-none focus:ring-2 focus:ring-cocoa-200"
                                placeholder="Any"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-2xl border border-cream-200 bg-cream-50/70 p-4">
                        <p className="text-sm font-semibold text-cocoa-900">
                          Search Tips:
                        </p>
                        <ul className="mt-2 space-y-1 text-xs text-cocoa-600">
                          <li>• Use multiple filters together for precise results</li>
                          <li>• Search is case-insensitive</li>
                          <li>• Partial matches are supported</li>
                          <li>• Combine with quick filter presets for best results</li>
                        </ul>
                      </div>
                    </div>
                  </motion.section>
                )}

                {/* Quick Actions Panel */}
                {showQuickActionsPanel && (
                  <motion.section
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl border border-cream-200 bg-gradient-to-br from-yellow-50/80 to-amber-50/80 p-6 shadow-lg backdrop-blur"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-cocoa-900">
                          Quick Actions
                        </h2>
                        <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
                          One-click shortcuts
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowQuickActionsPanel(false)}
                        className="rounded-full p-2 text-cocoa-400 transition hover:bg-white/50"
                        aria-label="Close quick actions"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {quickActions.map((action) => (
                        <motion.button
                          key={action.id}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            action.action();
                            setShowQuickActionsPanel(false);
                          }}
                          className={`flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition ${
                            action.color === "leaf"
                              ? "border-leaf-300 bg-leaf-50/80 hover:bg-leaf-100"
                              : action.color === "blue"
                              ? "border-blue-300 bg-blue-50/80 hover:bg-blue-100"
                              : action.color === "orange"
                              ? "border-orange-300 bg-orange-50/80 hover:bg-orange-100"
                              : action.color === "green"
                              ? "border-green-300 bg-green-50/80 hover:bg-green-100"
                              : action.color === "purple"
                              ? "border-purple-300 bg-purple-50/80 hover:bg-purple-100"
                              : "border-indigo-300 bg-indigo-50/80 hover:bg-indigo-100"
                          }`}
                        >
                          <span className="text-3xl">{action.icon}</span>
                          <span className="text-sm font-semibold text-cocoa-900">
                            {action.label}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.section>
                )}

                {/* Analytics Dashboard */}
                {showAnalyticsDashboard && (
                  <motion.section
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl border border-cream-200 bg-gradient-to-br from-cyan-50/80 to-blue-50/80 p-6 shadow-lg backdrop-blur"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-cocoa-900">
                          Analytics Dashboard
                        </h2>
                        <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
                          Comprehensive analytics overview
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowAnalyticsDashboard(false)}
                        className="rounded-full p-2 text-cocoa-400 transition hover:bg-white/50"
                        aria-label="Close analytics"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <div className="rounded-2xl border border-cyan-200 bg-white/90 p-4 shadow-sm">
                        <div className="mb-2 text-xs uppercase tracking-[0.2em] text-cocoa-400">
                          Total Yield
                        </div>
                        <div className="text-2xl font-bold text-cyan-700">
                          {analyticsSummary.totalYield.toLocaleString()} kg
                        </div>
                        <p className="mt-1 text-xs text-cocoa-500">
                          Projected across all plantations
                        </p>
                      </div>
                      <div className="rounded-2xl border border-blue-200 bg-white/90 p-4 shadow-sm">
                        <div className="mb-2 text-xs uppercase tracking-[0.2em] text-cocoa-400">
                          Avg Yield
                        </div>
                        <div className="text-2xl font-bold text-blue-700">
                          {Math.round(analyticsSummary.avgYield).toLocaleString()} kg
                        </div>
                        <p className="mt-1 text-xs text-cocoa-500">
                          Per plantation average
                        </p>
                      </div>
                      <div className="rounded-2xl border border-indigo-200 bg-white/90 p-4 shadow-sm">
                        <div className="mb-2 text-xs uppercase tracking-[0.2em] text-cocoa-400">
                          Active Regions
                        </div>
                        <div className="text-2xl font-bold text-indigo-700">
                          {analyticsSummary.activeRegions}
                        </div>
                        <p className="mt-1 text-xs text-cocoa-500">
                          Geographic coverage
                        </p>
                      </div>
                      <div className="rounded-2xl border border-purple-200 bg-white/90 p-4 shadow-sm">
                        <div className="mb-2 text-xs uppercase tracking-[0.2em] text-cocoa-400">
                          Avg Harvest Time
                        </div>
                        <div className="text-2xl font-bold text-purple-700">
                          {Math.round(analyticsSummary.avgDaysToHarvest)} days
                        </div>
                        <p className="mt-1 text-xs text-cocoa-500">
                          Time to harvest
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 rounded-2xl border border-cream-200 bg-cream-50/70 p-4">
                      <p className="text-sm font-semibold text-cocoa-900">
                        Analytics Insights:
                      </p>
                      <ul className="mt-2 space-y-1 text-xs text-cocoa-600">
                        <li>
                          • {analyticsSummary.cohortCount} active cohorts tracked
                        </li>
                        <li>
                          • {analyticsSnapshot.yieldForecasts.length} yield forecasts
                          available
                        </li>
                        <li>
                          • Average growth efficiency:{" "}
                          {analyticsSummary.avgDaysToHarvest > 0
                            ? `${Math.round(180 / analyticsSummary.avgDaysToHarvest * 100)}%`
                            : "N/A"}
                        </li>
                      </ul>
                    </div>
                  </motion.section>
                )}

                {/* Help Center */}
                {showHelpCenter && (
                  <motion.section
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl border border-cream-200 bg-white/90 p-6 shadow-lg"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-cocoa-900">
                          Help Center
                        </h2>
                        <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
                          Guides and shortcuts
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowHelpCenter(false)}
                        className="rounded-full p-2 text-cocoa-400 transition hover:bg-cream-100"
                        aria-label="Close help"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-2xl border border-cream-200 bg-cream-50/70 p-4">
                          <h3 className="mb-2 font-semibold text-cocoa-900">
                            Keyboard Shortcuts
                          </h3>
                          <ul className="space-y-1 text-xs text-cocoa-600">
                            <li>
                              <kbd className="rounded bg-white px-1.5 py-0.5 font-mono text-xs shadow">
                                ⌘K
                              </kbd>{" "}
                              Focus search
                            </li>
                            <li>
                              <kbd className="rounded bg-white px-1.5 py-0.5 font-mono text-xs shadow">
                                ⌘N
                              </kbd>{" "}
                              Plant new seed
                            </li>
                            <li>
                              <kbd className="rounded bg-white px-1.5 py-0.5 font-mono text-xs shadow">
                                Esc
                              </kbd>{" "}
                              Close modals
                            </li>
                          </ul>
                        </div>
                        <div className="rounded-2xl border border-cream-200 bg-cream-50/70 p-4">
                          <h3 className="mb-2 font-semibold text-cocoa-900">
                            Quick Tips
                          </h3>
                          <ul className="space-y-1 text-xs text-cocoa-600">
                            <li>• Use filters to find specific plantations</li>
                            <li>• Star favorites for quick access</li>
                            <li>• Compare up to 3 plantations at once</li>
                            <li>• Export data for backup or analysis</li>
                          </ul>
                        </div>
                      </div>
                      <div className="rounded-2xl border border-cream-200 bg-cream-50/70 p-4">
                        <h3 className="mb-2 font-semibold text-cocoa-900">
                          Feature Guide
                        </h3>
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                          {[
                            { icon: "🌱", name: "Plant Seeds", desc: "Track new plantations" },
                            { icon: "📊", name: "Analytics", desc: "View performance metrics" },
                            { icon: "📅", name: "Timeline", desc: "See activity history" },
                            { icon: "⭐", name: "Favorites", desc: "Star important items" },
                            { icon: "🔍", name: "Search", desc: "Find plantations quickly" },
                            { icon: "📤", name: "Export", desc: "Download your data" },
                          ].map((feature) => (
                            <div
                              key={feature.name}
                              className="flex items-start gap-2 rounded-xl border border-cream-200 bg-white p-2"
                            >
                              <span className="text-lg">{feature.icon}</span>
                              <div>
                                <p className="text-xs font-semibold text-cocoa-900">
                                  {feature.name}
                                </p>
                                <p className="text-[10px] text-cocoa-500">
                                  {feature.desc}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.section>
                )}

                {/* Performance Monitor */}
                {showPerformanceMonitor && (
                  <motion.section
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl border border-cream-200 bg-gradient-to-br from-emerald-50/80 to-teal-50/80 p-6 shadow-lg backdrop-blur"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-cocoa-900">
                          Performance Monitor
                        </h2>
                        <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
                          System performance metrics
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowPerformanceMonitor(false)}
                        className="rounded-full p-2 text-cocoa-400 transition hover:bg-white/50"
                        aria-label="Close performance monitor"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <div className="rounded-2xl border border-emerald-200 bg-white/90 p-4 shadow-sm">
                        <div className="mb-2 text-xs uppercase tracking-[0.2em] text-cocoa-400">
                          Render Time
                        </div>
                        <div className="text-2xl font-bold text-emerald-700">
                          {performanceMetrics.renderTime}ms
                        </div>
                        <p className="mt-1 text-xs text-cocoa-500">
                          Page load performance
                        </p>
                      </div>
                      {performanceMetrics.memoryUsage && (
                        <>
                          <div className="rounded-2xl border border-teal-200 bg-white/90 p-4 shadow-sm">
                            <div className="mb-2 text-xs uppercase tracking-[0.2em] text-cocoa-400">
                              Memory Used
                            </div>
                            <div className="text-2xl font-bold text-teal-700">
                              {performanceMetrics.memoryUsage.used} MB
                            </div>
                            <p className="mt-1 text-xs text-cocoa-500">
                              of {performanceMetrics.memoryUsage.total} MB
                            </p>
                          </div>
                          <div className="rounded-2xl border border-cyan-200 bg-white/90 p-4 shadow-sm">
                            <div className="mb-2 text-xs uppercase tracking-[0.2em] text-cocoa-400">
                              Memory Limit
                            </div>
                            <div className="text-2xl font-bold text-cyan-700">
                              {performanceMetrics.memoryUsage.limit} MB
                            </div>
                            <p className="mt-1 text-xs text-cocoa-500">
                              Maximum available
                            </p>
                          </div>
                        </>
                      )}
                      <div className="rounded-2xl border border-green-200 bg-white/90 p-4 shadow-sm">
                        <div className="mb-2 text-xs uppercase tracking-[0.2em] text-cocoa-400">
                          Data Loaded
                        </div>
                        <div className="text-2xl font-bold text-green-700">
                          {performanceMetrics.plantationsLoaded}
                        </div>
                        <p className="mt-1 text-xs text-cocoa-500">
                          Plantations in view
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 rounded-2xl border border-cream-200 bg-cream-50/70 p-4">
                      <p className="text-sm font-semibold text-cocoa-900">
                        Performance Status:
                      </p>
                      <p className="mt-1 text-xs text-cocoa-600">
                        {performanceMetrics.renderTime < 100
                          ? "✅ Excellent performance"
                          : performanceMetrics.renderTime < 500
                          ? "⚡ Good performance"
                          : "⚠️ Performance may be slow"}
                      </p>
                    </div>
                  </motion.section>
                )}

                {/* Data Visualization */}
                {showDataVisualization && (
                  <motion.section
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl border border-cream-200 bg-gradient-to-br from-rose-50/80 to-pink-50/80 p-6 shadow-lg backdrop-blur"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-cocoa-900">
                          Data Visualizations
                        </h2>
                        <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
                          Interactive data charts
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowDataVisualization(false)}
                        className="rounded-full p-2 text-cocoa-400 transition hover:bg-white/50"
                        aria-label="Close visualizations"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="space-y-6">
                      {/* Stage Distribution */}
                      <div className="rounded-2xl border border-rose-200 bg-white/90 p-4 shadow-sm">
                        <h3 className="mb-3 text-sm font-semibold text-cocoa-900">
                          Stage Distribution
                        </h3>
                        <div className="space-y-2">
                          {Object.entries(dataVisualizationMetrics.stageDistribution).map(
                            ([stage, count]) => {
                              const total =
                                dataVisualizationMetrics.stageDistribution.planted +
                                dataVisualizationMetrics.stageDistribution.growing +
                                dataVisualizationMetrics.stageDistribution.harvested;
                              const percentage = total > 0 ? (count / total) * 100 : 0;
                              return (
                                <div key={stage}>
                                  <div className="mb-1 flex items-center justify-between text-xs">
                                    <span className="font-semibold text-cocoa-700 capitalize">
                                      {stage}
                                    </span>
                                    <span className="text-cocoa-600">
                                      {count} ({Math.round(percentage)}%)
                                    </span>
                                  </div>
                                  <div className="h-2 overflow-hidden rounded-full bg-cream-200">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ width: `${percentage}%` }}
                                      transition={{ duration: 0.5 }}
                                      className={`h-full ${
                                        stage === "planted"
                                          ? "bg-blue-500"
                                          : stage === "growing"
                                          ? "bg-leaf-500"
                                          : "bg-gold-500"
                                      }`}
                                    />
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>

                      {/* Task Status Distribution */}
                      <div className="rounded-2xl border border-pink-200 bg-white/90 p-4 shadow-sm">
                        <h3 className="mb-3 text-sm font-semibold text-cocoa-900">
                          Task Status Distribution
                        </h3>
                        <div className="space-y-2">
                          {Object.entries(
                            dataVisualizationMetrics.taskStatusDistribution
                          ).map(([status, count]) => {
                            const total =
                              dataVisualizationMetrics.taskStatusDistribution.pending +
                              dataVisualizationMetrics.taskStatusDistribution.in_progress +
                              dataVisualizationMetrics.taskStatusDistribution.completed;
                            const percentage = total > 0 ? (count / total) * 100 : 0;
                            return (
                              <div key={status}>
                                <div className="mb-1 flex items-center justify-between text-xs">
                                  <span className="font-semibold text-cocoa-700 capitalize">
                                    {status.replace("_", " ")}
                                  </span>
                                  <span className="text-cocoa-600">
                                    {count} ({Math.round(percentage)}%)
                                  </span>
                                </div>
                                <div className="h-2 overflow-hidden rounded-full bg-cream-200">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percentage}%` }}
                                    transition={{ duration: 0.5 }}
                                    className={`h-full ${
                                      status === "pending"
                                        ? "bg-amber-500"
                                        : status === "in_progress"
                                        ? "bg-blue-500"
                                        : "bg-green-500"
                                    }`}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Location Distribution */}
                      <div className="rounded-2xl border border-rose-200 bg-white/90 p-4 shadow-sm">
                        <h3 className="mb-3 text-sm font-semibold text-cocoa-900">
                          Location Distribution
                        </h3>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {Object.entries(
                            dataVisualizationMetrics.locationDistribution
                          )
                            .sort(([, a], [, b]) => b - a)
                            .slice(0, 6)
                            .map(([location, count]) => (
                              <div
                                key={location}
                                className="flex items-center justify-between rounded-xl border border-cream-200 bg-cream-50/70 px-3 py-2"
                              >
                                <span className="text-xs font-semibold text-cocoa-700">
                                  {location}
                                </span>
                                <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-semibold text-rose-700">
                                  {count}
                                </span>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </motion.section>
                )}

                {/* Dashboard Settings */}
                {showDashboardSettings && (
                  <motion.section
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl border border-cream-200 bg-white/90 p-6 shadow-lg"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-cocoa-900">
                          Dashboard Settings
                        </h2>
                        <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
                          Customize your experience
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowDashboardSettings(false)}
                        className="rounded-full p-2 text-cocoa-400 transition hover:bg-cream-100"
                        aria-label="Close settings"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="space-y-6">
                      <div className="rounded-2xl border border-cream-200 bg-cream-50/70 p-4">
                        <h3 className="mb-3 text-sm font-semibold text-cocoa-900">
                          Display Preferences
                        </h3>
                        <div className="space-y-3">
                          <label className="flex items-center justify-between">
                            <span className="text-sm text-cocoa-700">
                              Default view mode
                            </span>
                            <select
                              value={viewMode}
                              onChange={(e) =>
                                setViewMode(e.target.value as "grid" | "list")
                              }
                              className="rounded-xl border border-cream-300 bg-white px-3 py-1.5 text-xs focus:border-cocoa-400 focus:outline-none focus:ring-2 focus:ring-cocoa-200"
                            >
                              <option value="grid">Grid</option>
                              <option value="list">List</option>
                            </select>
                          </label>
                          <label className="flex items-center justify-between">
                            <span className="text-sm text-cocoa-700">
                              Dashboard layout
                            </span>
                            <select
                              value={dashboardLayout}
                              onChange={(e) =>
                                setDashboardLayout(
                                  e.target.value as "default" | "compact" | "spacious"
                                )
                              }
                              className="rounded-xl border border-cream-300 bg-white px-3 py-1.5 text-xs focus:border-cocoa-400 focus:outline-none focus:ring-2 focus:ring-cocoa-200"
                            >
                              <option value="default">Default</option>
                              <option value="compact">Compact</option>
                              <option value="spacious">Spacious</option>
                            </select>
                          </label>
                          <label className="flex items-center justify-between">
                            <span className="text-sm text-cocoa-700">
                              Default sort order
                            </span>
                            <select
                              value={sortBy}
                              onChange={(e) =>
                                setSortBy(e.target.value as "date" | "name" | "stage")
                              }
                              className="rounded-xl border border-cream-300 bg-white px-3 py-1.5 text-xs focus:border-cocoa-400 focus:outline-none focus:ring-2 focus:ring-cocoa-200"
                            >
                              <option value="date">Date</option>
                              <option value="name">Name</option>
                              <option value="stage">Stage</option>
                            </select>
                          </label>
                        </div>
                      </div>
                      <div className="rounded-2xl border border-cream-200 bg-cream-50/70 p-4">
                        <h3 className="mb-3 text-sm font-semibold text-cocoa-900">
                          Data Management
                        </h3>
                        <div className="space-y-3">
                          <button
                            type="button"
                            onClick={handleExportData}
                            className="w-full rounded-xl border border-cream-300 bg-white px-4 py-2 text-sm font-semibold text-cocoa-700 transition hover:border-cocoa-300 hover:bg-cream-50"
                          >
                            📤 Export All Data
                          </button>
                          <label className="flex cursor-pointer items-center justify-between rounded-xl border border-cream-300 bg-white px-4 py-2 transition hover:border-cocoa-300 hover:bg-cream-50">
                            <span className="text-sm font-semibold text-cocoa-700">
                              📥 Import Data
                            </span>
                            <input
                              type="file"
                              accept=".json"
                              onChange={handleImportData}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                      <div className="rounded-2xl border border-cream-200 bg-cream-50/70 p-4">
                        <h3 className="mb-3 text-sm font-semibold text-cocoa-900">
                          Reset Options
                        </h3>
                        <button
                          type="button"
                          onClick={() => {
                            handleClearFilters();
                            setFavorites(new Set());
                            setNotes(new Map());
                            alert("Dashboard preferences reset!");
                          }}
                          className="w-full rounded-xl border border-rose-300 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
                        >
                          🔄 Reset All Preferences
                        </button>
                      </div>
                    </div>
                  </motion.section>
                )}

                {/* Activity Feed */}
                {showActivityFeed && (
                  <motion.section
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl border border-cream-200 bg-gradient-to-br from-slate-50/80 to-gray-50/80 p-6 shadow-lg backdrop-blur"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-cocoa-900">
                          Activity Feed
                        </h2>
                        <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
                          Recent updates and changes
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowActivityFeed(false)}
                        className="rounded-full p-2 text-cocoa-400 transition hover:bg-white/50"
                        aria-label="Close activity feed"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="space-y-3">
                      {activityFeedItems.length === 0 ? (
                        <p className="py-8 text-center text-sm text-cocoa-500">
                          No recent activity
                        </p>
                      ) : (
                        activityFeedItems.map((activity) => (
                          <div
                            key={activity.id}
                            className="flex items-start gap-3 rounded-2xl border border-cream-200 bg-white/90 p-4 shadow-sm"
                          >
                            <span className="text-2xl">{activity.icon}</span>
                            <div className="flex-1">
                              <h3 className="font-semibold text-cocoa-900">
                                {activity.title}
                              </h3>
                              <p className="mt-1 text-sm text-cocoa-600">
                                {activity.description}
                              </p>
                              <p className="mt-2 text-xs text-cocoa-500">
                                {new Date(activity.timestamp).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.section>
                )}

                {/* Smart Recommendations */}
                {showSmartRecommendations && (
                  <motion.section
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl border border-cream-200 bg-gradient-to-br from-amber-50/80 to-yellow-50/80 p-6 shadow-lg backdrop-blur"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-cocoa-900">
                          Smart Recommendations
                        </h2>
                        <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
                          AI-powered suggestions
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowSmartRecommendations(false)}
                        className="rounded-full p-2 text-cocoa-400 transition hover:bg-white/50"
                        aria-label="Close recommendations"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="space-y-3">
                      {smartRecommendations.length === 0 ? (
                        <div className="rounded-2xl border border-green-200 bg-green-50/80 p-6 text-center">
                          <span className="text-4xl">✅</span>
                          <p className="mt-2 text-sm font-semibold text-green-900">
                            All caught up!
                          </p>
                          <p className="mt-1 text-xs text-green-700">
                            No recommendations at this time.
                          </p>
                        </div>
                      ) : (
                        smartRecommendations.map((recommendation) => (
                          <div
                            key={recommendation.id}
                            className={`rounded-2xl border p-4 ${
                              recommendation.type === "warning"
                                ? "border-amber-200 bg-amber-50/80"
                                : recommendation.type === "action"
                                ? "border-blue-200 bg-blue-50/80"
                                : recommendation.type === "success"
                                ? "border-green-200 bg-green-50/80"
                                : "border-indigo-200 bg-indigo-50/80"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <span className="text-2xl">{recommendation.icon}</span>
                              <div className="flex-1">
                                <h3 className="font-semibold text-cocoa-900">
                                  {recommendation.title}
                                </h3>
                                <p className="mt-1 text-sm text-cocoa-600">
                                  {recommendation.description}
                                </p>
                                {recommendation.action && (
                                  <button
                                    type="button"
                                    onClick={recommendation.action}
                                    className="mt-2 rounded-full border border-cocoa-300 bg-white px-3 py-1 text-xs font-semibold text-cocoa-700 transition hover:bg-cream-50"
                                  >
                                    Take Action
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.section>
                )}

                {/* Batch Operations */}
                {showBatchOperations && (
                  <motion.section
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl border border-cream-200 bg-gradient-to-br from-violet-50/80 to-purple-50/80 p-6 shadow-lg backdrop-blur"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-cocoa-900">
                          Batch Operations
                        </h2>
                        <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
                          Bulk actions on selected items
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowBatchOperations(false)}
                        className="rounded-full p-2 text-cocoa-400 transition hover:bg-white/50"
                        aria-label="Close batch operations"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div className="rounded-2xl border border-violet-200 bg-white/90 p-4">
                        <h3 className="mb-3 text-sm font-semibold text-cocoa-900">
                          Selected: {selectedPlantations.size} plantation
                          {selectedPlantations.size !== 1 ? "s" : ""}
                        </h3>
                        {selectedPlantations.size === 0 ? (
                          <p className="text-sm text-cocoa-600">
                            Select plantations from the grid to perform batch operations.
                          </p>
                        ) : (
                          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            <button
                              type="button"
                              onClick={() =>
                                handleBulkAdvanceStage("growing")
                              }
                              className="rounded-xl border border-leaf-300 bg-leaf-50 px-4 py-2 text-sm font-semibold text-leaf-700 transition hover:bg-leaf-100"
                            >
                              🌱 Mark as Growing
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                handleBulkAdvanceStage("harvested")
                              }
                              className="rounded-xl border border-gold-300 bg-gold-50 px-4 py-2 text-sm font-semibold text-gold-700 transition hover:bg-gold-100"
                            >
                              🚚 Mark as Harvested
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                selectedPlantations.forEach((id) =>
                                  handleToggleFavorite(id)
                                );
                                setSelectedPlantations(new Set());
                              }}
                              className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 transition hover:bg-amber-100"
                            >
                              ⭐ Add to Favorites
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const ids = Array.from(selectedPlantations);
                                ids.forEach((id) => {
                                  const plantation = filteredPlantations.find(
                                    (p) => p.id === id
                                  );
                                  if (plantation) {
                                    handleOpenNotes(id);
                                  }
                                });
                              }}
                              className="rounded-xl border border-blue-300 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
                            >
                              📝 Add Notes
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const exportData = filteredPlantations
                                  .filter((p) => selectedPlantations.has(p.id))
                                  .map((p) => ({
                                    id: p.id,
                                    seedName: p.seedName,
                                    location: p.location,
                                    stage: p.stage,
                                    treeCount: p.treeCount,
                                    areaHectares: p.areaHectares,
                                    carbonOffsetTons: p.carbonOffsetTons,
                                  }));
                                const blob = new Blob(
                                  [JSON.stringify(exportData, null, 2)],
                                  { type: "application/json" }
                                );
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement("a");
                                a.href = url;
                                a.download = `selected-plantations-${new Date().toISOString().split("T")[0]}.json`;
                                document.body.appendChild(a);
                                a.click();
                                document.body.removeChild(a);
                                URL.revokeObjectURL(url);
                              }}
                              className="rounded-xl border border-purple-300 bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700 transition hover:bg-purple-100"
                            >
                              📤 Export Selected
                            </button>
                            <button
                              type="button"
                              onClick={() => setSelectedPlantations(new Set())}
                              className="rounded-xl border border-rose-300 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
                            >
                              🗑️ Clear Selection
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="rounded-2xl border border-cream-200 bg-cream-50/70 p-4">
                        <p className="text-sm font-semibold text-cocoa-900">
                          Batch Operation Tips:
                        </p>
                        <ul className="mt-2 space-y-1 text-xs text-cocoa-600">
                          <li>• Select multiple plantations using checkboxes</li>
                          <li>• Use "Select All" to select all filtered plantations</li>
                          <li>• Batch operations apply to all selected items</li>
                          <li>• Export selected items for backup or analysis</li>
                        </ul>
                      </div>
                    </div>
                  </motion.section>
                )}

                {/* AI Assistant */}
                {showAIAssistant && (
                  <motion.section
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl border border-cream-200 bg-gradient-to-br from-violet-50/80 to-purple-50/80 p-6 shadow-lg backdrop-blur"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-cocoa-900">
                          AI Assistant
                        </h2>
                        <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
                          Get help and insights
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowAIAssistant(false)}
                        className="rounded-full p-2 text-cocoa-400 transition hover:bg-white/50"
                        aria-label="Close AI assistant"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div className="rounded-2xl border border-violet-200 bg-white/90 p-4">
                        <h3 className="mb-3 text-sm font-semibold text-cocoa-900">
                          Ask a Question
                        </h3>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Ask about plantations, tasks, or best practices..."
                            className="flex-1 rounded-xl border border-cream-300 bg-white px-4 py-2 text-sm focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-200"
                          />
                          <button
                            type="button"
                            className="rounded-xl border border-violet-300 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700 transition hover:bg-violet-100"
                          >
                            Ask
                          </button>
                        </div>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {[
                          "How do I improve yield?",
                          "What tasks are overdue?",
                          "Best practices for harvesting",
                          "Carbon offset tips",
                        ].map((suggestion) => (
                          <button
                            key={suggestion}
                            type="button"
                            className="rounded-xl border border-violet-200 bg-white/80 px-4 py-2 text-left text-sm text-cocoa-700 transition hover:bg-violet-50"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.section>
                )}

                {/* Yield Optimizer */}
                {showYieldOptimizer && (
                  <motion.section
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl border border-cream-200 bg-gradient-to-br from-green-50/80 to-emerald-50/80 p-6 shadow-lg backdrop-blur"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-cocoa-900">
                          Yield Optimizer
                        </h2>
                        <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
                          Optimize your plantation yields
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowYieldOptimizer(false)}
                        className="rounded-full p-2 text-cocoa-400 transition hover:bg-white/50"
                        aria-label="Close optimizer"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="space-y-3">
                      {yieldOptimizationTips.length === 0 ? (
                        <div className="rounded-2xl border border-green-200 bg-green-50/80 p-6 text-center">
                          <span className="text-4xl">✅</span>
                          <p className="mt-2 text-sm font-semibold text-green-900">
                            Optimal yields!
                          </p>
                          <p className="mt-1 text-xs text-green-700">
                            Your plantations are well optimized.
                          </p>
                        </div>
                      ) : (
                        yieldOptimizationTips.map((tip) => (
                          <div
                            key={tip.id}
                            className={`rounded-2xl border p-4 ${
                              tip.impact === "high"
                                ? "border-green-200 bg-green-50/80"
                                : tip.impact === "medium"
                                ? "border-amber-200 bg-amber-50/80"
                                : "border-blue-200 bg-blue-50/80"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <span className="text-2xl">{tip.icon}</span>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold text-cocoa-900">
                                    {tip.title}
                                  </h3>
                                  <span
                                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                                      tip.impact === "high"
                                        ? "bg-green-100 text-green-700"
                                        : tip.impact === "medium"
                                        ? "bg-amber-100 text-amber-700"
                                        : "bg-blue-100 text-blue-700"
                                    }`}
                                  >
                                    {tip.impact.toUpperCase()} IMPACT
                                  </span>
                                </div>
                                <p className="mt-1 text-sm text-cocoa-600">
                                  {tip.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.section>
                )}

                {/* Compliance Tracker */}
                {showComplianceTracker && (
                  <motion.section
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl border border-cream-200 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 p-6 shadow-lg backdrop-blur"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-cocoa-900">
                          Compliance Tracker
                        </h2>
                        <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
                          Track certifications and compliance
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowComplianceTracker(false)}
                        className="rounded-full p-2 text-cocoa-400 transition hover:bg-white/50"
                        aria-label="Close compliance"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-3">
                        <div className="rounded-2xl border border-blue-200 bg-white/90 p-4 shadow-sm">
                          <div className="mb-2 text-xs uppercase tracking-[0.2em] text-cocoa-400">
                            Certified
                          </div>
                          <div className="text-2xl font-bold text-blue-700">
                            {complianceStatus.certified}
                          </div>
                          <p className="mt-1 text-xs text-cocoa-500">
                            of {complianceStatus.total} plantations
                          </p>
                        </div>
                        <div className="rounded-2xl border border-indigo-200 bg-white/90 p-4 shadow-sm">
                          <div className="mb-2 text-xs uppercase tracking-[0.2em] text-cocoa-400">
                            Compliance Rate
                          </div>
                          <div className="text-2xl font-bold text-indigo-700">
                            {Math.round(complianceStatus.complianceRate)}%
                          </div>
                          <p className="mt-1 text-xs text-cocoa-500">
                            Overall compliance
                          </p>
                        </div>
                        <div className="rounded-2xl border border-purple-200 bg-white/90 p-4 shadow-sm">
                          <div className="mb-2 text-xs uppercase tracking-[0.2em] text-cocoa-400">
                            Status
                          </div>
                          <div className="text-lg font-bold text-purple-700">
                            {complianceStatus.complianceRate >= 80
                              ? "✅ Compliant"
                              : complianceStatus.complianceRate >= 50
                              ? "⚠️ Partial"
                              : "❌ Non-Compliant"}
                          </div>
                          <p className="mt-1 text-xs text-cocoa-500">
                            Current status
                          </p>
                        </div>
                      </div>
                      <div className="rounded-2xl border border-cream-200 bg-cream-50/70 p-4">
                        <p className="text-sm font-semibold text-cocoa-900">
                          Compliance Requirements:
                        </p>
                        <ul className="mt-2 space-y-1 text-xs text-cocoa-600">
                          <li>• Organic certification standards</li>
                          <li>• Fair Trade compliance</li>
                          <li>• Environmental regulations</li>
                          <li>• Quality control standards</li>
                        </ul>
                      </div>
                    </div>
                  </motion.section>
                )}

                {/* Risk Assessment */}
                {showRiskAssessment && (
                  <motion.section
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl border border-cream-200 bg-gradient-to-br from-rose-50/80 to-orange-50/80 p-6 shadow-lg backdrop-blur"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-cocoa-900">
                          Risk Assessment
                        </h2>
                        <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
                          Identify and mitigate risks
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowRiskAssessment(false)}
                        className="rounded-full p-2 text-cocoa-400 transition hover:bg-white/50"
                        aria-label="Close risk assessment"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="space-y-3">
                      {riskAssessment.length === 0 ? (
                        <div className="rounded-2xl border border-green-200 bg-green-50/80 p-6 text-center">
                          <span className="text-4xl">✅</span>
                          <p className="mt-2 text-sm font-semibold text-green-900">
                            No risks detected
                          </p>
                          <p className="mt-1 text-xs text-green-700">
                            Your plantations are in good condition.
                          </p>
                        </div>
                      ) : (
                        riskAssessment.map((risk) => (
                          <div
                            key={risk.id}
                            className={`rounded-2xl border p-4 ${
                              risk.type === "high"
                                ? "border-rose-200 bg-rose-50/80"
                                : risk.type === "medium"
                                ? "border-orange-200 bg-orange-50/80"
                                : "border-amber-200 bg-amber-50/80"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <span className="text-2xl">{risk.icon}</span>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold text-cocoa-900">
                                    {risk.title}
                                  </h3>
                                  <span
                                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                                      risk.type === "high"
                                        ? "bg-rose-100 text-rose-700"
                                        : risk.type === "medium"
                                        ? "bg-orange-100 text-orange-700"
                                        : "bg-amber-100 text-amber-700"
                                    }`}
                                  >
                                    {risk.type.toUpperCase()} RISK
                                  </span>
                                </div>
                                <p className="mt-1 text-sm text-cocoa-600">
                                  {risk.description}
                                </p>
                                <p className="mt-2 text-xs font-semibold text-cocoa-700">
                                  Mitigation: {risk.mitigation}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.section>
                )}

                {/* Supply Chain Manager */}
                {showSupplyChainManager && (
                  <motion.section
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl border border-cream-200 bg-gradient-to-br from-teal-50/80 to-cyan-50/80 p-6 shadow-lg backdrop-blur"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-cocoa-900">
                          Supply Chain Manager
                        </h2>
                        <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
                          Track harvest to market
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowSupplyChainManager(false)}
                        className="rounded-full p-2 text-cocoa-400 transition hover:bg-white/50"
                        aria-label="Close supply chain"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-2xl border border-teal-200 bg-white/90 p-4 shadow-sm">
                          <div className="mb-2 text-xs uppercase tracking-[0.2em] text-cocoa-400">
                            Harvested
                          </div>
                          <div className="text-2xl font-bold text-teal-700">
                            {supplyChainMetrics.harvestedCount}
                          </div>
                          <p className="mt-1 text-xs text-cocoa-500">
                            Plantations
                          </p>
                        </div>
                        <div className="rounded-2xl border border-cyan-200 bg-white/90 p-4 shadow-sm">
                          <div className="mb-2 text-xs uppercase tracking-[0.2em] text-cocoa-400">
                            Total Yield
                          </div>
                          <div className="text-2xl font-bold text-cyan-700">
                            {supplyChainMetrics.totalYield.toFixed(0)} kg
                          </div>
                          <p className="mt-1 text-xs text-cocoa-500">
                            Total production
                          </p>
                        </div>
                        <div className="rounded-2xl border border-blue-200 bg-white/90 p-4 shadow-sm">
                          <div className="mb-2 text-xs uppercase tracking-[0.2em] text-cocoa-400">
                            Avg Yield
                          </div>
                          <div className="text-2xl font-bold text-blue-700">
                            {supplyChainMetrics.avgYieldPerPlantation.toFixed(0)} kg
                          </div>
                          <p className="mt-1 text-xs text-cocoa-500">
                            Per plantation
                          </p>
                        </div>
                        <div className="rounded-2xl border border-indigo-200 bg-white/90 p-4 shadow-sm">
                          <div className="mb-2 text-xs uppercase tracking-[0.2em] text-cocoa-400">
                            Ready
                          </div>
                          <div className="text-2xl font-bold text-indigo-700">
                            {supplyChainMetrics.readyForMarket}
                          </div>
                          <p className="mt-1 text-xs text-cocoa-500">
                            For market
                          </p>
                        </div>
                      </div>
                      <div className="rounded-2xl border border-cream-200 bg-cream-50/70 p-4">
                        <p className="text-sm font-semibold text-cocoa-900">
                          Supply Chain Stages:
                        </p>
                        <div className="mt-2 flex items-center gap-2 text-xs text-cocoa-600">
                          <span>🌱 Harvest</span>
                          <span>→</span>
                          <span>📦 Processing</span>
                          <span>→</span>
                          <span>🚚 Transport</span>
                          <span>→</span>
                          <span>🏪 Market</span>
                        </div>
                      </div>
                    </div>
                  </motion.section>
                )}

                {/* Advanced Analytics */}
                {showAdvancedAnalytics && (
                  <motion.section
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl border border-cream-200 bg-gradient-to-br from-purple-50/80 to-pink-50/80 p-6 shadow-lg backdrop-blur"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-cocoa-900">
                          Advanced Analytics
                        </h2>
                        <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
                          Deep insights and metrics
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowAdvancedAnalytics(false)}
                        className="rounded-full p-2 text-cocoa-400 transition hover:bg-white/50"
                        aria-label="Close analytics"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <div className="rounded-2xl border border-purple-200 bg-white/90 p-4 shadow-sm">
                        <div className="mb-2 text-xs uppercase tracking-[0.2em] text-cocoa-400">
                          Avg Growth Time
                        </div>
                        <div className="text-2xl font-bold text-purple-700">
                          {Math.round(advancedAnalytics.avgGrowthTime)} days
                        </div>
                        <p className="mt-1 text-xs text-cocoa-500">
                          To harvest
                        </p>
                      </div>
                      <div className="rounded-2xl border border-pink-200 bg-white/90 p-4 shadow-sm">
                        <div className="mb-2 text-xs uppercase tracking-[0.2em] text-cocoa-400">
                          Harvest Rate
                        </div>
                        <div className="text-2xl font-bold text-pink-700">
                          {Math.round(advancedAnalytics.harvestRate)}%
                        </div>
                        <p className="mt-1 text-xs text-cocoa-500">
                          Completion rate
                        </p>
                      </div>
                      <div className="rounded-2xl border border-violet-200 bg-white/90 p-4 shadow-sm">
                        <div className="mb-2 text-xs uppercase tracking-[0.2em] text-cocoa-400">
                          Efficiency Score
                        </div>
                        <div className="text-2xl font-bold text-violet-700">
                          {Math.round(advancedAnalytics.efficiencyScore)}%
                        </div>
                        <p className="mt-1 text-xs text-cocoa-500">
                          Overall efficiency
                        </p>
                      </div>
                      <div className="rounded-2xl border border-fuchsia-200 bg-white/90 p-4 shadow-sm">
                        <div className="mb-2 text-xs uppercase tracking-[0.2em] text-cocoa-400">
                          Productivity Index
                        </div>
                        <div className="text-2xl font-bold text-fuchsia-700">
                          {Math.round(advancedAnalytics.productivityIndex)}
                        </div>
                        <p className="mt-1 text-xs text-cocoa-500">
                          Per 1000 trees
                        </p>
                      </div>
                    </div>
                  </motion.section>
                )}

                {/* Automation Rules */}
                {showAutomationRules && (
                  <motion.section
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl border border-cream-200 bg-gradient-to-br from-slate-50/80 to-gray-50/80 p-6 shadow-lg backdrop-blur"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-cocoa-900">
                          Automation Rules
                        </h2>
                        <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
                          Automate routine tasks
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowAutomationRules(false)}
                        className="rounded-full p-2 text-cocoa-400 transition hover:bg-white/50"
                        aria-label="Close automation"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="space-y-3">
                      {[
                        {
                          id: "auto-harvest",
                          name: "Auto-advance to Harvest",
                          description: "Automatically mark plantations as harvested when all tasks are completed",
                          enabled: false,
                        },
                        {
                          id: "auto-alerts",
                          name: "Auto Task Alerts",
                          description: "Send alerts when tasks are due within 24 hours",
                          enabled: true,
                        },
                        {
                          id: "auto-reports",
                          name: "Weekly Reports",
                          description: "Generate and email weekly summary reports",
                          enabled: false,
                        },
                        {
                          id: "auto-backup",
                          name: "Auto Backup",
                          description: "Automatically backup data every 7 days",
                          enabled: true,
                        },
                      ].map((rule) => (
                        <div
                          key={rule.id}
                          className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm"
                        >
                          <div className="flex-1">
                            <h3 className="font-semibold text-cocoa-900">
                              {rule.name}
                            </h3>
                            <p className="mt-1 text-xs text-cocoa-600">
                              {rule.description}
                            </p>
                          </div>
                          <button
                            type="button"
                            className={`ml-4 rounded-full px-4 py-2 text-xs font-semibold transition ${
                              rule.enabled
                                ? "bg-green-100 text-green-700 hover:bg-green-200"
                                : "bg-cream-200 text-cocoa-600 hover:bg-cream-300"
                            }`}
                          >
                            {rule.enabled ? "Enabled" : "Disabled"}
                          </button>
                        </div>
                      ))}
                    </div>
                  </motion.section>
                )}

                {/* Document Scanner */}
                {showDocumentScanner && (
                  <motion.section
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl border border-cream-200 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 p-6 shadow-lg backdrop-blur"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-cocoa-900">
                          Document Scanner
                        </h2>
                        <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
                          Scan and digitize documents
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowDocumentScanner(false)}
                        className="rounded-full p-2 text-cocoa-400 transition hover:bg-white/50"
                        aria-label="Close scanner"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div className="rounded-2xl border border-blue-200 bg-white/90 p-6 text-center">
                        <span className="text-5xl">📷</span>
                        <p className="mt-3 text-sm font-semibold text-cocoa-900">
                          Upload Document to Scan
                        </p>
                        <p className="mt-1 text-xs text-cocoa-600">
                          Supports receipts, invoices, certificates, and more
                        </p>
                        <label className="mt-4 inline-block cursor-pointer rounded-xl border border-blue-300 bg-blue-50 px-6 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100">
                          Choose File
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            className="hidden"
                          />
                        </label>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {[
                          "Receipts",
                          "Invoices",
                          "Certificates",
                          "Contracts",
                        ].map((type) => (
                          <div
                            key={type}
                            className="rounded-xl border border-blue-200 bg-white/80 p-3 text-center text-sm font-semibold text-cocoa-700"
                          >
                            {type}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.section>
                )}

                {/* Weather Forecast */}
                {showWeatherForecast && (
                  <motion.section
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl border border-cream-200 bg-gradient-to-br from-sky-50/80 to-blue-50/80 p-6 shadow-lg backdrop-blur"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-cocoa-900">
                          Weather Forecast
                        </h2>
                        <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
                          7-day weather outlook
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowWeatherForecast(false)}
                        className="rounded-full p-2 text-cocoa-400 transition hover:bg-white/50"
                        aria-label="Close forecast"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
                      {Array.from({ length: 7 }).map((_, index) => {
                        const date = new Date();
                        date.setDate(date.getDate() + index);
                        return (
                          <div
                            key={index}
                            className="rounded-xl border border-sky-200 bg-white/90 p-3 text-center"
                          >
                            <div className="text-xs font-semibold text-cocoa-600">
                              {date.toLocaleDateString("en-US", {
                                weekday: "short",
                              })}
                            </div>
                            <div className="mt-1 text-lg">☀️</div>
                            <div className="mt-1 text-sm font-bold text-cocoa-900">
                              {28 + index}°
                            </div>
                            <div className="mt-1 text-xs text-cocoa-500">
                              {index % 3 === 0 ? "10%" : "0%"} rain
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.section>
                )}

                {/* Carbon Calculator */}
                {showCarbonCalculator && (
                  <motion.section
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl border border-cream-200 bg-gradient-to-br from-green-50/80 to-emerald-50/80 p-6 shadow-lg backdrop-blur"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-cocoa-900">
                          Carbon Calculator
                        </h2>
                        <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
                          Carbon offset projections
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowCarbonCalculator(false)}
                        className="rounded-full p-2 text-cocoa-400 transition hover:bg-white/50"
                        aria-label="Close calculator"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-2xl border border-green-200 bg-white/90 p-4 shadow-sm">
                          <div className="mb-2 text-xs uppercase tracking-[0.2em] text-cocoa-400">
                            Current
                          </div>
                          <div className="text-2xl font-bold text-green-700">
                            {carbonProjections.current.toFixed(1)} tCO₂
                          </div>
                        </div>
                        <div className="rounded-2xl border border-emerald-200 bg-white/90 p-4 shadow-sm">
                          <div className="mb-2 text-xs uppercase tracking-[0.2em] text-cocoa-400">
                            30 Days
                          </div>
                          <div className="text-2xl font-bold text-emerald-700">
                            {carbonProjections.projected30Days.toFixed(1)} tCO₂
                          </div>
                        </div>
                        <div className="rounded-2xl border border-teal-200 bg-white/90 p-4 shadow-sm">
                          <div className="mb-2 text-xs uppercase tracking-[0.2em] text-cocoa-400">
                            90 Days
                          </div>
                          <div className="text-2xl font-bold text-teal-700">
                            {carbonProjections.projected90Days.toFixed(1)} tCO₂
                          </div>
                        </div>
                        <div className="rounded-2xl border border-cyan-200 bg-white/90 p-4 shadow-sm">
                          <div className="mb-2 text-xs uppercase tracking-[0.2em] text-cocoa-400">
                            1 Year
                          </div>
                          <div className="text-2xl font-bold text-cyan-700">
                            {carbonProjections.projected1Year.toFixed(1)} tCO₂
                          </div>
                        </div>
                      </div>
                      <div className="rounded-2xl border border-green-200 bg-green-50/80 p-4">
                        <p className="text-sm font-semibold text-green-900">
                          Potential Increase:{" "}
                          {carbonProjections.potentialIncrease.toFixed(1)} tCO₂
                          over 1 year
                        </p>
                      </div>
                    </div>
                  </motion.section>
                )}

                {/* Harvest Scheduler */}
                {showHarvestScheduler && (
                  <motion.section
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl border border-cream-200 bg-gradient-to-br from-amber-50/80 to-yellow-50/80 p-6 shadow-lg backdrop-blur"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-cocoa-900">
                          Harvest Scheduler
                        </h2>
                        <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
                          Upcoming harvest schedule
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowHarvestScheduler(false)}
                        className="rounded-full p-2 text-cocoa-400 transition hover:bg-white/50"
                        aria-label="Close scheduler"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="space-y-3">
                      {harvestSchedule.length === 0 ? (
                        <div className="rounded-2xl border border-cream-200 bg-cream-50/70 p-6 text-center">
                          <span className="text-4xl">📅</span>
                          <p className="mt-2 text-sm font-semibold text-cocoa-900">
                            No upcoming harvests
                          </p>
                          <p className="mt-1 text-xs text-cocoa-600">
                            Harvest schedules will appear here when plantations are ready.
                          </p>
                        </div>
                      ) : (
                        harvestSchedule.map((harvest) => (
                          <div
                            key={harvest.id}
                            className={`rounded-2xl border p-4 ${
                              harvest.readiness === "ready"
                                ? "border-green-200 bg-green-50/80"
                                : harvest.readiness === "soon"
                                ? "border-amber-200 bg-amber-50/80"
                                : "border-blue-200 bg-blue-50/80"
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="font-semibold text-cocoa-900">
                                  {harvest.seedName}
                                </h3>
                                <p className="mt-1 text-sm text-cocoa-600">
                                  Estimated:{" "}
                                  {new Date(
                                    harvest.estimatedDate
                                  ).toLocaleDateString()}
                                </p>
                                <p className="mt-2 text-xs text-cocoa-500">
                                  {harvest.daysUntil === 0
                                    ? "Ready now"
                                    : `${harvest.daysUntil} day${harvest.daysUntil !== 1 ? "s" : ""} until harvest`}
                                </p>
                              </div>
                              <span
                                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                  harvest.readiness === "ready"
                                    ? "bg-green-100 text-green-700"
                                    : harvest.readiness === "soon"
                                    ? "bg-amber-100 text-amber-700"
                                    : "bg-blue-100 text-blue-700"
                                }`}
                              >
                                {harvest.readiness.toUpperCase()}
                              </span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.section>
                )}

                {/* Notification Center */}
                {showNotificationCenter && (
                  <motion.section
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl border border-cream-200 bg-white/90 p-6 shadow-lg"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-cocoa-900">
                        Notification Center
                      </h2>
                      <button
                        type="button"
                        onClick={() => setShowNotificationCenter(false)}
                        className="rounded-full p-2 text-cocoa-400 transition hover:bg-cream-100"
                        aria-label="Close notifications"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="space-y-3">
                      {taskSummary.overdue > 0 && (
                        <div className="rounded-2xl border border-rose-200 bg-rose-50/80 p-4">
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">⏰</span>
                            <div className="flex-1">
                              <h3 className="font-semibold text-rose-900">
                                Overdue Tasks Alert
                              </h3>
                              <p className="mt-1 text-sm text-rose-700">
                                {taskSummary.overdue} task
                                {taskSummary.overdue > 1 ? "s are" : " is"} overdue and
                                requires immediate attention.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      {taskSummary.dueSoon > 0 && (
                        <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4">
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">📅</span>
                            <div className="flex-1">
                              <h3 className="font-semibold text-amber-900">
                                Tasks Due Soon
                              </h3>
                              <p className="mt-1 text-sm text-amber-700">
                                {taskSummary.dueSoon} task
                                {taskSummary.dueSoon > 1 ? "s are" : " is"} due within the
                                next 3 days.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      {stats.growing > 0 && (
                        <div className="rounded-2xl border border-blue-200 bg-blue-50/80 p-4">
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">🌱</span>
                            <div className="flex-1">
                              <h3 className="font-semibold text-blue-900">
                                Active Growth Phase
                              </h3>
                              <p className="mt-1 text-sm text-blue-700">
                                {stats.growing} plantation
                                {stats.growing > 1 ? "s are" : " is"} in active growth and
                                may need attention soon.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      {complaintStats.highPriorityOpen > 0 && (
                        <div className="rounded-2xl border border-orange-200 bg-orange-50/80 p-4">
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">🛠️</span>
                            <div className="flex-1">
                              <h3 className="font-semibold text-orange-900">
                                High Priority Complaints
                              </h3>
                              <p className="mt-1 text-sm text-orange-700">
                                {complaintStats.highPriorityOpen} high priority complaint
                                {complaintStats.highPriorityOpen > 1 ? "s" : ""} awaiting
                                resolution.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      {taskSummary.overdue === 0 &&
                        taskSummary.dueSoon === 0 &&
                        complaintStats.highPriorityOpen === 0 && (
                          <div className="rounded-2xl border border-green-200 bg-green-50/80 p-4 text-center">
                            <span className="text-2xl">✅</span>
                            <p className="mt-2 text-sm font-semibold text-green-900">
                              All caught up! No urgent notifications.
                            </p>
                          </div>
                        )}
                    </div>
                  </motion.section>
                )}

                    {/* Widget Customization */}
                    <motion.section
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-3xl border border-cream-200 bg-white/90 p-4 shadow-sm"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <h3 className="text-sm font-semibold text-cocoa-900">
                            Customize Dashboard
                          </h3>
                          <p className="text-xs text-cocoa-500">
                            Show or hide widgets to personalize your view
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(widgetVisibility).map(([key, visible]) => (
                            <label
                              key={key}
                              className="flex cursor-pointer items-center gap-2 rounded-full border border-cream-300 bg-white px-3 py-1.5 text-xs transition hover:border-cocoa-300"
                            >
                              <input
                                type="checkbox"
                                checked={visible}
                                onChange={(e) =>
                                  setWidgetVisibility((prev) => ({
                                    ...prev,
                                    [key]: e.target.checked,
                                  }))
                                }
                                className="h-3 w-3 rounded border-cream-300 text-leaf-500 focus:ring-2 focus:ring-leaf-400"
                              />
                              <span className="text-xs font-semibold text-cocoa-700">
                                {key
                                  .replace(/([A-Z])/g, " $1")
                                  .replace(/^./, (str) => str.toUpperCase())}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </motion.section>

                    {/* Theme Selector */}
                    <motion.section
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-3xl border border-cream-200 bg-white/90 p-4 shadow-sm"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <h3 className="text-sm font-semibold text-cocoa-900">
                            Dashboard Theme
                          </h3>
                          <p className="text-xs text-cocoa-500">
                            Choose your preferred color scheme
                          </p>
                        </div>
                        <div className="flex gap-2">
                          {(["light", "dark", "auto"] as const).map((theme) => (
                            <button
                              key={theme}
                              type="button"
                              onClick={() => setDashboardTheme(theme)}
                              className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition ${
                                dashboardTheme === theme
                                  ? "border-cocoa-900 bg-cocoa-900 text-white"
                                  : "border-cream-300 bg-white text-cocoa-700 hover:border-cocoa-300"
                              }`}
                            >
                              {theme.charAt(0).toUpperCase() + theme.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.section>

                    {/* Collaboration Tools */}
                    {showCollaborationTools && (
                      <motion.section
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-3xl border border-cream-200 bg-gradient-to-br from-rose-50/80 to-pink-50/80 p-6 shadow-lg backdrop-blur"
                      >
                        <div className="mb-4 flex items-center justify-between">
                          <div>
                            <h2 className="text-lg font-semibold text-cocoa-900">
                              Collaboration Tools
                            </h2>
                            <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
                              Team collaboration features
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setShowCollaborationTools(false)}
                            className="rounded-full p-2 text-cocoa-400 transition hover:bg-white/50"
                            aria-label="Close collaboration tools"
                          >
                            ✕
                          </button>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          <div className="rounded-2xl border border-rose-200 bg-white/90 p-4 shadow-sm">
                            <div className="mb-2 flex items-center gap-2">
                              <span className="text-xl">👥</span>
                              <h3 className="font-semibold text-cocoa-900">
                                Team Members
                              </h3>
                            </div>
                            <p className="text-sm text-cocoa-600">
                              {filteredPlantations.reduce(
                                (acc, p) => acc + p.collaborators.length,
                                0
                              )}{" "}
                              active collaborators
                            </p>
                          </div>
                          <div className="rounded-2xl border border-pink-200 bg-white/90 p-4 shadow-sm">
                            <div className="mb-2 flex items-center gap-2">
                              <span className="text-xl">💬</span>
                              <h3 className="font-semibold text-cocoa-900">
                                Shared Notes
                              </h3>
                            </div>
                            <p className="text-sm text-cocoa-600">
                              {filteredPlantations.reduce(
                                (acc, p) =>
                                  acc +
                                  p.collaborators.filter((c) => c.lastNote).length,
                                0
                              )}{" "}
                              collaboration notes
                            </p>
                          </div>
                          <div className="rounded-2xl border border-rose-200 bg-white/90 p-4 shadow-sm">
                            <div className="mb-2 flex items-center gap-2">
                              <span className="text-xl">📊</span>
                              <h3 className="font-semibold text-cocoa-900">
                                Shared Tasks
                              </h3>
                            </div>
                            <p className="text-sm text-cocoa-600">
                              {filteredPlantations.reduce(
                                (acc, p) =>
                                  acc +
                                  p.tasks.filter((t) => t.assigneeId).length,
                                0
                              )}{" "}
                              assigned tasks
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 rounded-2xl border border-cream-200 bg-cream-50/70 p-4">
                          <p className="text-sm font-semibold text-cocoa-900">
                            Collaboration Features:
                          </p>
                          <ul className="mt-2 space-y-1 text-xs text-cocoa-600">
                            <li>• Add collaborators to plantations</li>
                            <li>• Share notes and observations</li>
                            <li>• Assign tasks to team members</li>
                            <li>• Track collaborative activities</li>
                          </ul>
                        </div>
                      </motion.section>
                    )}

                {/* Data Insights Panel */}
                {showDataInsights && widgetVisibility.dataInsights && dataInsights.length > 0 && (
                  <motion.section
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl border border-cream-200 bg-gradient-to-r from-blue-50/80 via-purple-50/80 to-pink-50/80 p-6 shadow-sm backdrop-blur"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-cocoa-900">
                          Data Insights
                        </h2>
                        <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
                          AI-powered recommendations
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowDataInsights(false)}
                        className="rounded-full p-2 text-cocoa-400 transition hover:bg-white/50"
                        aria-label="Close insights"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {dataInsights.map((insight, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`rounded-2xl border p-4 ${
                            insight.type === "success"
                              ? "border-green-200 bg-green-50/80"
                              : insight.type === "warning"
                              ? "border-amber-200 bg-amber-50/80"
                              : "border-blue-200 bg-blue-50/80"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">{insight.icon}</span>
                            <div className="flex-1">
                              <h3 className="text-sm font-semibold text-cocoa-900">
                                {insight.title}
                              </h3>
                              <p className="mt-1 text-xs text-cocoa-600">
                                {insight.message}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.section>
                )}

                {/* Quick Filter Presets */}
                <motion.section
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap items-center gap-3 rounded-3xl border border-cream-200 bg-white/90 p-4 shadow-sm"
                >
                  <span className="text-sm font-semibold text-cocoa-600">
                    Quick filters:
                  </span>
                  {[
                    { id: "recent", label: "📅 Recent (30 days)", icon: "📅" },
                    { id: "growing", label: "🌱 Growing", icon: "🌱" },
                    { id: "harvest-ready", label: "🚚 Harvest ready", icon: "🚚" },
                    { id: "favorites", label: "⭐ Favorites", icon: "⭐" },
                    { id: "needs-attention", label: "⚠️ Needs attention", icon: "⚠️" },
                  ].map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleQuickFilterPreset(preset.id)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                        quickFilterPreset === preset.id
                          ? "border-cocoa-900 bg-cocoa-900 text-white"
                          : "border-cream-300 bg-white text-cocoa-700 hover:border-cocoa-300"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                  {quickFilterPreset && (
                    <button
                      type="button"
                      onClick={() => {
                        setQuickFilterPreset(null);
                        handleClearFilters();
                      }}
                      className="rounded-full border border-rose-300 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
                    >
                      Clear preset
                    </button>
                  )}
                </motion.section>

                <GeoInsightsPanel
                  metrics={analyticsSnapshot.regionGeoMetrics}
                  clusters={analyticsSnapshot.geoClusters}
                />
                <div className="grid gap-6 xl:grid-cols-[1.4fr,0.6fr]">
                  <ReceiptHistoryPanel />
                  <div className="space-y-6">
                    <LoanTrackerPanel />
                    {/* Recent Activity Feed */}
                    <motion.section
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-3xl border border-cream-200 bg-white/85 p-5 shadow-sm shadow-cocoa-900/5 backdrop-blur"
                    >
                      <header className="mb-4">
                        <h2 className="text-lg font-semibold text-cocoa-900">
                          Recent Activity
                        </h2>
                        <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
                          Latest updates
                        </p>
                      </header>
                      <div className="space-y-3">
                        {recentActivity.length === 0 ? (
                          <p className="text-sm text-cocoa-500">
                            No recent activity
                          </p>
                        ) : (
                          recentActivity.map((activity) => (
                            <div
                              key={activity.id}
                              className="flex items-start gap-3 rounded-2xl border border-cream-200 bg-cream-50/70 p-3 text-sm"
                            >
                              <span className="text-lg">
                                {activity.type === "update" ? "🔄" : "📝"}
                              </span>
                              <div className="flex-1">
                                <p className="font-semibold text-cocoa-900">
                                  {activity.message}
                                </p>
                                <p className="text-xs text-cocoa-500">
                                  {new Date(activity.timestamp).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </motion.section>
                  </div>
                </div>
                <AnalyticsPanel
                  plantations={filteredPlantations}
                  highlightedCount={filteredPlantations.length}
                  snapshot={analyticsSnapshot}
                />
                <ForecastWorkspace
                  plantations={filteredPlantations}
                  snapshot={analyticsSnapshot}
                />
                <SustainabilityPanel
                  plantations={filteredPlantations}
                  snapshot={analyticsSnapshot}
                />
                <AlertInsightsPanel />
                <CohortChart cohorts={analyticsSnapshot.cohortPerformance} />
                <ForecastPanel
                  plantations={filteredPlantations}
                  snapshot={analyticsSnapshot}
                />
                <GeoMapPanel
                  plantations={filteredPlantations}
                  snapshot={analyticsSnapshot}
                />
                <TaskKanbanBoard
                  plantations={filteredPlantations}
                  onStatusChange={handleTaskStatusChange}
                  onAssign={handleTaskAssign}
                />
                <StageTemplatePanel />
                <BulkStagePanel
                  plantations={filteredPlantations}
                  onBulkUpdate={handleBulkStageUpdate}
                />
                <div className="grid gap-6 xl:grid-cols-[1.35fr,0.65fr]">
                  <div className="space-y-6">
                    <CollaborationHub
                      plantations={filteredPlantations}
                      snapshot={analyticsSnapshot}
                      onLogNote={recordCollaboratorNote}
                      onAddCollaborator={addCollaborator}
                    />
                    <CommunitySupportPanel />
                  </div>
                  <div className="space-y-6">
                    <SecurityPanel />
                    <WalletPerformancePanel
                      snapshot={analyticsSnapshot}
                    />
                    <SecurityEventsPanel />
                  </div>
                </div>
                <PlantationActivityTimeline
                  plantations={filteredPlantations}
                />

                <MarketPrices />
                <div className="grid gap-6 lg:grid-cols-2">
                  <FinancialDashboard />
                  <InventoryPanel />
                </div>
                <HarvestPlanner />
                <div className="grid gap-6 lg:grid-cols-2">
                  <DocumentLibrary />
                  <EquipmentTracker />
                </div>
                <WeatherAlertsPanel />
                <div className="grid gap-6 lg:grid-cols-2">
                  <SupplyChainTracker />
                  <CertificationManager />
                </div>
                <ResourceAllocation />
                <div className="grid gap-6 lg:grid-cols-2">
                  <QualityControlPanel />
                  <PestDiseaseManager />
                </div>
                <IrrigationTracker />
                <div className="grid gap-6 lg:grid-cols-2">
                  <ReportingDashboard />
                  <MobileFeatures />
                </div>
                <div className="grid gap-6 lg:grid-cols-2">
                  <TrainingResources />
                  <MarketplacePanel />
                </div>
                <div className="grid gap-6 lg:grid-cols-2">
                  <SoilManagementPanel />
                  <ComplianceTracker />
                </div>
                <BudgetPlanner />
                <div className="grid gap-6 lg:grid-cols-2">
                  <LaborManagement />
                  <MaintenanceScheduler />
                </div>
                <div className="grid gap-6 lg:grid-cols-2">
                  <RiskAssessmentPanel />
                  <PerformanceBenchmark />
                </div>
                <div className="grid gap-6 lg:grid-cols-2">
                  <InsuranceTracker />
                  <CropRotationPlanner />
                </div>
                <SustainabilityScorecard />
                <PhotoGallery />
                <div className="grid gap-6 lg:grid-cols-2">
                  <LoanCalculator />
                  <SeasonalPlanner />
                </div>
                <div className="grid gap-6 lg:grid-cols-2">
                  <ComplianceChecklist />
                  <FarmerNetwork />
                </div>
                <div className="grid gap-6 lg:grid-cols-2">
                  <WeatherHistory />
                  <ExpenseCategories />
                </div>
                <SupplierManagement />
                <div className="grid gap-6 lg:grid-cols-2">
                  <HarvestQualityTracker />
                  <ContractManagement />
                </div>
                <div className="grid gap-6 lg:grid-cols-2">
                  <TrainingRecords />
                  <AuditTrail />
                </div>

                <div className="grid gap-6 xl:grid-cols-[1.3fr,0.7fr]">
                  <section className="rounded-3xl border border-cream-200 bg-cream-50/80 p-6 shadow-sm shadow-cocoa-900/5 backdrop-blur">
                    <header className="mb-6 flex flex-col gap-4">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                      <h2 className="text-lg font-semibold text-cocoa-900">
                        {isConnected
                          ? "Your plantations"
                          : "Community plantations"}
                      </h2>
                      <p className="text-sm text-cocoa-500">
                        Track each seed from planting to harvest with live
                        progress updates and shared insights across wallets.
                      </p>
        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 rounded-full border border-cream-300 bg-white p-1 shadow-sm">
                              <button
                                type="button"
                                onClick={() => {
                                  setViewMode("grid");
                                  setShowCalendarView(false);
                                }}
                                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                                  viewMode === "grid" && !showCalendarView
                                    ? "bg-cocoa-900 text-white"
                                    : "text-cocoa-600 hover:bg-cream-100"
                                }`}
                              >
                                Grid
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setViewMode("list");
                                  setShowCalendarView(false);
                                }}
                                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                                  viewMode === "list" && !showCalendarView
                                    ? "bg-cocoa-900 text-white"
                                    : "text-cocoa-600 hover:bg-cream-100"
                                }`}
                              >
                                List
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setShowCalendarView(true);
                                  setViewMode("grid");
                                }}
                                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                                  showCalendarView
                                    ? "bg-cocoa-900 text-white"
                                    : "text-cocoa-600 hover:bg-cream-100"
                                }`}
                              >
                                📅 Calendar
                              </button>
                            </div>
                            <select
                              value={dashboardLayout}
                              onChange={(e) =>
                                setDashboardLayout(
                                  e.target.value as "default" | "compact" | "spacious"
                                )
                              }
                              aria-label="Dashboard layout"
                              className="rounded-full border border-cream-300 bg-white px-3 py-1 text-xs font-semibold text-cocoa-700 shadow-sm focus:border-cocoa-400 focus:outline-none focus:ring-2 focus:ring-cocoa-200"
                            >
                              <option value="default">Default</option>
                              <option value="compact">Compact</option>
                              <option value="spacious">Spacious</option>
                            </select>
                          </div>
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleRefresh}
                            disabled={isRefreshing}
                            className="flex items-center gap-2 rounded-full border border-cream-300 bg-white px-4 py-2 text-sm font-semibold text-cocoa-700 shadow-sm transition hover:border-cocoa-300 hover:text-cocoa-900 focus:outline-none focus:ring-2 focus:ring-cocoa-200 focus:ring-offset-2 disabled:opacity-50"
                          >
                            {isRefreshing ? "🔄 Refreshing..." : "🔄 Refresh"}
                          </motion.button>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex-1 min-w-[200px]">
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search plantations..."
                            className="w-full rounded-2xl border border-cream-300 bg-white px-4 py-2 text-sm text-cocoa-800 shadow-sm placeholder:text-cocoa-400 focus:border-cocoa-400 focus:outline-none focus:ring-2 focus:ring-cocoa-200"
                          />
                        </div>
                        <select
                          value={stageFilter}
                          onChange={(e) =>
                            setStageFilter(e.target.value as GrowthStage | "all")
                          }
                          aria-label="Filter by growth stage"
                          className="rounded-2xl border border-cream-300 bg-white px-4 py-2 text-sm text-cocoa-800 shadow-sm focus:border-cocoa-400 focus:outline-none focus:ring-2 focus:ring-cocoa-200"
                        >
                          <option value="all">All stages</option>
                          <option value="planted">Planted</option>
                          <option value="growing">Growing</option>
                          <option value="harvested">Harvested</option>
                        </select>
                        <select
                          value={sortBy}
                          onChange={(e) =>
                            setSortBy(e.target.value as "date" | "name" | "stage")
                          }
                          aria-label="Sort plantations"
                          className="rounded-2xl border border-cream-300 bg-white px-4 py-2 text-sm text-cocoa-800 shadow-sm focus:border-cocoa-400 focus:outline-none focus:ring-2 focus:ring-cocoa-200"
                        >
                          <option value="date">Sort by date</option>
                          <option value="name">Sort by name</option>
                          <option value="stage">Sort by stage</option>
                        </select>
                        {(searchQuery || stageFilter !== "all" || locationFilter || dateRangeFilter.start || dateRangeFilter.end) && (
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleClearFilters}
                            className="rounded-full border border-cream-300 bg-white px-4 py-2 text-sm font-semibold text-cocoa-700 shadow-sm transition hover:border-cocoa-300 hover:text-cocoa-900 focus:outline-none focus:ring-2 focus:ring-cocoa-200"
                          >
                            Clear filters
                          </motion.button>
                        )}
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                          className={`rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-cocoa-200 ${
                            showAdvancedFilters
                              ? "border-cocoa-900 bg-cocoa-900 text-white"
                              : "border-cream-300 bg-white text-cocoa-700 hover:border-cocoa-300"
                          }`}
                        >
                          {showAdvancedFilters ? "▼" : "▶"} Advanced
                        </motion.button>
                      </div>

                      {showAdvancedFilters && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 space-y-3 rounded-2xl border border-cream-200 bg-cream-50/70 p-4"
                        >
                          <div className="grid gap-4 sm:grid-cols-2">
                            <label className="text-sm text-cocoa-600">
                              Location filter
                              <input
                                type="text"
                                value={locationFilter}
                                onChange={(e) => setLocationFilter(e.target.value)}
                                placeholder="Filter by location..."
                                className="mt-1 w-full rounded-2xl border border-cream-300 bg-white px-3 py-2 text-sm text-cocoa-800 shadow-sm focus:border-cocoa-400 focus:outline-none focus:ring-2 focus:ring-cocoa-200"
                              />
                            </label>
                            <div className="grid gap-2 sm:grid-cols-2">
                              <label className="text-sm text-cocoa-600">
                                Start date
                                <input
                                  type="date"
                                  value={dateRangeFilter.start || ""}
                                  onChange={(e) =>
                                    setDateRangeFilter((prev) => ({
                                      ...prev,
                                      start: e.target.value || undefined,
                                    }))
                                  }
                                  className="mt-1 w-full rounded-2xl border border-cream-300 bg-white px-3 py-2 text-sm text-cocoa-800 shadow-sm focus:border-cocoa-400 focus:outline-none focus:ring-2 focus:ring-cocoa-200"
                                />
                              </label>
                              <label className="text-sm text-cocoa-600">
                                End date
                                <input
                                  type="date"
                                  value={dateRangeFilter.end || ""}
                                  onChange={(e) =>
                                    setDateRangeFilter((prev) => ({
                                      ...prev,
                                      end: e.target.value || undefined,
                                    }))
                                  }
                                  className="mt-1 w-full rounded-2xl border border-cream-300 bg-white px-3 py-2 text-sm text-cocoa-800 shadow-sm focus:border-cocoa-400 focus:outline-none focus:ring-2 focus:ring-cocoa-200"
                                />
                              </label>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {(searchQuery || stageFilter !== "all" || locationFilter || dateRangeFilter.start || dateRangeFilter.end) && (
                        <p className="text-xs text-cocoa-500">
                          Showing {filteredPlantations.length} of{" "}
                          {plantations.length} plantations
                        </p>
                      )}

                      {selectedPlantations.size > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl border border-leaf-300 bg-leaf-50/80 p-4"
                        >
                          <span className="text-sm font-semibold text-leaf-900">
                            {selectedPlantations.size} selected
                          </span>
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => handleBulkAdvanceStage("growing")}
                              className="rounded-full border border-leaf-400 bg-leaf-500 px-3 py-1 text-xs font-semibold text-white shadow-sm transition hover:bg-leaf-600"
                            >
                              Mark Growing
                            </button>
                            <button
                              type="button"
                              onClick={() => handleBulkAdvanceStage("harvested")}
                              className="rounded-full border border-leaf-400 bg-leaf-500 px-3 py-1 text-xs font-semibold text-white shadow-sm transition hover:bg-leaf-600"
                            >
                              Mark Harvested
                            </button>
                            <button
                              type="button"
                              onClick={() => setSelectedPlantations(new Set())}
                              className="rounded-full border border-cream-300 bg-white px-3 py-1 text-xs font-semibold text-cocoa-700 shadow-sm transition hover:border-cocoa-300"
                            >
                              Clear selection
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </header>

                    {filteredPlantations.length > 0 && (
                      <div className="mb-4 flex items-center gap-3">
                        <label className="flex items-center gap-2 text-sm text-cocoa-600">
                          <input
                            type="checkbox"
                            checked={
                              selectedPlantations.size === filteredPlantations.length &&
                              filteredPlantations.length > 0
                            }
                            onChange={handleSelectAll}
                            className="h-4 w-4 rounded border-cream-300 text-leaf-500 focus:ring-2 focus:ring-leaf-400"
                          />
                          Select all ({selectedPlantations.size} selected)
                        </label>
                      </div>
                    )}

                    {showCalendarView ? (
                      <div className="mt-6">
                        <div className="rounded-2xl border border-cream-200 bg-white/80 p-6">
                          <h3 className="mb-4 text-lg font-semibold text-cocoa-900">
                            Calendar View
                          </h3>
                          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {calendarEvents.slice(0, 12).map((event) => (
                              <div
                                key={event.date}
                                className="rounded-xl border border-cream-200 bg-cream-50/70 p-4"
                              >
                                <div className="mb-2 text-sm font-semibold text-cocoa-900">
                                  {new Date(event.date).toLocaleDateString(undefined, {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </div>
                                {event.plantations.length > 0 && (
                                  <div className="mb-2">
                                    <span className="text-xs font-semibold text-cocoa-600">
                                      Plantations:
                                    </span>
                                    <ul className="mt-1 space-y-1 text-xs text-cocoa-700">
                                      {event.plantations.map((p) => (
                                        <li key={p.id}>🌱 {p.seedName}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                                {event.tasks.length > 0 && (
                                  <div>
                                    <span className="text-xs font-semibold text-cocoa-600">
                                      Tasks:
                                    </span>
                                    <ul className="mt-1 space-y-1 text-xs text-cocoa-700">
                                      {event.tasks.map((t, idx) => (
                                        <li key={idx}>
                                          📋 {t.task.title} ({t.task.status})
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                          {calendarEvents.length === 0 && (
                            <p className="py-8 text-center text-sm text-cocoa-500">
                              No calendar events found
                            </p>
                          )}
                        </div>
                      </div>
                    ) : viewMode === "grid" ? (
                    <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                      <AnimatePresence mode="popLayout">
                        {filteredPlantations.map((plantation) => (
                            <div key={plantation.id} className="relative">
                              <label className="absolute left-3 top-3 z-10">
                                <input
                                  type="checkbox"
                                  checked={selectedPlantations.has(plantation.id)}
                                  onChange={() => handleToggleSelection(plantation.id)}
                                  aria-label={`Select ${plantation.seedName}`}
                                  className="h-5 w-5 rounded border-cream-300 text-leaf-500 shadow-lg focus:ring-2 focus:ring-leaf-400"
                                />
                              </label>
                              <div className="absolute right-3 top-3 z-10 flex flex-col gap-2">
                                {comparisonMode && (
                                  <button
                                    type="button"
                                    onClick={() => handleToggleComparison(plantation.id)}
                                    className={`rounded-full bg-white/90 p-2 shadow-lg transition hover:bg-white ${
                                      comparisonPlantations.has(plantation.id)
                                        ? "ring-2 ring-amber-500"
                                        : ""
                                    }`}
                                    aria-label={
                                      comparisonPlantations.has(plantation.id)
                                        ? "Remove from comparison"
                                        : "Add to comparison"
                                    }
                                    disabled={
                                      !comparisonPlantations.has(plantation.id) &&
                                      comparisonPlantations.size >= 3
                                    }
                                  >
                                    {comparisonPlantations.has(plantation.id)
                                      ? "✓"
                                      : "🔍"}
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={() => handleToggleFavorite(plantation.id)}
                                  className="rounded-full bg-white/90 p-2 shadow-lg transition hover:bg-white"
                                  aria-label={
                                    favorites.has(plantation.id)
                                      ? "Remove from favorites"
                                      : "Add to favorites"
                                  }
                                >
                                  {favorites.has(plantation.id) ? "⭐" : "☆"}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleOpenNotes(plantation.id)}
                                  className={`rounded-full bg-white/90 p-2 shadow-lg transition hover:bg-white ${
                                    notes.has(plantation.id) ? "ring-2 ring-blue-400" : ""
                                  }`}
                                  aria-label="Add or view notes"
                                >
                                  {notes.has(plantation.id) ? "📝" : "📄"}
                                </button>
                              </div>
                          <PlantationCard
                            plantation={plantation}
                            onUpdate={handleUpdateRequest}
                            onAdvanceStage={handleAdvanceStage}
                          />
                            </div>
                        ))}
                      </AnimatePresence>
                    </div>
                    ) : (
                      <div className="mt-6 space-y-3">
                        <AnimatePresence mode="popLayout">
                          {filteredPlantations.map((plantation) => (
                            <motion.div
                              key={plantation.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              className="relative flex items-center gap-4 rounded-2xl border border-cream-200 bg-white/80 p-4 shadow-sm"
                            >
                              <label>
                                <input
                                  type="checkbox"
                                  checked={selectedPlantations.has(plantation.id)}
                                  onChange={() => handleToggleSelection(plantation.id)}
                                  aria-label={`Select ${plantation.seedName}`}
                                  className="h-4 w-4 rounded border-cream-300 text-leaf-500 focus:ring-2 focus:ring-leaf-400"
                                />
                              </label>
                              <div className="flex items-center gap-2">
                                {comparisonMode && (
                                  <button
                                    type="button"
                                    onClick={() => handleToggleComparison(plantation.id)}
                                    className={`rounded-full p-1.5 text-sm transition ${
                                      comparisonPlantations.has(plantation.id)
                                        ? "bg-amber-200 text-amber-900 ring-2 ring-amber-500"
                                        : "bg-cream-100 text-cocoa-600 hover:bg-cream-200"
                                    }`}
                                    aria-label={
                                      comparisonPlantations.has(plantation.id)
                                        ? "Remove from comparison"
                                        : "Add to comparison"
                                    }
                                    disabled={
                                      !comparisonPlantations.has(plantation.id) &&
                                      comparisonPlantations.size >= 3
                                    }
                                  >
                                    {comparisonPlantations.has(plantation.id)
                                      ? "✓"
                                      : "🔍"}
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={() => handleToggleFavorite(plantation.id)}
                                  className="text-lg"
                                  aria-label={
                                    favorites.has(plantation.id)
                                      ? "Remove from favorites"
                                      : "Add to favorites"
                                  }
                                >
                                  {favorites.has(plantation.id) ? "⭐" : "☆"}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleOpenNotes(plantation.id)}
                                  className={`text-lg ${
                                    notes.has(plantation.id) ? "text-blue-600" : ""
                                  }`}
                                  aria-label="Add or view notes"
                                >
                                  {notes.has(plantation.id) ? "📝" : "📄"}
                                </button>
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-cocoa-900">
                                  {plantation.seedName}
                                </h3>
                                <p className="text-sm text-cocoa-500">
                                  {plantation.location} • {plantation.stage} •{" "}
                                  {new Date(plantation.startDate).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleUpdateRequest(plantation)}
                                  className="rounded-full border border-cream-300 bg-white px-4 py-2 text-sm font-semibold text-cocoa-700 shadow-sm transition hover:border-cocoa-300"
                                >
                                  Update
                                </button>
                                {plantation.stage !== "harvested" && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleAdvanceStage(
                                        plantation,
                                        plantation.stage === "planted"
                                          ? "growing"
                                          : "harvested"
                                      )
                                    }
                                    className="rounded-full bg-leaf-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-leaf-600"
                                  >
                                    Advance
                                  </button>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    )}
                  </section>

                  <aside className="space-y-6">
                    <AlertsPanel />
                    <PlantationTaskPanel
                      plantations={filteredPlantations}
                      onTaskStatusChange={updateTaskStatus}
                      recurringTemplates={recurringTemplates}
                      onManageRecurring={() => setRecurringModalOpen(true)}
                    />
                    <WalletManager />
                    <OnchainSyncPanel />
                    <CommunitySharePanel
                      plantations={filteredPlantations}
                      activeWalletCount={
                        normalizedFilters.length || (isConnected ? 1 : 0)
                      }
                    />
                  </aside>
                </div>
              </>
            )}
        </div>
      </main>
      </div>

      <PlantSeedModal
        open={isPlantModalOpen}
        onClose={handleCloseModals}
        onSubmit={handlePlantSeedSubmit}
        walletAddress={address}
      />

      <UpdateStatusModal
        open={Boolean(updateTarget)}
        onClose={handleCloseModals}
        plantation={updateTarget ?? undefined}
        onSubmit={handleUpdateSubmit}
      />

      <ReceiptUploadModal
        open={isReceiptModalOpen}
        onClose={() => setReceiptModalOpen(false)}
        defaultPlantationId={primaryPlantationId}
      />

      <ComplaintModal
        open={isComplaintModalOpen}
        onClose={() => setComplaintModalOpen(false)}
        defaultPlantationId={primaryPlantationId}
      />

      <LoanRequestModal
        open={isLoanModalOpen}
        onClose={() => setLoanModalOpen(false)}
        defaultPlantationId={primaryPlantationId}
      />

      <RecurringTaskModal
        open={isRecurringModalOpen}
        onClose={() => setRecurringModalOpen(false)}
        plantations={plantations}
      />

      <ExportSummaryModal
        open={isExportModalOpen}
        onClose={() => setExportModalOpen(false)}
        snapshot={analyticsSnapshot}
      />

      {/* Notes Modal */}
      {showNotesModal && notesTargetId && (
        <Modal
          open={showNotesModal}
          onClose={() => {
            setShowNotesModal(false);
            setNotesTargetId(null);
          }}
          title="Plantation Notes"
          description="Add personal notes and observations for this plantation"
        >
          <div className="space-y-4">
            <label className="block text-sm text-cocoa-600">
              Notes
              <textarea
                value={notesInput}
                onChange={(e) => setNotesInput(e.target.value)}
                rows={6}
                className="mt-1 w-full rounded-2xl border border-cream-300 bg-white px-3 py-2 text-sm text-cocoa-800 shadow-sm focus:border-cocoa-400 focus:outline-none focus:ring-2 focus:ring-cocoa-200"
                placeholder="Add your notes here..."
              />
            </label>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowNotesModal(false);
                  setNotesTargetId(null);
                  setNotesInput("");
                }}
                className="rounded-full border border-cream-300 bg-white px-4 py-2 text-sm font-semibold text-cocoa-700 shadow-sm transition hover:border-cocoa-300 hover:text-cocoa-900 focus:outline-none focus:ring-2 focus:ring-cocoa-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (notesTargetId) {
                    handleSaveNote(notesTargetId, notesInput);
                    setNotesInput("");
                  }
                }}
                className="rounded-full bg-leaf-500 px-4 py-2 text-sm font-semibold text-cream-50 shadow-lg transition hover:bg-leaf-600 focus:outline-none focus:ring-2 focus:ring-leaf-400"
              >
                Save Notes
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
