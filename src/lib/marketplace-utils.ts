export type ListingType = "sell" | "buy" | "trade";

export type ListingStatus = "active" | "pending" | "sold" | "cancelled";

export interface MarketplaceListing {
  id: string;
  type: ListingType;
  title: string;
  description: string;
  category: string;
  price: number;
  currency: string;
  quantity: number;
  unit: string;
  location: string;
  sellerId: string;
  sellerName: string;
  sellerRating?: number;
  status: ListingStatus;
  images?: string[];
  createdAt: Date;
  updatedAt?: Date;
  expiresAt?: Date;
}

export interface SellerRating {
  sellerId: string;
  rating: number;
  reviewCount: number;
  averageRating: number;
}

export const calculateSellerRating = (ratings: number[]): SellerRating | null => {
  if (ratings.length === 0) return null;

  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  const average = sum / ratings.length;

  return {
    sellerId: "",
    rating: average,
    reviewCount: ratings.length,
    averageRating: average,
  };
};

export const formatPrice = (price: number, currency: string = "USD"): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(price);
};

export const calculateTotalPrice = (
  price: number,
  quantity: number,
  unit: string
): number => {
  return price * quantity;
};

export const getListingsByType = (
  listings: MarketplaceListing[]
): Record<ListingType, MarketplaceListing[]> => {
  return listings.reduce(
    (acc, listing) => {
      if (!acc[listing.type]) {
        acc[listing.type] = [];
      }
      acc[listing.type].push(listing);
      return acc;
    },
    {
      sell: [],
      buy: [],
      trade: [],
    } as Record<ListingType, MarketplaceListing[]>
  );
};

export const getActiveListings = (listings: MarketplaceListing[]): MarketplaceListing[] => {
  const now = new Date();
  return listings.filter((listing) => {
    if (listing.status !== "active") return false;
    if (listing.expiresAt && listing.expiresAt < now) return false;
    return true;
  });
};

export const searchListings = (
  listings: MarketplaceListing[],
  query: string
): MarketplaceListing[] => {
  const lowerQuery = query.toLowerCase();
  return listings.filter((listing) => {
    return (
      listing.title.toLowerCase().includes(lowerQuery) ||
      listing.description.toLowerCase().includes(lowerQuery) ||
      listing.category.toLowerCase().includes(lowerQuery) ||
      listing.location.toLowerCase().includes(lowerQuery)
    );
  });
};

export const filterListingsByPrice = (
  listings: MarketplaceListing[],
  minPrice?: number,
  maxPrice?: number
): MarketplaceListing[] => {
  return listings.filter((listing) => {
    if (minPrice !== undefined && listing.price < minPrice) return false;
    if (maxPrice !== undefined && listing.price > maxPrice) return false;
    return true;
  });
};

export const filterListingsByLocation = (
  listings: MarketplaceListing[],
  location: string
): MarketplaceListing[] => {
  const lowerLocation = location.toLowerCase();
  return listings.filter((listing) =>
    listing.location.toLowerCase().includes(lowerLocation)
  );
};

export const sortListingsByPrice = (
  listings: MarketplaceListing[],
  ascending: boolean = true
): MarketplaceListing[] => {
  return [...listings].sort((a, b) => {
    return ascending ? a.price - b.price : b.price - a.price;
  });
};

export const sortListingsByRating = (
  listings: MarketplaceListing[],
  ratings: Map<string, SellerRating>
): MarketplaceListing[] => {
  return [...listings].sort((a, b) => {
    const ratingA = ratings.get(a.sellerId)?.averageRating || 0;
    const ratingB = ratings.get(b.sellerId)?.averageRating || 0;
    return ratingB - ratingA;
  });
};

export const getMarketplaceSummary = (listings: MarketplaceListing[]): {
  total: number;
  active: number;
  byType: Record<ListingType, number>;
  byStatus: Record<ListingStatus, number>;
  averagePrice: number;
  totalValue: number;
} => {
  const byType = getListingsByType(listings);
  const byStatus = listings.reduce(
    (acc, listing) => {
      if (!acc[listing.status]) {
        acc[listing.status] = 0;
      }
      acc[listing.status]++;
      return acc;
    },
    {} as Record<ListingStatus, number>
  );

  const activeListings = getActiveListings(listings);
  const totalValue = activeListings.reduce(
    (sum, listing) => sum + calculateTotalPrice(listing.price, listing.quantity, listing.unit),
    0
  );
  const averagePrice =
    activeListings.length > 0
      ? activeListings.reduce((sum, listing) => sum + listing.price, 0) /
        activeListings.length
      : 0;

  return {
    total: listings.length,
    active: activeListings.length,
    byType: {
      sell: byType.sell.length,
      buy: byType.buy.length,
      trade: byType.trade.length,
    },
    byStatus: {
      active: byStatus.active || 0,
      pending: byStatus.pending || 0,
      sold: byStatus.sold || 0,
      cancelled: byStatus.cancelled || 0,
    },
    averagePrice,
    totalValue,
  };
};

