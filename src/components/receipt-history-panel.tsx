"use client";

import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { useEngagementStore, computeReceiptTotals } from "@/store/engagement";
import { usePlantationsStore } from "@/store/plantations";

type ReceiptHistoryPanelProps = {
  limit?: number;
};

const currencyFormatter = (amount: number, currency: string) =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 2,
  }).format(amount);

function ReceiptHistoryPanelBase({ limit = 6 }: ReceiptHistoryPanelProps) {
  const receipts = useEngagementStore((state) => state.receipts);
  const plantations = usePlantationsStore((state) => state.plantations);

  const totals = useMemo(
    () => computeReceiptTotals(receipts),
    [receipts]
  );

  const receiptsWithContext = useMemo(() => {
    const mapped = receipts.map((receipt) => {
      const plantation = receipt.plantationId
        ? plantations.find((item) => item.id === receipt.plantationId)
        : undefined;
      return {
        ...receipt,
        plantationName: plantation?.seedName,
        plantationLocation: plantation?.location,
      };
    });

    return mapped
      .sort(
        (a, b) =>
          new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
      )
      .slice(0, limit);
  }, [receipts, plantations, limit]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 }}
      className="rounded-3xl border border-cream-200 bg-white/85 p-5 shadow-sm shadow-cocoa-900/5 backdrop-blur"
    >
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-cocoa-900">
            Finance Receipts
          </h2>
          <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
            Transparency & audit trail
          </p>
        </div>
        <div className="text-right text-sm text-cocoa-600">
          <p className="font-semibold text-cocoa-900">
            {currencyFormatter(totals.totalAmount, totals.currency)}
          </p>
          <p className="text-xs text-cocoa-500">
            {totals.count} receipt{totals.count === 1 ? "" : "s"} logged
          </p>
        </div>
      </header>

      <div className="mt-4 space-y-3">
        {receiptsWithContext.length === 0 ? (
          <div className="rounded-2xl border border-cream-200 bg-cream-50/70 px-4 py-6 text-sm text-cocoa-500">
            No receipts recorded yet. Upload purchase evidence to keep finance
            records synchronized.
          </div>
        ) : (
          receiptsWithContext.map((receipt) => (
            <article
              key={receipt.id}
              className="rounded-2xl border border-cream-200 bg-cream-50/70 p-4 text-sm text-cocoa-700 shadow-sm shadow-cocoa-900/5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-cocoa-900">
                    {receipt.title}
                  </p>
                  <p className="text-xs text-cocoa-500">
                    {receipt.plantationName
                      ? `${receipt.plantationName}${
                          receipt.plantationLocation
                            ? ` • ${receipt.plantationLocation}`
                            : ""
                        }`
                      : "Cooperative ledger"}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-cocoa-900">
                    {currencyFormatter(receipt.amount, receipt.currency)}
                  </span>
                  <p className="text-xs text-cocoa-500">
                    Issued {new Date(receipt.issuedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {receipt.notes ? (
                <p className="mt-3 text-xs text-cocoa-600">{receipt.notes}</p>
              ) : null}

              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-cocoa-500">
                <a
                  href={receipt.storageUrl}
                  className="rounded-full border border-cocoa-200 px-3 py-1 font-semibold uppercase tracking-wide text-cocoa-600 transition hover:border-cocoa-300 hover:text-cocoa-900 focus:outline-none focus:ring-2 focus:ring-cocoa-300 focus:ring-offset-1 focus:ring-offset-cream-50"
                  target="_blank"
                  rel="noreferrer"
                >
                  View file
                </a>
                <span>
                  Uploaded{" "}
                  {new Date(receipt.uploadedAt).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </span>
              </div>
            </article>
          ))
        )}
      </div>
    </motion.section>
  );
}

const ReceiptHistoryPanel = memo(ReceiptHistoryPanelBase);

export default ReceiptHistoryPanel;


