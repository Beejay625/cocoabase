export type WeatherCondition = 
  | "sunny"
  | "partly-cloudy"
  | "cloudy"
  | "rainy"
  | "stormy"
  | "foggy"
  | "windy";

export type WeatherAlert = {
  type: "rain" | "storm" | "drought" | "frost" | "wind";
  severity: "low" | "medium" | "high" | "critical";
  message: string;
  startDate: Date;
  endDate: Date;
};

export interface WeatherData {
  temperature: number;
  humidity: number;
  precipitation: number;
  windSpeed: number;
  condition: WeatherCondition;
  forecast: WeatherForecast[];
  alerts: WeatherAlert[];
}

export interface WeatherForecast {
  date: Date;
  temperature: {
    min: number;
    max: number;
  };
  condition: WeatherCondition;
  precipitation: number;
  humidity: number;
}

export const getWeatherImpact = (weather: WeatherData): {
  impact: "positive" | "neutral" | "negative";
  message: string;
} => {
  const { temperature, precipitation, condition } = weather;

  if (condition === "stormy" || condition === "rainy") {
    if (precipitation > 50) {
      return {
        impact: "negative",
        message: "Heavy rainfall may affect plantation health. Monitor drainage.",
      };
    }
    return {
      impact: "positive",
      message: "Moderate rainfall is beneficial for cocoa growth.",
    };
  }

  if (temperature > 35) {
    return {
      impact: "negative",
      message: "High temperature may stress plants. Ensure adequate irrigation.",
    };
  }

  if (temperature < 15) {
    return {
      impact: "negative",
      message: "Low temperature may slow growth. Consider protective measures.",
    };
  }

  if (condition === "sunny" && temperature >= 20 && temperature <= 30) {
    return {
      impact: "positive",
      message: "Ideal weather conditions for cocoa growth.",
    };
  }

  return {
    impact: "neutral",
    message: "Weather conditions are within acceptable range.",
  };
};

export const shouldWater = (weather: WeatherData, lastWatered?: Date): boolean => {
  const daysSinceWatered = lastWatered
    ? Math.floor((Date.now() - lastWatered.getTime()) / (1000 * 60 * 60 * 24))
    : 7;

  if (weather.precipitation > 20) {
    return false;
  }

  if (weather.temperature > 30 && daysSinceWatered >= 2) {
    return true;
  }

  if (daysSinceWatered >= 5) {
    return true;
  }

  return false;
};

export const getWeatherRecommendations = (weather: WeatherData): string[] => {
  const recommendations: string[] = [];

  if (weather.temperature > 35) {
    recommendations.push("Increase irrigation frequency");
    recommendations.push("Provide shade for young plants");
  }

  if (weather.precipitation > 50) {
    recommendations.push("Check drainage systems");
    recommendations.push("Monitor for waterlogging");
  }

  if (weather.windSpeed > 30) {
    recommendations.push("Secure loose equipment");
    recommendations.push("Check for wind damage");
  }

  if (weather.alerts.some((a) => a.type === "frost")) {
    recommendations.push("Protect sensitive plants from frost");
    recommendations.push("Consider covering young plants");
  }

  if (weather.alerts.some((a) => a.type === "drought")) {
    recommendations.push("Implement water conservation measures");
    recommendations.push("Consider mulching to retain moisture");
  }

  return recommendations;
};

export const calculateWeatherScore = (weather: WeatherData): number => {
  let score = 100;

  if (weather.temperature < 15 || weather.temperature > 35) {
    score -= 20;
  }

  if (weather.precipitation > 50) {
    score -= 15;
  }

  if (weather.precipitation < 5 && weather.temperature > 30) {
    score -= 20;
  }

  if (weather.windSpeed > 30) {
    score -= 10;
  }

  if (weather.alerts.length > 0) {
    score -= weather.alerts.length * 10;
  }

  return Math.max(0, Math.min(100, score));
};

export const formatWeatherCondition = (condition: WeatherCondition): string => {
  const labels: Record<WeatherCondition, string> = {
    sunny: "Sunny",
    "partly-cloudy": "Partly Cloudy",
    cloudy: "Cloudy",
    rainy: "Rainy",
    stormy: "Stormy",
    foggy: "Foggy",
    windy: "Windy",
  };
  return labels[condition];
};

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

