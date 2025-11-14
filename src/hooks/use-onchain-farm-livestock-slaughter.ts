import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createSlaughterRecord,
  type SlaughterRecord,
} from '@/lib/onchain-farm-livestock-slaughter-utils';

export function useOnchainFarmLivestockSlaughter() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<SlaughterRecord[]>([]);

  const recordSlaughter = async (
    contractAddress: Address,
    livestockId: bigint,
    method: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const record = createSlaughterRecord(address, livestockId, method);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'livestockId', type: 'uint256' },
            { name: 'method', type: 'string' }
          ],
          name: 'recordSlaughter',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'recordSlaughter',
      args: [livestockId, method],
    });
    
    setRecords([...records, record]);
  };

  return { records, recordSlaughter, address };
}
