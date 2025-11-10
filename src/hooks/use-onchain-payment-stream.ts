import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createPaymentStream,
  withdrawFromStream,
  pauseStream,
  resumeStream,
  cancelStream,
  calculateStreamedAmount,
  type PaymentStream,
} from '@/lib/onchain-payment-stream-utils';

export function useOnchainPaymentStream() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [streams, setStreams] = useState<PaymentStream[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const createNewStream = async (
    payee: Address,
    token: Address,
    amountPerSecond: bigint,
    duration: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    setIsCreating(true);
    try {
      const stream = createPaymentStream(
        address,
        payee,
        token,
        amountPerSecond,
        duration
      );
      console.log('Creating payment stream:', stream);
    } finally {
      setIsCreating(false);
    }
  };

  const withdrawStream = async (streamId: bigint): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    setIsWithdrawing(true);
    try {
      const currentTime = BigInt(Date.now());
      const stream = streams.find((s) => s.id === streamId);
      if (!stream) throw new Error('Stream not found');
      const result = withdrawFromStream(stream, currentTime);
      if (result) {
        console.log('Withdrawing from stream:', { streamId, address });
      }
    } finally {
      setIsWithdrawing(false);
    }
  };

  return {
    streams,
    createNewStream,
    withdrawStream,
    pauseStream,
    resumeStream,
    cancelStream,
    calculateStreamedAmount,
    isCreating,
    isWithdrawing,
    address,
  };
}

