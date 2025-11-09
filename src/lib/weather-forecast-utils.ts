export type WeatherCondition = 
  | "sunny"
  | "partly-cloudy"
  | "cloudy"
  | "rainy"
  | "stormy"
  | "foggy"
  | "windy";

export interface WeatherForecast {
  date: Date;
  condition: WeatherCondition;
  temperature: {
    high: number;
    low: number;
  };
  precipitation: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  uvIndex?: number;
}

export interface SevenDayForecast {
  location: string;
  current: WeatherForecast;
  forecast: WeatherForecast[];
  generatedAt: Date;
}

export const getWeatherIcon = (condition: WeatherCondition): string => {
  const icons: Record<WeatherCondition, string> = {
    sunny: "☀️",
    "partly-cloudy": "⛅",
    cloudy: "☁️",
    rainy: "🌧️",
    stormy: "⛈️",
    foggy: "🌫️",
    windy: "💨",
  };
  return icons[condition];
};

export const assessWeatherImpact = (forecast: WeatherForecast): {
  impact: "positive" | "neutral" | "negative";
  message: string;
} => {
  const { temperature, precipitation, condition } = forecast;

  if (condition === "stormy" || (condition === "rainy" && precipitation > 50)) {
    return {
      impact: "negative",
      message: "Heavy rainfall expected. Monitor drainage and protect crops.",
    };
  }

  if (temperature.high > 35) {
    return {
      impact: "negative",
      message: "High temperatures expected. Ensure adequate irrigation.",
    };
  }

  if (temperature.low < 15) {
    return {
      impact: "negative",
      message: "Low temperatures expected. Consider protective measures.",
    };
  }

  if (
    condition === "sunny" &&
    temperature.high >= 20 &&
    temperature.high <= 30 &&
    precipitation < 10
  ) {
    return {
      impact: "positive",
      message: "Ideal weather conditions for cocoa growth.",
    };
  }

  if (condition === "rainy" && precipitation >= 10 && precipitation <= 30) {
    return {
      impact: "positive",
      message: "Moderate rainfall beneficial for growth.",
    };
  }

  return {
    impact: "neutral",
    message: "Weather conditions are within acceptable range.",
  };
};

export const getAverageTemperature = (forecast: WeatherForecast[]): number => {
  if (forecast.length === 0) return 0;
  const sum = forecast.reduce(
    (acc, f) => acc + (f.temperature.high + f.temperature.low) / 2,
    0
  );
  return sum / forecast.length;
};

export const getTotalPrecipitation = (forecast: WeatherForecast[]): number => {
  return forecast.reduce((sum, f) => sum + f.precipitation, 0);
};

export const getRainyDays = (forecast: WeatherForecast[]): number => {
  return forecast.filter(
    (f) => f.condition === "rainy" || f.condition === "stormy"
  ).length;
};

export const getOptimalDays = (forecast: WeatherForecast[]): number => {
  return forecast.filter((f) => {
    const impact = assessWeatherImpact(f);
    return impact.impact === "positive";
  }).length;
};

export const generateWeatherRecommendations = (
  forecast: SevenDayForecast
): string[] => {
  const recommendations: string[] = [];
  const rainyDays = getRainyDays(forecast.forecast);
  const totalPrecipitation = getTotalPrecipitation(forecast.forecast);
  const avgTemp = getAverageTemperature(forecast.forecast);

  if (rainyDays > 3) {
    recommendations.push("Multiple rainy days expected. Check drainage systems.");
  }

  if (totalPrecipitation > 100) {
    recommendations.push("Heavy rainfall expected. Prepare for waterlogging.");
  }

  if (avgTemp > 32) {
    recommendations.push("High temperatures expected. Increase irrigation frequency.");
  }

  if (avgTemp < 18) {
    recommendations.push("Low temperatures expected. Protect sensitive plants.");
  }

  const optimalDays = getOptimalDays(forecast.forecast);
  if (optimalDays >= 5) {
    recommendations.push("Excellent weather conditions ahead. Good time for planting.");
  }

  return recommendations;
};

export const formatForecastDate = (date: Date): string => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  }
  if (date.toDateString() === tomorrow.toDateString()) {
    return "Tomorrow";
  }
  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
};

