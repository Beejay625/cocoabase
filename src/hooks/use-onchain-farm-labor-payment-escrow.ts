import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createEscrowPayment,
  type EscrowPayment,
} from '@/lib/onchain-farm-labor-payment-escrow-utils';

export function useOnchainFarmLaborPaymentEscrow() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [payments, setPayments] = useState<EscrowPayment[]>([]);

  const createEscrow = async (
    contractAddress: Address,
    worker: Address,
    amount: bigint,
    releaseDate: bigint,
    value: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    const payment = createEscrowPayment(address, worker, amount, releaseDate);
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { name: 'worker', type: 'address' },
            { name: 'amount', type: 'uint256' },
            { name: 'releaseDate', type: 'uint256' }
          ],
          name: 'createEscrow',
          outputs: [{ name: '', type: 'uint256' }],
          stateMutability: 'payable',
          type: 'function'
        }
      ],
      functionName: 'createEscrow',
      args: [worker, amount, releaseDate],
      value,
    });
    
    setPayments([...payments, payment]);
  };

  const releasePayment = async (
    contractAddress: Address,
    paymentId: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    
    await writeContract({
      address: contractAddress,
      abi: [
        {
          inputs: [{ name: 'paymentId', type: 'uint256' }],
          name: 'releasePayment',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'releasePayment',
      args: [paymentId],
    });
  };

  return { payments, createEscrow, releasePayment, address };
}
