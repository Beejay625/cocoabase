import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createBlacklist,
  addToBlacklist,
  isBlacklisted,
  type Blacklist,
} from '@/lib/onchain-blacklist-utils';

export function useOnchainBlacklist() {
  const { address } = useAccount();
  const [blacklists, setBlacklists] = useState<Blacklist[]>([]);

  const add = (blacklistId: bigint, addressToAdd: Address) => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const blacklist = blacklists.find((b) => b.id === blacklistId);
    if (!blacklist) throw new Error('Blacklist not found');
    const updated = addToBlacklist(blacklist, addressToAdd);
    setBlacklists((prev) =>
      prev.map((b) => (b.id === blacklistId ? updated : b))
    );
    console.log('Adding to blacklist:', { blacklistId, addressToAdd });
  };

  return {
    blacklists,
    add,
    isBlacklisted,
    address,
  };
}

