import { type Address } from 'viem';

/**
 * Onchain milestone rewards utilities
 * Milestone-based reward system
 */

export interface Milestone {
  id: bigint;
  name: string;
  target: bigint;
  reward: bigint;
  achieved: boolean;
  achievedBy: Address | null;
  achievedAt: bigint | null;
}

export interface MilestoneProgress {
  milestone: Milestone;
  current: bigint;
  percentage: number;
  remaining: bigint;
}

export function createMilestone(
  name: string,
  target: bigint,
  reward: bigint
): Milestone {
  return {
    id: BigInt(0),
    name,
    target,
    reward,
    achieved: false,
    achievedBy: null,
    achievedAt: null,
  };
}

export function checkMilestone(
  milestone: Milestone,
  current: bigint,
  user: Address
): Milestone {
  if (milestone.achieved || current < milestone.target) {
    return milestone;
  }
  return {
    ...milestone,
    achieved: true,
    achievedBy: user,
    achievedAt: BigInt(Date.now()),
  };
}

export function calculateMilestoneProgress(
  milestone: Milestone,
  current: bigint
): MilestoneProgress {
  const percentage = milestone.target > BigInt(0)
    ? (Number(current) / Number(milestone.target)) * 100
    : 0;
  const remaining = current < milestone.target
    ? milestone.target - current
    : BigInt(0);
  return {
    milestone,
    current,
    percentage: Math.min(100, percentage),
    remaining,
  };
}

export function getNextMilestone(
  milestones: Milestone[],
  current: bigint
): Milestone | null {
  const unachieved = milestones.filter(m => !m.achieved && m.target > current);
  if (unachieved.length === 0) return null;
  return unachieved.reduce((closest, currentMilestone) =>
    currentMilestone.target < closest.target ? currentMilestone : closest
  );
}

export function calculateMilestoneRewards(
  milestones: Milestone[]
): bigint {
  return milestones
    .filter(m => m.achieved)
    .reduce((total, m) => total + m.reward, BigInt(0));
}

export function validateMilestoneTarget(
  target: bigint,
  minTarget: bigint = BigInt(1)
): boolean {
  return target >= minTarget;
}

export function getMilestoneCompletion(
  milestones: Milestone[],
  current: bigint
): number {
  const achieved = milestones.filter(m => m.achieved || current >= m.target).length;
  return milestones.length > 0 ? (achieved / milestones.length) * 100 : 0;
}
