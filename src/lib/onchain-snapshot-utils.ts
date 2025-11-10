import { type Address } from 'viem';

export interface Snapshot {
  id: bigint;
  blockNumber: bigint;
  timestamp: bigint;
  balances: Map<Address, bigint>;
  totalSupply: bigint;
}

export function createSnapshot(
  blockNumber: bigint,
  balances: Map<Address, bigint>,
  totalSupply: bigint
): Snapshot {
  return {
    id: BigInt(0),
    blockNumber,
    timestamp: BigInt(Date.now()),
    balances,
    totalSupply,
  };
}

export function getBalanceAtSnapshot(
  snapshot: Snapshot,
  address: Address
): bigint {
  return snapshot.balances.get(address) || BigInt(0);
}

export function calculateVotingPower(
  snapshot: Snapshot,
  address: Address
): number {
  if (snapshot.totalSupply === BigInt(0)) return 0;
  const balance = getBalanceAtSnapshot(snapshot, address);
  return Number((balance * BigInt(10000)) / snapshot.totalSupply) / 100;
}
