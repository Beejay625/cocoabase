import { type Address } from 'viem';

/**
 * Onchain settlement utilities
 * Peer-to-peer transaction settlement
 */

export interface Settlement {
  id: bigint;
  payer: Address;
  payee: Address;
  amount: bigint;
  status: 'pending' | 'settled' | 'disputed';
  createdAt: bigint;
}

export function canSettle(
  settlement: Settlement,
  requester: Address
): boolean {
  return settlement.status === 'pending' && 
         (requester === settlement.payer || requester === settlement.payee);
}

export function calculateSettlementFee(
  amount: bigint,
  feeRate: number = 0.001
): bigint {
  return (amount * BigInt(Math.floor(feeRate * 1000000))) / BigInt(1000000);
}
