import { type Address } from 'viem';

/**
 * Onchain land registry utilities
 * Decentralized land ownership and title management
 */

export interface LandParcel {
  id: bigint;
  owner: Address;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  area: bigint;
  title: string;
  registeredAt: bigint;
  txHash: string;
}

export function registerLand(
  owner: Address,
  coordinates: { latitude: number; longitude: number },
  area: bigint,
  title: string
): LandParcel {
  return {
    id: BigInt(Date.now()),
    owner,
    coordinates,
    area,
    title,
    registeredAt: BigInt(Date.now()),
    txHash: '',
  };
}

export function transferLand(
  parcel: LandParcel,
  newOwner: Address,
  from: Address
): LandParcel | null {
  if (parcel.owner.toLowerCase() !== from.toLowerCase()) return null;
  return {
    ...parcel,
    owner: newOwner,
  };
}
