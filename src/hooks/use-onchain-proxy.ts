import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createProxy,
  upgradeProxy,
  isValidProxyType,
  type ProxyContract,
} from '@/lib/onchain-proxy-utils';

export function useOnchainProxy() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [proxies, setProxies] = useState<ProxyContract[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  const createNewProxy = async (
    implementation: Address,
    proxyType: 'transparent' | 'uups' | 'beacon'
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    setIsCreating(true);
    try {
      const proxy = createProxy(address, implementation, proxyType);
      console.log('Creating proxy:', proxy);
    } finally {
      setIsCreating(false);
    }
  };

  return {
    proxies,
    createNewProxy,
    upgradeProxy,
    isValidProxyType,
    isCreating,
    address,
  };
}

