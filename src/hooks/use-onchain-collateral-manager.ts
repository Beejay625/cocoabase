import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createCollateralManager,
  addCollateral,
  isLiquidatable,
  type CollateralManager,
  type CollateralPosition,
} from '@/lib/onchain-collateral-manager-utils';

export function useOnchainCollateralManager() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [managers, setManagers] = useState<CollateralManager[]>([]);
  const [positions, setPositions] = useState<CollateralPosition[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  const add = async (
    managerId: bigint,
    collateral: bigint,
    debt: bigint,
    collateralPrice: bigint,
    debtPrice: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    setIsAdding(true);
    try {
      const manager = managers.find((m) => m.id === managerId);
      if (!manager) throw new Error('Manager not found');
      const result = addCollateral(manager, address, collateral, debt, collateralPrice, debtPrice);
      console.log('Adding collateral:', result);
    } finally {
      setIsAdding(false);
    }
  };

  return {
    managers,
    positions,
    add,
    isLiquidatable,
    isAdding,
    address,
  };
}

