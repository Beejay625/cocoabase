import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  calculateVoteWeight,
  type VotingProposal,
  type Vote,
} from '@/lib/onchain-voting-utils';

export function useOnchainVoting() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [isVoting, setIsVoting] = useState(false);

  const vote = async (
    proposalId: bigint,
    support: boolean
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    setIsVoting(true);
    try {
      // Onchain vote via smart contract using Reown wallet
      await writeContract({
        address: '0x0000000000000000000000000000000000000000' as Address,
        abi: [],
        functionName: 'vote',
        args: [proposalId, support],
      });
    } finally {
      setIsVoting(false);
    }
  };

  return { vote, isVoting, address };
}

