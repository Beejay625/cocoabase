import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createReproductionRecord,
  type ReproductionRecord,
} from '@/lib/onchain-farm-livestock-reproduction-utils';

/**
 * Hook for onchain farm livestock reproduction
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmLivestockReproduction() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<ReproductionRecord[]>([]);

  const recordReproduction = async (
    sireId: string,
    damId: string,
    matingDate: bigint,
    expectedCalvingDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const record = createReproductionRecord(address, sireId, damId, matingDate, expectedCalvingDate);
    setRecords([...records, record]);
  };

  const recordBirth = async (
    contractAddress: Address,
    recordId: string,
    offspringId: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'recordBirth',
      args: [recordId, offspringId],
    });
  };

  return { records, recordReproduction, recordBirth, address };
}

