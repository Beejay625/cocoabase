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
