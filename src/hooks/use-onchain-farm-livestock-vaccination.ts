import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createVaccinationRecord,
  type VaccinationRecord,
} from '@/lib/onchain-farm-livestock-vaccination-utils';

export function useOnchainFarmLivestockVaccination() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<VaccinationRecord[]>([]);

  const recordVaccination = async (
    contractAddress: Address,
    livestockId: bigint,
    vaccineType: string,
    validityPeriod: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const record = createVaccinationRecord(address, livestockId, vaccineType, validityPeriod);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'livestockId', type: 'uint256' },
            { name: 'vaccineType', type: 'string' },
            { name: 'validityPeriod', type: 'uint256' }
          ],
          name: 'recordVaccination',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'recordVaccination',
      args: [livestockId, vaccineType, validityPeriod],
    });
    
    setRecords([...records, record]);
  };

  return { records, recordVaccination, address };
}
