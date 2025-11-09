import type { Plantation } from "@/store/plantations";

export type SearchFilter = {
  query?: string;
  stage?: Plantation["stage"] | "all";
  location?: string;
  dateRange?: {
    start?: string;
    end?: string;
  };
  minCarbon?: number;
  maxCarbon?: number;
  minTrees?: number;
  maxTrees?: number;
  hasTasks?: boolean;
  hasCollaborators?: boolean;
  hasYieldData?: boolean;
};

export const searchPlantations = (
  plantations: Plantation[],
  filter: SearchFilter
): Plantation[] => {
  let results = [...plantations];

  // Text search
  if (filter.query?.trim()) {
    const query = filter.query.toLowerCase();
    results = results.filter(
      (plantation) =>
        plantation.seedName.toLowerCase().includes(query) ||
        plantation.location?.toLowerCase().includes(query) ||
        plantation.notes?.toLowerCase().includes(query) ||
        plantation.walletAddress.toLowerCase().includes(query) ||
        plantation.collaborators.some((c) =>
          c.name.toLowerCase().includes(query)
        ) ||
        plantation.tasks.some((t) =>
          t.title.toLowerCase().includes(query)
        )
    );
  }

  // Stage filter
  if (filter.stage && filter.stage !== "all") {
    results = results.filter((plantation) => plantation.stage === filter.stage);
  }

  // Location filter
  if (filter.location?.trim()) {
    const location = filter.location.toLowerCase();
    results = results.filter(
      (plantation) =>
        plantation.location?.toLowerCase().includes(location)
    );
  }

  // Date range filter
  if (filter.dateRange?.start || filter.dateRange?.end) {
    results = results.filter((plantation) => {
      const startDate = plantation.startDate;
      if (filter.dateRange?.start && startDate < filter.dateRange.start) {
        return false;
      }
      if (filter.dateRange?.end && startDate > filter.dateRange.end) {
        return false;
      }
      return true;
    });
  }

  // Carbon filter
  if (filter.minCarbon !== undefined) {
    results = results.filter(
      (plantation) => plantation.carbonOffsetTons >= filter.minCarbon!
    );
  }
  if (filter.maxCarbon !== undefined) {
    results = results.filter(
      (plantation) => plantation.carbonOffsetTons <= filter.maxCarbon!
    );
  }

  // Tree count filter
  if (filter.minTrees !== undefined) {
    results = results.filter(
      (plantation) => plantation.treeCount >= filter.minTrees!
    );
  }
  if (filter.maxTrees !== undefined) {
    results = results.filter(
      (plantation) => plantation.treeCount <= filter.maxTrees!
    );
  }

  // Boolean filters
  if (filter.hasTasks !== undefined) {
    results = results.filter(
      (plantation) =>
        (plantation.tasks.length > 0) === filter.hasTasks
    );
  }

  if (filter.hasCollaborators !== undefined) {
    results = results.filter(
      (plantation) =>
        (plantation.collaborators.length > 0) === filter.hasCollaborators
    );
  }

  if (filter.hasYieldData !== undefined) {
    results = results.filter(
      (plantation) =>
        (plantation.yieldTimeline.length > 0) === filter.hasYieldData
    );
  }

  return results;
};

export const highlightSearchTerm = (
  text: string,
  query: string
): Array<{ text: string; highlight: boolean }> => {
  if (!query.trim()) {
    return [{ text, highlight: false }];
  }

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const parts: Array<{ text: string; highlight: boolean }> = [];
  let lastIndex = 0;
  let index = lowerText.indexOf(lowerQuery, lastIndex);

  while (index !== -1) {
    if (index > lastIndex) {
      parts.push({
        text: text.slice(lastIndex, index),
        highlight: false,
      });
    }
    parts.push({
      text: text.slice(index, index + query.length),
      highlight: true,
    });
    lastIndex = index + query.length;
    index = lowerText.indexOf(lowerQuery, lastIndex);
  }

  if (lastIndex < text.length) {
    parts.push({
      text: text.slice(lastIndex),
      highlight: false,
    });
  }

  return parts.length > 0 ? parts : [{ text, highlight: false }];
};

export const rankSearchResults = (
  plantations: Plantation[],
  query: string
): Plantation[] => {
  if (!query.trim()) {
    return plantations;
  }

  const lowerQuery = query.toLowerCase();

  return [...plantations].sort((a, b) => {
    let scoreA = 0;
    let scoreB = 0;

    // Exact name match
    if (a.seedName.toLowerCase() === lowerQuery) scoreA += 100;
    if (b.seedName.toLowerCase() === lowerQuery) scoreB += 100;

    // Name starts with query
    if (a.seedName.toLowerCase().startsWith(lowerQuery)) scoreA += 50;
    if (b.seedName.toLowerCase().startsWith(lowerQuery)) scoreB += 50;

    // Name contains query
    if (a.seedName.toLowerCase().includes(lowerQuery)) scoreA += 25;
    if (b.seedName.toLowerCase().includes(lowerQuery)) scoreB += 25;

    // Location match
    if (a.location?.toLowerCase().includes(lowerQuery)) scoreA += 10;
    if (b.location?.toLowerCase().includes(lowerQuery)) scoreB += 10;

    // Notes match
    if (a.notes?.toLowerCase().includes(lowerQuery)) scoreA += 5;
    if (b.notes?.toLowerCase().includes(lowerQuery)) scoreB += 5;

    return scoreB - scoreA;
  });
};

export const extractSearchSuggestions = (
  plantations: Plantation[],
  query: string,
  maxSuggestions: number = 5
): string[] => {
  if (!query.trim() || query.length < 2) {
    return [];
  }

  const lowerQuery = query.toLowerCase();
  const suggestions = new Set<string>();

  plantations.forEach((plantation) => {
    // Name suggestions
    if (
      plantation.seedName.toLowerCase().includes(lowerQuery) &&
      suggestions.size < maxSuggestions
    ) {
      suggestions.add(plantation.seedName);
    }

    // Location suggestions
    if (
      plantation.location &&
      plantation.location.toLowerCase().includes(lowerQuery) &&
      suggestions.size < maxSuggestions
    ) {
      suggestions.add(plantation.location);
    }
  });

  return Array.from(suggestions).slice(0, maxSuggestions);
};

