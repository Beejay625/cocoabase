import { type Address, type Hash } from 'viem';

/**
 * Smart contract interaction utilities
 * ABI encoding, contract calls, and event parsing
 */

export interface ContractCall {
  to: Address;
  data: Hash;
  value?: bigint;
}

export interface ContractEvent {
  name: string;
  args: Record<string, unknown>;
  blockNumber: bigint;
  txHash: Hash;
}

/**
 * Encode function call data
 */
export function encodeFunctionCall(
  functionSignature: string,
  params: unknown[]
): string {
  // Simplified encoding - in production use viem's encodeFunctionData
  return `0x${functionSignature.slice(0, 10)}${params
    .map((p) => String(p).padStart(64, '0'))
    .join('')}`;
}

/**
 * Decode contract event data
 */
export function decodeEventData(
  eventSignature: string,
  data: string
): Record<string, unknown> {
  // Simplified decoding - in production use viem's decodeEventLog
  return {
    signature: eventSignature,
    data,
  };
}

/**
 * Validate contract address format
 */
export function isValidContractAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Get contract interface ID
 */
export function getInterfaceId(selectors: string[]): string {
  // Simplified - XOR all function selectors
  return selectors.reduce((acc, sel) => {
    return (parseInt(acc, 16) ^ parseInt(sel, 16)).toString(16);
  }, '0x0');
}

/**
 * Parse function selector
 */
export function parseFunctionSelector(signature: string): string {
  return signature.slice(0, 10);
}

/**
 * Validate contract call data
 */
export function validateContractCall(call: ContractCall): boolean {
  return isValidContractAddress(call.to) && call.data.length >= 10;
}

