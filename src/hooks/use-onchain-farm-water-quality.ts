import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createQualityTest,
  type QualityTest,
} from '@/lib/onchain-farm-water-quality-utils';

export function useOnchainFarmWaterQuality() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [tests, setTests] = useState<QualityTest[]>([]);

  const recordTest = async (
    contractAddress: Address,
    sourceId: bigint,
    phLevel: bigint,
    turbidity: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const test = createQualityTest(address, sourceId, phLevel, turbidity);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'sourceId', type: 'uint256' },
            { name: 'phLevel', type: 'uint256' },
            { name: 'turbidity', type: 'uint256' }
          ],
          name: 'recordTest',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'recordTest',
      args: [sourceId, phLevel, turbidity],
    });
    
    setTests([...tests, test]);
  };

  return { tests, recordTest, address };
}

