import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createPayment,
  type SupplyChainPayment,
} from '@/lib/onchain-agricultural-supply-chain-payments-utils';

export function useOnchainAgriculturalSupplyChainPayments() {
  const { address } = useAccount();
  const [payments, setPayments] = useState<SupplyChainPayment[]>([]);

  const create = async (
    payee: Address,
    amount: bigint,
    invoiceId: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const payment = createPayment(address, payee, amount, invoiceId);
    setPayments([...payments, payment]);
  };

  return { payments, create, address };
}
