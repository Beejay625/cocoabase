import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createMilkingRecord,
  type MilkingRecord,
} from '@/lib/onchain-farm-livestock-milking-utils';

/**
 * Hook for onchain farm livestock milking
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmLivestockMilking() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<MilkingRecord[]>([]);

  const recordMilking = async (
    animalId: string,
    milkAmount: bigint,
    milkingTime: bigint,
    quality: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const record = createMilkingRecord(address, animalId, milkAmount, milkingTime, quality);
    setRecords([...records, record]);
  };

  const verifyMilking = async (
    contractAddress: Address,
    recordId: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifyMilking',
      args: [recordId],
    });
  };

  return { records, recordMilking, verifyMilking, address };
}

