import { type Address } from 'viem';

export interface GovernanceProposal {
  id: bigint;
  proposer: Address;
  title: string;
  description: string;
  votesFor: bigint;
  votesAgainst: bigint;
  status: 'active' | 'passed' | 'rejected';
  deadline: bigint;
  txHash: string;
}

export function createProposal(
  proposer: Address,
  title: string,
  description: string,
  deadline: bigint
): GovernanceProposal {
  return {
    id: BigInt(Date.now()),
    proposer,
    title,
    description,
    votesFor: BigInt(0),
    votesAgainst: BigInt(0),
    status: 'active',
    deadline,
    txHash: '',
  };
}
