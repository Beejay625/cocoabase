'use client';

import { type GasEstimate } from '@/lib/gas-estimation-utils';
import { formatGasPrice } from '@/lib/gas-estimation-utils';

interface GasEstimateDisplayProps {
  estimate: GasEstimate;
}

export function GasEstimateDisplay({ estimate }: GasEstimateDisplayProps) {
  const costInEth = Number(estimate.totalCost) / 1e18;

  return (
    <div className="space-y-1 text-sm">
      <div className="flex justify-between">
        <span className="text-gray-600">Gas Limit:</span>
        <span className="font-mono">{estimate.gasLimit.toString()}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Gas Price:</span>
        <span className="font-mono">{formatGasPrice(estimate.gasPrice)}</span>
      </div>
      <div className="flex justify-between font-semibold pt-2 border-t">
        <span>Total Cost:</span>
        <span>{costInEth.toFixed(6)} ETH</span>
      </div>
    </div>
  );
}



