import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createConsumptionRecord,
  type ConsumptionRecord,
} from '@/lib/onchain-farm-livestock-feed-consumption-utils';

/**
 * Hook for onchain farm livestock feed consumption
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmLivestockFeedConsumption() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<ConsumptionRecord[]>([]);

  const recordConsumption = async (
    animalId: string,
    feedType: string,
    amount: bigint,
    consumptionDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const record = createConsumptionRecord(address, animalId, feedType, amount, consumptionDate);
    setRecords([...records, record]);
  };

  const updateConsumption = async (
    contractAddress: Address,
    recordId: string,
    newAmount: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'updateConsumption',
      args: [recordId, newAmount],
    });
  };

  return { records, recordConsumption, updateConsumption, address };
}

