import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createRoyalty,
  type Royalty,
} from '@/lib/onchain-royalty-utils';

export function useOnchainRoyalty() {
  const { address } = useAccount();
  const [royalties, setRoyalties] = useState<Royalty[]>([]);

  const setRoyalty = async (
    nft: Address,
    tokenId: bigint,
    percentage: number
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    console.log('Setting royalty:', { nft, tokenId, percentage });
  };

  return { royalties, setRoyalty, address };
}

