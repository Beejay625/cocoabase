"use client";

import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import type {
  GeoPlantationPoint,
  RegionGeoMetric,
} from "@/lib/analytics";
import { cn } from "@/lib/cn";

type GeoInsightsPanelProps = {
  metrics: RegionGeoMetric[];
  clusters: GeoPlantationPoint[];
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const buildHeatColor = (value: number, max: number) => {
  if (max <= 0) {
    return "rgba(18, 94, 41, 0.15)";
  }
  const intensity = clamp(value / max, 0.08, 1);
  return `rgba(18, 94, 41, ${intensity})`;
};

const buildCarbonColor = (value: number, max: number) => {
  if (max <= 0) {
    return "rgba(199, 154, 92, 0.15)";
  }
  const intensity = clamp(value / max, 0.12, 1);
  return `rgba(199, 154, 92, ${intensity})`;
};

const GeoInsightsPanelBase = ({
  metrics,
  clusters,
}: GeoInsightsPanelProps) => {
  const topMetrics = metrics.slice(0, 8);
  const topClusters = useMemo(
    () =>
      clusters
        .slice()
        .sort(
          (a, b) => b.carbonOffsetTons - a.carbonOffsetTons || a.seedName.localeCompare(b.seedName)
        )
        .slice(0, 5),
    [clusters]
  );

  const maxTree = useMemo(
    () =>
      topMetrics.reduce(
        (acc, metric) => Math.max(acc, metric.treeCount),
        0
      ),
    [topMetrics]
  );

  const maxCarbon = useMemo(
    () =>
      topMetrics.reduce(
        (acc, metric) => Math.max(acc, metric.carbonOffsetTons),
        0
      ),
    [topMetrics]
  );

  if (!metrics.length) {
    return null;
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1.8fr,1fr]">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="relative overflow-hidden rounded-3xl border border-cream-200 bg-gradient-to-br from-cream-100 via-cream-50 to-white/60 p-5 shadow-sm shadow-cocoa-900/5 backdrop-blur"
      >
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-cocoa-900">
              Geo Insights Heatmap
            </h2>
            <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
              Regions • Yield • Collaborators
            </p>
          </div>
          <span className="text-xs text-cocoa-500">
            {metrics.length} geo clusters analysed
          </span>
        </header>

        <div className="relative mt-6 rounded-3xl border border-cream-200 bg-cocoa-950/5 p-4">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {topMetrics.map((metric, index) => (
              <motion.div
                key={metric.region}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + index * 0.03 }}
                className="relative overflow-hidden rounded-2xl border border-cream-200 bg-white/85 p-4 shadow-sm"
              >
                <span className="text-xs uppercase tracking-[0.3em] text-cocoa-400">
                  {metric.region}
                </span>
                <p className="mt-2 text-2xl font-semibold text-cocoa-900">
                  {metric.treeCount.toLocaleString()} trees
                </p>
                <p className="text-xs text-cocoa-500">
                  {metric.plantationCount} plantations •{" "}
                  {metric.collaboratorCount} collaborators
                </p>

                <div className="mt-3 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-cocoa-600">
                    <span>Carbon offset</span>
                    <span className="font-semibold text-cocoa-900">
                      {metric.carbonOffsetTons.toLocaleString()} tCO₂
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-cream-200">
                    <span
                      className="block h-1.5 rounded-full"
                      style={{
                        width: `${clamp(
                          (metric.carbonOffsetTons / (maxCarbon || 1)) * 100,
                          8,
                          100
                        )}%`,
                        backgroundColor: buildCarbonColor(
                          metric.carbonOffsetTons,
                          maxCarbon || 1
                        ),
                      }}
                    />
                  </div>
                  <div className="h-8 rounded-2xl bg-gradient-to-r from-white via-transparent to-white/60" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-[radial-gradient(circle_at_top_right,rgba(111,190,69,0.25),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(199,154,92,0.2),transparent_55%)]" />
        </div>
      </motion.div>

      <motion.aside
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
        className="flex flex-col gap-4 rounded-3xl border border-cream-200 bg-white/90 p-5 shadow-inner shadow-cocoa-900/5 backdrop-blur"
      >
        <header>
          <h3 className="text-sm font-semibold text-cocoa-900">
            Carbon Hotspots
          </h3>
          <p className="text-xs text-cocoa-500">
            Leading plantations by current offset contribution
          </p>
        </header>

        <ul className="space-y-3 text-sm text-cocoa-700">
          {topClusters.map((cluster, index) => (
            <li
              key={cluster.id}
              className="flex items-start justify-between rounded-2xl border border-cream-200 bg-cream-50/80 px-3 py-2 shadow-sm"
            >
              <div>
                <p className="font-semibold text-cocoa-900">
                  {cluster.seedName}
                </p>
                <p className="text-xs text-cocoa-500">
                  {cluster.region ?? "Unknown region"} • Stage:{" "}
                  {cluster.stage}
                </p>
              </div>
              <div className="text-right text-xs">
                <span className="block font-semibold text-cocoa-900">
                  {cluster.carbonOffsetTons.toLocaleString()} t
                </span>
                <span className="text-cocoa-500">
                  {cluster.treeCount.toLocaleString()} trees
                </span>
              </div>
            </li>
          ))}
          {topClusters.length === 0 ? (
            <li className="rounded-2xl bg-cream-50/80 px-3 py-2 text-xs text-cocoa-500 shadow-inner">
              No plantation coordinates provided yet. Add geo data to unlock
              hotspot insights.
            </li>
          ) : null}
        </ul>

        <div className="rounded-2xl border border-cream-200 bg-cream-100/70 p-3 text-xs text-cocoa-600">
          <p>
            Heat intensity reflects tree density across regions. Carbon hover
            states show offset contributions for quick prioritisation.
          </p>
        </div>
      </motion.aside>
    </section>
  );
};

const GeoInsightsPanel = memo(GeoInsightsPanelBase);

export default GeoInsightsPanel;


