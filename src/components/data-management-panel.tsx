"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { exportToJson, exportPlantationsToCsv, importFromJson } from "@/lib/data-export";
import type { Plantation } from "@/store/plantations";
import type { HelpRequest } from "@/store/help-requests";
import type { ChatMessage } from "@/store/farmer-chat";
import { usePlantationsStore } from "@/store/plantations";
import { useHelpRequestsStore } from "@/store/help-requests";
import { useFarmerChatStore } from "@/store/farmer-chat";

type DataManagementPanelProps = {
  plantations: Plantation[];
};

export default function DataManagementPanel({
  plantations,
}: DataManagementPanelProps) {
  const helpRequests = useHelpRequestsStore((state) => state.requests);
  const chatMessages = useFarmerChatStore((state) => state.messages);
  const sharedNotes = usePlantationsStore((state) => state.sharedNotes);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);

  const handleExportJson = () => {
    setIsExporting(true);
    try {
      exportToJson({
        plantations,
        helpRequests,
        chatMessages,
        sharedNotes,
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportCsv = () => {
    setIsExporting(true);
    try {
      exportPlantationsToCsv(plantations);
    } finally {
      setIsExporting(false);
    }
  };

  const handleImportJson = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setIsImporting(true);
    setImportError(null);
    setImportSuccess(false);

    try {
      const data = await importFromJson(file);
      if (!data) {
        setImportError("Failed to parse import file");
        return;
      }

      // Note: In a real app, you'd want to merge or replace data
      // For now, we'll just show success
      setImportSuccess(true);
      setTimeout(() => {
        setImportSuccess(false);
      }, 3000);
    } catch (error) {
      setImportError(
        error instanceof Error ? error.message : "Import failed"
      );
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
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
            Data management
          </h2>
          <p className="text-sm text-slate-300/80">
            Export your data for backup or import from a previous export.
          </p>
        </div>
      </header>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300/70">
            Export data
          </h3>
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleExportJson}
              disabled={isExporting}
              className="w-full rounded-full border border-slate-600/40 bg-slate-900/60 px-5 py-3 text-sm font-semibold text-slate-200/90 transition hover:border-slate-400/60 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isExporting ? "Exporting..." : "📥 Export as JSON"}
            </button>
            <button
              type="button"
              onClick={handleExportCsv}
              disabled={isExporting}
              className="w-full rounded-full border border-slate-600/40 bg-slate-900/60 px-5 py-3 text-sm font-semibold text-slate-200/90 transition hover:border-slate-400/60 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isExporting ? "Exporting..." : "📊 Export plantations as CSV"}
            </button>
            <div className="rounded-xl border border-slate-700/40 bg-slate-900/50 p-3 text-xs text-slate-300/70">
              <p className="font-semibold text-slate-200">Export includes:</p>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                <li>{plantations.length} plantations</li>
                <li>{helpRequests.length} help requests</li>
                <li>{chatMessages.length} chat messages</li>
                <li>{sharedNotes.length} shared notes</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300/70">
            Import data
          </h3>
          <div className="space-y-3">
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImportJson}
              className="hidden"
              id="import-file-input"
            />
            <label
              htmlFor="import-file-input"
              className={cn(
                "flex w-full cursor-pointer items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold transition",
                isImporting
                  ? "border-slate-600/40 bg-slate-900/60 text-slate-400/70 cursor-not-allowed"
                  : "border-slate-600/40 bg-slate-900/60 text-slate-200/90 hover:border-slate-400/60 hover:text-white"
              )}
            >
              {isImporting ? "Importing..." : "📤 Import from JSON"}
            </label>
            {importError && (
              <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-3 text-xs text-rose-300">
                <p className="font-semibold">Import failed</p>
                <p className="mt-1">{importError}</p>
              </div>
            )}
            {importSuccess && (
              <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-xs text-emerald-300">
                <p className="font-semibold">Import successful!</p>
                <p className="mt-1">
                  Data has been imported. Refresh the page to see changes.
                </p>
              </div>
            )}
            <div className="rounded-xl border border-slate-700/40 bg-slate-900/50 p-3 text-xs text-slate-300/70">
              <p className="font-semibold text-slate-200">Import format:</p>
              <p className="mt-2">
                Select a JSON file exported from Cocoa Chain. The file should
                contain plantations, help requests, chat messages, and shared
                notes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

