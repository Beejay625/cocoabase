import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createFeedbackRecord,
  type FeedbackRecord,
} from '@/lib/onchain-farm-crop-harvest-customer-feedback-utils';

/**
 * Hook for onchain farm crop harvest customer feedback
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmCropHarvestCustomerFeedback() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [feedbacks, setFeedbacks] = useState<FeedbackRecord[]>([]);

  const submitFeedback = async (
    harvestId: string,
    customer: Address,
    rating: number,
    comment: string,
    feedbackDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const feedback = createFeedbackRecord(address, harvestId, customer, rating, comment, feedbackDate);
    setFeedbacks([...feedbacks, feedback]);
  };

  const verifyFeedback = async (
    contractAddress: Address,
    feedbackId: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifyFeedback',
      args: [feedbackId],
    });
  };

  return { feedbacks, submitFeedback, verifyFeedback, address };
}

