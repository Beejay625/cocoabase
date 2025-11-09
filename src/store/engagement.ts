"use client";

import { create } from "zustand";
import {
  persist,
  type PersistOptions,
  createJSONStorage,
} from "zustand/middleware";
import engagementSeed from "@/data/engagement.json";

export type Receipt = {
  id: string;
  plantationId?: string;
  walletAddress?: string;
  title: string;
  fileName: string;
  amount: number;
  currency: string;
  issuedDate: string;
  uploadedAt: string;
  storageUrl: string;
  notes?: string;
};

export type ReceiptDraft = Omit<
  Receipt,
  "id" | "uploadedAt" | "storageUrl"
> & {
  storageUrl?: string;
};

export type ComplaintStatus = "open" | "in_progress" | "resolved";
export type ComplaintPriority = "low" | "medium" | "high";

export type ComplaintAttachment = {
  id: string;
  fileName: string;
  storageUrl: string;
};

export type Complaint = {
  id: string;
  walletAddress?: string;
  plantationId?: string;
  category: string;
  status: ComplaintStatus;
  priority: ComplaintPriority;
  subject: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  attachments: ComplaintAttachment[];
};

export type ComplaintDraft = Omit<
  Complaint,
  "id" | "status" | "createdAt" | "updatedAt" | "attachments"
> & {
  status?: ComplaintStatus;
  attachments?: ComplaintAttachment[];
};

export type LoanStatus = "pending" | "approved" | "declined";

export type LoanRequest = {
  id: string;
  walletAddress?: string;
  plantationId?: string;
  amount: number;
  currency: string;
  termMonths: number;
  purpose: string;
  collateral?: string;
  status: LoanStatus;
  requestedAt: string;
  updatedAt: string;
  notes?: string;
  decisionNotes?: string;
};

export type LoanRequestDraft = Omit<
  LoanRequest,
  "id" | "status" | "requestedAt" | "updatedAt"
> & {
  status?: LoanStatus;
};

type EngagementState = {
  receipts: Receipt[];
  complaints: Complaint[];
  loans: LoanRequest[];
  addReceipt: (draft: ReceiptDraft) => Receipt;
  addComplaint: (draft: ComplaintDraft) => Complaint;
  updateComplaintStatus: (
    id: string,
    status: ComplaintStatus,
    updates?: Partial<Pick<Complaint, "updatedAt" | "attachments">>
  ) => void;
  addLoanRequest: (draft: LoanRequestDraft) => LoanRequest;
  updateLoanStatus: (
    id: string,
    status: LoanStatus,
    decisionNotes?: string
  ) => void;
  resetToSeed: () => void;
};

type EngagementSeed = {
  receipts: Receipt[];
  complaints: Complaint[];
  loans: LoanRequest[];
};

const seedData = engagementSeed as EngagementSeed;

const generateId = (prefix: string) => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
};

const withNow = () => new Date().toISOString();

const buildPersistOptions = (): PersistOptions<EngagementState> => {
  const options: PersistOptions<EngagementState> = {
    name: "cocoa-chain-engagement",
    version: 1,
    skipHydration: true,
    onRehydrateStorage: () => (state) => {
      if (!state) {
        return;
      }

      if (!state.receipts?.length) {
        state.receipts = seedData.receipts;
      }
      if (!state.complaints?.length) {
        state.complaints = seedData.complaints;
      }
      if (!state.loans?.length) {
        state.loans = seedData.loans;
      }
    },
  };

  if (typeof window !== "undefined") {
    options.storage = createJSONStorage(() => window.localStorage);
    options.skipHydration = false;
  }

  return options;
};

export const useEngagementStore = create<EngagementState>()(
  persist(
    (set) => ({
      receipts: seedData.receipts,
      complaints: seedData.complaints,
      loans: seedData.loans,
      addReceipt: (draft) => {
        const receipt: Receipt = {
          id: generateId("receipt"),
          storageUrl:
            draft.storageUrl ??
            `https://example.com/receipts/${draft.fileName || "upload"}`,
          uploadedAt: withNow(),
          ...draft,
        };

        set((state) => ({
          receipts: [receipt, ...state.receipts],
        }));

        return receipt;
      },
      addComplaint: (draft) => {
        const now = withNow();
        const complaint: Complaint = {
          id: generateId("complaint"),
          status: draft.status ?? "open",
          createdAt: now,
          updatedAt: now,
          attachments: draft.attachments ?? [],
          ...draft,
        };

        set((state) => ({
          complaints: [complaint, ...state.complaints],
        }));

        return complaint;
      },
      updateComplaintStatus: (id, status, updates) => {
        const timestamp = updates?.updatedAt ?? withNow();
        set((state) => ({
          complaints: state.complaints.map((complaint) =>
            complaint.id === id
              ? {
                  ...complaint,
                  status,
                  updatedAt: timestamp,
                  attachments:
                    updates?.attachments ?? complaint.attachments ?? [],
                }
              : complaint
          ),
        }));
      },
      addLoanRequest: (draft) => {
        const now = withNow();
        const loan: LoanRequest = {
          id: generateId("loan"),
          status: draft.status ?? "pending",
          requestedAt: now,
          updatedAt: now,
          ...draft,
        };

        set((state) => ({
          loans: [loan, ...state.loans],
        }));

        return loan;
      },
      updateLoanStatus: (id, status, decisionNotes) => {
        const timestamp = withNow();
        set((state) => ({
          loans: state.loans.map((loan) =>
            loan.id === id
              ? {
                  ...loan,
                  status,
                  decisionNotes: decisionNotes ?? loan.decisionNotes,
                  updatedAt: timestamp,
                }
              : loan
          ),
        }));
      },
      resetToSeed: () => {
        set({
          receipts: seedData.receipts,
          complaints: seedData.complaints,
          loans: seedData.loans,
        });
      },
    }),
    buildPersistOptions()
  )
);

export const computeReceiptTotals = (receipts: Receipt[]) => {
  const total = receipts.reduce((sum, receipt) => sum + receipt.amount, 0);
  const latest = receipts
    .slice()
    .sort(
      (a, b) =>
        new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    )[0];
  return {
    count: receipts.length,
    totalAmount: total,
    currency: latest?.currency ?? "USD",
    latest,
  };
};

export const computeComplaintStats = (complaints: Complaint[]) => {
  const counts = complaints.reduce(
    (acc, complaint) => {
      acc[complaint.status] += 1;
      return acc;
    },
    { open: 0, in_progress: 0, resolved: 0 } as Record<ComplaintStatus, number>
  );

  const highPriorityOpen = complaints.filter(
    (complaint) =>
      complaint.status !== "resolved" && complaint.priority === "high"
  ).length;

  return {
    counts,
    highPriorityOpen,
  };
};

export const computeLoanMetrics = (loans: LoanRequest[]) => {
  const aggregated = loans.reduce(
    (stats, loan) => {
      stats.count += 1;
      stats.totals[loan.status] += loan.amount;
      stats.byStatus[loan.status] += 1;
      return stats;
    },
    {
      count: 0,
      totals: {
        pending: 0,
        approved: 0,
        declined: 0,
      } as Record<LoanStatus, number>,
      byStatus: {
        pending: 0,
        approved: 0,
        declined: 0,
      } as Record<LoanStatus, number>,
    }
  );

  const latest = loans
    .slice()
    .sort(
      (a, b) =>
        new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime()
    )[0];

  return {
    ...aggregated,
    latest,
  };
};


