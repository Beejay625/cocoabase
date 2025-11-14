import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createTransplantRecord,
  type TransplantRecord,
} from '@/lib/onchain-farm-crop-transplanting-utils';

export function useOnchainFarmCropTransplanting() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<TransplantRecord[]>([]);

  const recordTransplant = async (
    contractAddress: Address,
    sourcePlantationId: bigint,
    targetPlantationId: bigint,
    plantsTransplanted: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const record = createTransplantRecord(address, sourcePlantationId, targetPlantationId, plantsTransplanted);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'sourcePlantationId', type: 'uint256' },
            { name: 'targetPlantationId', type: 'uint256' },
            { name: 'plantsTransplanted', type: 'uint256' }
          ],
          name: 'recordTransplant',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'recordTransplant',
      args: [sourcePlantationId, targetPlantationId, plantsTransplanted],
    });
    
    setRecords([...records, record]);
  };

  return { records, recordTransplant, address };
}

