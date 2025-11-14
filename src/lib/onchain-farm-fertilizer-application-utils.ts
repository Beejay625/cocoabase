import { type Address } from 'viem';

export interface Application {
  id: string;
  applicationId: bigint;
  plantationId: bigint;
  fertilizerType: string;
  amount: bigint;
  applicationDate: bigint;
  applicator: Address;
  organic: boolean;
}

export function createApplication(
  address: Address,
  plantationId: bigint,
  fertilizerType: string,
  amount: bigint,
  organic: boolean
): Application {
  return {
    id: `${Date.now()}-${Math.random()}`,
    applicationId: BigInt(0),
    plantationId,
    fertilizerType,
    amount,
    applicationDate: BigInt(Date.now()),
    applicator: address,
    organic,
  };
}

