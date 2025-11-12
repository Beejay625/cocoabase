import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createSettlement,
  type TradeSettlement,
} from '@/lib/onchain-agricultural-trade-settlement-utils';

export function useOnchainAgriculturalTradeSettlement() {
  const { address } = useAccount();
  const [settlements, setSettlements] = useState<TradeSettlement[]>([]);

  const create = async (
    seller: Address,
    tradeId: bigint,
    settlementAmount: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const settlement = createSettlement(address, seller, tradeId, settlementAmount);
    setSettlements([...settlements, settlement]);
  };

  return { settlements, create, address };
}
