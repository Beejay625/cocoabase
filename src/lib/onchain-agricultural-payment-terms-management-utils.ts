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

export function markAsPaid(term: PaymentTerm): PaymentTerm {
  return {
    ...term,
    status: 'paid',
  };
}

export function getOverdueTerms(
  terms: PaymentTerm[],
  currentTime: bigint
): PaymentTerm[] {
  return terms.filter(
    (t) => t.status === 'pending' && t.dueDate < currentTime
  );
}

export function calculateTotalAmount(terms: PaymentTerm[]): bigint {
  return terms.reduce((total, t) => total + t.amount, BigInt(0));
}
