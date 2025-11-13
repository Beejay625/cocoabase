import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createTraceabilityRecord,
  type TraceabilityRecord,
} from '@/lib/onchain-farm-supply-chain-traceability-utils';

/**
 * Hook for onchain farm supply chain traceability
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmSupplyChainTraceability() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<TraceabilityRecord[]>([]);

  const recordMovement = async (
    productId: string,
    fromLocation: string,
    toLocation: string,
    timestamp: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const record = createTraceabilityRecord(address, productId, fromLocation, toLocation, timestamp);
    setRecords([...records, record]);
  };

  const verifyChain = async (
    contractAddress: Address,
    productId: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifyChain',
      args: [productId],
    });
  };

  return { records, recordMovement, verifyChain, address };
}

