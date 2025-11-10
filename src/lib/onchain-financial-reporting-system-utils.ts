import { type Address } from 'viem';

export interface FinancialReport {
  id: bigint;
  owner: Address;
  reportType: 'income' | 'expense' | 'profit' | 'loss';
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  amount: bigint;
  reportDate: bigint;
  txHash: string;
}

export function createFinancialReport(
  owner: Address,
  reportType: FinancialReport['reportType'],
  period: FinancialReport['period'],
  amount: bigint
): FinancialReport {
  return {
    id: BigInt(Date.now()),
    owner,
    reportType,
    period,
    amount,
    reportDate: BigInt(Date.now()),
    txHash: '',
  };
}

export function getReportsByType(
  reports: FinancialReport[],
  reportType: FinancialReport['reportType']
): FinancialReport[] {
  return reports.filter((r) => r.reportType === reportType);
}

export function calculateTotalByPeriod(
  reports: FinancialReport[],
  period: FinancialReport['period']
): bigint {
  return reports
    .filter((r) => r.period === period)
    .reduce((total, r) => total + r.amount, BigInt(0));
}
