import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createCertification,
  type ExportCertification,
} from '@/lib/onchain-farm-export-certification-utils';

/**
 * Hook for onchain farm export certification
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmExportCertification() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [certifications, setCertifications] = useState<ExportCertification[]>([]);

  const applyForCertification = async (
    productId: string,
    destinationCountry: string,
    standards: string[]
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const cert = createCertification(address, productId, destinationCountry, standards);
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

