export type ExpenseCategory = 
  | "labor"
  | "equipment"
  | "fertilizer"
  | "pesticides"
  | "irrigation"
  | "transportation"
  | "maintenance"
  | "certification"
  | "utilities"
  | "other";

export interface Expense {
  id: string;
  category: ExpenseCategory;
  description: string;
  amount: number;
  currency: string;
  date: Date;
  plantationId?: string;
  receipt?: string;
  notes?: string;
  tags?: string[];
}

export const calculateTotalExpenses = (
  expenses: Expense[],
  startDate?: Date,
  endDate?: Date
): number => {
  const filtered = expenses.filter((expense) => {
    if (startDate && expense.date < startDate) return false;
    if (endDate && expense.date > endDate) return false;
    return true;
  });

  return filtered.reduce((sum, expense) => sum + expense.amount, 0);
};

export const getExpensesByCategory = (
  expenses: Expense[]
): Record<ExpenseCategory, Expense[]> => {
  return expenses.reduce(
    (acc, expense) => {
      if (!acc[expense.category]) {
        acc[expense.category] = [];
      }
      acc[expense.category].push(expense);
      return acc;
    },
    {
      labor: [],
      equipment: [],
      fertilizer: [],
      pesticides: [],
      irrigation: [],
      transportation: [],
      maintenance: [],
      certification: [],
      utilities: [],
      other: [],
    } as Record<ExpenseCategory, Expense[]>
  );
};

export const getMonthlyExpenses = (
  expenses: Expense[],
  year: number,
  month: number
): Expense[] => {
  return expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getFullYear() === year && expenseDate.getMonth() === month;
  });
};

export const calculateAverageMonthlyExpense = (expenses: Expense[]): number => {
  if (expenses.length === 0) return 0;

  const monthlyTotals = new Map<string, number>();
  expenses.forEach((expense) => {
    const key = `${expense.date.getFullYear()}-${expense.date.getMonth()}`;
    monthlyTotals.set(key, (monthlyTotals.get(key) || 0) + expense.amount);
  });

  const totals = Array.from(monthlyTotals.values());
  return totals.reduce((sum, total) => sum + total, 0) / totals.length;
};

export const getExpenseTrend = (
  expenses: Expense[],
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
    return expenses
      .filter((expense) => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= period.start && expenseDate <= period.end;
      })
      .reduce((sum, expense) => sum + expense.amount, 0);
  });

  if (periodTotals.length < 2) return "stable";

  const recent = periodTotals[0];
  const older = periodTotals[periodTotals.length - 1];

  if (older === 0) return "stable";

  const diff = ((recent - older) / older) * 100;

  if (diff > 10) return "increasing";
  if (diff < -10) return "decreasing";
  return "stable";
};

export const getExpenseSummary = (expenses: Expense[]): {
  total: number;
  totalAmount: number;
  averageMonthly: number;
  byCategory: Record<ExpenseCategory, number>;
  receiptCount: number;
  trend: "increasing" | "decreasing" | "stable";
} => {
  const byCategory = getExpensesByCategory(expenses);
  const categoryTotals: Record<ExpenseCategory, number> = {
    labor: 0,
    equipment: 0,
    fertilizer: 0,
    pesticides: 0,
    irrigation: 0,
    transportation: 0,
    maintenance: 0,
    certification: 0,
    utilities: 0,
    other: 0,
  };

  Object.keys(byCategory).forEach((category) => {
    categoryTotals[category as ExpenseCategory] = byCategory[
      category as ExpenseCategory
    ].reduce((sum, expense) => sum + expense.amount, 0);
  });

  const receiptCount = expenses.filter((expense) => expense.receipt).length;

  return {
    total: expenses.length,
    totalAmount: calculateTotalExpenses(expenses),
    averageMonthly: calculateAverageMonthlyExpense(expenses),
    byCategory: categoryTotals,
    receiptCount,
    trend: getExpenseTrend(expenses),
  };
};

export const formatExpenseCategory = (category: ExpenseCategory): string => {
  const labels: Record<ExpenseCategory, string> = {
    labor: "Labor",
    equipment: "Equipment",
    fertilizer: "Fertilizer",
    pesticides: "Pesticides",
    irrigation: "Irrigation",
    transportation: "Transportation",
    maintenance: "Maintenance",
    certification: "Certification",
    utilities: "Utilities",
    other: "Other",
  };
  return labels[category];
};

