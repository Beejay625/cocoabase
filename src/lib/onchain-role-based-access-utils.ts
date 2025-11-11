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

export function grantRole(role: Role, address: Address): Role {
  const newMembers = new Set(role.members);
  newMembers.add(address);
  return {
    ...role,
    members: newMembers,
  };
}

export function revokeRole(role: Role, address: Address): Role {
  const newMembers = new Set(role.members);
  newMembers.delete(address);
  return {
    ...role,
    members: newMembers,
  };
}

export function hasRole(role: Role, address: Address): boolean {
  return role.members.has(address);
}
