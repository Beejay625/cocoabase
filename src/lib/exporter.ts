"use client";

import { jsPDF } from "jspdf";
import type { AnalyticsSnapshot } from "@/lib/analytics";

export type ExportSectionOptions = {
  overview: boolean;
  forecasts: boolean;
  wallet: boolean;
  alerts: boolean;
};

const defaultSections: ExportSectionOptions = {
  overview: true,
  forecasts: true,
  wallet: true,
  alerts: true,
};

const formatNumber = (value: number, fractionDigits = 0) =>
  Number(value).toLocaleString(undefined, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });

const timestampLabel = () =>
  new Date().toISOString().replace(/[:.]/g, "-");

const createDownload = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 2_000);
};

export const exportAnalyticsToCsv = (
  snapshot: AnalyticsSnapshot,
  sections: Partial<ExportSectionOptions> = {},
  filename = `cocoa-analytics-${timestampLabel()}.csv`
) => {
  const resolvedSections = { ...defaultSections, ...sections };
  const lines: string[] = [];

  if (resolvedSections.overview) {
    lines.push("Overview");
    lines.push("Metric,Value");
    lines.push(`Total plantations,${snapshot.total}`);
    lines.push(
      `Average days to harvest,${
        snapshot.averageDaysToHarvest ?? "Not available"
      }`
    );
    snapshot.stageBreakdown.forEach((entry) => {
      lines.push(
        `${entry.stage} share,${entry.count} (${entry.percentage}%)`
      );
    });
    lines.push("");
  }

  if (resolvedSections.forecasts) {
    lines.push("Forecasts");
    lines.push("Plantation,Scenario,Yield kg,Projection date,Confidence");
    snapshot.scenarioForecasts.forEach((forecast) => {
      forecast.scenarios.forEach((scenario) => {
        lines.push(
          [
            forecast.seedName,
            scenario.name,
            formatNumber(scenario.projectedYieldKg, 1),
            scenario.projectionDate,
            scenario.confidence,
          ].join(",")
        );
      });
    });
    lines.push("");
  }

  if (resolvedSections.wallet) {
    lines.push("Wallet performance");
    lines.push(
      [
        "Wallet",
        "Plantations",
        "Planted",
        "Growing",
        "Harvested",
        "Active tasks",
        "Completed tasks",
        "Carbon tCO2",
        "Avg yield kg",
        "Forecast kg",
      ].join(",")
    );
    snapshot.walletPerformance.forEach((wallet) => {
      lines.push(
        [
          wallet.address,
          wallet.totalPlantations,
          wallet.stageCounts.planted,
          wallet.stageCounts.growing,
          wallet.stageCounts.harvested,
          wallet.activeTasks,
          wallet.completedTasks,
          formatNumber(wallet.carbonOffsetTons, 2),
          wallet.avgYieldKg != null
            ? formatNumber(wallet.avgYieldKg, 1)
            : "—",
          wallet.forecastKg != null
            ? formatNumber(wallet.forecastKg, 1)
            : "—",
        ].join(",")
      );
    });
    lines.push("");
  }

  if (resolvedSections.alerts) {
    lines.push("Recent Alerts");
    lines.push("Type,Severity,Source,Created");
    snapshot.collaboratorInsights
      .slice(0, 5)
      .forEach((insight) => {
        lines.push(
          [
            `Collaborator ${insight.name}`,
            insight.role,
            `${insight.plantations} plantations`,
            insight.lastUpdated ?? "—",
          ].join(",")
        );
      });
    lines.push("");
  }

  const blob = new Blob([lines.join("\n")], {
    type: "text/csv;charset=utf-8;",
  });
  createDownload(blob, filename.endsWith(".csv") ? filename : `${filename}.csv`);
};

export const exportAnalyticsToPdf = (
  snapshot: AnalyticsSnapshot,
  sections: Partial<ExportSectionOptions> = {},
  filename = `cocoa-analytics-${timestampLabel()}.pdf`
) => {
  const resolvedSections = { ...defaultSections, ...sections };
  const doc = new jsPDF({
    unit: "pt",
    format: "a4",
  });

  const lineHeight = 18;
  const pageWidth = doc.internal.pageSize.getWidth();
  const marginX = 48;
  let cursorY = 64;

  const addHeading = (text: string) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(text, marginX, cursorY);
    cursorY += lineHeight;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
  };

  const addParagraph = (text: string) => {
    const wrapped = doc.splitTextToSize(text, pageWidth - marginX * 2);
    doc.text(wrapped, marginX, cursorY);
    cursorY += lineHeight * wrapped.length;
  };

  const addSpacer = (space = lineHeight / 2) => {
    cursorY += space;
    if (cursorY > doc.internal.pageSize.getHeight() - 64) {
      doc.addPage();
      cursorY = 64;
    }
  };

  addHeading("Cocoa Chain Analytics Summary");
  addParagraph(`Generated: ${new Date().toLocaleString()}`);
  addSpacer();

  if (resolvedSections.overview) {
    addHeading("Overview");
    addParagraph(
      `Total plantations: ${snapshot.total.toLocaleString()}`
    );
    addParagraph(
      `Average days to harvest: ${
        snapshot.averageDaysToHarvest ?? "Not available"
      }`
    );
    snapshot.stageBreakdown.forEach((item) => {
      addParagraph(
        `${item.stage}: ${item.count.toLocaleString()} (${item.percentage}%)`
      );
    });
    addSpacer();
  }

  if (resolvedSections.forecasts) {
    addHeading("Forecast scenarios");
    snapshot.scenarioForecasts.slice(0, 6).forEach((scenario) => {
      const base = scenario.scenarios.find(
        (item) => item.name === "base"
      );
      const best = scenario.scenarios.find(
        (item) => item.name === "best"
      );
      const worst = scenario.scenarios.find(
        (item) => item.name === "worst"
      );
      addParagraph(
        `${scenario.seedName}: base ${
          base ? base.projectedYieldKg.toFixed(1) : "—"
        } kg (${base?.confidence ?? "—"})`
      );
      if (best && worst) {
        addParagraph(
          `Range: ${best.projectedYieldKg.toFixed(1)} kg (best) – ${worst.projectedYieldKg.toFixed(
            1
          )} kg (worst)`
        );
      }
      addSpacer(6);
    });
    addSpacer();
  }

  if (resolvedSections.wallet) {
    addHeading("Wallet performance");
    snapshot.walletPerformance.slice(0, 5).forEach((wallet) => {
      addParagraph(
        `${wallet.address.slice(0, 6)}…${wallet.address.slice(-4)} — ${wallet.totalPlantations} plantations`
      );
      addParagraph(
        `Stages: planted ${wallet.stageCounts.planted}, growing ${wallet.stageCounts.growing}, harvested ${wallet.stageCounts.harvested}`
      );
      addParagraph(
        `Tasks: ${wallet.completedTasks} completed / ${wallet.activeTasks} active`
      );
      addParagraph(
        `Carbon: ${wallet.carbonOffsetTons.toFixed(2)} tCO₂`
      );
      if (wallet.avgYieldKg != null) {
        addParagraph(
          `Average yield per plantation: ${wallet.avgYieldKg.toFixed(1)} kg`
        );
      }
      if (wallet.forecastKg != null) {
        addParagraph(`Projected yield: ${wallet.forecastKg.toFixed(1)} kg`);
      }
      addSpacer();
    });
  }

  if (resolvedSections.alerts) {
    addHeading("Collaborator pulse");
    snapshot.collaboratorInsights.slice(0, 5).forEach((insight) => {
      addParagraph(
        `${insight.name} (${insight.role}) — ${insight.plantations} plantations`
      );
      if (insight.lastNote) {
        addParagraph(`Latest note: ${insight.lastNote}`);
      }
      if (insight.lastUpdated) {
        addParagraph(`Updated: ${new Date(insight.lastUpdated).toLocaleString()}`);
      }
      addSpacer();
    });
  }

  doc.save(filename.endsWith(".pdf") ? filename : `${filename}.pdf`);
};


