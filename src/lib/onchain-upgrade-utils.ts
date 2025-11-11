import { type Address } from 'viem';

export interface Upgrade {
  id: bigint;
  contract: Address;
  newImplementation: Address;
  upgradedBy: Address;
  timestamp: bigint;
}

export function createUpgrade(
  contract: Address,
  newImplementation: Address,
  upgradedBy: Address
): Upgrade {
  return {
    id: BigInt(0),
    contract,
    newImplementation,
    upgradedBy,
    timestamp: BigInt(Date.now()),
  };
}

