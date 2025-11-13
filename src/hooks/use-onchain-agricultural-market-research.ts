import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  createMarketResearch,
  type MarketResearch,
} from '@/lib/onchain-agricultural-market-research-utils';

export function useOnchainAgriculturalMarketResearch() {
  const { address } = useAccount();
  const [research, setResearch] = useState<MarketResearch[]>([]);

  const create = async (
    commodity: string,
    findings: string,
    confidence: number
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const marketResearch = createMarketResearch(address, commodity, findings, confidence);
    setResearch([...research, marketResearch]);
  };

  return { research, create, address };
}