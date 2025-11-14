import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createBatchCertification,
  type BatchCertification,
} from '@/lib/onchain-farm-crop-harvest-batch-certification-utils';

/**
 * Hook for onchain farm crop harvest batch certification
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmCropHarvestBatchCertification() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [certifications, setCertifications] = useState<BatchCertification[]>([]);

  const certifyBatch = async (
    batchId: string,
    certificationType: string,
    certifyingBody: string,
    certificationDate: bigint,
    certificateNumber: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const certification = createBatchCertification(address, batchId, certificationType, certifyingBody, certificationDate, certificateNumber);
    setCertifications([...certifications, certification]);
  };

  const verifyCertification = async (
    contractAddress: Address,
    certificationId: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifyCertification',
      args: [certificationId],
    });
  };

  return { certifications, certifyBatch, verifyCertification, address };
}

