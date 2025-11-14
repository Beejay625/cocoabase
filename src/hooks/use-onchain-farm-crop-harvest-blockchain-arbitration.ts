import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createArbitration,
  type Arbitration,
} from '@/lib/onchain-farm-crop-harvest-blockchain-arbitration-utils';

/**
 * Hook for onchain farm crop harvest blockchain arbitration
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmCropHarvestBlockchainArbitration() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [arbitrations, setArbitrations] = useState<Arbitration[]>([]);

  const createArbitration = async (
    harvestId: string,
    dispute: string,
    parties: Address[],
    arbitrator: Address,
    arbitrationDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const arbitration = createArbitration(address, harvestId, dispute, parties, arbitrator, arbitrationDate);
    setArbitrations([...arbitrations, arbitration]);
  };

  const resolveArbitration = async (
    contractAddress: Address,
    arbitrationId: string,
    resolution: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'resolveArbitration',
      args: [arbitrationId, resolution],
    });
  };

  return { arbitrations, createArbitration, resolveArbitration, address };
}

