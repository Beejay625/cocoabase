import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createGraftingRecord,
  type GraftingRecord,
} from '@/lib/onchain-farm-crop-grafting-utils';

export function useOnchainFarmCropGrafting() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<GraftingRecord[]>([]);

  const recordGrafting = async (
    contractAddress: Address,
    plantationId: bigint,
    rootstockType: string,
    scionType: string,
    graftsPerformed: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const record = createGraftingRecord(address, plantationId, rootstockType, scionType, graftsPerformed);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'plantationId', type: 'uint256' },
            { name: 'rootstockType', type: 'string' },
            { name: 'scionType', type: 'string' },
            { name: 'graftsPerformed', type: 'uint256' }
          ],
          name: 'recordGrafting',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'recordGrafting',
      args: [plantationId, rootstockType, scionType, graftsPerformed],
    });
    
    setRecords([...records, record]);
  };

  return { records, recordGrafting, address };
}

