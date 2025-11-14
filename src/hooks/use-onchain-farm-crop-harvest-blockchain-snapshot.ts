import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createSnapshot,
  type Snapshot,
} from '@/lib/onchain-farm-crop-harvest-blockchain-snapshot-utils';

/**
 * Hook for onchain farm crop harvest blockchain snapshot
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmCropHarvestBlockchainSnapshot() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);

  const takeSnapshot = async (
    harvestId: string,
    snapshotHash: string,
    snapshotDate: bigint,
    blockNumber: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const snapshot = createSnapshot(address, harvestId, snapshotHash, snapshotDate, blockNumber);
    setSnapshots([...snapshots, snapshot]);
  };

  const verifySnapshot = async (
    contractAddress: Address,
    snapshotId: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifySnapshot',
      args: [snapshotId],
    });
  };

  return { snapshots, takeSnapshot, verifySnapshot, address };
}

