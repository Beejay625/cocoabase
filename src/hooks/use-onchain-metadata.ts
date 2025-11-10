import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createMetadata,
  updateMetadata,
  validateMetadata,
  type Metadata,
} from '@/lib/onchain-metadata-utils';

export function useOnchainMetadata() {
  const { address } = useAccount();
  const [metadata, setMetadata] = useState<Metadata[]>([]);

  const createNewMetadata = (
    contract: Address,
    tokenId: bigint,
    name: string,
    description: string,
    image: string,
    attributes: Record<string, unknown>,
    ipfsHash: string
  ) => {
    const newMetadata = createMetadata(
      contract,
      tokenId,
      name,
      description,
      image,
      attributes,
      ipfsHash
    );
    setMetadata((prev) => [...prev, newMetadata]);
    console.log('Creating metadata:', newMetadata);
  };

  return {
    metadata,
    createNewMetadata,
    updateMetadata,
    validateMetadata,
    address,
  };
}

