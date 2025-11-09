"use client";

import { memo, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  useEngagementStore,
  type LoanStatus,
  computeLoanMetrics,
} from "@/store/engagement";
import { cn } from "@/lib/cn";

type LoanTrackerPanelProps = {
  limit?: number;
};

const statusColors: Record<LoanStatus, string> = {
  pending: "bg-amber-100 text-amber-700",
  approved: "bg-leaf-100 text-leaf-700",
  declined: "bg-rose-100 text-rose-700",
};

const statusLabels: Record<LoanStatus, string> = {
  pending: "Pending",
  approved: "Approved",
  declined: "Declined",
};

const filterOptions: Array<{ value: LoanStatus | "all"; label: string }> = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "declined", label: "Declined" },
];

const formatCurrency = (value: number, currency: string) =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 2,
  }).format(value);

function LoanTrackerPanelBase({ limit = 6 }: LoanTrackerPanelProps) {
  const loans = useEngagementStore((state) => state.loans);
  const updateLoanStatus = useEngagementStore((state) => state.updateLoanStatus);

  const [filter, setFilter] = useState<LoanStatus | "all">("all");

  const metrics = useMemo(() => computeLoanMetrics(loans), [loans]);

  const filteredLoans = useMemo(() => {
    const sorted = loans
      .slice()
      .sort(
        (a, b) =>
          new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime()
      );

    if (filter === "all") {
      return sorted.slice(0, limit);
    }

    return sorted.filter((loan) => loan.status === filter).slice(0, limit);
  }, [loans, filter, limit]);

  const nextStatusOptions: Record<LoanStatus, LoanStatus[]> = {
    pending: ["approved", "declined"],
    approved: ["declined"],
    declined: ["approved"],
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.12 }}
      className="rounded-3xl border border-cream-200 bg-white/85 p-5 shadow-sm shadow-cocoa-900/5 backdrop-blur"
    >
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-cocoa-900">
            Loan Tracker
          </h2>
          <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
            Financing pipeline
          </p>
        </div>
        <div className="text-right text-sm text-cocoa-600">
          <p className="font-semibold text-cocoa-900">
            {formatCurrency(
              metrics.totals.approved + metrics.totals.pending,
              "USD"
            )}
          </p>
          <p className="text-xs text-cocoa-500">
            {metrics.byStatus.pending} pending • {metrics.byStatus.approved} approved
          </p>
        </div>
      </header>

      <div className="mt-4 flex flex-wrap gap-2">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setFilter(option.value as LoanStatus | "all")}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide transition",
              filter === option.value
                ? "border-cocoa-900 bg-cocoa-900 text-cream-100"
                : "border-cream-300 bg-white text-cocoa-600 hover:border-cocoa-300"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-3">
        {filteredLoans.length === 0 ? (
          <div className="rounded-2xl border border-cream-200 bg-cream-50/70 px-4 py-6 text-sm text-cocoa-500">
            No loan requests match this filter.
          </div>
        ) : (
          filteredLoans.map((loan) => (
            <article
              key={loan.id}
              className="rounded-2xl border border-cream-200 bg-cream-50/75 p-4 text-sm text-cocoa-700 shadow-sm shadow-cocoa-900/5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-cocoa-900">
                    {formatCurrency(loan.amount, loan.currency)} • {loan.termMonths}{" "}
                    months
                  </p>
                  <p className="text-xs text-cocoa-500">
                    Requested {new Date(loan.requestedAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide",
                    statusColors[loan.status]
                  )}
                >
                  {statusLabels[loan.status]}
                </span>
              </div>

              <p className="mt-3 text-sm text-cocoa-700">{loan.purpose}</p>

              {loan.collateral ? (
                <p className="mt-2 text-xs text-cocoa-500">
                  Collateral: {loan.collateral}
                </p>
              ) : null}

              {loan.notes ? (
                <p className="mt-2 text-xs text-cocoa-500">Notes: {loan.notes}</p>
              ) : null}

              {loan.decisionNotes ? (
                <p className="mt-2 text-xs text-cocoa-500">
                  Decision notes: {loan.decisionNotes}
                </p>
              ) : null}

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-cocoa-500">
                <span>
                  Updated {new Date(loan.updatedAt).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </span>
                <div className="flex gap-2">
                  {nextStatusOptions[loan.status].map((nextStatus) => (
                    <button
                      key={nextStatus}
                      type="button"
                      onClick={() => {
                        updateLoanStatus(loan.id, nextStatus);
                      }}
                      className="rounded-full border border-cocoa-200 px-3 py-1 font-semibold uppercase tracking-wide text-cocoa-600 transition hover:border-cocoa-300 hover:text-cocoa-900 focus:outline-none focus:ring-2 focus:ring-cocoa-300 focus:ring-offset-1 focus:ring-offset-cream-50"
                    >
                      Mark {statusLabels[nextStatus]}
                    </button>
                  ))}
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </motion.section>
  );
}

const LoanTrackerPanel = memo(LoanTrackerPanelBase);

export default LoanTrackerPanel;


