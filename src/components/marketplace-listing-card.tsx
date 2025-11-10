'use client';

import { type MarketplaceListing } from '@/lib/onchain-marketplace-utils';
import { formatListingPrice, calculateSellerProceeds } from '@/lib/onchain-marketplace-utils';
import { ExplorerLink } from './explorer-link';

interface MarketplaceListingCardProps {
  listing: MarketplaceListing;
  chainId: number;
}

export function MarketplaceListingCard({
  listing,
  chainId,
}: MarketplaceListingCardProps) {
  const proceeds = calculateSellerProceeds(listing.price);

  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold">Token #{listing.tokenId.toString()}</h3>
        <span className={`px-2 py-1 rounded text-xs ${
          listing.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {listing.active ? 'Active' : 'Inactive'}
        </span>
      </div>
      <div className="space-y-1 text-sm mb-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Price:</span>
          <span className="font-semibold">{formatListingPrice(listing.price)} ETH</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Seller Proceeds:</span>
          <span>{formatListingPrice(proceeds)} ETH</span>
        </div>
      </div>
      <ExplorerLink
        chainId={chainId}
        address={listing.tokenAddress}
        type="address"
        label="View NFT"
      />
    </div>
  );
}

