import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createHarvestSchedule,
  type HarvestSchedule,
} from '@/lib/onchain-farm-harvest-scheduling-utils';

/**
 * Hook for onchain farm harvest scheduling
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmHarvestScheduling() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [harvestSchedules, setHarvestSchedules] = useState<HarvestSchedule[]>([]);

  const scheduleHarvest = async (
    contractAddress: Address,
    cropId: bigint,
    cropType: string,
    scheduledDate: bigint,
    estimatedYield: bigint,
    location: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const schedule = createHarvestSchedule(address, cropId, cropType, scheduledDate, estimatedYield, location);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'cropId', type: 'uint256' },
            { name: 'cropType', type: 'string' },
            { name: 'scheduledDate', type: 'uint256' },
            { name: 'estimatedYield', type: 'uint256' },
            { name: 'location', type: 'string' }
          ],
          name: 'scheduleHarvest',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'scheduleHarvest',
      args: [cropId, cropType, scheduledDate, estimatedYield, location],
    });
    
    setHarvestSchedules([...harvestSchedules, schedule]);
  };

  const completeHarvest = async (
    contractAddress: Address,
    scheduleId: bigint,
    actualYield: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'scheduleId', type: 'uint256' },
            { name: 'actualYield', type: 'uint256' }
          ],
          name: 'completeHarvest',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'completeHarvest',
      args: [scheduleId, actualYield],
    });
  };

  const cancelHarvest = async (
    contractAddress: Address,
    scheduleId: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [{ name: 'scheduleId', type: 'uint256' }],
          name: 'cancelHarvest',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'cancelHarvest',
      args: [scheduleId],
    });
  };

  return { 
    harvestSchedules, 
    scheduleHarvest,
    completeHarvest,
    cancelHarvest,
    address 
  };
}
