import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createRateLimiter,
  checkRateLimit,
  type RateLimiter,
} from '@/lib/onchain-rate-limiter-utils';

export function useOnchainRateLimiter() {
  const { address } = useAccount();
  const [limiters, setLimiters] = useState<RateLimiter[]>([]);

  const check = (limiterId: bigint): boolean => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const currentTime = BigInt(Date.now());
    const limiter = limiters.find((l) => l.id === limiterId);
    if (!limiter) throw new Error('Rate limiter not found');
    const { limiter: updated, allowed } = checkRateLimit(limiter, currentTime);
    setLimiters((prev) =>
      prev.map((l) => (l.id === limiterId ? updated : l))
    );
    return allowed;
  };

  return {
    limiters,
    check,
    address,
  };
}

