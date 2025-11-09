"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import NotificationPreferences from "./notification-preferences";
import DataManagementPanel from "./data-management-panel";
import type { Plantation } from "@/store/plantations";

type SettingsPanelProps = {
  plantations: Plantation[];
  isOpen: boolean;
  onClose: () => void;
};

type SettingsTab = "general" | "notifications" | "data" | "appearance";

export default function SettingsPanel({
  plantations,
  isOpen,
  onClose,
}: SettingsPanelProps) {
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");

  const tabs: Array<{ id: SettingsTab; label: string; icon: string }> = [
    { id: "general", label: "General", icon: "⚙️" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "data", label: "Data", icon: "💾" },
    { id: "appearance", label: "Appearance", icon: "🎨" },
  ];

  if (!isOpen) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            className="fixed right-0 top-0 z-[10000] h-full w-full max-w-2xl overflow-y-auto bg-[#101f3c] text-slate-100 shadow-2xl shadow-black/40"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-700/40 bg-[#101f3c] p-6">
              <h2 className="text-xl font-semibold text-white">Settings</h2>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-slate-800/70 p-2 text-slate-200/90 transition hover:bg-slate-700/80"
              >
                ✕
              </button>
            </div>

            <div className="flex">
              <aside className="w-48 border-r border-slate-700/40 p-4">
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "w-full rounded-xl px-4 py-2 text-left text-sm font-semibold transition",
                        activeTab === tab.id
                          ? "bg-leaf-500/20 text-leaf-300"
                          : "text-slate-300/70 hover:bg-slate-900/50 hover:text-white"
                      )}
                    >
                      <span className="mr-2">{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </aside>

              <div className="flex-1 p-6">
                {activeTab === "general" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        General settings
                      </h3>
                      <p className="mt-1 text-sm text-slate-300/80">
                        Configure your account and application preferences.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="rounded-xl border border-slate-700/40 bg-slate-900/50 p-4">
                        <label className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold text-white">
                              Auto-save changes
                            </p>
                            <p className="text-xs text-slate-300/70">
                              Automatically save changes to localStorage
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            defaultChecked
                            className="rounded border-slate-600/40 bg-slate-950/60 text-leaf-500 focus:ring-2 focus:ring-leaf-400/40"
                          />
                        </label>
                      </div>
                      <div className="rounded-xl border border-slate-700/40 bg-slate-900/50 p-4">
                        <label className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold text-white">
                              Show onboarding tour
                            </p>
                            <p className="text-xs text-slate-300/70">
                              Display tour on next visit
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              localStorage.removeItem(
                                "cocoa-chain-onboarding-completed"
                              );
                              alert("Onboarding tour will show on next page refresh");
                            }}
                            className="rounded-full bg-slate-800/70 px-3 py-1 text-xs font-semibold text-slate-200/90 transition hover:bg-slate-700/80"
                          >
                            Reset
                          </button>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "notifications" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Notification preferences
                      </h3>
                      <p className="mt-1 text-sm text-slate-300/80">
                        Manage how you receive alerts and updates.
                      </p>
                    </div>
                    <NotificationPreferences />
                  </div>
                )}

                {activeTab === "data" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Data management
                      </h3>
                      <p className="mt-1 text-sm text-slate-300/80">
                        Export or import your plantation data.
                      </p>
                    </div>
                    <DataManagementPanel plantations={plantations} />
                  </div>
                )}

                {activeTab === "appearance" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Appearance
                      </h3>
                      <p className="mt-1 text-sm text-slate-300/80">
                        Customize the look and feel of the application.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="rounded-xl border border-slate-700/40 bg-slate-900/50 p-4">
                        <p className="mb-3 text-sm font-semibold text-white">
                          Theme
                        </p>
                        <div className="flex gap-3">
                          <button
                            type="button"
                            className="flex-1 rounded-xl border-2 border-leaf-400/60 bg-leaf-500/20 p-4 text-sm font-semibold text-leaf-300"
                          >
                            🌙 Dark (Current)
                          </button>
                          <button
                            type="button"
                            disabled
                            className="flex-1 rounded-xl border border-slate-700/40 bg-slate-900/60 p-4 text-sm font-semibold text-slate-400/70 opacity-50"
                          >
                            ☀️ Light (Coming soon)
                          </button>
                        </div>
                      </div>
                      <div className="rounded-xl border border-slate-700/40 bg-slate-900/50 p-4">
                        <label className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold text-white">
                              Compact mode
                            </p>
                            <p className="text-xs text-slate-300/70">
                              Reduce spacing for more content
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            className="rounded border-slate-600/40 bg-slate-950/60 text-leaf-500 focus:ring-2 focus:ring-leaf-400/40"
                          />
                        </label>
                      </div>
                      <div className="rounded-xl border border-slate-700/40 bg-slate-900/50 p-4">
                        <label className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold text-white">
                              Animations
                            </p>
                            <p className="text-xs text-slate-300/70">
                              Enable smooth transitions and animations
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            defaultChecked
                            className="rounded border-slate-600/40 bg-slate-950/60 text-leaf-500 focus:ring-2 focus:ring-leaf-400/40"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

