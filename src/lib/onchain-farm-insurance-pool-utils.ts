import { type Address } from 'viem';

export interface PoolMember {
  member: Address;
  contribution: bigint;
  joinDate: bigint;
  active: boolean;
}

export interface Claim {
  id: string;
  claimId: bigint;
  claimant: Address;
  claimAmount: bigint;
  claimDate: bigint;
  approved: boolean;
  paid: boolean;
}

export function createClaim(
  address: Address,
  claimAmount: bigint
): Claim {
  return {
    id: `${Date.now()}-${Math.random()}`,
    claimId: BigInt(0),
    claimant: address,
    claimAmount,
    claimDate: BigInt(Date.now()),
    approved: false,
    paid: false,
  };
}
