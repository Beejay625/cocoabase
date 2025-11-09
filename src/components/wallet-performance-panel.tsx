"use client";

import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import type { Plantation } from "@/store/plantations";
import { cn } from "@/lib/cn";
import { useWalletStore } from "@/store/wallets";

type WalletPerformancePanelProps = {
  plantations: Plantation[];
};

type WalletAggregate = {
  address: string;
  label?: string;
  totalPlantations: number;
  harvested: number;
  activeTasks: number;
  carbonOffset: number;
  lastUpdated?: string;
};

function WalletPerformancePanelBase({
  plantations,
}: WalletPerformancePanelProps) {
  const watchlist = useWalletStore((state) => state.watchlist);
  const connectedWallet = useWalletStore((state) => state.connectedWallet);

  const aggregates = useMemo(() => {
    const map = new Map<string, WalletAggregate>();

    plantations.forEach((plantation) => {
      const key = plantation.walletAddress.toLowerCase();
      const existing = map.get(key) ?? {
        address: plantation.walletAddress,
        totalPlantations: 0,
        harvested: 0,
        activeTasks: 0,
        carbonOffset: 0,
      };

      existing.totalPlantations += 1;
      existing.harvested += plantation.stage === "harvested" ? 1 : 0;
      existing.activeTasks += plantation.tasks.filter(
        (task) => task.status !== "completed"
      ).length;
      existing.carbonOffset += plantation.carbonOffsetTons;
      existing.lastUpdated = plantation.updatedAt;

      map.set(key, existing);
    });

    watchlist.forEach((wallet) => {
      const key = wallet.address.toLowerCase();
      const existing = map.get(key);
      if (existing) {
        existing.label = wallet.label;
      } else {
        map.set(key, {
          address: wallet.address,
          label: wallet.label,
          totalPlantations: 0,
          harvested: 0,
          activeTasks: 0,
          carbonOffset: 0,
        });
      }
    });

    return Array.from(map.values()).sort(
      (a, b) => b.totalPlantations - a.totalPlantations
    );
  }, [plantations, watchlist]);

  if (!aggregates.length) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 }}
      className="rounded-3xl border border-cream-200 bg-white/85 p-6 shadow-sm shadow-cocoa-900/5 backdrop-blur"
    >
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-cocoa-900">
            Wallet Performance
          </h2>
          <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
            Plantation ownership snapshot
          </p>
        </div>
        {connectedWallet && (
          <span className="text-xs text-cocoa-500">
            Connected:{" "}
            <span className="font-semibold text-cocoa-800">
              {connectedWallet.slice(0, 6)}…{connectedWallet.slice(-4)}
            </span>
          </span>
        )}
      </header>

      <div className="mt-5 overflow-hidden rounded-3xl border border-cream-200">
        <table className="min-w-full divide-y divide-cream-200 text-sm text-cocoa-700">
          <thead className="bg-cream-100/70 text-xs uppercase tracking-[0.2em] text-cocoa-500">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Wallet</th>
              <th className="px-4 py-3 text-left font-semibold">Plantations</th>
              <th className="px-4 py-3 text-left font-semibold">Harvested</th>
              <th className="px-4 py-3 text-left font-semibold">Active tasks</th>
              <th className="px-4 py-3 text-left font-semibold">Carbon (tCO₂)</th>
              <th className="px-4 py-3 text-left font-semibold">Last update</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-100">
            {aggregates.map((wallet) => {
              const isConnected =
                connectedWallet &&
                wallet.address.toLowerCase() === connectedWallet.toLowerCase();
              return (
                <tr
                  key={wallet.address}
                  className={cn(
                    "transition hover:bg-cream-50/80",
                    isConnected && "bg-leaf-50/70"
                  )}
                >
                  <td className="px-4 py-3 align-top">
                    <div className="flex flex-col">
                      <span className="font-semibold text-cocoa-900">
                        {wallet.label ?? "Community wallet"}
                      </span>
                      <span className="text-xs text-cocoa-400">
                        {wallet.address.slice(0, 6)}…{wallet.address.slice(-4)}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <span className="font-semibold text-cocoa-900">
                      {wallet.totalPlantations}
                    </span>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <span
                      className={cn(
                        "font-semibold",
                        wallet.harvested ? "text-leaf-700" : "text-cocoa-500"
                      )}
                    >
                      {wallet.harvested}
                    </span>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <span
                      className={cn(
                        "font-semibold",
                        wallet.activeTasks ? "text-gold-700" : "text-cocoa-500"
                      )}
                    >
                      {wallet.activeTasks}
                    </span>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <span className="font-semibold text-cocoa-900">
                      {wallet.carbonOffset.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 align-top text-xs text-cocoa-500">
                    {wallet.lastUpdated
                      ? format(new Date(wallet.lastUpdated), "MMM d, HH:mm")
                      : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
}

const WalletPerformancePanel = memo(WalletPerformancePanelBase);

export default WalletPerformancePanel;


