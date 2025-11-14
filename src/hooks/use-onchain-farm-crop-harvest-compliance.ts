import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createComplianceRecord,
  type ComplianceRecord,
} from '@/lib/onchain-farm-crop-harvest-compliance-utils';

/**
 * Hook for onchain farm crop harvest compliance
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmCropHarvestCompliance() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<ComplianceRecord[]>([]);

  const recordCompliance = async (
    harvestId: string,
    standard: string,
    complianceStatus: string,
    auditDate: bigint,
    auditor: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const record = createComplianceRecord(address, harvestId, standard, complianceStatus, auditDate, auditor);
    setRecords([...records, record]);
  };

  const verifyCompliance = async (
    contractAddress: Address,
    recordId: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifyCompliance',
      args: [recordId],
    });
  };

  return { records, recordCompliance, verifyCompliance, address };
}

