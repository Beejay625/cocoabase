import { type Address } from 'viem';

export interface SupplyChainPayment {
  id: bigint;
  payer: Address;
  payee: Address;
  amount: bigint;
  paymentDate: bigint;
  invoiceId: bigint;
  status: 'pending' | 'completed' | 'failed';
  txHash: string;
}

export function createPayment(
  payer: Address,
  payee: Address,
  amount: bigint,
  invoiceId: bigint
): SupplyChainPayment {
  return {
    id: BigInt(Date.now()),
    payer,
    payee,
    amount,
    paymentDate: BigInt(Date.now()),
    invoiceId,
    status: 'pending',
    txHash: '',
  };
}

export function completePayment(
  payment: SupplyChainPayment
): SupplyChainPayment {
  return {
    ...payment,
    status: 'completed',
  };
}

export function getPendingPayments(
  payments: SupplyChainPayment[]
): SupplyChainPayment[] {
  return payments.filter((p) => p.status === 'pending');
}

export function getTotalPaymentsByPayee(
  payments: SupplyChainPayment[],
  payee: Address
): bigint {
  return payments
    .filter((p) => p.payee.toLowerCase() === payee.toLowerCase() && p.status === 'completed')
    .reduce((total, p) => total + p.amount, BigInt(0));
}
