import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  type NFTListing,
} from '@/lib/onchain-nft-marketplace-utils';

export function useOnchainNFTMarketplace() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [listings, setListings] = useState<NFTListing[]>([]);

  const listNFT = async (
    nft: Address,
    tokenId: bigint,
    price: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: '0x0000000000000000000000000000000000000000' as Address,
      abi: [],
      functionName: 'listNFT',
      args: [nft, tokenId, price],
    });
  };

  return { listings, listNFT, address };
}
