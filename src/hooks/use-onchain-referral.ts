import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createReferral,
  type Referral,
} from '@/lib/onchain-referral-utils';

export function useOnchainReferral() {
  const { address } = useAccount();
  const [referrals, setReferrals] = useState<Referral[]>([]);

  const createReferralLink = async (): Promise<string> => {
    if (!address) throw new Error('Wallet not connected');
    return `ref:${address}`;
  };

  return { referrals, createReferralLink, address };
}

