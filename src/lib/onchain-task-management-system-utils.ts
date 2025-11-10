import { type Address } from 'viem';

export interface Task {
  id: bigint;
  owner: Address;
  plantationId: bigint;
  taskName: string;
  dueDate: bigint;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  txHash: string;
}

export function createTask(
  owner: Address,
  plantationId: bigint,
  taskName: string,
  dueDate: bigint
): Task {
  return {
    id: BigInt(Date.now()),
    owner,
    plantationId,
    taskName,
    dueDate,
    status: 'pending',
    txHash: '',
  };
}
