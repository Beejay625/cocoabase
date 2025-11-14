import { type Address } from 'viem';

/**
 * Onchain farm crop harvest blockchain ledger utilities
 * Ledger entry creation on blockchain
 */

export interface LedgerEntry {
  id: string;
  harvestId: string;
  createdBy: Address;
  transactionType: string;
  amount: bigint;
  fromAddress: Address;
  toAddress: Address;
  transactionDate: bigint;
  verified: boolean;
  timestamp: bigint;
}

export function createLedgerEntry(
  address: Address,
  harvestId: string,
  transactionType: string,
  amount: bigint,
  fromAddress: Address,
  toAddress: Address,
  transactionDate: bigint
): LedgerEntry {
  return {
    id: `${Date.now()}-${Math.random()}`,
    harvestId,
    createdBy: address,
    transactionType,
    amount,
    fromAddress,
    toAddress,
    transactionDate,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}

