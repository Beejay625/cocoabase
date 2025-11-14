import { type Address } from 'viem';

export interface EscrowPayment {
  id: string;
  paymentId: bigint;
  employer: Address;
  worker: Address;
  amount: bigint;
  releaseDate: bigint;
  released: boolean;
  disputed: boolean;
}

export function createEscrowPayment(
  address: Address,
  worker: Address,
  amount: bigint,
  releaseDate: bigint
): EscrowPayment {
  return {
    id: `${Date.now()}-${Math.random()}`,
    paymentId: BigInt(0),
    employer: address,
    worker,
    amount,
    releaseDate,
    released: false,
    disputed: false,
  };
}
