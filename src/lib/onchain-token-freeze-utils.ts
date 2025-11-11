import { type Address } from 'viem';

export interface TokenFreeze {
  id: bigint;
  token: Address;
  frozen: Set<Address>;
  enabled: boolean;
}

export function createTokenFreeze(token: Address): TokenFreeze {
  return {
    id: BigInt(0),
    token,
    frozen: new Set(),
    enabled: true,
  };
}

