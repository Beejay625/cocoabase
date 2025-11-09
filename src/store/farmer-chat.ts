"use client";

import { create } from "zustand";
import {
  persist,
  type PersistOptions,
  createJSONStorage,
} from "zustand/middleware";

export type ChatRoom = {
  id: string;
  name: string;
  description?: string;
  topic: string;
  createdAt: string;
  memberCount: number;
  isPublic: boolean;
};

export type ChatMessage = {
  id: string;
  roomId?: string;
  recipientWalletAddress?: string;
  senderWalletAddress: string;
  senderName?: string;
  content: string;
  createdAt: string;
  read: boolean;
  attachments?: string[];
};

export type ChatRoomDraft = Omit<ChatRoom, "id" | "createdAt" | "memberCount">;

export type ChatMessageDraft = Omit<
  ChatMessage,
  "id" | "createdAt" | "read"
> & {
  attachments?: string[];
};

type FarmerChatState = {
  rooms: ChatRoom[];
  messages: ChatMessage[];
  addRoom: (draft: ChatRoomDraft) => ChatRoom;
  addMessage: (draft: ChatMessageDraft) => ChatMessage;
  markMessagesRead: (roomId?: string, recipientWalletAddress?: string) => void;
  getRoomMessages: (roomId: string) => ChatMessage[];
  getDirectMessages: (
    walletAddress: string,
    currentWalletAddress: string
  ) => ChatMessage[];
  getUnreadCount: (walletAddress: string) => number;
};

const generateId = (prefix: string) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const withNow = () => new Date().toISOString();

const defaultRooms: ChatRoom[] = [
  {
    id: "room-general",
    name: "General Discussion",
    description: "General farming discussions and community chat",
    topic: "general",
    createdAt: new Date(2025, 0, 1).toISOString(),
    memberCount: 0,
    isPublic: true,
  },
  {
    id: "room-pest-control",
    name: "Pest Control",
    description: "Share pest control strategies and solutions",
    topic: "pest_control",
    createdAt: new Date(2025, 0, 1).toISOString(),
    memberCount: 0,
    isPublic: true,
  },
  {
    id: "room-irrigation",
    name: "Irrigation & Water Management",
    description: "Discuss irrigation systems and water conservation",
    topic: "irrigation",
    createdAt: new Date(2025, 0, 1).toISOString(),
    memberCount: 0,
    isPublic: true,
  },
  {
    id: "room-harvesting",
    name: "Harvesting Tips",
    description: "Best practices for harvesting and post-harvest handling",
    topic: "harvesting",
    createdAt: new Date(2025, 0, 1).toISOString(),
    memberCount: 0,
    isPublic: true,
  },
  {
    id: "room-marketplace",
    name: "Marketplace",
    description: "Buy, sell, and trade farming supplies and equipment",
    topic: "marketplace",
    createdAt: new Date(2025, 0, 1).toISOString(),
    memberCount: 0,
    isPublic: true,
  },
];

const buildPersistOptions = (): PersistOptions<FarmerChatState> => {
  const options: PersistOptions<FarmerChatState> = {
    name: "cocoa-chain-farmer-chat",
    version: 1,
    skipHydration: true,
    onRehydrateStorage: () => (state) => {
      if (!state) {
        return;
      }
      if (!state.rooms || state.rooms.length === 0) {
        state.rooms = defaultRooms;
      }
      if (!state.messages) {
        state.messages = [];
      }
    },
  };

  if (typeof window !== "undefined") {
    options.storage = createJSONStorage(() => window.localStorage);
    options.skipHydration = false;
  }

  return options;
};

export const useFarmerChatStore = create<FarmerChatState>()(
  persist(
    (set, get) => ({
      rooms: defaultRooms,
      messages: [],
      addRoom: (draft) => {
        const room: ChatRoom = {
          id: generateId("room"),
          memberCount: 0,
          createdAt: withNow(),
          ...draft,
        };

        set((state) => ({
          rooms: [room, ...state.rooms],
        }));

        return room;
      },
      addMessage: (draft) => {
        const message: ChatMessage = {
          id: generateId("msg"),
          createdAt: withNow(),
          read: false,
          attachments: draft.attachments ?? [],
          ...draft,
        };

        set((state) => ({
          messages: [message, ...state.messages],
        }));

        return message;
      },
      markMessagesRead: (roomId, recipientWalletAddress) => {
        set((state) => ({
          messages: state.messages.map((msg) => {
            if (roomId && msg.roomId === roomId) {
              return { ...msg, read: true };
            }
            if (
              recipientWalletAddress &&
              msg.recipientWalletAddress === recipientWalletAddress
            ) {
              return { ...msg, read: true };
            }
            return msg;
          }),
        }));
      },
      getRoomMessages: (roomId) => {
        return get()
          .messages.filter((msg) => msg.roomId === roomId)
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
      },
      getDirectMessages: (walletAddress, currentWalletAddress) => {
        return get()
          .messages.filter(
            (msg) =>
              (msg.senderWalletAddress === walletAddress &&
                msg.recipientWalletAddress === currentWalletAddress) ||
              (msg.senderWalletAddress === currentWalletAddress &&
                msg.recipientWalletAddress === walletAddress)
          )
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
      },
      getUnreadCount: (walletAddress) => {
        return get().messages.filter(
          (msg) =>
            msg.recipientWalletAddress === walletAddress && !msg.read
        ).length;
      },
    }),
    buildPersistOptions()
  )
);

