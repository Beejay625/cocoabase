import { type Address, type Hash } from 'viem';

/**
 * Onchain NFT utilities for plantation tokenization
 * Mint, transfer, and manage plantation NFTs onchain
 */

export interface PlantationNFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: {
    location: string;
    area: number;
    stage: string;
    healthScore: number;
    mintDate: string;
  };
}

export interface MintPlantationNFTParams {
  to: Address;
  metadata: PlantationNFTMetadata;
  tokenId?: bigint;
}

export interface NFTMintResult {
  txHash: Hash;
  tokenId: bigint;
  contractAddress: Address;
}

/**
 * Prepare NFT metadata for IPFS upload
 */
export function prepareNFTMetadata(
  plantation: PlantationNFTMetadata
): string {
  return JSON.stringify({
    name: plantation.name,
    description: plantation.description,
    image: plantation.image,
    attributes: plantation.attributes,
  });
}

/**
 * Validate NFT metadata before minting
 */
export function validateNFTMetadata(
  metadata: PlantationNFTMetadata
): boolean {
  return !!(
    metadata.name &&
    metadata.description &&
    metadata.image &&
    metadata.attributes.location &&
    metadata.attributes.area > 0
  );
}

/**
 * Generate token ID for plantation NFT
 */
export function generateTokenId(plantationId: string): bigint {
  const hash = plantationId.split('').reduce((acc, char) => {
    return ((acc << 5) - acc + char.charCodeAt(0)) | 0;
  }, 0);
  return BigInt(Math.abs(hash));
}

/**
 * Format NFT metadata URI for onchain storage
 */
export function formatMetadataURI(ipfsHash: string): string {
  return `ipfs://${ipfsHash}`;
}

/**
 * Parse metadata URI to extract IPFS hash
 */
export function parseMetadataURI(uri: string): string | null {
  if (uri.startsWith('ipfs://')) {
    return uri.replace('ipfs://', '');
  }
  return null;
}

/**
 * Create NFT metadata object
 */
export function createNFTMetadata(
  name: string,
  location: string,
  area: number,
  stage: string,
  healthScore: number
): PlantationNFTMetadata {
  return {
    name,
    description: `Cocoa plantation NFT - ${location}`,
    image: `ipfs://placeholder-${name}`,
    attributes: {
      location,
      area,
      stage,
      healthScore,
      mintDate: new Date().toISOString(),
    },
  };
}

