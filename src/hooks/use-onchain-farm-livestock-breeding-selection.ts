import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createSelectionDecision,
  type SelectionDecision,
} from '@/lib/onchain-farm-livestock-breeding-selection-utils';

export function useOnchainFarmLivestockBreedingSelection() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [decisions, setDecisions] = useState<SelectionDecision[]>([]);

  const makeDecision = async (
    contractAddress: Address,
    parent1Id: bigint,
    parent2Id: bigint,
    selectionCriteria: string,
    expectedOutcome: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const decision = createSelectionDecision(
      address,
      parent1Id,
      parent2Id,
      selectionCriteria,
      expectedOutcome
    );
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'parent1Id', type: 'uint256' },
            { name: 'parent2Id', type: 'uint256' },
            { name: 'selectionCriteria', type: 'string' },
            { name: 'expectedOutcome', type: 'uint256' }
          ],
          name: 'makeDecision',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'makeDecision',
      args: [parent1Id, parent2Id, selectionCriteria, expectedOutcome],
    });
    
    setDecisions([...decisions, decision]);
  };

  return { 
    decisions, 
    makeDecision, 
    address 
  };
}

