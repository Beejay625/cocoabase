import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createProductionRecord,
  type ProductionRecord,
} from '@/lib/onchain-farm-livestock-production-tracking-utils';

/**
 * Hook for onchain farm livestock production tracking
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmLivestockProductionTracking() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<ProductionRecord[]>([]);

  const recordProduction = async (
    animalId: string,
    productType: string,
    quantity: bigint,
    productionDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const record = createProductionRecord(address, animalId, productType, quantity, productionDate);
    setRecords([...records, record]);
  };

  const verifyProduction = async (
    contractAddress: Address,
    recordId: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifyProduction',
      args: [recordId],
    });
  };

  return { records, recordProduction, verifyProduction, address };
}

