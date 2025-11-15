import { type Address } from 'viem';

/**
 * Onchain farm livestock blockchain authorization utilities
 * Authorization creation on blockchain
 */

export interface Authorization {
  id: string;
  animalId: string;
  authorizedBy: Address;
  authorizedAddress: Address;
  action: string;
  authorizationDate: bigint;
  revoked: boolean;
  timestamp: bigint;
}

export function createAuthorization(
  address: Address,
  animalId: string,
  authorizedAddress: Address,
  action: string,
  authorizationDate: bigint
): Authorization {
  return {
    id: `${Date.now()}-${Math.random()}`,
    animalId,
    authorizedBy: address,
    authorizedAddress,
    action,
    authorizationDate,
    revoked: false,
    timestamp: BigInt(Date.now()),
  };
}



