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
  onPlantSeed: () => void;
  onUploadReceipt: () => void;
  onFileComplaint: () => void;
  onRequestLoan: () => void;
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
  onPlantSeed,
  onUploadReceipt,
  onFileComplaint,
  onRequestLoan,
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
        <dl className="flex flex-wrap gap-6 text-sm text-slate-200/80">
          <div>
            <dt className="text-xs uppercase tracking-[0.2em] text-slate-300/60">
              Seeds planted
            </dt>
            <dd className="text-lg font-semibold text-white">{totalSeeds}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.2em] text-slate-300/60">
              Harvested
            </dt>
            <dd className="text-lg font-semibold text-white">{harvested}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.2em] text-slate-300/60">
              Growing
            </dt>
            <dd className="text-lg font-semibold text-white">{growing}</dd>
          </div>
          {carbonOffsetTons != null && (
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-slate-300/60">
                Carbon offset
              </dt>
              <dd className="text-lg font-semibold text-white">
                {carbonOffsetTons.toLocaleString()} tCO₂
              </dd>
            </div>
          )}
          {treeCount != null && (
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-slate-300/60">
                Trees protected
              </dt>
              <dd className="text-lg font-semibold text-white">
                {treeCount.toLocaleString()}
              </dd>
            </div>
          )}
          {carbonEfficiency && (carbonEfficiency.perTreeKg != null || carbonEfficiency.perHectareTons != null) && (
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-slate-300/60">
                Carbon efficiency
              </dt>
              <dd className="text-sm font-semibold text-leaf-300">
                {carbonEfficiency.perTreeKg != null
                  ? `${carbonEfficiency.perTreeKg.toFixed(1)} kg/tree`
                  : "—"}
                <span className="mx-1 text-xs text-slate-300/70">•</span>
                {carbonEfficiency.perHectareTons != null
                  ? `${carbonEfficiency.perHectareTons.toFixed(2)} tCO₂/ha`
                  : "—"}
              </dd>
            </div>
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

