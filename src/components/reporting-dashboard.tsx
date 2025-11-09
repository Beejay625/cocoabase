"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { usePlantationsStore } from "@/store/plantations";
import { useEngagementStore } from "@/store/engagement";

export default function ReportingDashboard() {
  const plantations = usePlantationsStore((state) => state.plantations);
  const receipts = useEngagementStore((state) => state.receipts);
  const complaints = useEngagementStore((state) => state.complaints);
  const loans = useEngagementStore((state) => state.loans);

  const reportMetrics = useMemo(() => {
    const totalPlantations = plantations.length;
    const harvested = plantations.filter((p) => p.stage === "harvested").length;
    const growing = plantations.filter((p) => p.stage === "growing").length;
    const totalCarbon = plantations.reduce(
      (acc, p) => acc + p.carbonOffsetTons,
      0
    );
    const totalTrees = plantations.reduce((acc, p) => acc + p.treeCount, 0);
    const totalArea = plantations.reduce(
      (acc, p) => acc + p.areaHectares,
      0
    );

    const totalReceipts = receipts.length;
    const totalReceiptAmount = receipts.reduce((acc, r) => acc + r.amount, 0);
    const openComplaints = complaints.filter(
      (c) => c.status === "open" || c.status === "in_progress"
    ).length;
    const pendingLoans = loans.filter((l) => l.status === "pending").length;

    return {
      plantations: {
        total: totalPlantations,
        harvested,
        growing,
        planted: totalPlantations - harvested - growing,
      },
      sustainability: {
        carbon: totalCarbon,
        trees: totalTrees,
        area: totalArea,
      },
      financial: {
        receipts: totalReceipts,
        totalAmount: totalReceiptAmount,
        currency: receipts[0]?.currency || "USD",
      },
      engagement: {
        openComplaints,
        pendingLoans,
      },
    };
  }, [plantations, receipts, complaints, loans]);

  const generateReport = (type: "summary" | "financial" | "sustainability") => {
    const reportData = {
      type,
      generatedAt: new Date().toISOString(),
      metrics: reportMetrics,
      plantations: plantations.map((p) => ({
        id: p.id,
        seedName: p.seedName,
        location: p.location,
        stage: p.stage,
        treeCount: p.treeCount,
        areaHectares: p.areaHectares,
        carbonOffsetTons: p.carbonOffsetTons,
      })),
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cocoa-report-${type}-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-cream-200 bg-gradient-to-br from-indigo-50/80 to-purple-50/80 p-6 shadow-sm backdrop-blur"
    >
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-cocoa-900">
          Reporting Dashboard
        </h2>
        <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
          Generate comprehensive reports
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-indigo-200 bg-white/90 p-4 shadow-sm">
          <div className="mb-2 text-xs uppercase tracking-[0.2em] text-cocoa-400">
            Plantations
          </div>
          <div className="text-2xl font-bold text-indigo-700">
            {reportMetrics.plantations.total}
          </div>
          <div className="mt-2 flex gap-2 text-xs text-cocoa-500">
            <span>{reportMetrics.plantations.harvested} harvested</span>
            <span>•</span>
            <span>{reportMetrics.plantations.growing} growing</span>
          </div>
        </div>

        <div className="rounded-2xl border border-purple-200 bg-white/90 p-4 shadow-sm">
          <div className="mb-2 text-xs uppercase tracking-[0.2em] text-cocoa-400">
            Carbon Offset
          </div>
          <div className="text-2xl font-bold text-purple-700">
            {reportMetrics.sustainability.carbon.toFixed(1)} tCO₂
          </div>
          <div className="mt-2 text-xs text-cocoa-500">
            {reportMetrics.sustainability.trees.toLocaleString()} trees
          </div>
        </div>

        <div className="rounded-2xl border border-pink-200 bg-white/90 p-4 shadow-sm">
          <div className="mb-2 text-xs uppercase tracking-[0.2em] text-cocoa-400">
            Financial
          </div>
          <div className="text-2xl font-bold text-pink-700">
            {reportMetrics.financial.receipts}
          </div>
          <div className="mt-2 text-xs text-cocoa-500">
            {new Intl.NumberFormat(undefined, {
              style: "currency",
              currency: reportMetrics.financial.currency,
            }).format(reportMetrics.financial.totalAmount)}
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <button
          type="button"
          onClick={() => generateReport("summary")}
          className="rounded-xl border border-indigo-300 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100"
        >
          📊 Summary Report
        </button>
        <button
          type="button"
          onClick={() => generateReport("financial")}
          className="rounded-xl border border-purple-300 bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700 transition hover:bg-purple-100"
        >
          💰 Financial Report
        </button>
        <button
          type="button"
          onClick={() => generateReport("sustainability")}
          className="rounded-xl border border-green-300 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-100"
        >
          🌍 Sustainability Report
        </button>
      </div>
    </motion.section>
  );
}
