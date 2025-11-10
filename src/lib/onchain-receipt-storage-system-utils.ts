import { type Address } from 'viem';

export interface Receipt {
  id: bigint;
  owner: Address;
  amount: bigint;
  receiptDate: bigint;
  description: string;
  txHash: string;
}

export function storeReceipt(
  owner: Address,
  amount: bigint,
  description: string
): Receipt {
  return {
    id: BigInt(Date.now()),
    owner,
    amount,
    receiptDate: BigInt(Date.now()),
    description,
    txHash: '',
  };
}
