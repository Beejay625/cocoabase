import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createIdentificationRecord,
  type IdentificationRecord,
} from '@/lib/onchain-farm-livestock-identification-utils';

export function useOnchainFarmLivestockIdentification() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<IdentificationRecord[]>([]);

  const recordIdentification = async (
    contractAddress: Address,
    livestockId: bigint,
    tagNumber: string,
    identificationType: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const record = createIdentificationRecord(address, livestockId, tagNumber, identificationType);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'livestockId', type: 'uint256' },
            { name: 'tagNumber', type: 'string' },
            { name: 'identificationType', type: 'string' }
          ],
          name: 'recordIdentification',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'recordIdentification',
      args: [livestockId, tagNumber, identificationType],
    });
    
    setRecords([...records, record]);
  };

  return { records, recordIdentification, address };
}
