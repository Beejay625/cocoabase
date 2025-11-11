import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createEmergencyWithdraw,
  validateEmergencyWithdraw,
  calculateTotalWithdrawn,
  type EmergencyWithdraw,
} from '@/lib/onchain-emergency-withdraw-utils';

export function useOnchainEmergencyWithdraw() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [withdraws, setWithdraws] = useState<EmergencyWithdraw[]>([]);

  const withdraw = async (
    contract: Address,
    token: Address,
    amount: bigint,
    recipient: Address
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const withdraw = createEmergencyWithdraw(contract, token, amount, recipient);
    console.log('Emergency withdraw:', withdraw);
  };

  return {
    withdraws,
    withdraw,
    validateEmergencyWithdraw,
    calculateTotalWithdrawn,
    address,
  };
}

