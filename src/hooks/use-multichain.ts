import { useState, useMemo } from 'react';
import {
  getChainInfo,
  formatExplorerURL,
  isChainSupported,
  type ChainInfo,
} from '@/lib/multichain-utils';
import { type Address, type Hash } from 'viem';

/**
 * Hook for multi-chain operations
 */
export function useMultichain(currentChainId?: number) {
  const [supportedChains, setSupportedChains] = useState<ChainInfo[]>([]);

  const currentChain = useMemo(() => {
    return currentChainId ? getChainInfo(currentChainId) : null;
  }, [currentChainId]);

  const getExplorerURL = (
    chainId: number,
    address: Address | Hash,
    type: 'address' | 'tx' = 'address'
  ) => {
    return formatExplorerURL(chainId, address as Address, type);
  };

  const checkChainSupport = (chainId: number) => {
    return isChainSupported(chainId);
  };

  return {
    currentChain,
    supportedChains,
    getExplorerURL,
    checkChainSupport,
  };
}

