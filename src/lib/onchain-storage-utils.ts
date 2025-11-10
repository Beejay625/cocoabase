import { type Address } from 'viem';

export interface StorageSlot {
  contract: Address;
  slot: bigint;
  value: string;
  lastUpdated: bigint;
}

export function createStorageSlot(
  contract: Address,
  slot: bigint,
  value: string
): StorageSlot {
  return {
    contract,
    slot,
    value,
    lastUpdated: BigInt(Date.now()),
  };
}

export function updateStorageSlot(
  storage: StorageSlot,
  value: string
): StorageSlot {
  return {
    ...storage,
    value,
    lastUpdated: BigInt(Date.now()),
  };
}

export function calculateStorageSlot(
  position: bigint,
  mappingKey: string
): bigint {
  const keyHash = BigInt(
    '0x' +
      Array.from(mappingKey)
        .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('')
  );
  return position + keyHash;
}
