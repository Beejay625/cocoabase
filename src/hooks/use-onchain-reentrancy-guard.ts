import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createReentrancyGuard,
  lock,
  unlock,
  isLocked,
  type ReentrancyGuard,
} from '@/lib/onchain-reentrancy-guard-utils';

export function useOnchainReentrancyGuard() {
  const { address } = useAccount();
  const [guards, setGuards] = useState<ReentrancyGuard[]>([]);

  const acquireLock = (guardId: bigint): boolean => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const guard = guards.find((g) => g.id === guardId);
    if (!guard) throw new Error('Reentrancy guard not found');
    const updated = lock(guard);
    if (updated) {
      setGuards((prev) =>
        prev.map((g) => (g.id === guardId ? updated : g))
      );
      return true;
    }
    return false;
  };

  return {
    guards,
    acquireLock,
    unlock,
    isLocked,
    address,
  };
}

