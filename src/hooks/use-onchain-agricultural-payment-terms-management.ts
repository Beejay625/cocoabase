import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createPaymentTerms,
  type PaymentTerms,
} from '@/lib/onchain-agricultural-payment-terms-management-utils';

export function useOnchainAgriculturalPaymentTermsManagement() {
  const { address } = useAccount();
  const [terms, setTerms] = useState<PaymentTerms[]>([]);

  const create = async (
    counterparty: Address,
    terms: string,
    dueDays: number
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const paymentTerms = createPaymentTerms(address, counterparty, terms, dueDays);
    setTerms([...terms, paymentTerms]);
  };

  return { terms, create, address };
}
