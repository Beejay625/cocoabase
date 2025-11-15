import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createCircuitBreaker,
  type CircuitBreaker,
} from '@/lib/onchain-farm-crop-harvest-blockchain-circuit-breaker-utils';

/**
 * Hook for onchain farm crop harvest blockchain circuit breaker
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmCropHarvestBlockchainCircuitBreaker() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [breakers, setBreakers] = useState<CircuitBreaker[]>([]);

  const trip = async (
    harvestId: string,
    threshold: bigint,
    tripDate: bigint,
    reason: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const breaker = createCircuitBreaker(address, harvestId, threshold, tripDate, reason);
    setBreakers([...breakers, breaker]);
  };

  const reset = async (
    contractAddress: Address,
    breakerId: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'reset',
      args: [breakerId],
    });
  };

  return { breakers, trip, reset, address };
}



