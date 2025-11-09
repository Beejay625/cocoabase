"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import {
  useDocumentStore,
  type Document,
  type DocumentDraft,
} from "@/store/documents";
import { usePlantationsStore } from "@/store/plantations";

export default function DocumentLibrary() {
  const documents = useDocumentStore((state) => state.documents);
  const addDocument = useDocumentStore((state) => state.addDocument);
  const removeDocument = useDocumentStore((state) => state.removeDocument);
  const searchDocuments = useDocumentStore((state) => state.searchDocuments);
  const plantations = usePlantationsStore((state) => state.plantations);

  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [form, setForm] = useState<Partial<DocumentDraft>>({
    name: "",
    type: "other",
    tags: [],
  });

  const filteredDocuments = searchQuery
    ? searchDocuments(searchQuery)
    : documents;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name) {
      return;
    }
    addDocument({
      name: form.name,
      type: form.type ?? "other",
      fileUrl: form.fileUrl,
      fileSize: form.fileSize,
      plantationId: form.plantationId,
      description: form.description,
      tags: form.tags || [],
      expiresAt: form.expiresAt,
    });
    setForm({
      name: "",
      type: "other",
      tags: [],
    });
    setIsAdding(false);
  };

  const documentTypes: Document["type"][] = [
    "contract",
    "certificate",
    "receipt",
    "invoice",
    "permit",
    "other",
  ];

  const groupedByType = documentTypes.reduce(
    (acc, type) => {
      acc[type] = documents.filter((doc) => doc.type === type);
      return acc;
    },
    {} as Record<Document["type"], Document[]>
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 }}
      className="rounded-3xl border border-cocoa-800/60 bg-[#101f3c]/80 p-6 text-slate-100 shadow-xl shadow-black/20 backdrop-blur"
    >
      <header className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Document library</h2>
          <p className="text-sm text-slate-300/80">
            Store and manage contracts, certificates, and important documents.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsAdding(!isAdding)}
          className="rounded-full bg-leaf-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-leaf-400"
        >
          {isAdding ? "Cancel" : "+ Add document"}
        </button>
      </header>

      <div className="mt-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search documents..."
          className="w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-400/70 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
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
              Name
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
                  setForm({
                    ...form,
                    type: e.target.value as Document["type"],
                  })
                }
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              >
                {documentTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70 sm:col-span-2">
              File URL
              <input
                type="url"
                value={form.fileUrl || ""}
                onChange={(e) => setForm({ ...form, fileUrl: e.target.value })}
                placeholder="https://..."
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Plantation (optional)
              <select
                value={form.plantationId || ""}
                onChange={(e) =>
                  setForm({ ...form, plantationId: e.target.value || undefined })
                }
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              >
                <option value="">None</option>
                {plantations.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.seedName}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Expires (optional)
              <input
                type="date"
                value={form.expiresAt || ""}
                onChange={(e) =>
                  setForm({ ...form, expiresAt: e.target.value || undefined })
                }
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70 sm:col-span-2">
              Description
              <textarea
                value={form.description || ""}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={2}
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-leaf-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-leaf-400"
          >
            Add document
          </button>
        </motion.form>
      )}

      <div className="mt-6 space-y-4">
        {documentTypes.map((type) => {
          const typeDocs = groupedByType[type].filter((doc) =>
            filteredDocuments.includes(doc)
          );
          if (typeDocs.length === 0) return null;

          return (
            <div
              key={type}
              className="rounded-2xl border border-slate-700/40 bg-slate-900/50 p-4"
            >
              <h3 className="mb-3 text-sm font-semibold text-white">
                {type.charAt(0).toUpperCase() + type.slice(1)} ({typeDocs.length})
              </h3>
              <div className="space-y-2">
                {typeDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between rounded-xl border border-slate-700/40 bg-slate-950/60 p-3"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">
                        {doc.name}
                      </p>
                      {doc.description && (
                        <p className="mt-1 text-xs text-slate-300/70">
                          {doc.description}
                        </p>
                      )}
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400/70">
                        <span>
                          Uploaded: {new Date(doc.uploadedAt).toLocaleDateString()}
                        </span>
                        {doc.expiresAt && (
                          <span
                            className={cn(
                              "rounded-full px-2 py-0.5",
                              new Date(doc.expiresAt) < new Date()
                                ? "bg-rose-500/20 text-rose-300"
                                : "bg-slate-800/80"
                            )}
                          >
                            Expires: {new Date(doc.expiresAt).toLocaleDateString()}
                          </span>
                        )}
                        {doc.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-slate-800/80 px-2 py-0.5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="ml-2 flex items-center gap-2">
                      {doc.fileUrl && (
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full bg-slate-800/70 p-2 text-slate-200/90 transition hover:bg-slate-700/80"
                        >
                          📄
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => removeDocument(doc.id)}
                        className="rounded-full bg-slate-800/70 p-2 text-slate-200/90 transition hover:bg-slate-700/80"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="mt-6 rounded-2xl border border-slate-700/40 bg-slate-900/50 p-8 text-center">
          <p className="text-sm text-slate-300/80">
            {searchQuery
              ? "No documents found matching your search."
              : "No documents yet. Add your first document to get started."}
          </p>
        </div>
      )}
    </motion.section>
  );
}

