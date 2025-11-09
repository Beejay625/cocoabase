export type BudgetCategory = 
  | "labor"
  | "equipment"
  | "fertilizer"
  | "pesticides"
  | "irrigation"
  | "maintenance"
  | "certification"
  | "other";

export type BudgetStatus = "on-track" | "over-budget" | "under-budget";

export interface Budget {
  id: string;
  name: string;
  category: BudgetCategory;
  allocated: number;
  spent: number;
  period: {
    start: Date;
    end: Date;
  };
  status: BudgetStatus;
  notes?: string;
}

export const calculateBudgetStatus = (
  allocated: number,
  spent: number
): BudgetStatus => {
  const percentage = (spent / allocated) * 100;
  if (percentage > 100) return "over-budget";
  if (percentage < 80) return "under-budget";
  return "on-track";
};

export const calculateRemainingBudget = (budget: Budget): number => {
  return Math.max(0, budget.allocated - budget.spent);
};

export const calculateBudgetUtilization = (budget: Budget): number => {
  if (budget.allocated === 0) return 0;
  return (budget.spent / budget.allocated) * 100;
};

export const getBudgetsByCategory = (
  budgets: Budget[]
): Record<BudgetCategory, Budget[]> => {
  return budgets.reduce(
    (acc, budget) => {
      if (!acc[budget.category]) {
        acc[budget.category] = [];
      }
      acc[budget.category].push(budget);
      return acc;
    },
    {
      labor: [],
      equipment: [],
      fertilizer: [],
      pesticides: [],
      irrigation: [],
      maintenance: [],
      certification: [],
      other: [],
    } as Record<BudgetCategory, Budget[]>
  );
};

export const calculateTotalBudget = (budgets: Budget[]): {
  allocated: number;
  spent: number;
  remaining: number;
} => {
  const allocated = budgets.reduce((sum, b) => sum + b.allocated, 0);
  const spent = budgets.reduce((sum, b) => sum + b.spent, 0);
  return {
    allocated,
    spent,
    remaining: allocated - spent,
  };
};

export const getOverBudgetItems = (budgets: Budget[]): Budget[] => {
  return budgets.filter((budget) => budget.status === "over-budget");
};

export const getBudgetVariance = (budget: Budget): {
  variance: number;
  percentage: number;
} => {
  const variance = budget.spent - budget.allocated;
  const percentage = budget.allocated > 0 ? (variance / budget.allocated) * 100 : 0;
  return { variance, percentage };
};

export const forecastBudget = (
  budget: Budget,
  currentSpendingRate: number
): {
  projectedSpend: number;
  projectedVariance: number;
  willExceed: boolean;
} => {
  const daysElapsed = Math.floor(
    (Date.now() - budget.period.start.getTime()) / (1000 * 60 * 60 * 24)
  );
  const totalDays = Math.floor(
    (budget.period.end.getTime() - budget.period.start.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  if (daysElapsed === 0) {
    return {
      projectedSpend: currentSpendingRate * totalDays,
      projectedVariance: 0,
      willExceed: false,
    };
  }

  const dailyRate = budget.spent / daysElapsed;
  const projectedSpend = dailyRate * totalDays;
  const projectedVariance = projectedSpend - budget.allocated;

  return {
    projectedSpend,
    projectedVariance,
    willExceed: projectedSpend > budget.allocated,
  };
};

export const getBudgetSummary = (budgets: Budget[]): {
  total: number;
  totalAllocated: number;
  totalSpent: number;
  totalRemaining: number;
  byStatus: Record<BudgetStatus, number>;
  byCategory: Record<BudgetCategory, { allocated: number; spent: number }>;
  overBudget: number;
} => {
  const totals = calculateTotalBudget(budgets);
  const byStatus = budgets.reduce(
    (acc, budget) => {
      if (!acc[budget.status]) {
        acc[budget.status] = 0;
      }
      acc[budget.status]++;
      return acc;
    },
    {} as Record<BudgetStatus, number>
  );

  const byCategory = getBudgetsByCategory(budgets);
  const categoryTotals: Record<BudgetCategory, { allocated: number; spent: number }> = {
    labor: { allocated: 0, spent: 0 },
    equipment: { allocated: 0, spent: 0 },
    fertilizer: { allocated: 0, spent: 0 },
    pesticides: { allocated: 0, spent: 0 },
    irrigation: { allocated: 0, spent: 0 },
    maintenance: { allocated: 0, spent: 0 },
    certification: { allocated: 0, spent: 0 },
    other: { allocated: 0, spent: 0 },
  };

  Object.keys(byCategory).forEach((category) => {
    const budgets = byCategory[category as BudgetCategory];
    categoryTotals[category as BudgetCategory] = {
      allocated: budgets.reduce((sum, b) => sum + b.allocated, 0),
      spent: budgets.reduce((sum, b) => sum + b.spent, 0),
    };
  });

  return {
    total: budgets.length,
    totalAllocated: totals.allocated,
    totalSpent: totals.spent,
    totalRemaining: totals.remaining,
    byStatus: {
      "on-track": byStatus["on-track"] || 0,
      "over-budget": byStatus["over-budget"] || 0,
      "under-budget": byStatus["under-budget"] || 0,
    },
    byCategory: categoryTotals,
    overBudget: getOverBudgetItems(budgets).length,
  };
};

export const formatBudgetCategory = (category: BudgetCategory): string => {
  const labels: Record<BudgetCategory, string> = {
    labor: "Labor",
    equipment: "Equipment",
    fertilizer: "Fertilizer",
    pesticides: "Pesticides",
    irrigation: "Irrigation",
    maintenance: "Maintenance",
    certification: "Certification",
    other: "Other",
  };
  return labels[category];
};

