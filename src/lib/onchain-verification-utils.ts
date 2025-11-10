import { type Address } from 'viem';

export interface Verification {
  id: string;
  verifier: Address;
  subject: Address;
  credential: string;
  verified: boolean;
  timestamp: bigint;
}

export function createVerification(
  verifier: Address,
  subject: Address,
  credential: string
): Verification {
  return {
    id: `${verifier}-${subject}-${credential}`,
    verifier,
    subject,
    credential,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}

export function verify(verification: Verification): Verification {
  return { ...verification, verified: true };
}

export function revokeVerification(verification: Verification): Verification {
  return { ...verification, verified: false };
}

export function isVerified(
  verifications: Verification[],
  subject: Address,
  credential: string
): boolean {
  const verification = verifications.find(
    (v) => v.subject === subject && v.credential === credential
  );
  return verification?.verified || false;
}
