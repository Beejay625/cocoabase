import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createMaturityRecord,
  type MaturityRecord,
} from '@/lib/onchain-farm-crop-maturity-utils';

export function useOnchainFarmCropMaturity() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<MaturityRecord[]>([]);

  const recordMaturity = async (
    contractAddress: Address,
    plantationId: bigint,
    maturityStage: string,
    harvestReady: boolean
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const record = createMaturityRecord(address, plantationId, maturityStage, harvestReady);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'plantationId', type: 'uint256' },
            { name: 'maturityStage', type: 'string' },
            { name: 'harvestReady', type: 'bool' }
          ],
          name: 'recordMaturity',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'recordMaturity',
      args: [plantationId, maturityStage, harvestReady],
    });
    
    setRecords([...records, record]);
  };

  return { records, recordMaturity, address };
}

