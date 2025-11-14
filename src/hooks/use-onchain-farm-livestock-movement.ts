import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createMovementRecord,
  type LivestockMovement,
} from '@/lib/onchain-farm-livestock-movement-utils';

/**
 * Hook for onchain farm livestock movement tracking
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmLivestockMovement() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [movements, setMovements] = useState<LivestockMovement[]>([]);

  const recordMovement = async (
    animalId: string,
    fromLocation: string,
    toLocation: string,
    movementDate: bigint,
    reason: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const movement = createMovementRecord(address, animalId, fromLocation, toLocation, movementDate, reason);
    setMovements([...movements, movement]);
  };

  const verifyMovement = async (
    contractAddress: Address,
    movementId: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifyMovement',
      args: [movementId],
    });
  };

  return { movements, recordMovement, verifyMovement, address };
}

