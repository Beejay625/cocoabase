import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createPollinationRecord,
  type PollinationRecord,
} from '@/lib/onchain-farm-crop-pollination-utils';

export function useOnchainFarmCropPollination() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<PollinationRecord[]>([]);

  const recordPollination = async (
    contractAddress: Address,
    plantationId: bigint,
    pollinatorType: string,
    natural: boolean
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const record = createPollinationRecord(address, plantationId, pollinatorType, natural);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'plantationId', type: 'uint256' },
            { name: 'pollinatorType', type: 'string' },
            { name: 'natural', type: 'bool' }
          ],
          name: 'recordPollination',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'recordPollination',
      args: [plantationId, pollinatorType, natural],
    });
    
    setRecords([...records, record]);
  };

  return { records, recordPollination, address };
}
