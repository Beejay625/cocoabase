import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createCollateralManager,
  calculateCollateralRatio,
  isLiquidatable,
  liquidatePosition,
  type CollateralManager,
  type CollateralPosition,
} from '@/lib/onchain-collateral-manager-utils';

export function useOnchainCollateralManager() {
  const { address } = useAccount();
  const [managers, setManagers] = useState<CollateralManager[]>([]);
  const [positions, setPositions] = useState<CollateralPosition[]>([]);

  const checkLiquidation = (
    managerId: bigint,
    positionId: number
  ): boolean => {
    const manager = managers.find((m) => m.id === managerId);
    const position = positions[positionId];
    if (!manager || !position) return false;
    return isLiquidatable(position, manager);
  };

  return {
    managers,
    positions,
    checkLiquidation,
    calculateCollateralRatio,
    liquidatePosition,
    address,
  };
}
