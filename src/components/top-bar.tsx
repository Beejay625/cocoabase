"use client";

import ConnectButton from "@/components/connect-button";
import { motion } from "framer-motion";

type TopBarProps = {
  walletAddress?: string;
  totalSeeds: number;
  harvested: number;
  growing: number;
  carbonOffsetTons?: number;
  treeCount?: number;
  carbonEfficiency?: {
    perTreeKg: number | null;
    perHectareTons: number | null;
  };
  taskStats?: {
    pending: number;
    inProgress: number;
    completed: number;
  };
  alertCount?: number;
  reputationScore?: number;
  reputationRank?: number;
  onPlantSeed: () => void;
  onUploadReceipt: () => void;
  onFileComplaint: () => void;
  onRequestLoan: () => void;
  onViewAlerts?: () => void;
  onViewReputation?: () => void;
  welcomeNote?: string;
};

const formatAddress = (address?: string) => {
  if (!address) return "Wallet disconnected";
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
};

export default function TopBar({
  walletAddress,
  totalSeeds,
  harvested,
  growing,
  carbonOffsetTons,
  treeCount,
  carbonEfficiency,
  taskStats,
  alertCount,
  reputationScore,
  reputationRank,
  onPlantSeed,
  onUploadReceipt,
  onFileComplaint,
  onRequestLoan,
  onViewAlerts,
  onViewReputation,
  welcomeNote,
}: TopBarProps) {
  return (
    <header className="flex flex-col gap-4 border-b border-[#1d3a63]/60 bg-[#0f213f]/85 px-6 py-4 text-cream-100 shadow-lg shadow-cocoa-950/30 backdrop-blur md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-2">
        <span className="text-sm uppercase tracking-[0.3em] text-slate-200/70">
          Welcome back
        </span>
        {welcomeNote && (
          <p className="text-xs text-slate-200/80">{welcomeNote}</p>
        )}
        <h1 className="text-2xl font-semibold text-white">
          {walletAddress ? "Your Cocoa Plantations" : "Connect your wallet"}
        </h1>
        <p className="text-sm text-slate-200/80">
          {walletAddress
            ? `Tracking plantations for ${formatAddress(walletAddress)}`
            : "Link your wallet to start planting seeds."}
        </p>
      </div>

      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
        <dl className="flex flex-wrap gap-4 text-sm text-slate-200/80">
          <div className="rounded-lg border border-slate-700/40 bg-slate-900/40 px-3 py-2">
            <dt className="text-xs uppercase tracking-[0.2em] text-slate-300/60">
              Seeds planted
            </dt>
            <dd className="text-lg font-semibold text-white">{totalSeeds}</dd>
          </div>
          <div className="rounded-lg border border-slate-700/40 bg-slate-900/40 px-3 py-2">
            <dt className="text-xs uppercase tracking-[0.2em] text-slate-300/60">
              Harvested
            </dt>
            <dd className="text-lg font-semibold text-emerald-300">{harvested}</dd>
          </div>
          <div className="rounded-lg border border-slate-700/40 bg-slate-900/40 px-3 py-2">
            <dt className="text-xs uppercase tracking-[0.2em] text-slate-300/60">
              Growing
            </dt>
            <dd className="text-lg font-semibold text-leaf-300">{growing}</dd>
          </div>
          {carbonOffsetTons != null && (
            <div className="rounded-lg border border-slate-700/40 bg-slate-900/40 px-3 py-2">
              <dt className="text-xs uppercase tracking-[0.2em] text-slate-300/60">
                Carbon offset
              </dt>
              <dd className="text-lg font-semibold text-white">
                {carbonOffsetTons.toLocaleString()} tCO₂
              </dd>
            </div>
          )}
          {treeCount != null && (
            <div className="rounded-lg border border-slate-700/40 bg-slate-900/40 px-3 py-2">
              <dt className="text-xs uppercase tracking-[0.2em] text-slate-300/60">
                Trees protected
              </dt>
              <dd className="text-lg font-semibold text-white">
                {treeCount.toLocaleString()}
              </dd>
            </div>
          )}
          {taskStats && (
            <div className="rounded-lg border border-slate-700/40 bg-slate-900/40 px-3 py-2">
              <dt className="text-xs uppercase tracking-[0.2em] text-slate-300/60">
                Tasks
              </dt>
              <dd className="text-sm font-semibold text-white">
                <span className="text-amber-300">{taskStats.pending}</span>
                <span className="mx-1 text-slate-400">/</span>
                <span className="text-sky-300">{taskStats.inProgress}</span>
                <span className="mx-1 text-slate-400">/</span>
                <span className="text-emerald-300">{taskStats.completed}</span>
              </dd>
            </div>
          )}
          {alertCount !== undefined && alertCount > 0 && (
            <motion.button
              type="button"
              onClick={onViewAlerts}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-lg border border-amber-500/40 bg-amber-500/20 px-3 py-2 transition hover:border-amber-500/60 hover:bg-amber-500/30"
            >
              <dt className="text-xs uppercase tracking-[0.2em] text-amber-300/80">
                Alerts
              </dt>
              <dd className="text-lg font-semibold text-amber-300">
                {alertCount}
              </dd>
            </motion.button>
          )}
          {reputationScore !== undefined && reputationRank !== undefined && (
            <motion.button
              type="button"
              onClick={onViewReputation}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-lg border border-leaf-400/40 bg-leaf-500/20 px-3 py-2 transition hover:border-leaf-400/60 hover:bg-leaf-500/30"
            >
              <dt className="text-xs uppercase tracking-[0.2em] text-leaf-300/80">
                Reputation
              </dt>
              <dd className="text-sm font-semibold text-leaf-300">
                {reputationScore} pts
                <span className="ml-1 text-xs text-slate-300/70">
                  #{reputationRank}
                </span>
              </dd>
            </motion.button>
          )}
        </dl>

        <div className="flex flex-wrap items-center gap-2">
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={onPlantSeed}
            className="flex items-center gap-2 rounded-full bg-leaf-500 px-5 py-2 text-sm font-semibold text-cream-50 shadow-lg transition hover:bg-leaf-600 focus:outline-none focus:ring-2 focus:ring-leaf-400 focus:ring-offset-2 focus:ring-offset-cream-50"
          >
            🌱 Plant new seed
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={onUploadReceipt}
            className="flex items-center gap-2 rounded-full border border-cream-300 bg-white px-4 py-2 text-sm font-semibold text-cocoa-700 shadow-sm transition hover:border-cocoa-300 hover:text-cocoa-900 focus:outline-none focus:ring-2 focus:ring-cocoa-200 focus:ring-offset-2 focus:ring-offset-cream-50"
          >
            📄 Upload receipt
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={onFileComplaint}
            className="flex items-center gap-2 rounded-full border border-cream-300 bg-white px-4 py-2 text-sm font-semibold text-cocoa-700 shadow-sm transition hover:border-cocoa-300 hover:text-cocoa-900 focus:outline-none focus:ring-2 focus:ring-cocoa-200 focus:ring-offset-2 focus:ring-offset-cream-50"
          >
            🛠️ File complaint
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRequestLoan}
            className="flex items-center gap-2 rounded-full border border-cream-300 bg-white px-4 py-2 text-sm font-semibold text-cocoa-700 shadow-sm transition hover:border-cocoa-300 hover:text-cocoa-900 focus:outline-none focus:ring-2 focus:ring-cocoa-200 focus:ring-offset-2 focus:ring-offset-cream-50"
          >
            💰 Request loan
          </motion.button>
        </div>

        <ConnectButton />
      </div>
    </header>
  );
}

