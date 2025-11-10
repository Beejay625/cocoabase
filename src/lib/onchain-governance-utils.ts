import { type Address } from 'viem';

export interface GovernanceProposal {
  id: bigint;
  proposer: Address;
  title: string;
  description: string;
  votesFor: bigint;
  votesAgainst: bigint;
  status: 'active' | 'passed' | 'rejected' | 'executed';
  startTime: bigint;
  endTime: bigint;
  quorum: bigint;
}

