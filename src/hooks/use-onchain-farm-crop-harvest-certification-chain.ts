import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createCertificationLink,
  type CertificationChain,
} from '@/lib/onchain-farm-crop-harvest-certification-chain-utils';

/**
 * Hook for onchain farm crop harvest certification chain
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmCropHarvestCertificationChain() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [chains, setChains] = useState<CertificationChain[]>([]);

  const linkCertification = async (
    harvestId: string,
    previousCertId: string,
    newCertId: string,
    linkDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const chain = createCertificationLink(address, harvestId, previousCertId, newCertId, linkDate);
    setChains([...chains, chain]);
  };

  const verifyChain = async (
    contractAddress: Address,
    chainId: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifyChain',
      args: [chainId],
    });
  };

  return { chains, linkCertification, verifyChain, address };
}

