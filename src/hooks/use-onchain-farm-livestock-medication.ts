import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createMedicationRecord,
  type MedicationRecord,
} from '@/lib/onchain-farm-livestock-medication-utils';

/**
 * Hook for onchain farm livestock medication
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmLivestockMedication() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<MedicationRecord[]>([]);

  const recordMedication = async (
    animalId: string,
    medicationType: string,
    dosage: bigint,
    administrationDate: bigint,
    veterinarian: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const record = createMedicationRecord(address, animalId, medicationType, dosage, administrationDate, veterinarian);
    setRecords([...records, record]);
  };

  const verifyMedication = async (
    contractAddress: Address,
    recordId: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifyMedication',
      args: [recordId],
    });
  };

  return { records, recordMedication, verifyMedication, address };
}

