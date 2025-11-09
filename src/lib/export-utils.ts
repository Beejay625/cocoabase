export type ExportFormat = "csv" | "json" | "xlsx";

export const exportToCsv = (
  data: Array<Record<string, unknown>>,
  filename: string = "export"
): void => {
  if (data.length === 0) {
    console.warn("[export] No data to export");
    return;
  }

  const headers = Object.keys(data[0]);
  const rows = data.map((row) =>
    headers
      .map((header) => {
        const value = row[header];
        if (value === null || value === undefined) {
          return "";
        }
        if (typeof value === "string" && value.includes(",")) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return String(value);
      })
      .join(",")
  );

  const csvContent = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  downloadBlob(blob, `${filename}.csv`);
};

export const exportToJson = (
  data: unknown,
  filename: string = "export"
): void => {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: "application/json" });
  downloadBlob(blob, `${filename}.json`);
};

export const exportToXlsx = async (
  data: Array<Record<string, unknown>>,
  filename: string = "export",
  sheetName: string = "Sheet1"
): Promise<void> => {
  // This is a stub - would require a library like xlsx or exceljs
  // For now, we'll export as CSV with .xlsx extension (not ideal but works)
  console.warn("[export] XLSX export requires additional library, falling back to CSV");
  exportToCsv(data, filename);
};

const downloadBlob = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 100);
};

export const exportTable = (
  tableId: string,
  filename: string = "table-export"
): void => {
  const table = document.getElementById(tableId) as HTMLTableElement;
  if (!table) {
    console.warn(`[export] Table with id "${tableId}" not found`);
    return;
  }

  const data: Array<Record<string, string>> = [];
  const headers: string[] = [];

  // Extract headers
  const headerRow = table.querySelector("thead tr");
  if (headerRow) {
    headerRow.querySelectorAll("th").forEach((th) => {
      headers.push(th.textContent?.trim() || "");
    });
  }

  // Extract rows
  table.querySelectorAll("tbody tr").forEach((row) => {
    const rowData: Record<string, string> = {};
    row.querySelectorAll("td").forEach((td, index) => {
      const header = headers[index] || `Column ${index + 1}`;
      rowData[header] = td.textContent?.trim() || "";
    });
    if (Object.keys(rowData).length > 0) {
      data.push(rowData);
    }
  });

  if (data.length > 0) {
    exportToCsv(data, filename);
  }
};

export const exportImage = (
  elementId: string,
  filename: string = "image-export"
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const element = document.getElementById(elementId);
    if (!element) {
      reject(new Error(`Element with id "${elementId}" not found`));
      return;
    }

    import("html2canvas")
      .then((html2canvas) => {
        html2canvas.default(element).then((canvas) => {
          canvas.toBlob((blob) => {
            if (blob) {
              downloadBlob(blob, `${filename}.png`);
              resolve();
            } else {
              reject(new Error("Failed to create image blob"));
            }
          });
        });
      })
      .catch(() => {
        console.warn("[export] html2canvas not available, cannot export image");
        reject(new Error("html2canvas library not available"));
      });
  });
};

export const prepareDataForExport = <T extends Record<string, unknown>>(
  data: T[],
  fieldMap?: Record<keyof T, string>
): Array<Record<string, unknown>> => {
  return data.map((item) => {
    const mapped: Record<string, unknown> = {};
    Object.keys(item).forEach((key) => {
      const mappedKey = fieldMap?.[key as keyof T] || key;
      mapped[mappedKey] = item[key];
    });
    return mapped;
  });
};

