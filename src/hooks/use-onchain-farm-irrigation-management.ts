import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createIrrigationSchedule,
  type IrrigationSchedule,
} from '@/lib/onchain-farm-irrigation-management-utils';

export function useOnchainFarmIrrigationManagement() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [schedules, setSchedules] = useState<IrrigationSchedule[]>([]);

  const createSchedule = async (
    contractAddress: Address,
    plantationId: bigint,
    waterAmount: bigint,
    frequency: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const schedule = createIrrigationSchedule(address, plantationId, waterAmount, frequency);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'plantationId', type: 'uint256' },
            { name: 'waterAmount', type: 'uint256' },
            { name: 'frequency', type: 'uint256' }
          ],
          name: 'createSchedule',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'createSchedule',
      args: [plantationId, waterAmount, frequency],
    });
    
    setSchedules([...schedules, schedule]);
  };

  const completeIrrigation = async (
    contractAddress: Address,
    scheduleId: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [{ name: 'scheduleId', type: 'uint256' }],
          name: 'completeIrrigation',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'completeIrrigation',
      args: [scheduleId],
    });
  };

  return { schedules, createSchedule, completeIrrigation, address };
}

