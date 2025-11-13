import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  createMarketAccess,
  type MarketAccess,
} from '@/lib/onchain-agricultural-market-access-utils';

export function useOnchainAgriculturalMarketAccess() {
  const { address } = useAccount();
  const [accesses, setAccesses] = useState<MarketAccess[]>([]);

  const create = async (
    market: string,
    accessLevel: 'full' | 'limited' | 'restricted'
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const access = createMarketAccess(address, market, accessLevel);
    setAccesses([...accesses, access]);
  };

  return { accesses, create, address };
}
