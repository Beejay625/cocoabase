import { type Address } from 'viem';

/**
 * Onchain Agricultural Research Grants utilities
 * Manage research grants onchain
 */

export interface ResearchGrant {
  id: bigint;
  grantor: Address;
  grantee: Address;
  title: string;
  description: string;
  amount: bigint;
  duration: bigint;
  status: 'pending' | 'approved' | 'active' | 'completed' | 'cancelled';
  createdAt: bigint;
  startDate?: bigint;
  endDate?: bigint;
  milestones: GrantMilestone[];
}

export interface GrantMilestone {
  id: bigint;
  title: string;
  description: string;
  deadline: bigint;
  reward: bigint;
  status: 'pending' | 'completed' | 'missed';
}

export function createResearchGrant(
  grantor: Address,
  grantee: Address,
  title: string,
  description: string,
  amount: bigint,
  duration: bigint,
  milestones: GrantMilestone[]
): ResearchGrant {
  const now = BigInt(Date.now());
  return {
    id: BigInt(0),
    grantor,
    grantee,
    title,
    description,
    amount,
    duration,
    status: 'pending',
    createdAt: now,
    milestones,
  };
}

export function approveGrant(
  grant: ResearchGrant,
  startDate: bigint
): ResearchGrant {
  const endDate = startDate + grant.duration;
  return {
    ...grant,
    status: 'approved',
    startDate,
    endDate,
  };
}

export function activateGrant(grant: ResearchGrant): ResearchGrant {
  if (grant.status !== 'approved') return grant;
  return {
    ...grant,
    status: 'active',
  };
}

export function completeMilestone(
  grant: ResearchGrant,
  milestoneId: bigint
): ResearchGrant {
  const updatedMilestones = grant.milestones.map((m) =>
    m.id === milestoneId ? { ...m, status: 'completed' as const } : m
  );
  const allCompleted = updatedMilestones.every((m) => m.status === 'completed');
  return {
    ...grant,
    milestones: updatedMilestones,
    status: allCompleted ? 'completed' : grant.status,
  };
}

export function calculateGrantProgress(grant: ResearchGrant): number {
  if (grant.milestones.length === 0) return 0;
  const completed = grant.milestones.filter((m) => m.status === 'completed').length;
  return (completed / grant.milestones.length) * 100;
}

