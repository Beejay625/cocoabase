import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createCarbonSequestration,
  type CarbonSequestration,
} from '@/lib/onchain-farm-soil-carbon-sequestration-utils';

/**
 * Hook for onchain farm soil carbon sequestration tracking
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmSoilCarbonSequestration() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [sequestrations, setSequestrations] = useState<CarbonSequestration[]>([]);

  const recordSequestration = async (
    plantationId: string,
    carbonAmount: bigint,
    method: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const sequestration = createCarbonSequestration(address, plantationId, carbonAmount, method);
    setSequestrations([...sequestrations, sequestration]);
  };

  const verifySequestration = async (
    contractAddress: Address,
    sequestrationId: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifySequestration',
      args: [sequestrationId],
    });
  };

  return { sequestrations, recordSequestration, verifySequestration, address };
}

