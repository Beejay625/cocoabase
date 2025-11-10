import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createInsurancePolicy,
  type InsurancePolicy,
} from '@/lib/onchain-insurance-utils';

export function useOnchainInsurance() {
  const { address } = useAccount();
  const [policies, setPolicies] = useState<InsurancePolicy[]>([]);

  const purchasePolicy = async (
    coverage: bigint,
    duration: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    console.log('Purchasing insurance:', { coverage, duration });
  };

  return { policies, purchasePolicy, address };
}

