'use client';

import { getReputationLevel, type ReputationScore } from '@/lib/onchain-reputation-utils';

interface ReputationBadgeProps {
  reputation: ReputationScore;
}

export function ReputationBadge({ reputation }: ReputationBadgeProps) {
  const levelColors = {
    bronze: 'bg-amber-100 text-amber-800',
    silver: 'bg-gray-100 text-gray-800',
    gold: 'bg-yellow-100 text-yellow-800',
    platinum: 'bg-purple-100 text-purple-800',
  };

  const level = getReputationLevel(reputation.score);

  return (
    <div className="flex items-center gap-2">
      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${levelColors[level]}`}>
        {level.toUpperCase()}
      </span>
      <span className="text-sm text-gray-600">
        Score: {Math.floor(reputation.score)}
      </span>
    </div>
  );
}

