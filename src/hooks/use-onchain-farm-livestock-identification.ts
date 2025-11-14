import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createIdentification,
  type LivestockIdentification,
} from '@/lib/onchain-farm-livestock-identification-utils';

/**
 * Hook for onchain farm livestock identification
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmLivestockIdentification() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [identifications, setIdentifications] = useState<LivestockIdentification[]>([]);

  const identifyAnimal = async (
    animalId: string,
    identificationType: string,
    identificationNumber: string,
    identificationDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const identification = createIdentification(address, animalId, identificationType, identificationNumber, identificationDate);
    setIdentifications([...identifications, identification]);
  };

  const verifyIdentification = async (
    contractAddress: Address,
    identificationId: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifyIdentification',
      args: [identificationId],
    });
  };

  return { identifications, identifyAnimal, verifyIdentification, address };
}

