import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createEfficiencyRecord,
  type IrrigationEfficiency,
} from '@/lib/onchain-farm-crop-irrigation-efficiency-utils';

/**
 * Hook for onchain farm crop irrigation efficiency
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmCropIrrigationEfficiency() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<IrrigationEfficiency[]>([]);

  const recordEfficiency = async (
    plantationId: string,
    waterApplied: bigint,
    waterUsed: bigint,
    efficiencyDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const record = createEfficiencyRecord(address, plantationId, waterApplied, waterUsed, efficiencyDate);
    setRecords([...records, record]);
  };

  const calculateEfficiency = async (
    contractAddress: Address,
    recordId: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'calculateEfficiency',
      args: [recordId],
    });
  };

  return { records, recordEfficiency, calculateEfficiency, address };
}

