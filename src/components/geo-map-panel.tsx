"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  geoNaturalEarth1,
  geoPath,
  type GeoPath,
  type GeoProjection,
} from "d3-geo";
import { feature } from "topojson-client";
import type { Feature, FeatureCollection } from "geojson";
import type { Plantation } from "@/store/plantations";
import {
  buildAnalyticsSnapshot,
  type AnalyticsSnapshot,
  type GeoPlantationPoint,
} from "@/lib/analytics";
import { cn } from "@/lib/cn";

type GeoMapPanelProps = {
  plantations: Plantation[];
  snapshot?: AnalyticsSnapshot;
};

type Topology = {
  objects: Record<string, unknown>;
  [key: string]: unknown;
};

const MAP_WIDTH = 800;
const MAP_HEIGHT = 420;

const colorByStage: Record<Plantation["stage"], string> = {
  planted: "#9CE26F",
  growing: "#6DBE45",
  harvested: "#C79A5C",
};

function GeoMapPanelBase({ plantations, snapshot }: GeoMapPanelProps) {
  const analytics = useMemo(
    () => snapshot ?? buildAnalyticsSnapshot(plantations),
    [plantations, snapshot]
  );

  const [geoData, setGeoData] = useState<FeatureCollection | null>(null);
  const [projection, setProjection] = useState<GeoProjection | null>(null);
  const [pathGenerator, setPathGenerator] = useState<GeoPath | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadMap = async () => {
      try {
        const topologyModule = await import(
          "world-atlas/countries-110m.json"
        );
        if (!mounted) return;

        const topology = topologyModule.default as Topology;
        const countries = feature(
          topology as never,
          (topology.objects.countries ?? topology.objects.ne_110m_admin_0_countries) as never
        ) as FeatureCollection;

        const proj = geoNaturalEarth1()
          .fitSize([MAP_WIDTH, MAP_HEIGHT], countries)
          .precision(0.1);
        const path = geoPath(proj);

        setGeoData(countries);
        setProjection(proj);
        setPathGenerator(path);
      } catch (error) {
        console.error("Failed to load world map", error);
      }
    };

    void loadMap();

    return () => {
      mounted = false;
    };
  }, []);

  const clusters = analytics.geoClusters;
  const highlightedRegions = analytics.sustainability.perRegion.slice(0, 3);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="overflow-hidden rounded-3xl border border-cream-200 bg-gradient-to-br from-leaf-200/50 via-cream-50 to-gold-100/60 shadow-sm shadow-cocoa-900/5 backdrop-blur"
    >
      <div className="flex flex-col gap-6 p-6 lg:flex-row">
        <div className="w-full flex-1">
          <header className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-cocoa-900">
                Global Footprint
              </h2>
              <p className="text-xs uppercase tracking-[0.25em] text-cocoa-500">
                Plantation map & canopy clusters
              </p>
            </div>
            <span className="text-xs text-cocoa-600">
              {clusters.length} mapped plantations
            </span>
          </header>

          <div className="relative mt-5 overflow-hidden rounded-3xl border border-cream-200 bg-white/75 p-3 shadow-inner shadow-cocoa-900/5">
            {geoData && projection && pathGenerator ? (
              <svg
                viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
                className="h-[280px] w-full"
              >
                <g>
                  {geoData.features.map((featureItem: Feature, index) => (
                    <path
                      key={`country-${index}`}
                      d={pathGenerator(featureItem) ?? ""}
                      className="fill-cream-100 stroke-cocoa-200 stroke-[0.3]"
                      opacity={0.65}
                    />
                  ))}
                </g>
                <g>
                  {clusters.map((cluster) => {
                    const [x, y] = projection?.([
                      cluster.coordinates.longitude,
                      cluster.coordinates.latitude,
                    ]) ?? [0, 0];

                    const radius = Math.min(
                      18,
                      Math.max(
                        6,
                        Math.sqrt(cluster.treeCount) / 1.8
                      )
                    );

                    return (
                      <g key={cluster.id} transform={`translate(${x}, ${y})`}>
                        <circle
                          r={radius}
                          className="fill-white/80"
                          opacity={0.9}
                        />
                        <circle
                          r={radius - 2}
                          fill={colorByStage[cluster.stage]}
                          className="shadow-lg"
                          opacity={0.9}
                        />
                      </g>
                    );
                  })}
                </g>
              </svg>
            ) : (
              <div className="flex h-[280px] items-center justify-center text-sm text-cocoa-500">
                Loading canopy map…
              </div>
            )}
          </div>
        </div>

        <aside className="w-full max-w-sm space-y-4 rounded-3xl border border-cream-200 bg-white/80 p-5 shadow-inner shadow-cocoa-900/5">
          <h3 className="text-sm font-semibold text-cocoa-900">
            Regional Leaders
          </h3>
          <ul className="space-y-3">
            {highlightedRegions.map((region) => (
              <li
                key={region.region}
                className="rounded-2xl border border-cream-200 bg-cream-50/80 px-4 py-3 text-sm text-cocoa-700"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-cocoa-900">
                    {region.region || "Unspecified region"}
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] text-cocoa-400">
                    {region.carbonOffsetTons.toLocaleString()} tCO₂
                  </span>
                </div>
                <p className="mt-2 text-xs text-cocoa-500">
                  {region.treeCount.toLocaleString()} trees contributing to
                  canopy.
                </p>
              </li>
            ))}
          </ul>
          {clusters.length > 0 && (
            <div className="rounded-2xl border border-leaf-200 bg-leaf-100/60 px-4 py-3 text-xs text-leaf-900">
              <p>
                <span className="font-semibold">
                  {
                    new Set(
                      clusters.map((cluster) => cluster.region ?? "Unspecified")
                    ).size
                  }
                </span>{" "}
                regions actively reporting canopy and carbon offsets.
              </p>
            </div>
          )}
        </aside>
      </div>
    </motion.section>
  );
}

const GeoMapPanel = memo(GeoMapPanelBase);

export default GeoMapPanel;


