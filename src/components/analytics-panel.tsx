"use client";

import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import type { Plantation } from "@/store/plantations";
import {
  buildAnalyticsSnapshot,
  type AnalyticsSnapshot,
} from "@/lib/analytics";
import { cn } from "@/lib/cn";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Filler
);

type AnalyticsPanelProps = {
  plantations: Plantation[];
  highlightedCount: number;
  snapshot?: AnalyticsSnapshot;
};

const stageLabels: Record<string, string> = {
  planted: "Planted",
  growing: "Growing",
  harvested: "Harvested",
};

const stageColors: Record<string, string> = {
  planted: "#9CE26F",
  growing: "#F4C95F",
  harvested: "#C79A5C",
};

function AnalyticsPanelBase({
  plantations,
  highlightedCount,
  snapshot: providedSnapshot,
}: AnalyticsPanelProps) {
  const snapshot = useMemo(
    () => providedSnapshot ?? buildAnalyticsSnapshot(plantations),
    [plantations, providedSnapshot]
  );

  const stageData = useMemo(() => {
    const labels = snapshot.stageBreakdown.map(
      (item) => stageLabels[item.stage] ?? item.stage
    );
    return {
      labels,
      datasets: [
        {
          data: snapshot.stageBreakdown.map((item) => item.count),
          backgroundColor: snapshot.stageBreakdown.map(
            (item) => stageColors[item.stage] ?? "#D4C2AF"
          ),
          borderWidth: 0,
        },
      ],
    };
  }, [snapshot.stageBreakdown]);

  const monthlyData = useMemo(
    () => ({
      labels: snapshot.monthlyPoints.map((point) => point.label),
      datasets: [
        {
          label: "Planted",
          data: snapshot.monthlyPoints.map((point) => point.planted),
          borderColor: "#6DBE45",
          backgroundColor: "rgba(109, 190, 69, 0.25)",
          fill: true,
          tension: 0.4,
        },
        {
          label: "Harvested",
          data: snapshot.monthlyPoints.map((point) => point.harvested),
          borderColor: "#D69A3A",
          backgroundColor: "rgba(214, 154, 58, 0.2)",
          fill: true,
          tension: 0.4,
        },
      ],
    }),
    [snapshot.monthlyPoints]
  );

  return (
    <section className="grid gap-6 lg:grid-cols-5">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="rounded-3xl border border-cream-200 bg-cream-50/80 p-5 shadow-sm shadow-cocoa-900/5 backdrop-blur lg:col-span-2"
      >
        <header className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-cocoa-900">
              Growth Overview
            </h2>
            <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
              Stage distribution
            </p>
          </div>
          <span className="text-xs text-cocoa-400">
            Updated {new Date(snapshot.lastUpdated).toLocaleTimeString()}
          </span>
        </header>

        <div className="mt-6 flex flex-col items-center gap-6">
          <div className="h-44 w-44">
            <Doughnut
              data={stageData}
              options={{
                cutout: "65%",
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    callbacks: {
                      label: (context) =>
                        `${context.label}: ${context.parsed} plantations`,
                    },
                  },
                },
              }}
            />
          </div>
          <ul className="grid w-full gap-3 text-sm">
            {snapshot.stageBreakdown.map((item) => (
              <li
                key={item.stage}
                className="flex items-center justify-between rounded-2xl bg-white/80 px-4 py-2 text-cocoa-700 shadow-sm"
              >
                <span className="flex items-center gap-3">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor:
                        stageColors[item.stage] ?? "rgba(0,0,0,0.1)",
                    }}
                  />
                  {stageLabels[item.stage] ?? item.stage}
                </span>
                <span className="font-semibold">
                  {item.count} ({item.percentage}%)
                </span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
        className="rounded-3xl border border-cream-200 bg-cream-50/80 p-5 shadow-sm shadow-cocoa-900/5 backdrop-blur lg:col-span-3"
      >
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-cocoa-900">
              Monthly Velocity
            </h2>
            <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
              Seeds planted vs harvested
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs text-cocoa-500">
            <span>
              Active selection:{" "}
              <span className="font-semibold text-cocoa-800">
                {highlightedCount} plantations
              </span>
            </span>
            {snapshot.averageDaysToHarvest && (
              <span>
                Avg. seed → harvest:{" "}
                <span className="font-semibold text-cocoa-800">
                  {snapshot.averageDaysToHarvest} days
                </span>
              </span>
            )}
          </div>
        </header>

        <div className="mt-4 h-60 w-full">
          <Line
            data={monthlyData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  ticks: { precision: 0 },
                  grid: { color: "rgba(79, 59, 31, 0.08)" },
                },
                x: {
                  grid: { display: false },
                },
              },
              plugins: {
                legend: {
                  labels: { usePointStyle: true },
                  position: "bottom",
                },
                tooltip: {
                  callbacks: {
                    title: (items) => items[0]?.label ?? "",
                    label: (context) =>
                      `${context.dataset.label}: ${context.formattedValue}`,
                  },
                },
              },
            }}
          />
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-2">
          <div className="rounded-2xl bg-white/75 p-3 text-sm text-cocoa-700 shadow-sm">
            <h3 className="text-xs uppercase tracking-[0.3em] text-cocoa-400">
              Hotspots
            </h3>
            <ul className="mt-2 space-y-1">
              {snapshot.activeRegions.map((region) => (
                <li
                  key={region.region}
                  className="flex items-center justify-between text-sm"
                >
                  <span>{region.region}</span>
                  <span className="font-semibold text-cocoa-900">
                    {region.count}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-leaf-300/40 via-cream-100 to-gold-200/60 p-3 text-sm text-cocoa-800 shadow-inner">
            <h3 className="text-xs uppercase tracking-[0.3em] text-cocoa-500">
              Momentum
            </h3>
            <p className="mt-2 text-sm">
              {snapshot.averageDaysToHarvest
                ? `On average, seeds are reaching harvest in ${
                    snapshot.averageDaysToHarvest
                  } days. Keep nurturing for even faster cycles!`
                : "Nurture your crops to unlock harvest insights."}
            </p>
            <p className={cn("mt-3 text-xs text-cocoa-500")}>
              Tracking {snapshot.total} total plantations.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

const AnalyticsPanel = memo(AnalyticsPanelBase);

export default AnalyticsPanel;

