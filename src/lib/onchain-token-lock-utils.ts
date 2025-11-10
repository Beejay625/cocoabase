import { type Address } from 'viem';

export interface TokenLock {
  id: bigint;
  owner: Address;
  token: Address;
  amount: bigint;
  unlockTime: bigint;
  status: 'locked' | 'unlocked';
}

export function createTokenLock(
  owner: Address,
  token: Address,
  amount: bigint,
  duration: bigint
): TokenLock {
  const now = BigInt(Date.now());
  return {
    id: BigInt(0),
    owner,
    token,
    amount,
    unlockTime: now + duration,
    status: 'locked',
  };
}

