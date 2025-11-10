import { type Address } from 'viem';

export interface Invoice {
  id: bigint;
  issuer: Address;
  recipient: Address;
  amount: bigint;
  dueDate: bigint;
  status: 'pending' | 'paid' | 'overdue';
  txHash: string;
}

export function createInvoice(
  issuer: Address,
  recipient: Address,
  amount: bigint,
  dueDate: bigint
): Invoice {
  return {
    id: BigInt(Date.now()),
    issuer,
    recipient,
    amount,
    dueDate,
    status: 'pending',
    txHash: '',
  };
}
