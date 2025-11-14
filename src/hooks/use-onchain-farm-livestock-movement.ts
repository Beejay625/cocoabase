import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createMovementRecord,
  type MovementRecord,
} from '@/lib/onchain-farm-livestock-movement-utils';

export function useOnchainFarmLivestockMovement() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<MovementRecord[]>([]);

  const recordMovement = async (
    contractAddress: Address,
    livestockId: bigint,
    fromLocation: string,
    toLocation: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const record = createMovementRecord(address, livestockId, fromLocation, toLocation);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'livestockId', type: 'uint256' },
            { name: 'fromLocation', type: 'string' },
            { name: 'toLocation', type: 'string' }
          ],
          name: 'recordMovement',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'recordMovement',
      args: [livestockId, fromLocation, toLocation],
    });
    
    setRecords([...records, record]);
  };

  return { records, recordMovement, address };
}
