"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import {
  useContractsStore,
  type Contract,
  type ContractType,
  type ContractStatus,
} from "@/store/contracts";
import { usePlantationsStore } from "@/store/plantations";
import { useSuppliersStore } from "@/store/suppliers";

export default function ContractManagement() {
  const contracts = useContractsStore((state) => state.contracts);
  const addContract = useContractsStore((state) => state.addContract);
  const updateContract = useContractsStore((state) => state.updateContract);
  const removeContract = useContractsStore((state) => state.removeContract);
  const getExpiringContracts = useContractsStore(
    (state) => state.getExpiringContracts
  );
  const plantations = usePlantationsStore((state) => state.plantations);
  const suppliers = useSuppliersStore((state) => state.suppliers);

  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<Partial<Contract>>({
    type: "supply",
    status: "draft",
    currency: "USD",
    startDate: new Date().toISOString().split("T")[0],
  });

  const expiringContracts = getExpiringContracts(30);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.counterparty) {
      return;
    }
    addContract({
      type: form.type ?? "supply",
      title: form.title,
      counterparty: form.counterparty,
      startDate: form.startDate || new Date().toISOString().split("T")[0],
      endDate: form.endDate,
      value: form.value,
      currency: form.currency || "USD",
      terms: form.terms,
      status: form.status ?? "draft",
      plantationId: form.plantationId,
      supplierId: form.supplierId,
      renewalDate: form.renewalDate,
      notes: form.notes,
      attachments: form.attachments,
    });
    setForm({
      type: "supply",
      status: "draft",
      currency: "USD",
      startDate: new Date().toISOString().split("T")[0],
    });
    setIsAdding(false);
  };

  const types: ContractType[] = [
    "supply",
    "purchase",
    "service",
    "lease",
    "labor",
    "other",
  ];

  const getStatusColor = (status: ContractStatus) => {
    switch (status) {
      case "active":
        return "border-emerald-500/40 bg-emerald-500/10";
      case "expired":
        return "border-slate-500/40 bg-slate-500/10";
      case "terminated":
        return "border-rose-500/40 bg-rose-500/10";
      case "draft":
        return "border-amber-500/40 bg-amber-500/10";
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
          <h2 className="text-lg font-semibold text-white">
            Contract management
          </h2>
          <p className="text-sm text-slate-300/80">
            Manage contracts with suppliers, buyers, and service providers.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsAdding(!isAdding)}
          className="rounded-full bg-leaf-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-leaf-400"
        >
          {isAdding ? "Cancel" : "+ Add contract"}
        </button>
      </header>

      {expiringContracts.length > 0 && (
        <div className="mt-4 rounded-xl border border-amber-500/40 bg-amber-500/10 p-3">
          <p className="text-sm font-semibold text-amber-300">
            ⚠️ {expiringContracts.length} contract(s) expiring within 30 days
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
              Contract title
              <input
                type="text"
                value={form.title || ""}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Type
              <select
                value={form.type}
                onChange={(e) =>
                  setForm({ ...form, type: e.target.value as ContractType })
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
              Counterparty
              <input
                type="text"
                value={form.counterparty || ""}
                onChange={(e) =>
                  setForm({ ...form, counterparty: e.target.value })
                }
                required
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Value
              <input
                type="number"
                step="0.01"
                value={form.value || ""}
                onChange={(e) =>
                  setForm({ ...form, value: Number(e.target.value) || undefined })
                }
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
            Add contract
          </button>
        </motion.form>
      )}

      <div className="mt-6 space-y-3">
        {contracts.length === 0 ? (
          <div className="rounded-2xl border border-slate-700/40 bg-slate-900/50 p-8 text-center">
            <p className="text-sm text-slate-300/80">
              No contracts yet. Add your first contract to get started.
            </p>
          </div>
        ) : (
          contracts.map((contract) => {
            const plantation = plantations.find(
              (p) => p.id === contract.plantationId
            );
            const supplier = suppliers.find((s) => s.id === contract.supplierId);
            return (
              <div
                key={contract.id}
                className={cn("rounded-xl border p-4", getStatusColor(contract.status))}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-white">
                        {contract.title}
                      </h3>
                      <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-xs text-slate-300/70">
                        {contract.type}
                      </span>
                      <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-xs text-slate-300/70">
                        {contract.status}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-300/70">
                      With: {contract.counterparty}
                    </p>
                    {contract.value && (
                      <p className="mt-1 text-xs text-slate-300/70">
                        Value: {contract.currency} {contract.value.toLocaleString()}
                      </p>
                    )}
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-300/70">
                      <span>
                        Start: {new Date(contract.startDate).toLocaleDateString()}
                      </span>
                      {contract.endDate && (
                        <span>
                          End: {new Date(contract.endDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeContract(contract.id)}
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

