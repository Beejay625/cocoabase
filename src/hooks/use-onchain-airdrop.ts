import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createAirdrop,
  claimAirdrop,
  activateAirdrop,
  type Airdrop,
} from '@/lib/onchain-airdrop-utils';

export function useOnchainAirdrop() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [airdrops, setAirdrops] = useState<Airdrop[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  const createNewAirdrop = async (
    token: Address,
    totalAmount: bigint,
    merkleRoot: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    setIsCreating(true);
    try {
      const airdrop = createAirdrop(address, token, totalAmount, merkleRoot);
      console.log('Creating airdrop:', airdrop);
    } finally {
      setIsCreating(false);
    }
  };

  return {
    airdrops,
    createNewAirdrop,
    claimAirdrop,
    activateAirdrop,
    isCreating,
    address,
  };
}

