import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createNonceRecord,
  type NonceRecord,
} from '@/lib/onchain-farm-crop-harvest-blockchain-nonce-utils';

/**
 * Hook for onchain farm crop harvest blockchain nonce
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmCropHarvestBlockchainNonce() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<NonceRecord[]>([]);

  const createNonce = async (
    harvestId: string,
    nonceValue: bigint,
    nonceDate: bigint,
    purpose: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const record = createNonceRecord(address, harvestId, nonceValue, nonceDate, purpose);
    setRecords([...records, record]);
  };

  const useNonce = async (
    contractAddress: Address,
    recordId: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'useNonce',
      args: [recordId],
    });
  };

  return { records, createNonce, useNonce, address };
}

