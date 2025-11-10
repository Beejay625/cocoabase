import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createGovernanceToken,
  delegateVotes,
  getVotes,
  getCurrentVotes,
  type GovernanceToken,
} from '@/lib/onchain-governance-token-utils';

export function useOnchainGovernanceToken() {
  const { address } = useAccount();
  const [tokens, setTokens] = useState<GovernanceToken[]>([]);

  const delegate = (
    tokenId: bigint,
    delegatee: Address,
    balance: bigint
  ) => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const token = tokens.find((t) => t.id === tokenId);
    if (!token) throw new Error('Token not found');
    const updated = delegateVotes(token, address, delegatee, balance);
    setTokens((prev) =>
      prev.map((t) => (t.id === tokenId ? updated : t))
    );
    console.log('Delegating votes:', { tokenId, delegatee, balance });
  };

  return {
    tokens,
    delegate,
    getVotes,
    getCurrentVotes,
    address,
  };
}
