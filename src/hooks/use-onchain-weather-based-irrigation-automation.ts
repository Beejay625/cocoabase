import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createIrrigationAutomation,
  triggerIrrigation,
  shouldIrrigate,
  type IrrigationAutomation,
} from '@/lib/onchain-weather-based-irrigation-automation-utils';

/**
 * Hook for onchain weather-based irrigation automation operations
 * Requires Reown wallet connection via useAccount
 */
export function useOnchainWeatherBasedIrrigationAutomation() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [automations, setAutomations] = useState<IrrigationAutomation[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  const createAutomation = async (
    fieldId: string,
    weatherThreshold: number,
    soilMoistureThreshold: number,
    irrigationAmount: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    setIsCreating(true);
    try {
      const automation = createIrrigationAutomation(
        address,
        fieldId,
        weatherThreshold,
        soilMoistureThreshold,
        irrigationAmount
      );
      setAutomations((prev) => [...prev, automation]);
      await writeContract({
        address: '0x0000000000000000000000000000000000000000' as Address,
        abi: [],
        functionName: 'createIrrigationAutomation',
        args: [fieldId, weatherThreshold, soilMoistureThreshold, irrigationAmount],
      });
    } finally {
      setIsCreating(false);
    }
  };

  return {
    automations,
    createAutomation,
    triggerIrrigation,
    shouldIrrigate,
    isCreating,
    address,
  };
}

