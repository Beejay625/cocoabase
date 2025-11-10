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

export function updateTaskStatus(
  task: Task,
  status: Task['status']
): Task {
  return {
    ...task,
    status,
  };
}

export function getOverdueTasks(
  tasks: Task[],
  currentTime: bigint
): Task[] {
  return tasks.filter(
    (t) => (t.status === 'pending' || t.status === 'in-progress') && currentTime > t.dueDate
  );
}

export function getTasksByStatus(
  tasks: Task[],
  status: Task['status']
): Task[] {
  return tasks.filter((t) => t.status === status);
}
