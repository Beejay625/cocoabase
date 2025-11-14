import { type Address } from 'viem';

export interface LandParcel {
  id: string;
  parcelId: bigint;
  owner: Address;
  areaHectares: bigint;
  location: string;
  coordinates: string;
  registrationDate: bigint;
  verified: boolean;
}

export function createLandParcel(
  address: Address,
  areaHectares: bigint,
  location: string,
  coordinates: string
): LandParcel {
  return {
    id: `${Date.now()}-${Math.random()}`,
    parcelId: BigInt(0),
    owner: address,
    areaHectares,
    location,
    coordinates,
    registrationDate: BigInt(Date.now()),
    verified: false,
  };
}
