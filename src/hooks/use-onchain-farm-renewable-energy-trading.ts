import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createEnergyTrade,
  type EnergyTrade,
} from '@/lib/onchain-farm-renewable-energy-trading-utils';

/**
 * Hook for onchain farm renewable energy trading
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmRenewableEnergyTrading() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [trades, setTrades] = useState<EnergyTrade[]>([]);

  const sellEnergy = async (
    plantationId: string,
    energyAmount: bigint,
    pricePerKwh: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const trade = createEnergyTrade(address, plantationId, energyAmount, pricePerKwh);
    setTrades([...trades, trade]);
  };

  const purchaseEnergy = async (
    contractAddress: Address,
    tradeId: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'purchaseEnergy',
      args: [tradeId],
    });
  };

  return { trades, sellEnergy, purchaseEnergy, address };
}

