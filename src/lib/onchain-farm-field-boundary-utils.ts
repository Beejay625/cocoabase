import { type Address } from 'viem';

/**
 * Onchain farm field boundary utilities
 * Field boundary management
 */

export interface FieldBoundary {
  id: string;
  boundaryId: bigint;
  farmer: Address;
  location: string;
  coordinates: string;
  area: bigint;
  perimeter: bigint;
  boundaryType: string;
  isActive: boolean;
  registrationDate: bigint;
}

export function createFieldBoundary(
  address: Address,
  location: string,
  coordinates: string,
  area: bigint,
  perimeter: bigint,
  boundaryType: string
): FieldBoundary {
  return {
    id: `${Date.now()}-${Math.random()}`,
    boundaryId: BigInt(0),
    farmer: address,
    location,
    coordinates,
    area,
    perimeter,
    boundaryType,
    isActive: true,
    registrationDate: BigInt(Date.now()),
  };
}

