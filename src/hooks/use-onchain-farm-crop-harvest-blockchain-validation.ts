import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createValidationRecord,
  type ValidationRecord,
} from '@/lib/onchain-farm-crop-harvest-blockchain-validation-utils';

/**
 * Hook for onchain farm crop harvest blockchain validation
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmCropHarvestBlockchainValidation() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<ValidationRecord[]>([]);

  const validate = async (
    harvestId: string,
    validator: Address,
    validationType: string,
    validationDate: bigint,
    result: boolean
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const record = createValidationRecord(address, harvestId, validator, validationType, validationDate, result);
    setRecords([...records, record]);
  };

  const confirmValidation = async (
    contractAddress: Address,
    recordId: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'confirmValidation',
      args: [recordId],
    });
  };

  return { records, validate, confirmValidation, address };
}

