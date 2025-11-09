"use client";

import { memo, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useSecurityStore } from "@/store/security";
import { cn } from "@/lib/cn";

const sessionOptions = [5, 10, 15, 30, 60];

function SecurityPanelBase() {
  const settings = useSecurityStore((state) => state.settings);
  const updateSettings = useSecurityStore((state) => state.updateSettings);
  const [phishingCodeDraft, setPhishingCodeDraft] = useState<string>();

  const riskScore = useMemo(() => {
    let score = 0;
    if (!settings.transactionPinEnabled) {
      score += 2;
    }
    if (!settings.monitorThirdPartySigners) {
      score += 1;
    }
    if (!settings.networkMismatchAlerts) {
      score += 1;
    }
    if (settings.sessionTimeoutMinutes > 15) {
      score += 1;
    }
    if (!settings.phishingCode) {
      score += 1;
    }
    return score;
  }, [settings]);

  const riskLevel =
    riskScore === 0 ? "secure" : riskScore < 3 ? "caution" : "at-risk";

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 }}
      className="rounded-3xl border border-cream-200 bg-white/85 p-6 shadow-sm shadow-cocoa-900/5 backdrop-blur"
    >
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-cocoa-900">Security Hub</h2>
          <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
            Protect your cooperative
          </p>
        </div>
        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
            riskLevel === "secure" && "bg-leaf-100 text-leaf-800",
            riskLevel === "caution" && "bg-amber-100 text-amber-700",
            riskLevel === "at-risk" && "bg-rose-100 text-rose-700"
          )}
        >
          {riskLevel === "secure"
            ? "All safeguards active"
            : riskLevel === "caution"
            ? "Hardening recommended"
            : "Attention required"}
        </span>
      </header>

      <div className="mt-6 space-y-6">
        <section className="rounded-3xl border border-cream-200 bg-cream-50/80 p-4 shadow-inner shadow-cocoa-900/5">
          <h3 className="text-sm font-semibold text-cocoa-900">
            Session guardrails
          </h3>
          <p className="mt-1 text-xs text-cocoa-500">
            Auto-lock ensures unattended dashboards don’t stay open.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {sessionOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() =>
                  updateSettings({ sessionTimeoutMinutes: option })
                }
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-semibold transition",
                  settings.sessionTimeoutMinutes === option
                    ? "bg-cocoa-900 text-cream-100 shadow"
                    : "bg-white/90 text-cocoa-700 hover:bg-cream-100"
                )}
              >
                {option} min
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-cream-200 bg-cream-50/80 p-4 shadow-inner shadow-cocoa-900/5">
          <h3 className="text-sm font-semibold text-cocoa-900">
            Transaction defences
          </h3>
          <div className="mt-3 space-y-3 text-sm text-cocoa-700">
            <button
              type="button"
              onClick={() =>
                updateSettings({
                  transactionPinEnabled: !settings.transactionPinEnabled,
                })
              }
              className={cn(
                "flex w-full items-center justify-between rounded-2xl border border-cream-200 bg-white/90 px-4 py-3 text-left transition hover:border-cream-300",
                settings.transactionPinEnabled && "border-leaf-300 bg-leaf-50"
              )}
            >
              <div>
                <p className="font-semibold text-cocoa-900">
                  Require transaction PIN
                </p>
                <p className="text-xs text-cocoa-500">
                  Prompt for a passcode before initiating sensitive actions.
                </p>
              </div>
              <span
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
                  settings.transactionPinEnabled
                    ? "bg-leaf-500 text-cream-50"
                    : "bg-cream-200 text-cocoa-600"
                )}
              >
                {settings.transactionPinEnabled ? "On" : "Off"}
              </span>
            </button>

            <button
              type="button"
              onClick={() =>
                updateSettings({
                  monitorThirdPartySigners: !settings.monitorThirdPartySigners,
                })
              }
              className={cn(
                "flex w-full items-center justify-between rounded-2xl border border-cream-200 bg-white/90 px-4 py-3 text-left transition hover:border-cream-300",
                settings.monitorThirdPartySigners && "border-leaf-300 bg-leaf-50"
              )}
            >
              <div>
                <p className="font-semibold text-cocoa-900">
                  Monitor third-party signers
                </p>
                <p className="text-xs text-cocoa-500">
                  Flag approvals that originate from unverified signers.
                </p>
              </div>
              <span
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
                  settings.monitorThirdPartySigners
                    ? "bg-leaf-500 text-cream-50"
                    : "bg-cream-200 text-cocoa-600"
                )}
              >
                {settings.monitorThirdPartySigners ? "On" : "Off"}
              </span>
            </button>

            <button
              type="button"
              onClick={() =>
                updateSettings({
                  networkMismatchAlerts: !settings.networkMismatchAlerts,
                })
              }
              className={cn(
                "flex w-full items-center justify-between rounded-2xl border border-cream-200 bg-white/90 px-4 py-3 text-left transition hover:border-cream-300",
                settings.networkMismatchAlerts && "border-leaf-300 bg-leaf-50"
              )}
            >
              <div>
                <p className="font-semibold text-cocoa-900">
                  Network mismatch alerts
                </p>
                <p className="text-xs text-cocoa-500">
                  Warn when wallet and dashboard networks diverge.
                </p>
              </div>
              <span
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
                  settings.networkMismatchAlerts
                    ? "bg-leaf-500 text-cream-50"
                    : "bg-cream-200 text-cocoa-600"
                )}
              >
                {settings.networkMismatchAlerts ? "On" : "Off"}
              </span>
            </button>
          </div>
        </section>

        <section className="rounded-3xl border border-cream-200 bg-cream-50/80 p-4 shadow-inner shadow-cocoa-900/5">
          <h3 className="text-sm font-semibold text-cocoa-900">
            Anti-phishing phrase
          </h3>
          <p className="mt-1 text-xs text-cocoa-500">
            Add a phrase that must appear on all signing prompts to verify their
            authenticity.
          </p>
          <div className="mt-3 flex gap-3">
            <input
              value={phishingCodeDraft ?? settings.phishingCode ?? ""}
              onChange={(event) => setPhishingCodeDraft(event.target.value)}
              placeholder="e.g. Golden Pods 2025"
              className="flex-1 rounded-2xl border border-cream-300 bg-white/90 px-3 py-2 text-sm text-cocoa-800 shadow-inner focus:border-leaf-400 focus:outline-none focus:ring-2 focus:ring-leaf-300/60"
            />
            <button
              type="button"
              onClick={() => {
                const nextValue = (phishingCodeDraft ?? settings.phishingCode ?? "")
                  .trim();
                updateSettings({
                  phishingCode: nextValue || undefined,
                });
                setPhishingCodeDraft(undefined);
              }}
              className="rounded-full bg-cocoa-900 px-4 py-2 text-sm font-semibold text-cream-50 shadow hover:bg-cocoa-800 focus:outline-none focus:ring-2 focus:ring-cocoa-500 focus:ring-offset-2 focus:ring-offset-cream-50"
            >
              Save
            </button>
          </div>
          {!settings.phishingCode && (
            <p className="mt-2 text-xs text-amber-600">
              Set a phrase to guard against spoofed signing dialogs.
            </p>
          )}
        </section>
      </div>
    </motion.section>
  );
}

const SecurityPanel = memo(SecurityPanelBase);

export default SecurityPanel;


