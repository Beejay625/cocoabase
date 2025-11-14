import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createLockRecord,
  type LockRecord,
} from '@/lib/onchain-farm-livestock-blockchain-lock-utils';

/**
 * Hook for onchain farm livestock blockchain lock
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmLivestockBlockchainLock() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<LockRecord[]>([]);

  const lock = async (
    animalId: string,
    lockReason: string,
    lockDate: bigint,
    unlockDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const record = createLockRecord(address, animalId, lockReason, lockDate, unlockDate);
    setRecords([...records, record]);
  };

  const unlock = async (
    contractAddress: Address,
    recordId: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'unlock',
      args: [recordId],
    });
  };

  return { records, lock, unlock, address };
}

