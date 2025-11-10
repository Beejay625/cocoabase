import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  createPriceAlert,
  type PriceAlert,
} from '@/lib/onchain-market-price-alert-system-utils';

export function useOnchainMarketPriceAlertSystem() {
  const { address } = useAccount();
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);

  const createAlert = async (
    commodity: string,
    targetPrice: bigint,
    condition: PriceAlert['condition']
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const alert = createPriceAlert(address, commodity, targetPrice, condition);
    setAlerts([...alerts, alert]);
  };

  return { alerts, createAlert, address };
}
