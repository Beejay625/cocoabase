import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createOrganicMatterReading,
  type OrganicMatterReading,
} from '@/lib/onchain-farm-soil-organic-matter-tracking-utils';

export function useOnchainFarmSoilOrganicMatterTracking() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [readings, setReadings] = useState<OrganicMatterReading[]>([]);

  const recordReading = async (
    contractAddress: Address,
    fieldId: bigint,
    organicMatterPercentage: bigint,
    depth: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const reading = createOrganicMatterReading(
      address,
      fieldId,
      organicMatterPercentage,
      depth
    );
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'fieldId', type: 'uint256' },
            { name: 'organicMatterPercentage', type: 'uint256' },
            { name: 'depth', type: 'uint256' }
          ],
          name: 'recordReading',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'recordReading',
      args: [fieldId, organicMatterPercentage, depth],
    });
    
    setReadings([...readings, reading]);
  };

  return { 
    readings, 
    recordReading, 
    address 
  };
}

