/**
 * Data export utilities for plantations and related data
 */

import type { Plantation } from "@/store/plantations";
import type { HelpRequest } from "@/store/help-requests";
import type { ChatMessage } from "@/store/farmer-chat";
import type { SharedNote } from "@/store/plantations";

export type ExportData = {
  plantations: Plantation[];
  helpRequests?: HelpRequest[];
  chatMessages?: ChatMessage[];
  sharedNotes?: SharedNote[];
  exportedAt: string;
  version: string;
};

export const exportToJson = (
  data: Omit<ExportData, "exportedAt" | "version">
): void => {
  const exportData: ExportData = {
    ...data,
    exportedAt: new Date().toISOString(),
    version: "1.0.0",
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `cocoa-chain-export-${new Date().toISOString().split("T")[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const importFromJson = async (
  file: File
): Promise<ExportData | null> => {
  try {
    const text = await file.text();
    const data = JSON.parse(text) as ExportData;

    if (!data.plantations || !Array.isArray(data.plantations)) {
      throw new Error("Invalid export format: missing plantations");
    }

    return data;
  } catch (error) {
    console.error("Failed to import data:", error);
    return null;
  }
};

export const exportPlantationsToCsv = (plantations: Plantation[]): void => {
  const headers = [
    "ID",
    "Seed Name",
    "Location",
    "Stage",
    "Start Date",
    "Updated At",
    "Wallet Address",
    "Tree Count",
    "Area (ha)",
    "Carbon Offset (tons)",
    "Tasks Count",
    "Collaborators Count",
    "Yield Checkpoints Count",
  ];

  const rows = plantations.map((p) => [
    p.id,
    p.seedName,
    p.location ?? "",
    p.stage,
    p.startDate,
    p.updatedAt,
    p.walletAddress,
    p.treeCount.toString(),
    p.areaHectares.toString(),
    p.carbonOffsetTons.toString(),
    p.tasks.length.toString(),
    p.collaborators.length.toString(),
    p.yieldTimeline.length.toString(),
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `plantations-export-${new Date().toISOString().split("T")[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

