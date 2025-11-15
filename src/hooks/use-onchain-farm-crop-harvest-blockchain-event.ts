import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createEventRecord,
  type EventRecord,
} from '@/lib/onchain-farm-crop-harvest-blockchain-event-utils';

/**
 * Hook for onchain farm crop harvest blockchain event
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmCropHarvestBlockchainEvent() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<EventRecord[]>([]);

  const emitEvent = async (
    harvestId: string,
    eventType: string,
    eventData: string,
    eventDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const record = createEventRecord(address, harvestId, eventType, eventData, eventDate);
    setRecords([...records, record]);
  };

  const verifyEvent = async (
    contractAddress: Address,
    recordId: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifyEvent',
      args: [recordId],
    });
  };

  return { records, emitEvent, verifyEvent, address };
}



