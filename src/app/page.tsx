"use client";

import Sidebar from "@/components/sidebar";
import TopBar from "@/components/top-bar";
import PlantationCard from "@/components/plantation-card";
import PlantSeedModal from "@/components/plant-seed-modal";
import UpdateStatusModal from "@/components/update-status-modal";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useAccount } from "wagmi";
import {
  usePlantationsStore,
  type Plantation,
  type GrowthStage,
  type PlantationDraft,
} from "@/store/plantations";

export default function DashboardPage() {
  const { address, status } = useAccount();
  const plantations = usePlantationsStore((state) => state.plantations);
  const addPlantation = usePlantationsStore((state) => state.addPlantation);
  const updateStage = usePlantationsStore((state) => state.updateStage);
  const getPlantationsByWallet = usePlantationsStore(
    (state) => state.getPlantationsByWallet
  );

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

  const visiblePlantations = isConnected ? walletPlantations : plantations;

  const stats = useMemo(() => {
    const totalSeeds = visiblePlantations.length;
    const harvested = visiblePlantations.filter(
      (plantation) => plantation.stage === "harvested"
    ).length;

    return { totalSeeds, harvested };
  }, [visiblePlantations]);

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
    isConnected && visiblePlantations.length === 0 && address !== undefined;

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
          {!isConnected ? (
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
                Link your wallet to claim your plantations, plant new seeds, and
                update growth progress in real time.
              </p>
            </motion.section>
          ) : showEmptyState ? (
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
            <section>
              <h2 className="text-lg font-semibold text-cocoa-800">
                {isConnected ? "Your plantations" : "Featured plantations"}
              </h2>
              <p className="text-sm text-cocoa-500">
                Track each seed from planting to harvest with live progress
                updates.
              </p>

              <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {visiblePlantations.map((plantation) => (
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
          )}
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
