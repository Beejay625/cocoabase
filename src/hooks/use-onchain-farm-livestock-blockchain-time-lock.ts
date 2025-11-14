import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createTimeLock,
  type TimeLock,
} from '@/lib/onchain-farm-livestock-blockchain-time-lock-utils';

/**
 * Hook for onchain farm livestock blockchain time lock
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmLivestockBlockchainTimeLock() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [locks, setLocks] = useState<TimeLock[]>([]);

  const lock = async (
    animalId: string,
    lockAmount: bigint,
    unlockTime: bigint,
    lockDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const timeLock = createTimeLock(address, animalId, lockAmount, unlockTime, lockDate);
    setLocks([...locks, timeLock]);
  };

  const unlock = async (
    contractAddress: Address,
    lockId: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'unlock',
      args: [lockId],
    });
  };

  return { locks, lock, unlock, address };
}

