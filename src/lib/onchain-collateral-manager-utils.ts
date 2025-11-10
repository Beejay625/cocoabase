import { type Address } from 'viem';

export interface CollateralManager {
  id: bigint;
  collateralToken: Address;
  debtToken: Address;
  collateralRatio: number;
  liquidations: bigint;
}

export function createCollateralManager(
  collateralToken: Address,
  debtToken: Address,
  collateralRatio: number
): CollateralManager {
  return {
    id: BigInt(0),
    collateralToken,
    debtToken,
    collateralRatio,
    liquidations: BigInt(0),
  };
}
