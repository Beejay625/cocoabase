import { create } from "zustand";
import {
  persist,
  type PersistOptions,
  createJSONStorage,
} from "zustand/middleware";

export type ConnectionStatus = "pending" | "connected" | "blocked";

export type FarmerConnection = {
  id: string;
  walletAddress: string;
  name?: string;
  bio?: string;
  location?: string;
  specialties?: string[];
  status: ConnectionStatus;
  connectedAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type FarmerConnectionDraft = Omit<
  FarmerConnection,
  "id" | "createdAt" | "updatedAt"
> & {
  id?: string;
};

type FarmerNetworkState = {
  connections: FarmerConnection[];
  addConnection: (draft: FarmerConnectionDraft) => void;
  updateConnection: (
    id: string,
    updates: Partial<FarmerConnectionDraft>
  ) => void;
  removeConnection: (id: string) => void;
  getConnectedFarmers: () => FarmerConnection[];
  getPendingConnections: () => FarmerConnection[];
  searchConnections: (query: string) => FarmerConnection[];
};

const generateConnectionId = () =>
  `conn_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

export const useFarmerNetworkStore = create<FarmerNetworkState>()(
  persist(
    (set, get) => ({
      connections: [],

      addConnection: (draft) => {
        const now = new Date().toISOString();
        const connection: FarmerConnection = {
          ...draft,
          id: draft.id ?? generateConnectionId(),
          specialties: draft.specialties || [],
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({
          connections: [...state.connections, connection],
        }));
      },

      updateConnection: (id, updates) => {
        set((state) => ({
          connections: state.connections.map((connection) =>
            connection.id === id
              ? {
                  ...connection,
                  ...updates,
                  updatedAt: new Date().toISOString(),
                }
              : connection
          ),
        }));
      },

      removeConnection: (id) => {
        set((state) => ({
          connections: state.connections.filter(
            (connection) => connection.id !== id
          ),
        }));
      },

      getConnectedFarmers: () => {
        return get().connections.filter(
          (connection) => connection.status === "connected"
        );
      },

      getPendingConnections: () => {
        return get().connections.filter(
          (connection) => connection.status === "pending"
        );
      },

      searchConnections: (query) => {
        const lowerQuery = query.toLowerCase();
        return get().connections.filter(
          (connection) =>
            connection.name?.toLowerCase().includes(lowerQuery) ||
            connection.bio?.toLowerCase().includes(lowerQuery) ||
            connection.location?.toLowerCase().includes(lowerQuery) ||
            connection.specialties?.some((s) =>
              s.toLowerCase().includes(lowerQuery)
            ) ||
            connection.walletAddress.toLowerCase().includes(lowerQuery)
        );
      },
    }),
    {
      name: "cocoa-chain-farmer-network",
      storage: createJSONStorage(() => localStorage),
    } as PersistOptions<FarmerNetworkState>
  )
);

