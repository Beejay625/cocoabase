import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  processPayment,
  type Payment,
} from '@/lib/onchain-payment-processing-system-utils';

export function useOnchainPaymentProcessingSystem() {
  const { address } = useAccount();
  const [payments, setPayments] = useState<Payment[]>([]);

  const process = async (
    payee: Address,
    amount: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const payment = processPayment(address, payee, amount);
    setPayments([...payments, payment]);
  };

  return { payments, process, address };
}
