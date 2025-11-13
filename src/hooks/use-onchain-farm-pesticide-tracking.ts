import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createPesticideRecord,
  type PesticideRecord,
} from '@/lib/onchain-farm-pesticide-tracking-utils';

/**
 * Hook for onchain farm pesticide tracking
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmPesticideTracking() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<PesticideRecord[]>([]);

  const recordApplication = async (
    plantationId: string,
    pesticideType: string,
    amount: bigint,
    applicationDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const record = createPesticideRecord(address, plantationId, pesticideType, amount, applicationDate);
    setRecords([...records, record]);
  };

  const verifyApplication = async (
    contractAddress: Address,
    recordId: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifyApplication',
      args: [recordId],
    });
  };

  return { records, recordApplication, verifyApplication, address };
}

