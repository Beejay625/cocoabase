import { type Address } from 'viem';

export interface LaborJob {
  id: bigint;
  employer: Address;
  jobTitle: string;
  wage: bigint;
  duration: bigint;
  status: 'open' | 'filled' | 'closed';
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

export function fillJob(job: LaborJob): LaborJob {
  return {
    ...job,
    status: 'filled',
  };
}

export function getOpenJobs(jobs: LaborJob[]): LaborJob[] {
  return jobs.filter((j) => j.status === 'open');
}

export function calculateTotalWage(job: LaborJob): bigint {
  return job.wage * job.duration;
}
