import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createWasteRecord,
  type LivestockWasteRecord,
} from '@/lib/onchain-farm-livestock-waste-management-utils';

/**
 * Hook for onchain farm livestock waste management
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmLivestockWasteManagement() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<LivestockWasteRecord[]>([]);

  const recordWaste = async (
    animalId: string,
    wasteType: string,
    amount: bigint,
    collectionDate: bigint,
    disposalMethod: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const record = createWasteRecord(address, animalId, wasteType, amount, collectionDate, disposalMethod);
    setRecords([...records, record]);
  };

  const verifyWaste = async (
    contractAddress: Address,
    recordId: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifyWaste',
      args: [recordId],
    });
  };

  return { records, recordWaste, verifyWaste, address };
}

