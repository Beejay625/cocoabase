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
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";
import {
  usePlantationsStore,
  type Plantation,
  type GrowthStage,
  type PlantationDraft,
} from "@/store/plantations";
import { useWalletStore } from "@/store/wallets";

export default function DashboardPage() {
  const { address, status } = useAccount();
  const plantations = usePlantationsStore((state) => state.plantations);
  const addPlantation = usePlantationsStore((state) => state.addPlantation);
  const updateStage = usePlantationsStore((state) => state.updateStage);
  const updateTaskStatus = usePlantationsStore(
    (state) => state.updateTaskStatus
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
                />
                <SustainabilityPanel plantations={filteredPlantations} />

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
                    <PlantationTaskPanel
                      plantations={filteredPlantations}
                      onTaskStatusChange={updateTaskStatus}
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
    </div>
  );
}
