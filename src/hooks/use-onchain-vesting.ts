import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createVestingSchedule,
  type VestingSchedule,
} from '@/lib/onchain-vesting-utils';

export function useOnchainVesting() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [schedules, setSchedules] = useState<VestingSchedule[]>([]);

  const createSchedule = async (
    beneficiary: Address,
    amount: bigint,
    duration: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: '0x0000000000000000000000000000000000000000' as Address,
      abi: [],
      functionName: 'createVesting',
      args: [beneficiary, amount, duration],
    });
  };

  return { schedules, createSchedule, address };
}
