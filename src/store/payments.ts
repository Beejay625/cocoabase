import { create } from "zustand";
import {
  persist,
  type PersistOptions,
  createJSONStorage,
} from "zustand/middleware";

export type PaymentType = "income" | "expense" | "refund";

export type PaymentMethod =
  | "cash"
  | "bank_transfer"
  | "check"
  | "crypto"
  | "other";

export type PaymentStatus = "pending" | "completed" | "failed" | "cancelled";

export type Payment = {
  id: string;
  type: PaymentType;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  description: string;
  recipient?: string;
  payer?: string;
  dueDate?: string;
  paidDate?: string;
  invoiceNumber?: string;
  reference?: string;
  plantationId?: string;
  contractId?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type PaymentDraft = Omit<
  Payment,
  "id" | "createdAt" | "updatedAt"
> & {
  id?: string;
};

type PaymentsState = {
  payments: Payment[];
  addPayment: (draft: PaymentDraft) => void;
  updatePayment: (id: string, updates: Partial<PaymentDraft>) => void;
  removePayment: (id: string) => void;
  getPaymentsByType: (type: PaymentType) => Payment[];
  getPendingPayments: () => Payment[];
  getTotalByType: (type: PaymentType) => number;
};

const generatePaymentId = () =>
  `payment_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

export const usePaymentsStore = create<PaymentsState>()(
  persist(
    (set, get) => ({
      payments: [],

      addPayment: (draft) => {
        const now = new Date().toISOString();
        const payment: Payment = {
          ...draft,
          id: draft.id ?? generatePaymentId(),
          currency: draft.currency || "USD",
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({
          payments: [...state.payments, payment],
        }));
      },

      updatePayment: (id, updates) => {
        set((state) => ({
          payments: state.payments.map((payment) =>
            payment.id === id
              ? { ...payment, ...updates, updatedAt: new Date().toISOString() }
              : payment
          ),
        }));
      },

      removePayment: (id) => {
        set((state) => ({
          payments: state.payments.filter((payment) => payment.id !== id),
        }));
      },

      getPaymentsByType: (type) => {
        return get()
          .payments.filter((payment) => payment.type === type)
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      },

      getPendingPayments: () => {
        return get()
          .payments.filter((payment) => payment.status === "pending")
          .sort((a, b) => {
            const aDate = a.dueDate ? new Date(a.dueDate) : new Date(0);
            const bDate = b.dueDate ? new Date(b.dueDate) : new Date(0);
            return aDate.getTime() - bDate.getTime();
          });
      },

      getTotalByType: (type) => {
        return get()
          .payments.filter(
            (payment) =>
              payment.type === type && payment.status === "completed"
          )
          .reduce((sum, payment) => sum + payment.amount, 0);
      },
    }),
    {
      name: "cocoa-chain-payments",
      storage: createJSONStorage(() => localStorage),
    } as PersistOptions<PaymentsState>
  )
);

