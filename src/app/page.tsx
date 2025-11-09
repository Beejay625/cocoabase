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
                
                {/* Quick Stats Summary */}
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

                <div className="flex justify-end">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setExportModalOpen(true)}
                    className="flex items-center gap-2 rounded-full border border-cocoa-200 bg-white/90 px-4 py-2 text-sm font-semibold text-cocoa-700 shadow-sm transition hover:border-cocoa-300 hover:text-cocoa-900 focus:outline-none focus:ring-2 focus:ring-cocoa-200 focus:ring-offset-2 focus:ring-offset-white"
                  >
                    📤 Export analytics
                  </motion.button>
                </div>
                {/* Data Insights Panel */}
                {showDataInsights && dataInsights.length > 0 && (
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
