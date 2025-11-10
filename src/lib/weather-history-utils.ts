export interface WeatherHistoryEntry {
  date: Date;
  temperature: {
    high: number;
    low: number;
    average: number;
  };
  precipitation: number;
  humidity: number;
  windSpeed: number;
  condition: string;
}

export interface WeatherTrends {
  averageTemperature: number;
  totalPrecipitation: number;
  averageHumidity: number;
  rainyDays: number;
  extremeDays: number;
  trend: "warming" | "cooling" | "stable";
}

export const calculateAverageTemperature = (
  entries: WeatherHistoryEntry[]
): number => {
  if (entries.length === 0) return 0;
  const sum = entries.reduce((acc, entry) => acc + entry.temperature.average, 0);
  return sum / entries.length;
};

export const calculateTotalPrecipitation = (
  entries: WeatherHistoryEntry[],
  startDate?: Date,
  endDate?: Date
): number => {
  const filtered = entries.filter((entry) => {
    if (startDate && entry.date < startDate) return false;
    if (endDate && entry.date > endDate) return false;
    return true;
  });

  return filtered.reduce((sum, entry) => sum + entry.precipitation, 0);
};

export const getRainyDays = (entries: WeatherHistoryEntry[]): number => {
  return entries.filter((entry) => entry.precipitation > 5).length;
};

export const getExtremeWeatherDays = (entries: WeatherHistoryEntry[]): number => {
  return entries.filter((entry) => {
    return (
      entry.temperature.high > 35 ||
      entry.temperature.low < 10 ||
      entry.precipitation > 50 ||
      entry.windSpeed > 40
    );
  }).length;
};

export const calculateWeatherTrends = (
  entries: WeatherHistoryEntry[]
): WeatherTrends => {
  if (entries.length < 2) {
    return {
      averageTemperature: 0,
      totalPrecipitation: 0,
      averageHumidity: 0,
      rainyDays: 0,
      extremeDays: 0,
      trend: "stable",
    };
  }

  const sorted = [...entries].sort((a, b) => a.date.getTime() - b.date.getTime());
  const recent = sorted.slice(-30);
  const older = sorted.slice(0, Math.max(0, sorted.length - 30));

  const recentAvg = calculateAverageTemperature(recent);
  const olderAvg = older.length > 0 ? calculateAverageTemperature(older) : recentAvg;

  let trend: "warming" | "cooling" | "stable" = "stable";
  const diff = recentAvg - olderAvg;
  if (diff > 2) trend = "warming";
  else if (diff < -2) trend = "cooling";

  const averageHumidity =
    entries.length > 0
      ? entries.reduce((sum, entry) => sum + entry.humidity, 0) / entries.length
      : 0;

  return {
    averageTemperature: calculateAverageTemperature(entries),
    totalPrecipitation: calculateTotalPrecipitation(entries),
    averageHumidity,
    rainyDays: getRainyDays(entries),
    extremeDays: getExtremeWeatherDays(entries),
    trend,
  };
};

export const getMonthlyWeatherSummary = (
  entries: WeatherHistoryEntry[],
  year: number,
  month: number
): {
  averageTemp: number;
  totalPrecipitation: number;
  rainyDays: number;
  extremeDays: number;
} => {
  const monthlyEntries = entries.filter((entry) => {
    const entryDate = new Date(entry.date);
    return entryDate.getFullYear() === year && entryDate.getMonth() === month;
  });

  return {
    averageTemp: calculateAverageTemperature(monthlyEntries),
    totalPrecipitation: calculateTotalPrecipitation(monthlyEntries),
    rainyDays: getRainyDays(monthlyEntries),
    extremeDays: getExtremeWeatherDays(monthlyEntries),
  };
};

export const compareWeatherPeriods = (
  period1: WeatherHistoryEntry[],
  period2: WeatherHistoryEntry[]
): {
  tempDifference: number;
  precipitationDifference: number;
  humidityDifference: number;
} => {
  const avgTemp1 = calculateAverageTemperature(period1);
  const avgTemp2 = calculateAverageTemperature(period2);
  const totalPrecip1 = calculateTotalPrecipitation(period1);
  const totalPrecip2 = calculateTotalPrecipitation(period2);
  const avgHumidity1 =
    period1.length > 0
      ? period1.reduce((sum, e) => sum + e.humidity, 0) / period1.length
      : 0;
  const avgHumidity2 =
    period2.length > 0
      ? period2.reduce((sum, e) => sum + e.humidity, 0) / period2.length
      : 0;

  return {
    tempDifference: avgTemp2 - avgTemp1,
    precipitationDifference: totalPrecip2 - totalPrecip1,
    humidityDifference: avgHumidity2 - avgHumidity1,
  };
};


