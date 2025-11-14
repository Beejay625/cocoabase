import { type Address } from 'viem';

export interface MovementRecord {
  id: string;
  recordId: bigint;
  livestockId: bigint;
  fromLocation: string;
  toLocation: string;
  movementDate: bigint;
  recorder: Address;
}

export function createMovementRecord(
  address: Address,
  livestockId: bigint,
  fromLocation: string,
  toLocation: string
): MovementRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    recordId: BigInt(0),
    livestockId,
    fromLocation,
    toLocation,
    movementDate: BigInt(Date.now()),
    recorder: address,
  };
}
