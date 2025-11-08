"use client";

import { Fragment, useMemo, useState } from "react";
import { useWalletStore } from "@/store/wallets";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";

const formatAddress = (address: string, size = 4) =>
  `${address.slice(0, size + 2)}…${address.slice(-size)}`;

export default function WalletManager() {
  const {
    connectedWallet,
    watchlist,
    activeAddresses,
    addWatchWallet,
    removeWatchWallet,
    renameWallet,
    toggleActiveAddress,
    resetSelection,
  } = useWalletStore();

  const [formAddress, setFormAddress] = useState("");
  const [formLabel, setFormLabel] = useState("");
  const [error, setError] = useState<string | null>(null);

  const orderedWallets = useMemo(() => {
    const connected = watchlist.filter(
      (wallet) => wallet.source === "connected" && wallet.address
    );
    const others = watchlist.filter((wallet) => wallet.source !== "connected");
    return [...connected, ...others];
  }, [watchlist]);

  const handleAddWallet = () => {
    const address = formAddress.trim();
    if (!address) {
      setError("Enter a wallet address");
      return;
    }

    if (!/^0x[a-fA-F0-9]{6,}$/.test(address)) {
      setError("Wallet address should be a valid hex string");
      return;
    }

    addWatchWallet(address, formLabel.trim() || undefined);
    setFormAddress("");
    setFormLabel("");
    setError(null);
  };

  const handleRename = (address: string, label: string) => {
    renameWallet(address, label);
  };

  return (
    <section className="rounded-3xl border border-cream-200 bg-cream-50/70 p-5 shadow-sm shadow-cocoa-900/5 backdrop-blur">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-cocoa-900">
            Multi-wallet Control
          </h2>
          <p className="text-xs uppercase tracking-[0.3em] text-cocoa-400">
            Toggle visibility & insights
          </p>
        </div>
        <button
          type="button"
          onClick={resetSelection}
          className="rounded-full border border-cocoa-200 px-4 py-1.5 text-xs font-semibold text-cocoa-500 transition hover:border-cocoa-400 hover:text-cocoa-700 focus:outline-none focus:ring-2 focus:ring-leaf-400 focus:ring-offset-2 focus:ring-offset-cream-50"
        >
          Reset selection
        </button>
      </header>

      <ul className="mt-5 space-y-3">
        <AnimatePresence initial={false}>
          {orderedWallets.map((wallet) => {
            const normalized = wallet.address.toLowerCase();
            const isActive = activeAddresses.includes(normalized);
            const isConnected =
              connectedWallet &&
              normalized === connectedWallet.toLowerCase();

            return (
              <motion.li
                key={wallet.address}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className={cn(
                  "flex flex-col gap-2 rounded-2xl border px-4 py-3 shadow-sm transition",
                  isActive
                    ? "border-leaf-400 bg-white/90"
                    : "border-cream-200 bg-white/60"
                )}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-cocoa-900">
                      {wallet.label || formatAddress(wallet.address)}
                    </span>
                    <span className="text-xs text-cocoa-400">
                      {formatAddress(wallet.address, 6)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleActiveAddress(wallet.address)}
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide transition focus:outline-none focus:ring-2 focus:ring-offset-2",
                        isActive
                          ? "bg-leaf-500 text-cream-50 focus:ring-leaf-300 focus:ring-offset-cream-50"
                          : "bg-cream-200 text-cocoa-600 focus:ring-cream-300 focus:ring-offset-cream-50"
                      )}
                    >
                      {isActive ? "Included" : "Include"}
                    </button>
                    {wallet.source === "watchlist" && (
                      <button
                        type="button"
                        onClick={() => removeWatchWallet(wallet.address)}
                        className="text-xs font-medium text-cocoa-400 transition hover:text-cocoa-600"
                      >
                        Remove
                      </button>
                    )}
                    {isConnected && (
                      <span className="rounded-full bg-leaf-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-leaf-600">
                        Connected
                      </span>
                    )}
                  </div>
                </div>
                {wallet.source === "watchlist" && (
                  <Fragment>
                    <label className="text-xs text-cocoa-500">
                      Nickname your wallet
                    </label>
                    <input
                      type="text"
                      className="rounded-xl border border-cream-200 bg-white px-3 py-2 text-sm text-cocoa-900 focus:border-leaf-400 focus:outline-none focus:ring-2 focus:ring-leaf-200"
                      placeholder="E.g. DAO Treasury"
                      defaultValue={wallet.label}
                      onBlur={(event) =>
                        handleRename(wallet.address, event.target.value)
                      }
                    />
                  </Fragment>
                )}
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>

      <div className="mt-6 rounded-2xl border border-dashed border-cream-300 bg-white/60 p-4">
        <h3 className="text-sm font-semibold text-cocoa-800">
          Track another wallet
        </h3>
        <p className="text-xs text-cocoa-500">
          Add DAO treasuries, partner farms, or community addresses.
        </p>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <input
            type="text"
            value={formAddress}
            onChange={(event) => setFormAddress(event.target.value)}
            placeholder="0x1234…"
            className="rounded-xl border border-cream-200 bg-white px-3 py-2 text-sm text-cocoa-900 focus:border-leaf-400 focus:outline-none focus:ring-2 focus:ring-leaf-200"
          />
          <input
            type="text"
            value={formLabel}
            onChange={(event) => setFormLabel(event.target.value)}
            placeholder="Nickname (optional)"
            className="rounded-xl border border-cream-200 bg-white px-3 py-2 text-sm text-cocoa-900 focus:border-leaf-400 focus:outline-none focus:ring-2 focus:ring-leaf-200"
          />
        </div>

        {error && (
          <p className="mt-2 text-xs font-semibold text-red-500">{error}</p>
        )}

        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddWallet}
          className="mt-4 w-full rounded-full bg-cocoa-900 px-4 py-2 text-sm font-semibold text-cream-50 shadow-lg shadow-cocoa-900/20 transition hover:bg-cocoa-800 focus:outline-none focus:ring-2 focus:ring-cocoa-500 focus:ring-offset-2 focus:ring-offset-cream-100"
        >
          Add wallet to dashboard
        </motion.button>
      </div>
    </section>
  );
}

