import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createQualityCheck,
  type QualityCheck,
} from '@/lib/onchain-farm-quality-assurance-utils';

export function useOnchainFarmQualityAssurance() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [checks, setChecks] = useState<QualityCheck[]>([]);

  const performQualityCheck = async (
    contractAddress: Address,
    productId: bigint,
    qualityScore: bigint,
    standards: string,
    notes: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const check = createQualityCheck(address, productId, qualityScore, standards, notes);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'productId', type: 'uint256' },
            { name: 'qualityScore', type: 'uint256' },
            { name: 'standards', type: 'string' },
            { name: 'notes', type: 'string' }
          ],
          name: 'performQualityCheck',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'performQualityCheck',
      args: [productId, qualityScore, standards, notes],
    });
    
    setChecks([...checks, check]);
  };

  return { checks, performQualityCheck, address };
}
