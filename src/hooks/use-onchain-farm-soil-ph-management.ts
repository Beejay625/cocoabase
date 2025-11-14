import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createPhReading,
  type PhReading,
} from '@/lib/onchain-farm-soil-ph-management-utils';

export function useOnchainFarmSoilPhManagement() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [phReadings, setPhReadings] = useState<PhReading[]>([]);

  const recordPh = async (
    contractAddress: Address,
    fieldId: bigint,
    phLevel: bigint,
    depth: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const reading = createPhReading(
      address,
      fieldId,
      phLevel,
      depth
    );
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'fieldId', type: 'uint256' },
            { name: 'phLevel', type: 'uint256' },
            { name: 'depth', type: 'uint256' }
          ],
          name: 'recordPh',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'recordPh',
      args: [fieldId, phLevel, depth],
    });
    
    setPhReadings([...phReadings, reading]);
  };

  const adjustPh = async (
    contractAddress: Address,
    readingId: bigint,
    adjustmentMethod: string,
    targetPh: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'readingId', type: 'uint256' },
            { name: 'adjustmentMethod', type: 'string' },
            { name: 'targetPh', type: 'uint256' }
          ],
          name: 'adjustPh',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'adjustPh',
      args: [readingId, adjustmentMethod, targetPh],
    });
  };

  return { 
    phReadings, 
    recordPh, 
    adjustPh, 
    address 
  };
}

