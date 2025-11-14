import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createIrrigationRecord,
  type IrrigationRecord,
} from '@/lib/onchain-farm-irrigation-efficiency-utils';

/**
 * Hook for onchain farm irrigation efficiency
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmIrrigationEfficiency() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [irrigationRecords, setIrrigationRecords] = useState<IrrigationRecord[]>([]);

  const recordIrrigation = async (
    contractAddress: Address,
    location: string,
    waterUsed: bigint,
    areaIrrigated: bigint,
    irrigationMethod: string,
    cropType: string,
    cropYield: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const record = createIrrigationRecord(address, location, waterUsed, areaIrrigated, irrigationMethod, cropType, cropYield);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'location', type: 'string' },
            { name: 'waterUsed', type: 'uint256' },
            { name: 'areaIrrigated', type: 'uint256' },
            { name: 'irrigationMethod', type: 'string' },
            { name: 'cropType', type: 'string' },
            { name: 'cropYield', type: 'uint256' }
          ],
          name: 'recordIrrigation',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'recordIrrigation',
      args: [location, waterUsed, areaIrrigated, irrigationMethod, cropType, cropYield],
    });
    
    setIrrigationRecords([...irrigationRecords, record]);
  };

  return { 
    irrigationRecords, 
    recordIrrigation,
    address 
  };
}

