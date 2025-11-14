import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createTraceabilityLink,
  type TraceabilityLink,
} from '@/lib/onchain-farm-crop-harvest-traceability-utils';

/**
 * Hook for onchain farm crop harvest traceability
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmCropHarvestTraceability() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [links, setLinks] = useState<TraceabilityLink[]>([]);

  const createLink = async (
    harvestId: string,
    previousLocation: string,
    currentLocation: string,
    transferDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const link = createTraceabilityLink(address, harvestId, previousLocation, currentLocation, transferDate);
    setLinks([...links, link]);
  };

  const verifyTraceability = async (
    contractAddress: Address,
    linkId: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifyTraceability',
      args: [linkId],
    });
  };

  return { links, createLink, verifyTraceability, address };
}

