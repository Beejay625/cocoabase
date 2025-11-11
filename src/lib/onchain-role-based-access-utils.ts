import { type Address } from 'viem';

export interface Role {
  id: bigint;
  name: string;
  members: Set<Address>;
}

export function createRole(name: string): Role {
  return {
    id: BigInt(0),
    name,
    members: new Set(),
  };
}

