export type FarmerSpecialty = 
  | "cocoa"
  | "coffee"
  | "palm-oil"
  | "rubber"
  | "mixed"
  | "other";

export interface FarmerProfile {
  id: string;
  name: string;
  location: string;
  specialty: FarmerSpecialty;
  rating: number;
  reviewCount: number;
  plantations: number;
  experience: number;
  bio?: string;
  contact?: string;
  joinedDate: Date;
}

export interface FarmerGroup {
  id: string;
  name: string;
  description: string;
  category: string;
  memberCount: number;
  createdDate: Date;
  members: string[];
}

export interface FarmerConnection {
  id: string;
  farmerId: string;
  connectedFarmerId: string;
  connectedAt: Date;
  relationship?: "colleague" | "mentor" | "mentee" | "partner";
}

export const calculateFarmerRating = (ratings: number[]): number => {
  if (ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  return sum / ratings.length;
};

export const searchFarmers = (
  farmers: FarmerProfile[],
  query: string
): FarmerProfile[] => {
  const lowerQuery = query.toLowerCase();
  return farmers.filter((farmer) => {
    return (
      farmer.name.toLowerCase().includes(lowerQuery) ||
      farmer.location.toLowerCase().includes(lowerQuery) ||
      farmer.specialty.toLowerCase().includes(lowerQuery) ||
      farmer.bio?.toLowerCase().includes(lowerQuery)
    );
  });
};

export const filterFarmersBySpecialty = (
  farmers: FarmerProfile[],
  specialty: FarmerSpecialty
): FarmerProfile[] => {
  return farmers.filter((farmer) => farmer.specialty === specialty);
};

export const filterFarmersByLocation = (
  farmers: FarmerProfile[],
  location: string
): FarmerProfile[] => {
  const lowerLocation = location.toLowerCase();
  return farmers.filter((farmer) =>
    farmer.location.toLowerCase().includes(lowerLocation)
  );
};

export const sortFarmersByRating = (
  farmers: FarmerProfile[],
  ascending: boolean = false
): FarmerProfile[] => {
  return [...farmers].sort((a, b) => {
    return ascending ? a.rating - b.rating : b.rating - a.rating;
  });
};

export const getTopRatedFarmers = (
  farmers: FarmerProfile[],
  limit: number = 10
): FarmerProfile[] => {
  return sortFarmersByRating(farmers).slice(0, limit);
};

export const getFarmerGroups = (
  farmerId: string,
  groups: FarmerGroup[]
): FarmerGroup[] => {
  return groups.filter((group) => group.members.includes(farmerId));
};

export const getFarmerConnections = (
  farmerId: string,
  connections: FarmerConnection[]
): FarmerConnection[] => {
  return connections.filter(
    (conn) => conn.farmerId === farmerId || conn.connectedFarmerId === farmerId
  );
};

export const getNetworkSummary = (
  farmers: FarmerProfile[],
  groups: FarmerGroup[],
  connections: FarmerConnection[]
): {
  totalFarmers: number;
  totalGroups: number;
  totalConnections: number;
  averageRating: number;
  bySpecialty: Record<FarmerSpecialty, number>;
} => {
  const bySpecialty = farmers.reduce(
    (acc, farmer) => {
      if (!acc[farmer.specialty]) {
        acc[farmer.specialty] = 0;
      }
      acc[farmer.specialty]++;
      return acc;
    },
    {
      cocoa: 0,
      coffee: 0,
      "palm-oil": 0,
      rubber: 0,
      mixed: 0,
      other: 0,
    } as Record<FarmerSpecialty, number>
  );

  const averageRating =
    farmers.length > 0
      ? farmers.reduce((sum, farmer) => sum + farmer.rating, 0) / farmers.length
      : 0;

  return {
    totalFarmers: farmers.length,
    totalGroups: groups.length,
    totalConnections: connections.length,
    averageRating,
    bySpecialty,
  };
};

export const formatFarmerSpecialty = (specialty: FarmerSpecialty): string => {
  const labels: Record<FarmerSpecialty, string> = {
    cocoa: "Cocoa",
    coffee: "Coffee",
    "palm-oil": "Palm Oil",
    rubber: "Rubber",
    mixed: "Mixed Crops",
    other: "Other",
  };
  return labels[specialty];
};

