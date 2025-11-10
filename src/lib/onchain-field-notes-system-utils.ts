import { type Address } from 'viem';

export interface FieldNote {
  id: bigint;
  owner: Address;
  plantationId: bigint;
  note: string;
  noteDate: bigint;
  txHash: string;
}

export function createFieldNote(
  owner: Address,
  plantationId: bigint,
  note: string
): FieldNote {
  return {
    id: BigInt(Date.now()),
    owner,
    plantationId,
    note,
    noteDate: BigInt(Date.now()),
    txHash: '',
  };
}
