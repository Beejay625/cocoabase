import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createVaccinationRecord,
  type VaccinationRecord,
} from '@/lib/onchain-farm-livestock-vaccination-utils';

/**
 * Hook for onchain farm livestock vaccination
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmLivestockVaccination() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<VaccinationRecord[]>([]);

  const recordVaccination = async (
    animalId: string,
    vaccineType: string,
    vaccinationDate: bigint,
    nextDueDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const record = createVaccinationRecord(address, animalId, vaccineType, vaccinationDate, nextDueDate);
    setRecords([...records, record]);
  };

  const verifyVaccination = async (
    contractAddress: Address,
    recordId: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifyVaccination',
      args: [recordId],
    });
  };

  return { records, recordVaccination, verifyVaccination, address };
}

