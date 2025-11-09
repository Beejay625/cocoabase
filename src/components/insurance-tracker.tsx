"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import {
  useInsuranceStore,
  type InsurancePolicy,
  type InsuranceType,
} from "@/store/insurance";
import { usePlantationsStore } from "@/store/plantations";
import AnimatedCounter from "./animated-counter";

export default function InsuranceTracker() {
  const policies = useInsuranceStore((state) => state.policies);
  const addPolicy = useInsuranceStore((state) => state.addPolicy);
  const removePolicy = useInsuranceStore((state) => state.removePolicy);
  const getExpiringSoon = useInsuranceStore((state) => state.getExpiringSoon);
  const getTotalCoverage = useInsuranceStore((state) => state.getTotalCoverage);
  const plantations = usePlantationsStore((state) => state.plantations);

  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<Partial<InsurancePolicy>>({
    type: "crop",
    status: "active",
    coverageAmount: 0,
    premium: 0,
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(
      Date.now() + 365 * 24 * 60 * 60 * 1000
    ).toISOString().split("T")[0],
  });

  const expiringSoon = getExpiringSoon(30);
  const totalCoverage = getTotalCoverage();
  const totalPremium = policies
    .filter((p) => p.status === "active")
    .reduce((sum, p) => sum + p.premium, 0);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.provider || !form.policyNumber) {
      return;
    }
    addPolicy({
      type: form.type ?? "crop",
      provider: form.provider,
      policyNumber: form.policyNumber,
      coverageAmount: form.coverageAmount ?? 0,
      premium: form.premium ?? 0,
      startDate: form.startDate || new Date().toISOString().split("T")[0],
      endDate: form.endDate || new Date().toISOString().split("T")[0],
      status: form.status ?? "active",
      plantationId: form.plantationId,
      equipmentId: form.equipmentId,
      notes: form.notes,
    });
    setForm({
      type: "crop",
      status: "active",
      coverageAmount: 0,
      premium: 0,
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date(
        Date.now() + 365 * 24 * 60 * 60 * 1000
      ).toISOString().split("T")[0],
    });
    setIsAdding(false);
  };

  const types: InsuranceType[] = [
    "crop",
    "equipment",
    "liability",
    "property",
    "other",
  ];

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
            Insurance tracker
          </h2>
          <p className="text-sm text-slate-300/80">
            Manage insurance policies and track coverage.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsAdding(!isAdding)}
          className="rounded-full bg-leaf-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-leaf-400"
        >
          {isAdding ? "Cancel" : "+ Add policy"}
        </button>
      </header>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-blue-500/40 bg-blue-500/10 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-blue-300/70">
            Total coverage
          </p>
          <p className="mt-2 text-2xl font-bold text-blue-300">
            $<AnimatedCounter value={totalCoverage} />
          </p>
        </div>
        <div className="rounded-2xl border border-purple-500/40 bg-purple-500/10 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-purple-300/70">
            Annual premium
          </p>
          <p className="mt-2 text-2xl font-bold text-purple-300">
            $<AnimatedCounter value={totalPremium} />
          </p>
        </div>
      </div>

      {expiringSoon.length > 0 && (
        <div className="mt-4 rounded-xl border border-amber-500/40 bg-amber-500/10 p-3">
          <p className="text-sm font-semibold text-amber-300">
            ⚠️ {expiringSoon.length} insurance policy(ies) expiring within 30 days
          </p>
        </div>
      )}

      {isAdding && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          onSubmit={handleSubmit}
          className="mt-4 space-y-3 rounded-2xl border border-slate-700/40 bg-slate-900/50 p-4"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Provider
              <input
                type="text"
                value={form.provider || ""}
                onChange={(e) => setForm({ ...form, provider: e.target.value })}
                required
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Policy number
              <input
                type="text"
                value={form.policyNumber || ""}
                onChange={(e) =>
                  setForm({ ...form, policyNumber: e.target.value })
                }
                required
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Type
              <select
                value={form.type}
                onChange={(e) =>
                  setForm({
                    ...form,
                    type: e.target.value as InsuranceType,
                  })
                }
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              >
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Coverage amount ($)
              <input
                type="number"
                step="0.01"
                value={form.coverageAmount || 0}
                onChange={(e) =>
                  setForm({ ...form, coverageAmount: Number(e.target.value) })
                }
                required
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Premium ($)
              <input
                type="number"
                step="0.01"
                value={form.premium || 0}
                onChange={(e) =>
                  setForm({ ...form, premium: Number(e.target.value) })
                }
                required
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Start date
              <input
                type="date"
                value={form.startDate || ""}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              End date
              <input
                type="date"
                value={form.endDate || ""}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-leaf-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-leaf-400"
          >
            Add policy
          </button>
        </motion.form>
      )}

      <div className="mt-6 space-y-3">
        {policies.length === 0 ? (
          <div className="rounded-2xl border border-slate-700/40 bg-slate-900/50 p-8 text-center">
            <p className="text-sm text-slate-300/80">
              No insurance policies yet. Add your first policy to get started.
            </p>
          </div>
        ) : (
          policies.map((policy) => {
            const plantation = plantations.find(
              (p) => p.id === policy.plantationId
            );
            const isExpiringSoon =
              new Date(policy.endDate) <=
                new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) &&
              policy.status === "active";
            return (
              <div
                key={policy.id}
                className={cn(
                  "rounded-xl border p-4",
                  policy.status === "active"
                    ? "border-emerald-500/40 bg-emerald-500/10"
                    : policy.status === "expired"
                    ? "border-slate-500/40 bg-slate-500/10"
                    : "border-amber-500/40 bg-amber-500/10"
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-white">
                        {policy.provider} - {policy.type}
                      </h3>
                      <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-xs text-slate-300/70">
                        {policy.status}
                      </span>
                      {isExpiringSoon && (
                        <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-xs font-semibold text-amber-300">
                          Expiring soon
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-slate-300/70">
                      Policy #{policy.policyNumber}
                    </p>
                    {plantation && (
                      <p className="mt-1 text-xs text-slate-300/70">
                        📍 {plantation.seedName}
                      </p>
                    )}
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400/70">
                      <span>
                        Coverage: ${policy.coverageAmount.toLocaleString()}
                      </span>
                      <span>Premium: ${policy.premium.toLocaleString()}</span>
                      <span>
                        {new Date(policy.startDate).toLocaleDateString()} -{" "}
                        {new Date(policy.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removePolicy(policy.id)}
                    className="ml-2 rounded-full bg-slate-800/70 p-2 text-slate-200/90 transition hover:bg-slate-700/80"
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </motion.section>
  );
}

