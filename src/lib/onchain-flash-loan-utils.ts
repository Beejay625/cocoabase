import { type Address } from 'viem';

/**
 * Onchain flash loan utilities
 * Flash loan protocol for instant borrowing
 */

export interface FlashLoan {
  id: bigint;
  borrower: Address;
  asset: Address;
  amount: bigint;
  fee: bigint;
  deadline: bigint;
}

export function calculateFlashLoanFee(
  amount: bigint,
  feeRate: number = 0.0009
): bigint {
  return (amount * BigInt(Math.floor(feeRate * 1000000))) / BigInt(1000000);
}
