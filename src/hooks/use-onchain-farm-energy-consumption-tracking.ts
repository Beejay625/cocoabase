import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createEnergyConsumption,
  type EnergyConsumption,
} from '@/lib/onchain-farm-energy-consumption-tracking-utils';

/**
 * Hook for onchain farm energy consumption tracking
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmEnergyConsumptionTracking() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [consumptions, setConsumptions] = useState<EnergyConsumption[]>([]);

  const recordConsumption = async (
    plantationId: string,
    energyType: string,
    amount: bigint,
    cost: bigint,
    period: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const consumption = createEnergyConsumption(address, plantationId, energyType, amount, cost, period);
    setConsumptions([...consumptions, consumption]);
  };

  const verifyConsumption = async (
    contractAddress: Address,
    consumptionId: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifyConsumption',
      args: [consumptionId],
    });
  };

  return { consumptions, recordConsumption, verifyConsumption, address };
}
