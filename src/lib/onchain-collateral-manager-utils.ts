import { type Address } from 'viem';

export interface CollateralManager {
  id: bigint;
  collateralToken: Address;
  debtToken: Address;
  liquidationThreshold: number;
  collateralRatio: number;
}

export function createCollateralManager(
  collateralToken: Address,
  debtToken: Address,
  liquidationThreshold: number
): CollateralManager {
  return {
    id: BigInt(0),
    collateralToken,
    debtToken,
    liquidationThreshold,
    collateralRatio: 0,
  };
}

