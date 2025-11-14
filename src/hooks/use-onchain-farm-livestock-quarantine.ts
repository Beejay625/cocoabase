import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createQuarantineRecord,
  type QuarantineRecord,
} from '@/lib/onchain-farm-livestock-quarantine-utils';

export function useOnchainFarmLivestockQuarantine() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<QuarantineRecord[]>([]);

  const startQuarantine = async (
    contractAddress: Address,
    livestockId: bigint,
    duration: bigint,
    reason: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const record = createQuarantineRecord(address, livestockId, duration, reason);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'livestockId', type: 'uint256' },
            { name: 'duration', type: 'uint256' },
            { name: 'reason', type: 'string' }
          ],
          name: 'startQuarantine',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'startQuarantine',
      args: [livestockId, duration, reason],
    });
    
    setRecords([...records, record]);
  };

  const releaseQuarantine = async (
    contractAddress: Address,
    recordId: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [{ name: 'recordId', type: 'uint256' }],
          name: 'releaseQuarantine',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'releaseQuarantine',
      args: [recordId],
    });
  };

  return { records, startQuarantine, releaseQuarantine, address };
}
