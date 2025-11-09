"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import {
  useFieldNotesStore,
  type FieldNote,
  type FieldNoteCategory,
} from "@/store/field-notes";
import { usePlantationsStore } from "@/store/plantations";

export default function FieldNotes() {
  const notes = useFieldNotesStore((state) => state.notes);
  const addNote = useFieldNotesStore((state) => state.addNote);
  const removeNote = useFieldNotesStore((state) => state.removeNote);
  const searchNotes = useFieldNotesStore((state) => state.searchNotes);
  const plantations = usePlantationsStore((state) => state.plantations);

  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [form, setForm] = useState<Partial<FieldNote>>({
    category: "observation",
    priority: "medium",
    date: new Date().toISOString().split("T")[0],
    tags: [],
  });

  const filteredNotes = searchQuery ? searchNotes(searchQuery) : notes;
  const recentNotes = [...filteredNotes]
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    .slice(0, 10);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.plantationId || !form.title || !form.content) {
      return;
    }
    addNote({
      plantationId: form.plantationId,
      category: form.category ?? "observation",
      title: form.title,
      content: form.content,
      author: form.author,
      date: form.date || new Date().toISOString().split("T")[0],
      location: form.location,
      photos: form.photos,
      tags: form.tags || [],
      priority: form.priority ?? "medium",
    });
    setForm({
      category: "observation",
      priority: "medium",
      date: new Date().toISOString().split("T")[0],
      tags: [],
    });
    setIsAdding(false);
  };

  const categories: FieldNoteCategory[] = [
    "observation",
    "issue",
    "improvement",
    "weather",
    "pest_disease",
    "harvest",
    "other",
  ];

  const getPriorityColor = (priority: FieldNote["priority"]) => {
    switch (priority) {
      case "high":
        return "border-rose-500/60 bg-rose-500/20";
      case "medium":
        return "border-blue-500/60 bg-blue-500/20";
      case "low":
        return "border-slate-500/60 bg-slate-500/20";
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
          <h2 className="text-lg font-semibold text-white">Field notes</h2>
          <p className="text-sm text-slate-300/80">
            Record daily observations and field activities.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsAdding(!isAdding)}
          className="rounded-full bg-leaf-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-leaf-400"
        >
          {isAdding ? "Cancel" : "+ Add note"}
        </button>
      </header>

      <div className="mt-4">
        <input
          type="text"
          placeholder="Search notes..."
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
              Plantation
              <select
                value={form.plantationId || ""}
                onChange={(e) =>
                  setForm({ ...form, plantationId: e.target.value })
                }
                required
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              >
                <option value="">Select plantation</option>
                {plantations.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.seedName}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70">
              Category
              <select
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category: e.target.value as FieldNoteCategory,
                  })
                }
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.replace("_", " ").replace(/\b\w/g, (l) =>
                      l.toUpperCase()
                    )}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70 sm:col-span-2">
              Title
              <input
                type="text"
                value={form.title || ""}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.3em] text-slate-400/70 sm:col-span-2">
              Content
              <textarea
                value={form.content || ""}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                required
                rows={3}
                className="mt-1 w-full rounded-xl border border-slate-600/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:border-leaf-500/60 focus:outline-none focus:ring-2 focus:ring-leaf-400/40"
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-leaf-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-leaf-400"
          >
            Add note
          </button>
        </motion.form>
      )}

      <div className="mt-6 space-y-2">
        {recentNotes.length === 0 ? (
          <div className="rounded-2xl border border-slate-700/40 bg-slate-900/50 p-8 text-center">
            <p className="text-sm text-slate-300/80">
              {searchQuery
                ? "No notes found matching your search."
                : "No field notes yet. Add your first note to get started."}
            </p>
          </div>
        ) : (
          recentNotes.map((note) => {
            const plantation = plantations.find(
              (p) => p.id === note.plantationId
            );
            return (
              <div
                key={note.id}
                className={cn(
                  "rounded-xl border p-3",
                  getPriorityColor(note.priority)
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-white">
                        {note.title}
                      </h3>
                      <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-xs text-slate-300/70">
                        {note.category.replace("_", " ")}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-300/70 line-clamp-2">
                      {note.content}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-300/70">
                      {plantation && (
                        <span>📍 {plantation.seedName}</span>
                      )}
                      <span>
                        📅 {new Date(note.date).toLocaleDateString()}
                      </span>
                      {note.author && <span>👤 {note.author}</span>}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeNote(note.id)}
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

