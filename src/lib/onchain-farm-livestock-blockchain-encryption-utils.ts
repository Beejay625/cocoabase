import { type Address } from 'viem';

/**
 * Onchain farm livestock blockchain encryption utilities
 * Encryption record creation on blockchain
 */

export interface EncryptionRecord {
  id: string;
  animalId: string;
  encryptedBy: Address;
  encryptedData: string;
  encryptionKey: string;
  encryptionDate: bigint;
  algorithm: string;
  decrypted: boolean;
  timestamp: bigint;
}

export function createEncryptionRecord(
  address: Address,
  animalId: string,
  encryptedData: string,
  encryptionKey: string,
  encryptionDate: bigint,
  algorithm: string
): EncryptionRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    animalId,
    encryptedBy: address,
    encryptedData,
    encryptionKey,
    encryptionDate,
    algorithm,
    decrypted: false,
    timestamp: BigInt(Date.now()),
  };
}

