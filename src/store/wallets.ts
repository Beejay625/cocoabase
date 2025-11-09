import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type WalletProfile = {
  address: string;
  label?: string;
  source: "connected" | "watchlist";
  addedAt: string;
};

type WalletState = {
  connectedWallet?: string;
  watchlist: WalletProfile[];
  activeAddresses: string[];
  setConnectedWallet: (address?: string) => void;
  addWatchWallet: (address: string, label?: string) => void;
  removeWatchWallet: (address: string) => void;
  renameWallet: (address: string, label: string) => void;
  toggleActiveAddress: (address: string) => void;
  resetSelection: () => void;
};

export type WalletEvent =
  | {
      type: "connected";
      address: string;
      timestamp: string;
      previousAddress?: string;
    }
  | {
      type: "disconnected";
      address?: string;
      timestamp: string;
    }
  | {
      type: "watch_added";
      address: string;
      label?: string;
      timestamp: string;
    }
  | {
      type: "watch_removed";
      address: string;
      timestamp: string;
    }
  | {
      type: "watch_renamed";
      address: string;
      label: string;
      timestamp: string;
    };

export type WalletEventListener = (event: WalletEvent) => void;

const walletEventListeners = new Set<WalletEventListener>();

export const subscribeToWalletEvents = (listener: WalletEventListener) => {
  walletEventListeners.add(listener);
  return () => {
    walletEventListeners.delete(listener);
  };
};

const emitWalletEvent = (event: WalletEvent) => {
  walletEventListeners.forEach((listener) => {
    try {
      listener(event);
    } catch (error) {
      console.error("[wallets] event listener error", error);
    }
  });
};

const normalize = (address: string) => address.toLowerCase();

export const useWalletStore = create<WalletState>()(
  persist(
    (set, get) => ({
      connectedWallet: undefined,
      watchlist: [],
      activeAddresses: [],
      setConnectedWallet: (address) => {
        const normalized = address ? normalize(address) : undefined;
        const previous = get().connectedWallet;
        const now = new Date().toISOString();
        set((state) => {
          const existing =
            normalized &&
            state.watchlist.find(
              (wallet) => normalize(wallet.address) === normalized
            );

          const updatedWatchlist =
            normalized && !existing
              ? [
                  {
                    address,
                    label: "Primary Wallet",
                    source: "connected" as const,
                    addedAt: new Date().toISOString(),
                  },
                  ...state.watchlist,
                ]
              : state.watchlist.map((wallet) =>
                  wallet.source === "connected"
                    ? { ...wallet, address: address ?? wallet.address }
                    : wallet
                );

          const activeAddresses = normalized
            ? Array.from(new Set([normalized, ...state.activeAddresses]))
            : state.activeAddresses.filter(
                (addr) =>
                  !state.watchlist
                    .filter((wallet) => wallet.source === "connected")
                    .some((wallet) => normalize(wallet.address) === addr)
              );

          return {
            connectedWallet: address,
            watchlist: updatedWatchlist,
            activeAddresses,
          };
        });

        if (address) {
          emitWalletEvent({
            type: "connected",
            address,
            previousAddress: previous ?? undefined,
            timestamp: now,
          });
        } else if (previous) {
          emitWalletEvent({
            type: "disconnected",
            address: previous,
            timestamp: now,
          });
        }
      },
      addWatchWallet: (address, label) => {
        const normalized = normalize(address);
        const { watchlist, activeAddresses } = get();
        const exists = watchlist.some(
          (wallet) => normalize(wallet.address) === normalized
        );
        if (exists) {
          return;
        }

        const profile: WalletProfile = {
          address,
          label,
          source: "watchlist",
          addedAt: new Date().toISOString(),
        };

        set({
          watchlist: [profile, ...watchlist],
          activeAddresses: [normalized, ...activeAddresses],
        });

        emitWalletEvent({
          type: "watch_added",
          address,
          label,
          timestamp: new Date().toISOString(),
        });
      },
      removeWatchWallet: (address) => {
        const normalized = normalize(address);
        set((state) => ({
          watchlist: state.watchlist.filter(
            (wallet) => normalize(wallet.address) !== normalized
          ),
          activeAddresses: state.activeAddresses.filter(
            (addr) => addr !== normalized
          ),
        }));

        emitWalletEvent({
          type: "watch_removed",
          address,
          timestamp: new Date().toISOString(),
        });
      },
      renameWallet: (address, label) => {
        const normalized = normalize(address);
        set((state) => ({
          watchlist: state.watchlist.map((wallet) =>
            normalize(wallet.address) === normalized
              ? { ...wallet, label }
              : wallet
          ),
        }));

        emitWalletEvent({
          type: "watch_renamed",
          address,
          label,
          timestamp: new Date().toISOString(),
        });
      },
      toggleActiveAddress: (address) => {
        const normalized = normalize(address);
        set((state) => {
          const isActive = state.activeAddresses.includes(normalized);
          return {
            activeAddresses: isActive
              ? state.activeAddresses.filter((addr) => addr !== normalized)
              : [normalized, ...state.activeAddresses],
          };
        });
      },
      resetSelection: () => {
        const { connectedWallet } = get();
        set({
          activeAddresses: connectedWallet ? [normalize(connectedWallet)] : [],
        });
      },
    }),
    {
      name: "cocoa-chain-wallets",
      storage:
        typeof window !== "undefined"
          ? createJSONStorage(() => window.localStorage)
          : undefined,
      version: 1,
      skipHydration: true,
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        if (!state.watchlist) {
          state.watchlist = [];
        }
        if (!state.activeAddresses) {
          state.activeAddresses = [];
        }
      },
    }
  )
);

