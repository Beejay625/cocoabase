import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createSeedCertification,
  type SeedCertification,
} from '@/lib/onchain-farm-seed-certification-utils';

/**
 * Hook for onchain farm seed certification
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmSeedCertification() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [certifications, setCertifications] = useState<SeedCertification[]>([]);

  const certifySeed = async (
    seedId: string,
    seedType: string,
    certificationStandard: string,
    expiryDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const cert = createSeedCertification(address, seedId, seedType, certificationStandard, expiryDate);
    setCertifications([...certifications, cert]);
  };

  const verifyCertification = async (
    contractAddress: Address,
    certId: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifyCertification',
      args: [certId],
    });
  };

  return { certifications, certifySeed, verifyCertification, address };
}

