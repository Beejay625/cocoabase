import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  postJob,
  type LaborJob,
} from '@/lib/onchain-farm-labor-marketplace-utils';

export function useOnchainFarmLaborMarketplace() {
  const { address } = useAccount();
  const [jobs, setJobs] = useState<LaborJob[]>([]);

  const post = async (
    jobTitle: string,
    wage: bigint,
    duration: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const job = postJob(address, jobTitle, wage, duration);
    setJobs([...jobs, job]);
  };

  return { jobs, post, address };
}
