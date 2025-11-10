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

export function startBridge(bridge: CrossChainBridge): CrossChainBridge {
  return { ...bridge, status: 'bridging' };
}

export function completeBridge(bridge: CrossChainBridge): CrossChainBridge {
  return { ...bridge, status: 'completed' };
}

export function failBridge(bridge: CrossChainBridge): CrossChainBridge {
  return { ...bridge, status: 'failed' };
}

export function calculateBridgeFee(
  amount: bigint,
  feePercent: number = 0.001
): bigint {
  return (amount * BigInt(Math.floor(feePercent * 1000000))) / BigInt(1000000);
}
