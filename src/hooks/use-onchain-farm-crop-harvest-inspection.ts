import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createInspection,
  type HarvestInspection,
} from '@/lib/onchain-farm-crop-harvest-inspection-utils';

/**
 * Hook for onchain farm crop harvest inspection
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmCropHarvestInspection() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [inspections, setInspections] = useState<HarvestInspection[]>([]);

  const performInspection = async (
    harvestId: string,
    inspector: string,
    inspectionType: string,
    findings: string[],
    inspectionDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const inspection = createInspection(address, harvestId, inspector, inspectionType, findings, inspectionDate);
    setInspections([...inspections, inspection]);
  };

  const approveInspection = async (
    contractAddress: Address,
    inspectionId: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'approveInspection',
      args: [inspectionId],
    });
  };

  return { inspections, performInspection, approveInspection, address };
}

