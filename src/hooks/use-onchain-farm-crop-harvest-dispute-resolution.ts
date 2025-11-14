import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createDispute as createDisputeRecord,
  type Dispute,
} from '@/lib/onchain-farm-crop-harvest-dispute-resolution-utils';

/**
 * Hook for onchain farm crop harvest dispute resolution
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmCropHarvestDisputeResolution() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [disputes, setDisputes] = useState<Dispute[]>([]);

  const createDispute = async (
    harvestId: string,
    disputant: Address,
    disputeReason: string,
    disputeDate: bigint,
    requestedResolution: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const dispute = createDisputeRecord(address, harvestId, disputant, disputeReason, disputeDate, requestedResolution);
    setDisputes([...disputes, dispute]);
  };

  const resolveDispute = async (
    contractAddress: Address,
    disputeId: string,
    resolution: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'resolveDispute',
      args: [disputeId, resolution],
    });
  };

  return { disputes, createDispute, resolveDispute, address };
}

