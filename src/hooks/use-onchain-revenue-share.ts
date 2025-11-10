import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createRevenueShare,
  addShareholder,
  recordRevenue,
  calculateShareholderShare,
  type RevenueShare,
} from '@/lib/onchain-revenue-share-utils';

export function useOnchainRevenueShare() {
  const { address } = useAccount();
  const [shares, setShares] = useState<RevenueShare[]>([]);

  const addShares = (
    shareId: bigint,
    shareholder: Address,
    sharesAmount: bigint
  ) => {
    const share = shares.find((s) => s.id === shareId);
    if (!share) throw new Error('Revenue share not found');
    const updated = addShareholder(share, shareholder, sharesAmount);
    setShares((prev) =>
      prev.map((s) => (s.id === shareId ? updated : s))
    );
    console.log('Adding shareholder:', { shareId, shareholder, sharesAmount });
  };

  return {
    shares,
    addShares,
    recordRevenue,
    calculateShareholderShare,
    address,
  };
}
