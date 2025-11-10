import { type Address } from 'viem';

export interface PaymentStream {
  id: bigint;
  payer: Address;
  payee: Address;
  token: Address;
  amountPerSecond: bigint;
  totalAmount: bigint;
  startTime: bigint;
  endTime: bigint;
  status: 'active' | 'paused' | 'cancelled' | 'completed';
  amountPaid: bigint;
}

export function createPaymentStream(
  payer: Address,
  payee: Address,
  token: Address,
  amountPerSecond: bigint,
  duration: bigint
): PaymentStream {
  const now = BigInt(Date.now());
  const totalAmount = amountPerSecond * duration;
  return {
    id: BigInt(0),
    payer,
    payee,
    token,
    amountPerSecond,
    totalAmount,
    startTime: now,
    endTime: now + duration,
    status: 'active',
    amountPaid: BigInt(0),
  };
}

export function withdrawFromStream(
  stream: PaymentStream,
  currentTime: bigint
): { stream: PaymentStream; withdrawableAmount: bigint } | null {
  if (stream.status !== 'active') return null;
  if (currentTime < stream.startTime) return null;

  const elapsed = currentTime - stream.startTime;
  const totalWithdrawable = stream.amountPerSecond * elapsed;
  const withdrawableAmount = totalWithdrawable - stream.amountPaid;

  if (withdrawableAmount <= BigInt(0)) return null;

  const newAmountPaid = stream.amountPaid + withdrawableAmount;
  const newStatus =
    newAmountPaid >= stream.totalAmount || currentTime >= stream.endTime
      ? 'completed'
      : stream.status;

  return {
    stream: {
      ...stream,
      amountPaid: newAmountPaid,
      status: newStatus,
    },
    withdrawableAmount,
  };
}

export function pauseStream(stream: PaymentStream): PaymentStream | null {
  if (stream.status !== 'active') return null;
  return { ...stream, status: 'paused' };
}

export function resumeStream(stream: PaymentStream): PaymentStream | null {
  if (stream.status !== 'paused') return null;
  return { ...stream, status: 'active' };
}

export function cancelStream(stream: PaymentStream): PaymentStream | null {
  if (stream.status === 'completed') return null;
  return { ...stream, status: 'cancelled' };
}

export function calculateStreamedAmount(
  stream: PaymentStream,
  currentTime: bigint
): bigint {
  if (currentTime < stream.startTime) return BigInt(0);
  if (currentTime >= stream.endTime) return stream.totalAmount;

  const elapsed = currentTime - stream.startTime;
  return stream.amountPerSecond * elapsed;
}

