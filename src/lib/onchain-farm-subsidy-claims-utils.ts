import { type Address } from 'viem';

export interface SubsidyClaim {
  id: string;
  claimId: bigint;
  claimant: Address;
  amount: bigint;
  subsidyType: string;
  reason: string;
  submissionDate: bigint;
  approved: boolean;
  paid: boolean;
}

export function createSubsidyClaim(
  claimant: Address,
  claimId: bigint,
  amount: bigint,
  subsidyType: string,
  reason: string
): SubsidyClaim {
  return {
    id: `${Date.now()}-${Math.random()}`,
    claimId,
    claimant,
    amount,
    subsidyType,
    reason,
    submissionDate: BigInt(Date.now()),
    approved: false,
    paid: false,
  };
}
