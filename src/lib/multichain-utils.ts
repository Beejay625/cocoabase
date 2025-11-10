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

