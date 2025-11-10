import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  type Auction,
} from '@/lib/onchain-auction-utils';

export function useOnchainAuction() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [auctions, setAuctions] = useState<Auction[]>([]);

  const placeBid = async (
    auctionId: bigint,
    bidAmount: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: '0x0000000000000000000000000000000000000000' as Address,
      abi: [],
      functionName: 'placeBid',
      args: [auctionId, bidAmount],
    });
  };

  return { auctions, placeBid, address };
}
