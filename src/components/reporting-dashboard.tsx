"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { usePlantationsStore } from "@/store/plantations";
import { useFinancialStore } from "@/store/financial";
import { useInventoryStore } from "@/store/inventory";
import { useQualityControlStore } from "@/store/quality-control";
import { buildAnalyticsSnapshot } from "@/lib/analytics";

export default function ReportingDashboard() {
  const plantations = usePlantationsStore((state) => state.plantations);
  const transactions = useFinancialStore((state) => state.transactions);
  const inventory = useInventoryStore((state) => state.items);
  const qualityTests = useQualityControlStore((state) => state.tests);

  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const analyticsSnapshot = buildAnalyticsSnapshot(plantations);

  const reports = [
    {
      id: "plantation-summary",
      title: "Plantation Summary",
      description: "Overview of all plantations with key metrics",
      icon: "🌱",
    },
    {
      id: "financial-summary",
      title: "Financial Summary",
      description: "Revenue, expenses, and profit analysis",
      icon: "💰",
    },
    {
      id: "inventory-report",
      title: "Inventory Report",
      description: "Stock levels and inventory health",
      icon: "📦",
    },
    {
      id: "quality-report",
      title: "Quality Report",
      description: "Quality test results and grading analysis",
      icon: "⭐",
    },
    {
      id: "sustainability-report",
      title: "Sustainability Report",
      description: "Carbon offset and environmental impact",
      icon: "🌍",
    },
  ];

  const generateReport = (reportId: string) => {
    switch (reportId) {
      case "plantation-summary":
        return {
          totalPlantations: plantations.length,
          byStage: {
            planted: plantations.filter((p) => p.stage === "planted").length,
            growing: plantations.filter((p) => p.stage === "growing").length,
            harvested: plantations.filter((p) => p.stage === "harvested").length,
          },
          totalTrees: plantations.reduce((sum, p) => sum + p.treeCount, 0),
          totalArea: plantations.reduce((sum, p) => sum + p.areaHectares, 0),
          totalCarbon: plantations.reduce(
            (sum, p) => sum + p.carbonOffsetTons,
            0
          ),
        };
      case "financial-summary":
        const revenue = transactions
          .filter((t) => t.type === "revenue")
          .reduce((sum, t) => sum + t.amount, 0);
        const expenses = transactions
          .filter((t) => t.type === "expense")
          .reduce((sum, t) => sum + t.amount, 0);
        return {
          totalRevenue: revenue,
          totalExpenses: expenses,
          netProfit: revenue - expenses,
          transactionCount: transactions.length,
          byCategory: transactions.reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + t.amount;
            return acc;
          }, {} as Record<string, number>),
        };
      case "inventory-report":
        return {
          totalItems: inventory.length,
          lowStock: inventory.filter((i) => i.quantity <= 10).length,
          byCategory: inventory.reduce((acc, i) => {
            acc[i.category] = (acc[i.category] || 0) + 1;
            return acc;
          }, {} as Record<string, number>),
          totalValue: inventory.reduce(
            (sum, i) => sum + i.quantity * i.unitPrice,
            0
          ),
        };
      case "quality-report":
        return {
          totalTests: qualityTests.length,
          averageGrade: qualityTests.reduce((acc, t) => {
            const gradeValues: Record<string, number> = {
              premium: 4,
              grade_a: 3,
              grade_b: 2,
              reject: 1,
            };
            return acc + (gradeValues[t.grade] || 0);
          }, 0) / qualityTests.length || 0,
          byGrade: qualityTests.reduce((acc, t) => {
            acc[t.grade] = (acc[t.grade] || 0) + 1;
            return acc;
          }, {} as Record<string, number>),
        };
      case "sustainability-report":
        return {
          totalCarbonOffset: analyticsSnapshot.sustainabilityTotals
            .carbonOffsetTons,
          totalTrees: analyticsSnapshot.sustainabilityTotals.treeCount,
          totalArea: plantations.reduce((sum, p) => sum + p.areaHectares, 0),
          carbonPerTree:
            analyticsSnapshot.sustainabilityTotals.carbonOffsetTons /
            analyticsSnapshot.sustainabilityTotals.treeCount || 0,
        };
      default:
        return null;
    }
  };

  const reportData = selectedReport ? generateReport(selectedReport) : null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 }}
      className="rounded-3xl border border-cocoa-800/60 bg-[#101f3c]/80 p-6 text-slate-100 shadow-xl shadow-black/20 backdrop-blur"
    >
      <header className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Reporting dashboard
          </h2>
          <p className="text-sm text-slate-300/80">
            Generate comprehensive reports and analytics.
          </p>
        </div>
      </header>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <button
            key={report.id}
            type="button"
            onClick={() =>
              setSelectedReport(
                selectedReport === report.id ? null : report.id
              )
            }
            className={cn(
              "rounded-2xl border p-4 text-left transition",
              selectedReport === report.id
                ? "border-leaf-400/60 bg-leaf-500/10"
                : "border-slate-700/40 bg-slate-900/50 hover:border-slate-500/60"
            )}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{report.icon}</span>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-white">
                  {report.title}
                </h3>
                <p className="mt-1 text-xs text-slate-300/70">
                  {report.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {reportData && selectedReport && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-6 rounded-2xl border border-slate-700/40 bg-slate-900/50 p-6"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">
              {reports.find((r) => r.id === selectedReport)?.title}
            </h3>
            <button
              type="button"
              onClick={() => {
                const dataStr = JSON.stringify(reportData, null, 2);
                const blob = new Blob([dataStr], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = `${selectedReport}-${new Date().toISOString().split("T")[0]}.json`;
                link.click();
              }}
              className="rounded-full bg-leaf-500 px-4 py-2 text-xs font-semibold text-slate-950 shadow-lg transition hover:bg-leaf-400"
            >
              Export JSON
            </button>
          </div>
          <pre className="overflow-x-auto rounded-xl border border-slate-700/40 bg-slate-950/60 p-4 text-xs text-slate-200">
            {JSON.stringify(reportData, null, 2)}
          </pre>
        </motion.div>
      )}
    </motion.section>
  );
}

