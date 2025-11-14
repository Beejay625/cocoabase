import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createOwnershipRecord,
  type OwnershipRecord,
} from '@/lib/onchain-farm-livestock-blockchain-ownership-utils';

/**
 * Hook for onchain farm livestock blockchain ownership
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmLivestockBlockchainOwnership() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<OwnershipRecord[]>([]);

  const transferOwnership = async (
    animalId: string,
    fromOwner: Address,
    toOwner: Address,
    transferDate: bigint,
    transferType: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const record = createOwnershipRecord(address, animalId, fromOwner, toOwner, transferDate, transferType);
    setRecords([...records, record]);
  };

  const verifyOwnership = async (
    contractAddress: Address,
    recordId: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifyOwnership',
      args: [recordId],
    });
  };

  return { records, transferOwnership, verifyOwnership, address };
}

