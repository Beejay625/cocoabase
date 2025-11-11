import { type Address } from 'viem';

export interface LaborJob {
  id: bigint;
  employer: Address;
  jobTitle: string;
  wage: bigint;
  duration: bigint;
  postedDate: bigint;
  status: 'open' | 'filled' | 'closed';
  txHash: string;
}

export function postJob(
  employer: Address,
  jobTitle: string,
  wage: bigint,
  duration: bigint
): LaborJob {
  return {
    id: BigInt(Date.now()),
    employer,
    jobTitle,
    wage,
    duration,
    postedDate: BigInt(Date.now()),
    status: 'open',
    txHash: '',
  };
}
