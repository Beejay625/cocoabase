import { useState, useEffect } from 'react';
import { type GasEstimate } from '@/lib/gas-estimation-utils';
import {
  estimateGasCost,
  formatGasPrice,
  calculateOptimalGasPrice,
  type GasPriceData,
} from '@/lib/gas-estimation-utils';

/**
 * Hook for gas estimation and price tracking
 */
export function useGasEstimation() {
  const [gasPrices, setGasPrices] = useState<GasPriceData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // In production, fetch from gas price oracle
    setIsLoading(true);
    setTimeout(() => {
      setGasPrices({
        slow: BigInt(20 * 1e9),
        standard: BigInt(30 * 1e9),
        fast: BigInt(50 * 1e9),
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  const estimateGas = (
    gasLimit: bigint,
    priority: 'slow' | 'standard' | 'fast' = 'standard'
  ): GasEstimate | null => {
    if (!gasPrices) return null;

    const gasPrice = calculateOptimalGasPrice(gasPrices, priority);
    return {
      gasLimit,
      gasPrice,
      totalCost: estimateGasCost(gasLimit, gasPrice),
    };
  };

  return {
    gasPrices,
    isLoading,
    estimateGas,
    formatGasPrice,
  };
}

