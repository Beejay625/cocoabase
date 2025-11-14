import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createVaccinationRecord,
  type VaccinationRecord,
} from '@/lib/onchain-farm-livestock-vaccination-records-utils';

/**
 * Hook for onchain farm livestock vaccination records
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmLivestockVaccinationRecords() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<VaccinationRecord[]>([]);

  const recordVaccination = async (
    animalId: string,
    vaccineType: string,
    vaccinationDate: bigint,
    veterinarian: string,
    batchNumber: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const record = createVaccinationRecord(address, animalId, vaccineType, vaccinationDate, veterinarian, batchNumber);
    setRecords([...records, record]);
  };

  const verifyVaccination = async (
    contractAddress: Address,
    recordId: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifyVaccination',
      args: [recordId],
    });
  };

  return { records, recordVaccination, verifyVaccination, address };
}

