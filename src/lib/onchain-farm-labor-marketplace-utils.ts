import { type Address } from 'viem';

export interface LaborJob {
  id: bigint;
  employer: Address;
  jobTitle: string;
  wage: bigint;
  duration: bigint;
  status: 'open' | 'filled' | 'cancelled';
}

export function createJob(
  employer: Address,
  jobTitle: string,
  wage: bigint,
  duration: bigint
): LaborJob {
  return {
    id: BigInt(0),
    employer,
    jobTitle,
    wage,
    duration,
    status: 'open',
  };
}
