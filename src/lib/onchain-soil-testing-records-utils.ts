import { type Address } from 'viem';

export interface SoilTestRecord {
  id: bigint;
  owner: Address;
  plantationId: bigint;
  testDate: bigint;
  pH: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  txHash: string;
}

export function recordSoilTest(
  owner: Address,
  plantationId: bigint,
  pH: number,
  nitrogen: number,
  phosphorus: number,
  potassium: number
): SoilTestRecord {
  return {
    id: BigInt(Date.now()),
    owner,
    plantationId,
    testDate: BigInt(Date.now()),
    pH,
    nitrogen,
    phosphorus,
    potassium,
    txHash: '',
  };
}
