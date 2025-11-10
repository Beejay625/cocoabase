import { useState } from 'react';
import { type Address } from 'viem';
import {
  calculateBridgeFee,
  estimateBridgeTime,
  hasBridgeRoute,
  type BridgeRoute,
  type BridgeTransaction,
} from '@/lib/crosschain-bridge-utils';

/**
 * Hook for cross-chain bridge operations
 */
export function useBridge() {
  const [routes, setRoutes] = useState<BridgeRoute[]>([]);
  const [transactions, setTransactions] = useState<BridgeTransaction[]>([]);

  const calculateFee = (amount: bigint, feePercent: number = 0.1) => {
    return calculateBridgeFee(amount, feePercent);
  };

  const estimateTime = (fromChain: number, toChain: number) => {
    return estimateBridgeTime(fromChain, toChain);
  };

  const checkRoute = (fromChain: number, toChain: number) => {
    return hasBridgeRoute(fromChain, toChain);
  };

  return {
    routes,
    transactions,
    calculateFee,
    estimateTime,
    checkRoute,
  };
}

