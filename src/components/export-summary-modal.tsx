"use client";

import { useState, type FormEvent } from "react";
import Modal from "@/components/ui/modal";
import type { AnalyticsSnapshot } from "@/lib/analytics";
import {
  exportAnalyticsToCsv,
  exportAnalyticsToPdf,
  type ExportSectionOptions,
} from "@/lib/exporter";

type ExportSummaryModalProps = {
  open: boolean;
  onClose: () => void;
  snapshot: AnalyticsSnapshot;
};

const initialSections: ExportSectionOptions = {
  overview: true,
  forecasts: true,
  wallet: true,
  alerts: false,
};

export default function ExportSummaryModal({
  open,
  onClose,
  snapshot,
}: ExportSummaryModalProps) {
  const [format, setFormat] = useState<"csv" | "pdf">("csv");
  const [sections, setSections] =
    useState<ExportSectionOptions>(initialSections);
  const [filename, setFilename] = useState(
    `cocoa-analytics-${new Date().toISOString().split("T")[0]}`
  );
  const [isExporting, setExporting] = useState(false);

  const toggleSection = (key: keyof ExportSectionOptions) => {
    setSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setExporting(true);
    try {
      if (format === "csv") {
        exportAnalyticsToCsv(snapshot, sections, filename);
      } else {
        exportAnalyticsToPdf(snapshot, sections, filename);
      }
      onClose();
    } finally {
      setExporting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Export analytics"
      description="Download a snapshot of your current analytics and operations data."
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <fieldset className="space-y-3">
          <legend className="text-xs font-semibold uppercase tracking-[0.25em] text-cocoa-400">
            File format
          </legend>
          <div className="flex flex-wrap gap-3">
            <label className="flex items-center gap-2 rounded-full border border-cream-200 bg-white px-3 py-1.5 text-sm font-medium text-cocoa-600 transition hover:border-cocoa-300 hover:text-cocoa-900">
              <input
                type="radio"
                name="export-format"
                value="csv"
                checked={format === "csv"}
                onChange={() => setFormat("csv")}
                className="h-4 w-4 border-cocoa-300 text-leaf-500 focus:ring-leaf-400"
              />
              CSV (.csv)
            </label>
            <label className="flex items-center gap-2 rounded-full border border-cream-200 bg-white px-3 py-1.5 text-sm font-medium text-cocoa-600 transition hover:border-cocoa-300 hover:text-cocoa-900">
              <input
                type="radio"
                name="export-format"
                value="pdf"
                checked={format === "pdf"}
                onChange={() => setFormat("pdf")}
                className="h-4 w-4 border-cocoa-300 text-leaf-500 focus:ring-leaf-400"
              />
              PDF (.pdf)
            </label>
          </div>
        </fieldset>

        <fieldset className="space-y-3">
          <legend className="text-xs font-semibold uppercase tracking-[0.25em] text-cocoa-400">
            Sections
          </legend>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm text-cocoa-600">
              <input
                type="checkbox"
                checked={sections.overview}
                onChange={() => toggleSection("overview")}
                className="h-4 w-4 rounded border-cocoa-300 text-leaf-500 focus:ring-leaf-400"
              />
              Overview metrics & stage breakdown
            </label>
            <label className="flex items-center gap-2 text-sm text-cocoa-600">
              <input
                type="checkbox"
                checked={sections.forecasts}
                onChange={() => toggleSection("forecasts")}
                className="h-4 w-4 rounded border-cocoa-300 text-leaf-500 focus:ring-leaf-400"
              />
              Forecast scenarios & checkpoints
            </label>
            <label className="flex items-center gap-2 text-sm text-cocoa-600">
              <input
                type="checkbox"
                checked={sections.wallet}
                onChange={() => toggleSection("wallet")}
                className="h-4 w-4 rounded border-cocoa-300 text-leaf-500 focus:ring-leaf-400"
              />
              Wallet performance report
            </label>
            <label className="flex items-center gap-2 text-sm text-cocoa-600">
              <input
                type="checkbox"
                checked={sections.alerts}
                onChange={() => toggleSection("alerts")}
                className="h-4 w-4 rounded border-cocoa-300 text-leaf-500 focus:ring-leaf-400"
              />
              Collaborator & alert insights
            </label>
          </div>
        </fieldset>

        <label className="block text-sm text-cocoa-600">
          Filename
          <input
            type="text"
            value={filename}
            onChange={(event) => setFilename(event.target.value)}
            className="mt-1 w-full rounded-2xl border border-cream-300 bg-white px-3 py-2 text-sm text-cocoa-800 shadow-sm focus:border-cocoa-400 focus:outline-none focus:ring-2 focus:ring-cocoa-200"
            placeholder="cocoa-analytics"
          />
          <span className="mt-1 block text-[11px] text-cocoa-400">
            The appropriate extension will be appended automatically.
          </span>
        </label>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-cream-300 bg-white px-4 py-2 text-sm font-semibold text-cocoa-600 shadow-sm transition hover:border-cocoa-300 hover:text-cocoa-900 focus:outline-none focus:ring-2 focus:ring-cocoa-200 focus:ring-offset-2 focus:ring-offset-white"
            disabled={isExporting}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={
              isExporting ||
              !Object.values(sections).some((value) => value === true)
            }
            className="rounded-full bg-cocoa-900 px-5 py-2 text-sm font-semibold text-cream-50 shadow-lg transition hover:bg-cocoa-800 focus:outline-none focus:ring-2 focus:ring-cocoa-500 focus:ring-offset-2 focus:ring-offset-white disabled:cursor-not-allowed disabled:bg-cream-200 disabled:text-cocoa-400"
          >
            {isExporting ? "Preparing…" : "Export"}
          </button>
        </div>
      </form>
    </Modal>
  );
}


