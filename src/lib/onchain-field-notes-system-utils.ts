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

export function getNotesByPlantation(
  notes: FieldNote[],
  plantationId: bigint
): FieldNote[] {
  return notes
    .filter((n) => n.plantationId === plantationId)
    .sort((a, b) => (a.noteDate > b.noteDate ? -1 : 1));
}

export function getRecentNotes(
  notes: FieldNote[],
  days: number
): FieldNote[] {
  const cutoff = BigInt(Date.now() - days * 24 * 60 * 60 * 1000);
  return notes.filter((n) => n.noteDate >= cutoff);
}
