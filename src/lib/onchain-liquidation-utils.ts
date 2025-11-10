import { type Address } from 'viem';

/**
 * Onchain liquidation utilities
 * Liquidation system for undercollateralized positions
 */

export interface Liquidation {
  id: bigint;
  position: Address;
  collateral: Address;
  debt: Address;
  collateralAmount: bigint;
  debtAmount: bigint;
  liquidator: Address | null;
}

export function isLiquidatable(
  liquidation: Liquidation,
  collateralValue: bigint,
  debtValue: bigint,
  threshold: number = 150
): boolean {
  if (debtValue === BigInt(0)) return false;
  const ratio = (Number(collateralValue) / Number(debtValue)) * 100;
  return ratio < threshold;
}

export function calculateLiquidationBonus(
  collateralValue: bigint,
  bonusPercent: number = 5
): bigint {
  return (collateralValue * BigInt(bonusPercent)) / BigInt(100);
}
