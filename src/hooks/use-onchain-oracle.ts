import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  getOraclePrice,
  type OraclePrice,
} from '@/lib/onchain-oracle-utils';

export function useOnchainOracle(token: Address) {
  const { address } = useAccount();
  const [price, setPrice] = useState<OraclePrice | null>(null);

  useEffect(() => {
    // Fetch oracle price
    if (token) {
      getOraclePrice({ address: token, token, latestRound: BigInt(0), decimals: 18 })
        .then(setPrice);
    }
  }, [token]);

  return { price, address };
}

