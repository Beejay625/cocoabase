import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createDispute,
  type Dispute,
} from '@/lib/onchain-dispute-utils';

export function useOnchainDispute() {
  const { address } = useAccount();
  const [disputes, setDisputes] = useState<Dispute[]>([]);

  const fileDispute = async (
    escrowId: bigint,
    respondent: Address,
    reason: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    console.log('Filing dispute:', { escrowId, respondent, reason });
  };

  return { disputes, fileDispute, address };
}

