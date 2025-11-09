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
  ]);

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
        handlePlantSeedClick();
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
  }, []);

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
                <GeoInsightsPanel
                  metrics={analyticsSnapshot.regionGeoMetrics}
                  clusters={analyticsSnapshot.geoClusters}
                />
                <div className="grid gap-6 xl:grid-cols-[1.4fr,0.6fr]">
                  <ReceiptHistoryPanel />
                  <LoanTrackerPanel />
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
                          className="rounded-2xl border border-cream-300 bg-white px-4 py-2 text-sm text-cocoa-800 shadow-sm focus:border-cocoa-400 focus:outline-none focus:ring-2 focus:ring-cocoa-200"
                        >
                          <option value="date">Sort by date</option>
                          <option value="name">Sort by name</option>
                          <option value="stage">Sort by stage</option>
                        </select>
                        {(searchQuery || stageFilter !== "all") && (
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
                      </div>
                      {(searchQuery || stageFilter !== "all") && (
                        <p className="text-xs text-cocoa-500">
                          Showing {filteredPlantations.length} of{" "}
                          {plantations.length} plantations
                        </p>
                      )}
                    </header>

                    <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                      <AnimatePresence mode="popLayout">
                        {filteredPlantations.map((plantation) => (
                          <PlantationCard
                            key={plantation.id}
                            plantation={plantation}
                            onUpdate={handleUpdateRequest}
                            onAdvanceStage={handleAdvanceStage}
                          />
                        ))}
                      </AnimatePresence>
        </div>
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
    </div>
  );
}
