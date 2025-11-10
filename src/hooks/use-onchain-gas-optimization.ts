import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  optimizeGasUsage,
  calculateGasEfficiency,
  type GasOptimization,
} from '@/lib/onchain-gas-optimization-utils';

export function useOnchainGasOptimization() {
  const { address } = useAccount();
  const [optimizations, setOptimizations] = useState<GasOptimization[]>([]);

  const optimize = (
    contract: Address,
    functionName: string,
    gasBefore: bigint,
    gasAfter: bigint
  ) => {
    const optimization = optimizeGasUsage(contract, functionName, gasBefore, gasAfter);
    setOptimizations((prev) => [...prev, optimization]);
    console.log('Optimizing gas usage:', optimization);
  };

  return {
    optimizations,
    optimize,
    calculateGasEfficiency,
    address,
  };
}

