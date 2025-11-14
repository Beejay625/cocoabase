import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createCoverCropSystem,
  type CoverCropSystem,
} from '@/lib/onchain-farm-crop-cover-crop-management-utils';

export function useOnchainFarmCropCoverCropManagement() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [systems, setSystems] = useState<CoverCropSystem[]>([]);

  const createSystem = async (
    contractAddress: Address,
    fieldId: bigint,
    coverCropType: string,
    terminationDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const system = createCoverCropSystem(
      address,
      fieldId,
      coverCropType,
      terminationDate
    );
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'fieldId', type: 'uint256' },
            { name: 'coverCropType', type: 'string' },
            { name: 'terminationDate', type: 'uint256' }
          ],
          name: 'createSystem',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'createSystem',
      args: [fieldId, coverCropType, terminationDate],
    });
    
    setSystems([...systems, system]);
  };

  return { 
    systems, 
    createSystem, 
    address 
  };
}

