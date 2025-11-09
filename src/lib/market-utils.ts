export type MarketPrice = {
  commodity: string;
  price: number;
  currency: string;
  unit: string;
  change: number;
  changePercent: number;
  timestamp: Date;
  source: string;
};

export type PriceAlert = {
  id: string;
  commodity: string;
  condition: "above" | "below" | "change";
  threshold: number;
  currentPrice: number;
  triggered: boolean;
  createdAt: Date;
};

export const calculatePriceChange = (
  currentPrice: number,
  previousPrice: number
): { change: number; changePercent: number } => {
  const change = currentPrice - previousPrice;
  const changePercent = previousPrice !== 0 ? (change / previousPrice) * 100 : 0;
  return { change, changePercent };
};

export const formatPrice = (
  price: number,
  currency: string = "USD",
  decimals: number = 2
): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(price);
};

export const shouldTriggerAlert = (
  alert: PriceAlert,
  currentPrice: number
): boolean => {
  if (alert.triggered) return false;

  switch (alert.condition) {
    case "above":
      return currentPrice >= alert.threshold;
    case "below":
      return currentPrice <= alert.threshold;
    case "change":
      const change = Math.abs(currentPrice - alert.currentPrice);
      return change >= alert.threshold;
    default:
      return false;
  }
};

export const calculateProjectedRevenue = (
  yieldKg: number,
  pricePerKg: number,
  deductions: number = 0
): number => {
  const grossRevenue = yieldKg * pricePerKg;
  return Math.max(0, grossRevenue - deductions);
};

export const getPriceTrend = (prices: MarketPrice[]): "up" | "down" | "stable" => {
  if (prices.length < 2) return "stable";

  const recent = prices.slice(-7);
  const firstPrice = recent[0].price;
  const lastPrice = recent[recent.length - 1].price;
  const changePercent = ((lastPrice - firstPrice) / firstPrice) * 100;

  if (changePercent > 5) return "up";
  if (changePercent < -5) return "down";
  return "stable";
};

export const getBestSellTime = (
  prices: MarketPrice[],
  forecastDays: number = 30
): Date | null => {
  if (prices.length < 7) return null;

  const avgPrice = prices.reduce((sum, p) => sum + p.price, 0) / prices.length;
  const recentPrices = prices.slice(-7);
  const recentAvg = recentPrices.reduce((sum, p) => sum + p.price, 0) / recentPrices.length;

  if (recentAvg > avgPrice * 1.1) {
    return new Date(Date.now() + forecastDays * 24 * 60 * 60 * 1000);
  }

  return null;
};

export const calculatePriceVolatility = (prices: MarketPrice[]): number => {
  if (prices.length < 2) return 0;

  const priceValues = prices.map((p) => p.price);
  const mean = priceValues.reduce((sum, p) => sum + p, 0) / priceValues.length;
  const variance =
    priceValues.reduce((sum, p) => sum + Math.pow(p - mean, 2), 0) /
    priceValues.length;
  return Math.sqrt(variance);
};

export const getMarketRecommendation = (
  currentPrice: MarketPrice,
  historicalPrices: MarketPrice[]
): string => {
  const trend = getPriceTrend(historicalPrices);
  const volatility = calculatePriceVolatility(historicalPrices);
  const avgPrice =
    historicalPrices.reduce((sum, p) => sum + p.price, 0) / historicalPrices.length;

  if (currentPrice.price > avgPrice * 1.15 && trend === "up") {
    return "Consider selling - prices are above average and trending up";
  }

  if (currentPrice.price < avgPrice * 0.85 && trend === "down") {
    return "Consider waiting - prices are below average";
  }

  if (volatility > avgPrice * 0.2) {
    return "High volatility detected - consider hedging strategies";
  }

  return "Market conditions are stable";
};

