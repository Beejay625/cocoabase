"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import {
  useAlertsStore,
  type AlertChannel,
} from "@/store/alerts";

export default function NotificationPreferences() {
  const preferences = useAlertsStore((state) => state.preferences);
  const setChannelPreference = useAlertsStore(
    (state) => state.setChannelPreference
  );

  const [isOpen, setIsOpen] = useState(false);

  const channelLabels: Record<AlertChannel, string> = {
    in_app: "In-app notifications",
    email: "Email notifications",
    sms: "SMS notifications",
  };

  const channelIcons: Record<AlertChannel, string> = {
    in_app: "🔔",
    email: "📧",
    sms: "💬",
  };


  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-full border border-slate-600/40 bg-slate-900/60 px-3 py-1.5 text-xs font-semibold text-slate-200/90 transition hover:border-slate-400/60 hover:text-white"
      >
        <span>⚙️</span>
        <span className="hidden sm:inline">Notifications</span>
      </button>

      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-[10000] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2"
          >
            <div className="mx-4 max-h-[80vh] overflow-y-auto rounded-2xl border border-slate-700/60 bg-[#101f3c] p-6 text-slate-100 shadow-2xl shadow-black/40">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Notification preferences
                  </h2>
                  <p className="mt-1 text-sm text-slate-300/80">
                    Choose how you want to receive alerts and updates.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full bg-slate-800/70 px-3 py-1 text-xs font-semibold text-slate-200/90 transition hover:bg-slate-700/80"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-slate-300/70">
                    Notification channels
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(channelLabels).map(([channel, label]) => {
                      const isEnabled = preferences.channels[channel as AlertChannel];
                      return (
                        <div
                          key={channel}
                          className="flex items-center justify-between rounded-xl border border-slate-700/40 bg-slate-900/50 p-4"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">
                              {channelIcons[channel as AlertChannel]}
                            </span>
                            <div>
                              <p className="text-sm font-semibold text-white">
                                {label}
                              </p>
                              <p className="text-xs text-slate-300/70">
                                {channel === "in_app" &&
                                  "Show notifications in the app"}
                                {channel === "email" &&
                                  "Send alerts to your email address"}
                                {channel === "sms" &&
                                  "Receive text message alerts"}
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setChannelPreference(
                                channel as AlertChannel,
                                !isEnabled
                              )
                            }
                            className={cn(
                              "relative h-6 w-11 rounded-full transition",
                              isEnabled ? "bg-leaf-500" : "bg-slate-700"
                            )}
                          >
                            <span
                              className={cn(
                                "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition",
                                isEnabled && "translate-x-5"
                              )}
                            />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
}

