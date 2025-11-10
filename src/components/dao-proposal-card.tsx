'use client';

import { type Proposal } from '@/lib/dao-utils';
import { isProposalPassed } from '@/lib/dao-utils';

interface DAOProposalCardProps {
  proposal: Proposal;
}

export function DAOProposalCard({ proposal }: DAOProposalCardProps) {
  const passed = isProposalPassed(proposal);
  const totalVotes = proposal.votesFor + proposal.votesAgainst;

  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold">Proposal #{proposal.id.toString()}</h3>
        <span className={`px-2 py-1 rounded text-xs ${
          passed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {proposal.executed ? 'Executed' : passed ? 'Passed' : 'Active'}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-3">{proposal.description}</p>
      <div className="flex gap-4 text-sm">
        <span>For: {proposal.votesFor.toString()}</span>
        <span>Against: {proposal.votesAgainst.toString()}</span>
        <span>Total: {totalVotes.toString()}</span>
      </div>
    </div>
  );
}

