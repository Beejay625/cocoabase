import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createAllowlist,
  addToAllowlist,
  removeFromAllowlist,
  isAllowed,
  type Allowlist,
} from '@/lib/onchain-allowlist-utils';

export function useOnchainAllowlist() {
  const { address } = useAccount();
  const [allowlists, setAllowlists] = useState<Allowlist[]>([]);

  const createNewAllowlist = (
    name: string,
    merkleRoot: string,
    maxSize: number
  ) => {
    const allowlist = createAllowlist(name, merkleRoot, maxSize);
    setAllowlists((prev) => [...prev, allowlist]);
    console.log('Creating allowlist:', allowlist);
  };

  return {
    allowlists,
    createNewAllowlist,
    addToAllowlist,
    removeFromAllowlist,
    isAllowed,
    address,
  };
}

