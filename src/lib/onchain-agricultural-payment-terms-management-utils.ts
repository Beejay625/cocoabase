import { type Address } from 'viem';

export interface PaymentTerms {
  id: bigint;
  owner: Address;
  counterparty: Address;
  terms: string;
  dueDays: number;
  createdDate: bigint;
  status: 'active' | 'expired';
  txHash: string;
}

export function createPaymentTerms(
  owner: Address,
  counterparty: Address,
  terms: string,
  dueDays: number
): PaymentTerms {
  return {
    id: BigInt(Date.now()),
    owner,
    counterparty,
    terms,
    dueDays,
    createdDate: BigInt(Date.now()),
    status: 'active',
    txHash: '',
  };
}
