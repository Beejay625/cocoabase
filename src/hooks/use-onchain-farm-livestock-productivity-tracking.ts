import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createProductivityRecord,
  type ProductivityRecord,
} from '@/lib/onchain-farm-livestock-productivity-tracking-utils';

export function useOnchainFarmLivestockProductivityTracking() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<ProductivityRecord[]>([]);

  const recordProductivity = async (
    contractAddress: Address,
    livestockId: bigint,
    productivityType: string,
    amount: bigint,
    period: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const record = createProductivityRecord(
      address,
      livestockId,
      productivityType,
      amount,
      period
    );
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'livestockId', type: 'uint256' },
            { name: 'productivityType', type: 'string' },
            { name: 'amount', type: 'uint256' },
            { name: 'period', type: 'uint256' }
          ],
          name: 'recordProductivity',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'recordProductivity',
      args: [livestockId, productivityType, amount, period],
    });
    
    setRecords([...records, record]);
  };

  return { 
    records, 
    recordProductivity, 
    address 
  };
}


