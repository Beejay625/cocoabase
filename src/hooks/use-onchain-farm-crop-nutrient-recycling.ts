import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createRecyclingActivity,
  type RecyclingActivity,
} from '@/lib/onchain-farm-crop-nutrient-recycling-utils';

export function useOnchainFarmCropNutrientRecycling() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [activities, setActivities] = useState<RecyclingActivity[]>([]);

  const createActivity = async (
    contractAddress: Address,
    fieldId: bigint,
    recyclingMethod: string,
    nutrientRecovered: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const activity = createRecyclingActivity(
      address,
      fieldId,
      recyclingMethod,
      nutrientRecovered
    );
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'fieldId', type: 'uint256' },
            { name: 'recyclingMethod', type: 'string' },
            { name: 'nutrientRecovered', type: 'uint256' }
          ],
          name: 'createActivity',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'createActivity',
      args: [fieldId, recyclingMethod, nutrientRecovered],
    });
    
    setActivities([...activities, activity]);
  };

  return { 
    activities, 
    createActivity, 
    address 
  };
}


