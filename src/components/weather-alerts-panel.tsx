"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import {
  useWeatherAlertStore,
  type WeatherAlert,
  type WeatherAlertType,
} from "@/store/weather-alerts";
import { usePlantationsStore } from "@/store/plantations";

export default function WeatherAlertsPanel() {
  const alerts = useWeatherAlertStore((state) => state.alerts);
  const addAlert = useWeatherAlertStore((state) => state.addAlert);
  const acknowledgeAlert = useWeatherAlertStore(
    (state) => state.acknowledgeAlert
  );
  const getActiveAlerts = useWeatherAlertStore(
    (state) => state.getActiveAlerts
  );
  const plantations = usePlantationsStore((state) => state.plantations);

  const [filter, setFilter] = useState<"all" | "active" | "acknowledged">(
    "active"
  );

  const activeAlerts = getActiveAlerts();
  const filteredAlerts =
    filter === "active"
      ? activeAlerts
      : filter === "acknowledged"
      ? alerts.filter((a) => a.acknowledged)
      : alerts;

  useEffect(() => {
    const mockAlerts: WeatherAlert[] = [
      {
        id: "wa_1",
        type: "rain",
        severity: "high",
        location: "Ashanti, Ghana",
        title: "Heavy rainfall expected",
        description:
          "Heavy rainfall (50-80mm) expected over the next 48 hours. May affect harvest operations.",
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        impact: "Harvest delays possible",
        recommendations: [
          "Postpone harvest if possible",
          "Ensure proper drainage",
          "Protect stored produce",
        ],
        acknowledged: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: "wa_2",
        type: "drought",
        severity: "medium",
        location: "Kumasi, Ghana",
        title: "Extended dry period",
        description:
          "No significant rainfall expected for the next 7 days. Irrigation may be needed.",
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        impact: "Water stress on crops",
        recommendations: [
          "Increase irrigation frequency",
          "Monitor soil moisture",
          "Consider mulching",
        ],
        acknowledged: false,
        createdAt: new Date().toISOString(),
      },
    ];

    if (alerts.length === 0) {
      mockAlerts.forEach((alert) => addAlert(alert));
    }
  }, [alerts.length, addAlert]);

  const getSeverityColor = (severity: WeatherAlert["severity"]) => {
    switch (severity) {
      case "critical":
        return "border-rose-500/60 bg-rose-500/20 text-rose-300";
      case "high":
        return "border-amber-500/60 bg-amber-500/20 text-amber-300";
      case "medium":
        return "border-blue-500/60 bg-blue-500/20 text-blue-300";
      case "low":
        return "border-slate-500/60 bg-slate-500/20 text-slate-300";
    }
  };

  const getTypeIcon = (type: WeatherAlertType) => {
    switch (type) {
      case "rain":
        return "🌧️";
      case "drought":
        return "☀️";
      case "storm":
        return "⛈️";
      case "frost":
        return "❄️";
      case "heat":
        return "🔥";
      case "wind":
        return "💨";
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 }}
      className="rounded-3xl border border-cocoa-800/60 bg-[#101f3c]/80 p-6 text-slate-100 shadow-xl shadow-black/20 backdrop-blur"
    >
      <header className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Weather alerts</h2>
          <p className="text-sm text-slate-300/80">
            Proactive weather warnings for your plantation locations.
          </p>
        </div>
        <div className="flex gap-2">
          {(["all", "active", "acknowledged"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold transition",
                filter === f
                  ? "bg-leaf-500/20 text-leaf-300 border border-leaf-400/40"
                  : "bg-slate-800/80 text-slate-300/70 hover:bg-slate-700/80"
              )}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </header>

      {activeAlerts.length > 0 && filter === "active" && (
        <div className="mt-4 rounded-xl border border-amber-500/40 bg-amber-500/10 p-3">
          <p className="text-sm font-semibold text-amber-300">
            ⚠️ {activeAlerts.length} active weather alert(s) require attention
          </p>
        </div>
      )}

      <div className="mt-6 space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="rounded-2xl border border-slate-700/40 bg-slate-900/50 p-8 text-center">
            <p className="text-sm text-slate-300/80">
              No weather alerts at this time.
            </p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={cn(
                "rounded-2xl border p-4",
                getSeverityColor(alert.severity)
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getTypeIcon(alert.type)}</span>
                    <div>
                      <h3 className="text-sm font-semibold text-white">
                        {alert.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-300/70">
                        {alert.location} •{" "}
                        {new Date(alert.startDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-slate-200/90">
                    {alert.description}
                  </p>
                  {alert.impact && (
                    <p className="mt-2 text-xs font-semibold text-slate-200/80">
                      Impact: {alert.impact}
                    </p>
                  )}
                  {alert.recommendations && alert.recommendations.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs font-semibold text-slate-200/80">
                        Recommendations:
                      </p>
                      <ul className="mt-1 space-y-1">
                        {alert.recommendations.map((rec, idx) => (
                          <li
                            key={idx}
                            className="text-xs text-slate-200/70"
                          >
                            • {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                {!alert.acknowledged && (
                  <button
                    type="button"
                    onClick={() => acknowledgeAlert(alert.id)}
                    className="ml-2 rounded-full bg-slate-800/70 px-3 py-1 text-xs font-semibold text-slate-200/90 transition hover:bg-slate-700/80"
                  >
                    Acknowledge
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </motion.section>
  );
}

