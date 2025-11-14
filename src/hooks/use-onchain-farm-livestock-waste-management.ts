import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createWasteProcessing,
  type WasteProcessing,
} from '@/lib/onchain-farm-livestock-waste-management-utils';

export function useOnchainFarmLivestockWasteManagement() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [processings, setProcessings] = useState<WasteProcessing[]>([]);

  const recordProcessing = async (
    contractAddress: Address,
    livestockId: bigint,
    processingMethod: string,
    wasteAmount: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const processing = createWasteProcessing(
      address,
      livestockId,
      processingMethod,
      wasteAmount
    );
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'livestockId', type: 'uint256' },
            { name: 'processingMethod', type: 'string' },
            { name: 'wasteAmount', type: 'uint256' }
          ],
          name: 'recordProcessing',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'recordProcessing',
      args: [livestockId, processingMethod, wasteAmount],
    });
    
    setProcessings([...processings, processing]);
  };

  return { 
    processings, 
    recordProcessing, 
    address 
  };
}
