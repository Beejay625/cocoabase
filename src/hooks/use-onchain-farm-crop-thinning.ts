import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createThinningRecord,
  type ThinningRecord,
} from '@/lib/onchain-farm-crop-thinning-utils';

export function useOnchainFarmCropThinning() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<ThinningRecord[]>([]);

  const recordThinning = async (
    contractAddress: Address,
    plantationId: bigint,
    plantsThinned: bigint,
    reason: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const record = createThinningRecord(address, plantationId, plantsThinned, reason);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'plantationId', type: 'uint256' },
            { name: 'plantsThinned', type: 'uint256' },
            { name: 'reason', type: 'string' }
          ],
          name: 'recordThinning',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'recordThinning',
      args: [plantationId, plantsThinned, reason],
    });
    
    setRecords([...records, record]);
  };

  return { records, recordThinning, address };
}
