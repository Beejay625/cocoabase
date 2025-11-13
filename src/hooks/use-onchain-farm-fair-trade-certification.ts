import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createFairTradeCert,
  type FairTradeCertification,
} from '@/lib/onchain-farm-fair-trade-certification-utils';

/**
 * Hook for onchain farm fair trade certification
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmFairTradeCertification() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [certifications, setCertifications] = useState<FairTradeCertification[]>([]);

  const applyForCertification = async (
    plantationId: string,
    certBody: string,
    standards: string[],
    applicationDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const cert = createFairTradeCert(address, plantationId, certBody, standards, applicationDate);
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

