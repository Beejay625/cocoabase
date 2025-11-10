import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createFractionalNFT,
  type FractionalNFT,
} from '@/lib/onchain-fractional-utils';

export function useOnchainFractional() {
  const { address } = useAccount();
  const [fractionals, setFractionals] = useState<FractionalNFT[]>([]);

  const createFractional = async (
    nft: Address,
    tokenId: bigint,
    shares: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    console.log('Creating fractional NFT:', { nft, tokenId, shares });
  };

  return { fractionals, createFractional, address };
}

