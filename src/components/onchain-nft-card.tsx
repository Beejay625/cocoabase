'use client';

import { type Address } from 'viem';
import { formatTokenAmount } from '@/lib/token-utils';
import { formatIPFSURL } from '@/lib/ipfs-utils';

interface OnchainNFTCardProps {
  tokenId: bigint;
  owner: Address;
  metadataURI?: string;
  price?: bigint;
}

export function OnchainNFTCard({
  tokenId,
  owner,
  metadataURI,
  price,
}: OnchainNFTCardProps) {
  const imageURL = metadataURI
    ? formatIPFSURL(parseIPFSURL(metadataURI) || '')
    : '/placeholder-nft.png';

  return (
    <div className="border rounded-lg p-4">
      <div className="aspect-square bg-gray-200 rounded mb-2" />
      <h3 className="font-semibold">Plantation NFT #{tokenId.toString()}</h3>
      <p className="text-sm text-gray-600 truncate">{owner}</p>
      {price && (
        <p className="text-lg font-bold mt-2">
          {formatTokenAmount(price)} ETH
        </p>
      )}
    </div>
  );
}

function parseIPFSURL(url: string): string | null {
  const match = url.match(/ipfs\/([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
}



