import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createQuarantineRecord,
  type QuarantineRecord,
} from '@/lib/onchain-farm-livestock-quarantine-utils';

/**
 * Hook for onchain farm livestock quarantine
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmLivestockQuarantine() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<QuarantineRecord[]>([]);

  const recordQuarantine = async (
    animalId: string,
    quarantineStartDate: bigint,
    quarantineEndDate: bigint,
    reason: string,
    location: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const record = createQuarantineRecord(address, animalId, quarantineStartDate, quarantineEndDate, reason, location);
    setRecords([...records, record]);
  };

  const releaseFromQuarantine = async (
    contractAddress: Address,
    recordId: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'releaseFromQuarantine',
      args: [recordId],
    });
  };

  return { records, recordQuarantine, releaseFromQuarantine, address };
}

