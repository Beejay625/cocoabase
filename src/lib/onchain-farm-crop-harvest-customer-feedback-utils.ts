import { type Address } from 'viem';

/**
 * Onchain farm crop harvest customer feedback utilities
 * Feedback record creation on blockchain
 */

export interface FeedbackRecord {
  id: string;
  harvestId: string;
  submittedBy: Address;
  customer: Address;
  rating: number;
  comment: string;
  feedbackDate: bigint;
  verified: boolean;
  timestamp: bigint;
}

export function createFeedbackRecord(
  address: Address,
  harvestId: string,
  customer: Address,
  rating: number,
  comment: string,
  feedbackDate: bigint
): FeedbackRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    harvestId,
    submittedBy: address,
    customer,
    rating,
    comment,
    feedbackDate,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}

