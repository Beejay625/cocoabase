export type CostCategory =
  | "labor"
  | "equipment"
  | "fertilizer"
  | "pesticides"
  | "irrigation"
  | "transportation"
  | "certification"
  | "maintenance"
  | "other";

export interface CostEntry {
  id: string;
  plantationId?: string;
  category: CostCategory;
  description: string;
  amount: number;
  currency: string;
  date: Date;
  receipt?: string;
  notes?: string;
}

export const calculateTotalCosts = (
  costs: CostEntry[],
  category?: CostCategory
): number => {
  const filtered = category
    ? costs.filter((c) => c.category === category)
    : costs;
  return filtered.reduce((sum, cost) => sum + cost.amount, 0);
};

export const getCostsByCategory = (
  costs: CostEntry[]
): Record<CostCategory, CostEntry[]> => {
  return costs.reduce(
    (acc, cost) => {
      if (!acc[cost.category]) {
        acc[cost.category] = [];
      }
      acc[cost.category].push(cost);
      return acc;
    },
    {} as Record<CostCategory, CostEntry[]>
  );
};

export const calculateCostPerHectare = (
  totalCost: number,
  areaHectares: number
): number => {
  if (areaHectares === 0) return 0;
  return totalCost / areaHectares;
};

export const calculateCostPerTree = (
  totalCost: number,
  treeCount: number
): number => {
  if (treeCount === 0) return 0;
  return totalCost / treeCount;
};

export const calculateROI = (
  revenue: number,
  totalCosts: number
): number => {
  if (totalCosts === 0) return 0;
  return ((revenue - totalCosts) / totalCosts) * 100;
};

export const getCostBreakdown = (
  costs: CostEntry[]
): Array<{ category: CostCategory; total: number; percentage: number }> => {
  const byCategory = getCostsByCategory(costs);
  const total = calculateTotalCosts(costs);

  return Object.entries(byCategory).map(([category, entries]) => {
    const categoryTotal = calculateTotalCosts(entries);
    return {
      category: category as CostCategory,
      total: categoryTotal,
      percentage: total > 0 ? (categoryTotal / total) * 100 : 0,
    };
  });
};

export const getMonthlyCosts = (
  costs: CostEntry[],
  year: number,
  month: number
): CostEntry[] => {
  return costs.filter((cost) => {
    const costDate = new Date(cost.date);
    return costDate.getFullYear() === year && costDate.getMonth() === month;
  });
};

export const getCostTrend = (
  costs: CostEntry[],
  periodMonths: number = 6
): "increasing" | "decreasing" | "stable" => {
  const now = new Date();
  const periods: Array<{ start: Date; end: Date }> = [];

  for (let i = 0; i < periodMonths; i++) {
    const end = new Date(now.getFullYear(), now.getMonth() - i, 0);
    const start = new Date(now.getFullYear(), now.getMonth() - i - 1, 1);
    periods.push({ start, end });
  }

  const periodTotals = periods.map((period) => {
    return costs
      .filter((cost) => {
        const costDate = new Date(cost.date);
        return costDate >= period.start && costDate <= period.end;
      })
      .reduce((sum, cost) => sum + cost.amount, 0);
  });

  if (periodTotals.length < 2) return "stable";

  const recent = periodTotals[0];
  const older = periodTotals[periodTotals.length - 1];

  const diff = ((recent - older) / older) * 100;

  if (diff > 10) return "increasing";
  if (diff < -10) return "decreasing";
  return "stable";
};

export const formatCostCategory = (category: CostCategory): string => {
  const labels: Record<CostCategory, string> = {
    labor: "Labor",
    equipment: "Equipment",
    fertilizer: "Fertilizer",
    pesticides: "Pesticides",
    irrigation: "Irrigation",
    transportation: "Transportation",
    certification: "Certification",
    maintenance: "Maintenance",
    other: "Other",
  };
  return labels[category];
};

