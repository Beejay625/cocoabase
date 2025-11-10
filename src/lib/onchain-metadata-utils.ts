/**
 * Onchain metadata utilities
 * Contract metadata and token URI management
 */

export interface ContractMetadata {
  name: string;
  symbol: string;
  description: string;
  image: string;
  external_url?: string;
}

/**
 * Validate contract metadata
 */
export function validateContractMetadata(metadata: ContractMetadata): boolean {
  return !!(metadata.name && metadata.symbol && metadata.description);
}

