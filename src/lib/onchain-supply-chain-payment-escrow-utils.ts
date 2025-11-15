import { type Address } from 'viem';

/**
 * Onchain Supply Chain Payment Escrow utilities
 * Escrow payments for supply chain transactions onchain with Reown wallet integration
 */

export interface PaymentEscrow {
  id: bigint;
  payer: Address;
  payee: Address;
  amount: bigint;
  description: string;
  releaseConditions: string[];
  status: 'pending' | 'funded' | 'released' | 'refunded' | 'disputed';
  createdAt: bigint;
  releasedAt?: bigint;
}

export function createPaymentEscrow(
  payer: Address,
  payee: Address,
  amount: bigint,
  description: string,
  releaseConditions: string[]
): PaymentEscrow {
  const now = BigInt(Date.now());
  return {
    id: BigInt(0),
    payer,
    payee,
    amount,
    description,
    releaseConditions,
    status: 'pending',
    createdAt: now,
  };
}

export function fundEscrow(escrow: PaymentEscrow): PaymentEscrow {
  return {
    ...escrow,
    status: 'funded',
  };
}

export function releaseEscrow(escrow: PaymentEscrow): PaymentEscrow {
  const now = BigInt(Date.now());
  return {
    ...escrow,
    status: 'released',
    releasedAt: now,
  };
}

export function refundEscrow(escrow: PaymentEscrow): PaymentEscrow {
  return {
    ...escrow,
    status: 'refunded',
  };
}



