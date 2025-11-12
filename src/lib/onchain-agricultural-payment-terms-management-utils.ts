import { type Address } from 'viem';

export interface PaymentTerm {
  id: bigint;
  creator: Address;
  buyer: Address;
  seller: Address;
  amount: bigint;
  dueDate: bigint;
  status: 'pending' | 'paid' | 'overdue';
}

export function createPaymentTerm(
  creator: Address,
  buyer: Address,
  seller: Address,
  amount: bigint,
  dueDate: bigint
): PaymentTerm {
  return {
    id: BigInt(0),
    creator,
    buyer,
    seller,
    amount,
    dueDate,
    status: 'pending',
  };
}
