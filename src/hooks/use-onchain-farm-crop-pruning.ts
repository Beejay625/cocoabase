import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createPruningRecord,
  type PruningRecord,
} from '@/lib/onchain-farm-crop-pruning-utils';

export function useOnchainFarmCropPruning() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<PruningRecord[]>([]);

  const recordPruning = async (
    contractAddress: Address,
    plantationId: bigint,
    treesPruned: bigint,
    pruningType: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const record = createPruningRecord(address, plantationId, treesPruned, pruningType);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'plantationId', type: 'uint256' },
            { name: 'treesPruned', type: 'uint256' },
            { name: 'pruningType', type: 'string' }
          ],
          name: 'recordPruning',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'recordPruning',
      args: [plantationId, treesPruned, pruningType],
    });
    
    setRecords([...records, record]);
  };

  return { records, recordPruning, address };
}
