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
import ForecastPanel from "@/components/forecast-panel";
import GeoMapPanel from "@/components/geo-map-panel";
import WalletPerformancePanel from "@/components/wallet-performance-panel";
import CollaborationHub from "@/components/collaboration-hub";
import PlantationActivityTimeline from "@/components/plantation-activity-timeline";
import SecurityPanel from "@/components/security-panel";
import SecurityEventsPanel from "@/components/security-events-panel";
import SecurityMonitor from "@/components/security-monitor";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAccount } from "wagmi";
import {
  usePlantationsStore,
  type Plantation,
  type GrowthStage,
  type PlantationDraft,
} from "@/store/plantations";
import { useWalletStore } from "@/store/wallets";
import { useSecurityStore } from "@/store/security";
import { buildAnalyticsSnapshot } from "@/lib/analytics";

export default function DashboardPage() {
  const { address, status } = useAccount();
  const plantations = usePlantationsStore((state) => state.plantations);
  const addPlantation = usePlantationsStore((state) => state.addPlantation);
  const updateStage = usePlantationsStore((state) => state.updateStage);
  const updateTaskStatus = usePlantationsStore(
    (state) => state.updateTaskStatus
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

  const [isPlantModalOpen, setPlantModalOpen] = useState(false);
  const [updateTarget, setUpdateTarget] = useState<Plantation | null>(null);
  const [isRecurringModalOpen, setRecurringModalOpen] = useState(false);
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
    if (!normalizedFilters.length) {
      return isConnected ? walletPlantations : plantations;
    }

    return plantations.filter((plantation) =>
      normalizedFilters.includes(plantation.walletAddress.toLowerCase())
    );
  }, [normalizedFilters, plantations, isConnected, walletPlantations]);

  const stats = useMemo(() => {
    const totalSeeds = filteredPlantations.length;
    const harvested = filteredPlantations.filter(
      (plantation) => plantation.stage === "harvested"
    ).length;

    return { totalSeeds, harvested };
  }, [filteredPlantations]);

  const analyticsSnapshot = useMemo(
    () => buildAnalyticsSnapshot(filteredPlantations),
    [filteredPlantations]
  );

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

  const handleCloseModals = () => {
    setPlantModalOpen(false);
    setUpdateTarget(null);
  };

  const showEmptyState =
    filteredPlantations.length === 0 &&
    (isConnected || normalizedFilters.length > 0);

  const showConnectOverlay =
    !isConnected && normalizedFilters.length === 0 && status !== "connecting";

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-cream-100 via-cream-50 to-leaf-100 text-cocoa-900">
      <Sidebar />

      <div className="relative flex flex-1 flex-col">
        <AlertManager />
        <SecurityMonitor />
        <RecurringTaskScheduler />
        <AlertToaster />
        <TopBar
          walletAddress={address}
          totalSeeds={stats.totalSeeds}
          harvested={stats.harvested}
          onPlantSeed={handlePlantSeedClick}
        />

        <main className="relative flex-1 overflow-y-auto px-6 py-8">
          <div className="space-y-8">
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
                <AnalyticsPanel
                  plantations={filteredPlantations}
                  highlightedCount={filteredPlantations.length}
                  snapshot={analyticsSnapshot}
                />
                <SustainabilityPanel
                  plantations={filteredPlantations}
                  snapshot={analyticsSnapshot}
                />
                <CohortChart cohorts={analyticsSnapshot.cohortPerformance} />
                <ForecastPanel
                  plantations={filteredPlantations}
                  snapshot={analyticsSnapshot}
                />
                <GeoMapPanel
                  plantations={filteredPlantations}
                  snapshot={analyticsSnapshot}
                />
                <BulkStagePanel
                  plantations={filteredPlantations}
                  onBulkUpdate={handleBulkStageUpdate}
                />
                <div className="grid gap-6 xl:grid-cols-[1.35fr,0.65fr]">
                  <CollaborationHub
                    plantations={filteredPlantations}
                    snapshot={analyticsSnapshot}
                    onLogNote={recordCollaboratorNote}
                    onAddCollaborator={addCollaborator}
                  />
                  <div className="space-y-6">
                    <SecurityPanel />
                    <WalletPerformancePanel
                      plantations={filteredPlantations}
                    />
                    <SecurityEventsPanel />
                  </div>
                </div>
                <PlantationActivityTimeline
                  plantations={filteredPlantations}
                />

                <div className="grid gap-6 xl:grid-cols-[1.3fr,0.7fr]">
                  <section className="rounded-3xl border border-cream-200 bg-cream-50/80 p-6 shadow-sm shadow-cocoa-900/5 backdrop-blur">
                    <header className="flex flex-col gap-2">
                      <h2 className="text-lg font-semibold text-cocoa-900">
                        {isConnected
                          ? "Your plantations"
                          : "Community plantations"}
                      </h2>
                      <p className="text-sm text-cocoa-500">
                        Track each seed from planting to harvest with live
                        progress updates and shared insights across wallets.
                      </p>
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

      <RecurringTaskModal
        open={isRecurringModalOpen}
        onClose={() => setRecurringModalOpen(false)}
        plantations={plantations}
      />
    </div>
  );
}
