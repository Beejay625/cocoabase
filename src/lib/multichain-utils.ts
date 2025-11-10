import { type Address } from 'viem';

/**
 * Multi-chain utilities
 * Support for multiple EVM-compatible chains
 */

export interface ChainInfo {
  id: number;
  name: string;
  rpcUrl: string;
  explorerUrl: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}

export interface CrossChainTransfer {
  fromChain: number;
  toChain: number;
  tokenAddress: Address;
  amount: bigint;
}

/**
 * Get chain info by ID
 */
export function getChainInfo(chainId: number): ChainInfo | null {
  const chains: Record<number, ChainInfo> = {
    1: {
      id: 1,
      name: 'Ethereum',
      rpcUrl: 'https://eth.llamarpc.com',
      explorerUrl: 'https://etherscan.io',
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    },
    42161: {
      id: 42161,
      name: 'Arbitrum',
      rpcUrl: 'https://arb1.arbitrum.io/rpc',
      explorerUrl: 'https://arbiscan.io',
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    },
  };
  return chains[chainId] || null;
}

/**
 * Format explorer URL for address
 */
export function formatExplorerURL(
  chainId: number,
  address: Address,
  type: 'address' | 'tx' = 'address'
): string | null {
  const chain = getChainInfo(chainId);
  if (!chain) return null;
  return `${chain.explorerUrl}/${type}/${address}`;
}

/**
 * Check if chain is supported
 */
export function isChainSupported(chainId: number): boolean {
  return getChainInfo(chainId) !== null;
}

/**
 * Get chain name
 */
export function getChainName(chainId: number): string {
  const chain = getChainInfo(chainId);
  return chain?.name || `Chain ${chainId}`;
}

/**
 * Get native currency symbol
 */
export function getNativeCurrencySymbol(chainId: number): string {
  const chain = getChainInfo(chainId);
  return chain?.nativeCurrency.symbol || 'ETH';
}

