import { type Address } from 'viem';

/**
 * Onchain payment stream utilities
 * Streaming payments and subscriptions
 */

export interface PaymentStream {
  id: bigint;
  payer: Address;
  payee: Address;
  amountPerSecond: bigint;
  startTime: bigint;
  endTime: bigint;
  totalAmount: bigint;
}

export function calculateStreamedAmount(
  stream: PaymentStream,
  currentTime: bigint
): bigint {
  if (currentTime < stream.startTime) return BigInt(0);
  const elapsed = currentTime - stream.startTime;
  return stream.amountPerSecond * elapsed;
}
