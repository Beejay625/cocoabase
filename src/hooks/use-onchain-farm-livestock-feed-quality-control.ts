import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createQualityTest,
  type QualityTest,
} from '@/lib/onchain-farm-livestock-feed-quality-control-utils';

export function useOnchainFarmLivestockFeedQualityControl() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [qualityTests, setQualityTests] = useState<QualityTest[]>([]);

  const performTest = async (
    contractAddress: Address,
    feedBatchId: bigint,
    proteinContent: bigint,
    moistureContent: bigint,
    contaminationLevel: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const test = createQualityTest(
      address,
      feedBatchId,
      proteinContent,
      moistureContent,
      contaminationLevel
    );
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'feedBatchId', type: 'uint256' },
            { name: 'proteinContent', type: 'uint256' },
            { name: 'moistureContent', type: 'uint256' },
            { name: 'contaminationLevel', type: 'uint256' }
          ],
          name: 'performQualityTest',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'performQualityTest',
      args: [feedBatchId, proteinContent, moistureContent, contaminationLevel],
    });
    
    setQualityTests([...qualityTests, test]);
  };

  return { 
    qualityTests, 
    performTest, 
    address 
  };
}

