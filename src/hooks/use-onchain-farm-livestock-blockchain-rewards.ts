import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createRewardRecord,
  type RewardRecord,
} from '@/lib/onchain-farm-livestock-blockchain-rewards-utils';

/**
 * Hook for onchain farm livestock blockchain rewards
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmLivestockBlockchainRewards() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [records, setRecords] = useState<RewardRecord[]>([]);

  const createReward = async (
    animalId: string,
    rewardType: string,
    rewardAmount: bigint,
    rewardDate: bigint,
    reason: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const record = createRewardRecord(address, animalId, rewardType, rewardAmount, rewardDate, reason);
    setRecords([...records, record]);
  };

  const claimReward = async (
    contractAddress: Address,
    recordId: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'claimReward',
      args: [recordId],
    });
  };

  return { records, createReward, claimReward, address };
}

