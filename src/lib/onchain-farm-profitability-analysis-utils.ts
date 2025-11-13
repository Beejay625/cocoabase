import { type Address } from 'viem';

export interface ProfitabilityReport {
  id: string;
  reportId: bigint;
  farmOwner: Address;
  revenue: bigint;
  costs: bigint;
  profit: bigint;
  profitMargin: bigint;
  periodStart: bigint;
  periodEnd: bigint;
  reportDate: bigint;
}

export function createProfitabilityReport(
  farmOwner: Address,
  reportId: bigint,
  revenue: bigint,
  costs: bigint,
  periodStart: bigint,
  periodEnd: bigint
): ProfitabilityReport {
  const profit = revenue > costs ? revenue - costs : BigInt(0);
  const profitMargin = revenue > BigInt(0) ? (profit * BigInt(10000)) / revenue : BigInt(0);

  return {
    id: `${Date.now()}-${Math.random()}`,
    reportId,
    farmOwner,
    revenue,
    costs,
    profit,
    profitMargin,
    periodStart,
    periodEnd,
    reportDate: BigInt(Date.now()),
  };
}
