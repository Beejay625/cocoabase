import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createFactory,
  deployInstance,
  calculateDeploymentCost,
  type FactoryContract,
} from '@/lib/onchain-factory-utils';

export function useOnchainFactory() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [factories, setFactories] = useState<FactoryContract[]>([]);
  const [isDeploying, setIsDeploying] = useState(false);

  const createNewFactory = async (
    template: Address,
    creationFee: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    setIsDeploying(true);
    try {
      const factory = createFactory(address, template, creationFee);
      console.log('Creating factory:', factory);
    } finally {
      setIsDeploying(false);
    }
  };

  return {
    factories,
    createNewFactory,
    deployInstance,
    calculateDeploymentCost,
    isDeploying,
    address,
  };
}

