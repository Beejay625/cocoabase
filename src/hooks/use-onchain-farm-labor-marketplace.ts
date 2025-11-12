import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createJob,
  fillJob,
  getOpenJobs,
  calculateTotalWage,
  type LaborJob,
} from '@/lib/onchain-farm-labor-marketplace-utils';

export function useOnchainFarmLaborMarketplace() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [jobs, setJobs] = useState<LaborJob[]>([]);
  const [isPosting, setIsPosting] = useState(false);

  const post = async (
    jobTitle: string,
    wage: bigint,
    duration: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    setIsPosting(true);
    try {
      const job = createJob(address, jobTitle, wage, duration);
      console.log('Posting job:', job);
    } finally {
      setIsPosting(false);
    }
  };

  return {
    jobs,
    post,
    fillJob,
    getOpenJobs,
    calculateTotalWage,
    isPosting,
    address,
  };
}
