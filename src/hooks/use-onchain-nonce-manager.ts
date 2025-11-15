import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createNonceManager,
  getNextNonce,
  isNonceUsed,
  type NonceManager,
} from '@/lib/onchain-nonce-manager-utils';

export function useOnchainNonceManager() {
  const { address } = useAccount();
  const [managers, setManagers] = useState<NonceManager[]>([]);

  const getNonce = (managerId: bigint): bigint => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const manager = managers.find((m) => m.id === managerId);
    if (!manager) throw new Error('Nonce manager not found');
    const { manager: updated, nonce } = getNextNonce(manager);
    setManagers((prev) =>
      prev.map((m) => (m.id === managerId ? updated : m))
    );
    return nonce;
  };

  return {
    managers,
    getNonce,
    isNonceUsed,
    address,
  };
}



