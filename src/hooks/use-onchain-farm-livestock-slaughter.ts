import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createSlaughterRecord,
  type SlaughterRecord,
} from '@/lib/onchain-farm-livestock-slaughter-utils';

/**
 * Hook for onchain farm livestock slaughter
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmLivestockSlaughter() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<SlaughterRecord[]>([]);

  const recordSlaughter = async (
    animalId: string,
    slaughterDate: bigint,
    slaughterhouse: string,
    certification: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const record = createSlaughterRecord(address, animalId, slaughterDate, slaughterhouse, certification);
    setRecords([...records, record]);
  };

  const verifySlaughter = async (
    contractAddress: Address,
    recordId: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifySlaughter',
      args: [recordId],
    });
  };

  return { records, recordSlaughter, verifySlaughter, address };
}

