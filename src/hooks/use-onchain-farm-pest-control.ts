import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createPestControlRecord,
  type PestControlRecord,
} from '@/lib/onchain-farm-pest-control-utils';

/**
 * Hook for onchain farm pest control
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmPestControl() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [pestControlRecords, setPestControlRecords] = useState<PestControlRecord[]>([]);

  const recordPestControl = async (
    contractAddress: Address,
    cropId: bigint,
    pestType: string,
    controlMethod: string,
    treatmentDate: bigint,
    effectiveness: bigint,
    notes: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const record = createPestControlRecord(address, cropId, pestType, controlMethod, treatmentDate, effectiveness, notes);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'cropId', type: 'uint256' },
            { name: 'pestType', type: 'string' },
            { name: 'controlMethod', type: 'string' },
            { name: 'treatmentDate', type: 'uint256' },
            { name: 'effectiveness', type: 'uint256' },
            { name: 'notes', type: 'string' }
          ],
          name: 'recordPestControl',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'recordPestControl',
      args: [cropId, pestType, controlMethod, treatmentDate, effectiveness, notes],
    });
    
    setPestControlRecords([...pestControlRecords, record]);
  };

  const updateEffectiveness = async (
    contractAddress: Address,
    recordId: bigint,
    effectiveness: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'recordId', type: 'uint256' },
            { name: 'effectiveness', type: 'uint256' }
          ],
          name: 'updateEffectiveness',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'updateEffectiveness',
      args: [recordId, effectiveness],
    });
  };

  return { 
    pestControlRecords, 
    recordPestControl,
    updateEffectiveness,
    address 
  };
}

