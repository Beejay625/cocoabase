import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createCheckpoint,
  type Checkpoint,
} from '@/lib/onchain-farm-livestock-blockchain-checkpoint-utils';

/**
 * Hook for onchain farm livestock blockchain checkpoint
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmLivestockBlockchainCheckpoint() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);

  const createCheckpoint = async (
    animalId: string,
    checkpointHash: string,
    checkpointDate: bigint,
    state: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const checkpoint = createCheckpoint(address, animalId, checkpointHash, checkpointDate, state);
    setCheckpoints([...checkpoints, checkpoint]);
  };

  const verifyCheckpoint = async (
    contractAddress: Address,
    checkpointId: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifyCheckpoint',
      args: [checkpointId],
    });
  };

  return { checkpoints, createCheckpoint, verifyCheckpoint, address };
}



