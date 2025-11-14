import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createMulchingRecord,
  type MulchingRecord,
} from '@/lib/onchain-farm-crop-mulching-utils';

export function useOnchainFarmCropMulching() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<MulchingRecord[]>([]);

  const recordMulching = async (
    contractAddress: Address,
    plantationId: bigint,
    mulchType: string,
    areaMulched: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const record = createMulchingRecord(address, plantationId, mulchType, areaMulched);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'plantationId', type: 'uint256' },
            { name: 'mulchType', type: 'string' },
            { name: 'areaMulched', type: 'uint256' }
          ],
          name: 'recordMulching',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'recordMulching',
      args: [plantationId, mulchType, areaMulched],
    });
    
    setRecords([...records, record]);
  };

  return { records, recordMulching, address };
}

