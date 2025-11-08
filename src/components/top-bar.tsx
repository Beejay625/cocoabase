"use client";

import ConnectButton from "@/components/connect-button";
import { motion } from "framer-motion";

type TopBarProps = {
  walletAddress?: string;
  totalSeeds: number;
  harvested: number;
  onPlantSeed: () => void;
};

const formatAddress = (address?: string) => {
  if (!address) return "Wallet disconnected";
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
};

export default function TopBar({
  walletAddress,
  totalSeeds,
  harvested,
  onPlantSeed,
}: TopBarProps) {
  return (
    <header className="flex flex-col gap-4 border-b border-cream-200 bg-cream-50/80 px-6 py-4 backdrop-blur md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-2">
        <span className="text-sm uppercase tracking-[0.3em] text-cocoa-400">
          Welcome back
        </span>
        <h1 className="text-2xl font-semibold text-cocoa-900">
          {walletAddress ? "Your Cocoa Plantations" : "Connect your wallet"}
        </h1>
        <p className="text-sm text-cocoa-500">
          {walletAddress
            ? `Tracking plantations for ${formatAddress(walletAddress)}`
            : "Link your wallet to start planting seeds."}
        </p>
      </div>

      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
        <dl className="flex gap-6 text-sm">
          <div>
            <dt className="text-cocoa-500">Seeds planted</dt>
            <dd className="text-lg font-semibold text-cocoa-900">{totalSeeds}</dd>
          </div>
          <div>
            <dt className="text-cocoa-500">Harvested</dt>
            <dd className="text-lg font-semibold text-cocoa-900">{harvested}</dd>
          </div>
        </dl>

        <motion.button
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={onPlantSeed}
          className="flex items-center gap-2 rounded-full bg-leaf-500 px-5 py-2 text-sm font-semibold text-cream-50 shadow-lg transition hover:bg-leaf-600 focus:outline-none focus:ring-2 focus:ring-leaf-400 focus:ring-offset-2 focus:ring-offset-cream-50"
        >
          🌱 Plant New Seed
        </motion.button>

        <ConnectButton />
      </div>
    </header>
  );
}

