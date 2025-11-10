import { type Address } from 'viem';

export interface CrossChainBridge {
  id: bigint;
  sourceChain: number;
  targetChain: number;
  token: Address;
  amount: bigint;
  status: 'pending' | 'bridging' | 'completed' | 'failed';
  txHash: string;
}

export function createCrossChainBridge(
  sourceChain: number,
  targetChain: number,
  token: Address,
  amount: bigint,
  txHash: string
): CrossChainBridge {
  return {
    id: BigInt(0),
    sourceChain,
    targetChain,
    token,
    amount,
    status: 'pending',
    txHash,
  };
}

