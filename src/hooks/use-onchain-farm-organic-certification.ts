import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createOrganicCert,
  type OrganicCertification,
} from '@/lib/onchain-farm-organic-certification-utils';

/**
 * Hook for onchain farm organic certification
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmOrganicCertification() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [certifications, setCertifications] = useState<OrganicCertification[]>([]);

  const applyForCertification = async (
    plantationId: string,
    certBody: string,
    standards: string[],
    applicationDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const cert = createOrganicCert(address, plantationId, certBody, standards, applicationDate);
    setCertifications([...certifications, cert]);
  };

  const approveCertification = async (
    contractAddress: Address,
    certId: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'approveCertification',
      args: [certId],
    });
  };

  return { certifications, applyForCertification, approveCertification, address };
}

