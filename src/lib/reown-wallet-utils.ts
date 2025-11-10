import { type Address } from 'viem';

/**
 * Reown wallet integration utilities
 * Connect, disconnect, and manage Reown wallet sessions
 */

export interface ReownWalletSession {
  address: Address;
  chainId: number;
  connected: boolean;
  sessionId?: string;
}

/**
 * Format Reown wallet address
 */
export function formatReownAddress(address: Address): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 * Validate Reown wallet connection
 */
export function isValidReownSession(session: ReownWalletSession): boolean {
  return session.connected && !!session.address && session.chainId > 0;
}

/**
 * Get Reown wallet display name
 */
export function getReownWalletName(address: Address): string {
  return `Reown Wallet (${formatReownAddress(address)})`;
}

