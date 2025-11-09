"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import {
  useSuppliersStore,
  type Supplier,
  type SupplierType,
} from "@/store/suppliers";

export default function SupplierManagement() {
  const suppliers = useSuppliersStore((state) => state.suppliers);
  const addSupplier = useSuppliersStore((state) => state.addSupplier);
  const updateSupplier = useSuppliersStore((state) => state.updateSupplier);
  const removeSupplier = useSuppliersStore((state) => state.removeSupplier);
  const getActiveSuppliers = useSuppliersStore(
    (state) => state.getActiveSuppliers
  );
  const searchSuppliers = useSuppliersStore((state) => state.searchSuppliers);

  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [form, setForm] = useState<Partial<Supplier>>({
    type: "seed_supplier",
    isActive: true,
  });

  const activeSuppliers = getActiveSuppliers();
  const filteredSuppliers = searchQuery
    ? searchSuppliers(searchQuery)
    : suppliers;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name) {
      return;
    }
    addSupplier({
      name: form.name,
      type: form.type ?? "seed_supplier",
      contactPerson: form.contactPerson,
      email: form.email,
      phone: form.phone,
      address: form.address,
      website: form.website,
      rating: form.rating,
      notes: form.notes,
      isActive: form.isActive !== undefined ? form.isActive : true,
    });
    setForm({
      type: "seed_supplier",
      isActive: true,
    });
    setIsAdding(false);
  };

  const types: SupplierType[] = [
    "seed_supplier",
    "fertilizer",
    "equipment",
    "labor",
    "transport",
    "other",
  ];

  const getTypeLabel = (type: SupplierType) => {
    return type.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase());
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
            Supplier management
          </h2>
          <p className="text-sm text-slate-300/80">
            Manage suppliers and vendors for your operations.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsAdding(!isAdding)}
          className="rounded-full bg-leaf-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-leaf-400"
        >
          {isAdding ? "Cancel" : "+ Add supplier"}
        </button>
      </header>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-blue-500/40 bg-blue-500/10 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-blue-300/70">
            Total suppliers
          </p>
          <p className="mt-2 text-2xl font-bold text-blue-300">
            {suppliers.length}
          </p>
        </div>
        <div className="rounded-2xl border border-purple-500/40 bg-purple-500/10 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-purple-300/70">
            Active suppliers
          </p>
          <p className="mt-2 text-2xl font-bold text-purple-300">
            {activeSuppliers.length}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <input
          type="text"
          placeholder="Search suppliers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-400/50 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
        />
      </div>

      {isAdding && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          onSubmit={handleSubmit}
          className="mt-4 space-y-3 rounded-2xl border border-slate-700/40 bg-slate-900/50 p-4"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Supplier name
              <input
                type="text"
                value={form.name || ""}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Type
              <select
                value={form.type}
                onChange={(e) =>
                  setForm({ ...form, type: e.target.value as SupplierType })
                }
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              >
                {types.map((type) => (
                  <option key={type} value={type}>
                    {getTypeLabel(type)}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Contact person
              <input
                type="text"
                value={form.contactPerson || ""}
                onChange={(e) =>
                  setForm({ ...form, contactPerson: e.target.value })
                }
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Email
              <input
                type="email"
                value={form.email || ""}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Phone
              <input
                type="tel"
                value={form.phone || ""}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Rating (1-5)
              <input
                type="number"
                min="1"
                max="5"
                step="0.1"
                value={form.rating || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    rating: Number(e.target.value) || undefined,
                  })
                }
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-leaf-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-leaf-400"
          >
            Add supplier
          </button>
        </motion.form>
      )}

      <div className="mt-6 space-y-3">
        {filteredSuppliers.length === 0 ? (
          <div className="rounded-2xl border border-slate-700/40 bg-slate-900/50 p-8 text-center">
            <p className="text-sm text-slate-300/80">
              {searchQuery
                ? "No suppliers found matching your search."
                : "No suppliers yet. Add your first supplier to get started."}
            </p>
          </div>
        ) : (
          filteredSuppliers.map((supplier) => (
            <div
              key={supplier.id}
              className={cn(
                "rounded-xl border p-4",
                supplier.isActive
                  ? "border-emerald-500/40 bg-emerald-500/10"
                  : "border-slate-500/40 bg-slate-500/10"
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-white">
                      {supplier.name}
                    </h3>
                    <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-xs text-slate-300/70">
                      {getTypeLabel(supplier.type)}
                    </span>
                    {supplier.rating && (
                      <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-xs font-semibold text-amber-300">
                        ⭐ {supplier.rating.toFixed(1)}
                      </span>
                    )}
                  </div>
                  <div className="mt-2 space-y-1 text-xs text-slate-300/70">
                    {supplier.contactPerson && (
                      <p>👤 {supplier.contactPerson}</p>
                    )}
                    {supplier.email && <p>📧 {supplier.email}</p>}
                    {supplier.phone && <p>📞 {supplier.phone}</p>}
                    {supplier.address && <p>📍 {supplier.address}</p>}
                    {supplier.website && (
                      <p>
                        🌐{" "}
                        <a
                          href={supplier.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-300 hover:underline"
                        >
                          {supplier.website}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      updateSupplier(supplier.id, {
                        isActive: !supplier.isActive,
                      })
                    }
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-semibold transition",
                      supplier.isActive
                        ? "bg-emerald-500/20 text-emerald-300"
                        : "bg-slate-500/20 text-slate-300"
                    )}
                  >
                    {supplier.isActive ? "Active" : "Inactive"}
                  </button>
                  <button
                    type="button"
                    onClick={() => removeSupplier(supplier.id)}
                    className="rounded-full bg-slate-800/70 p-2 text-slate-200/90 transition hover:bg-slate-700/80"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </motion.section>
  );
}

