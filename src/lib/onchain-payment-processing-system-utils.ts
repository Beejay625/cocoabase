import { type Address } from 'viem';

export interface Payment {
  id: bigint;
  payer: Address;
  payee: Address;
  amount: bigint;
  paymentDate: bigint;
  status: 'pending' | 'completed' | 'failed';
  txHash: string;
}

export function processPayment(
  payer: Address,
  payee: Address,
  amount: bigint
): Payment {
  return {
    id: BigInt(Date.now()),
    payer,
    payee,
    amount,
    paymentDate: BigInt(Date.now()),
    status: 'pending',
    txHash: '',
  };
}
