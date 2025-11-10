import { type Address } from 'viem';

export interface MultisigWallet {
  id: bigint;
  owners: Address[];
  threshold: number;
  nonce: bigint;
  transactions: MultisigTransaction[];
}

export interface MultisigTransaction {
  to: Address;
  value: bigint;
  data: string;
  signatures: Map<Address, string>;
  executed: boolean;
}

export function createMultisigWallet(
  owners: Address[],
  threshold: number
): MultisigWallet {
  return {
    id: BigInt(0),
    owners,
    threshold,
    nonce: BigInt(0),
    transactions: [],
  };
}

