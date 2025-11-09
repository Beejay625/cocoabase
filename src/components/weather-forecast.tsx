"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import {
  SevenDayForecast,
  getWeatherIcon,
  formatForecastDate,
  assessWeatherImpact,
  generateWeatherRecommendations,
} from "@/lib/weather-forecast-utils";

type WeatherForecastProps = {
  forecast: SevenDayForecast;
  className?: string;
};

export default function WeatherForecast({
  forecast,
  className,
}: WeatherForecastProps) {
  const recommendations = generateWeatherRecommendations(forecast);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("rounded-xl bg-white border border-cream-200 p-6", className)}
    >
      <h3 className="text-lg font-semibold text-cocoa-800 mb-4">7-Day Weather Forecast</h3>

      <div className="mb-4 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">{getWeatherIcon(forecast.current.condition)}</span>
          <div>
            <div className="text-2xl font-bold text-cocoa-800">
              {forecast.current.temperature.high}°C
            </div>
            <div className="text-sm text-cocoa-600">
              {forecast.current.temperature.low}°C low
            </div>
          </div>
        </div>
        <div className="text-xs text-cocoa-600">
          {forecast.current.precipitation}mm • {forecast.current.humidity}% humidity •{" "}
          {forecast.current.windSpeed} km/h
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {forecast.forecast.map((day, index) => {
          const impact = assessWeatherImpact(day);

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-lg border border-cream-200 hover:bg-cocoa-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getWeatherIcon(day.condition)}</span>
                <div>
                  <div className="font-medium text-sm text-cocoa-800">
                    {formatForecastDate(day.date)}
                  </div>
                  <div className="text-xs text-cocoa-600">
                    {day.temperature.high}° / {day.temperature.low}°
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-cocoa-600">
                  {day.precipitation > 0 ? `${day.precipitation}mm` : "No rain"}
                </div>
                <div
                  className={cn(
                    "text-xs mt-1",
                    impact.impact === "positive"
                      ? "text-green-600"
                      : impact.impact === "negative"
                      ? "text-red-600"
                      : "text-cocoa-500"
                  )}
                >
                  {impact.impact === "positive" ? "✓" : impact.impact === "negative" ? "⚠" : "○"}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {recommendations.length > 0 && (
        <div className="rounded-lg bg-blue-50 border border-blue-200 p-3">
          <div className="text-xs font-medium text-blue-800 mb-2">Recommendations</div>
          <ul className="space-y-1">
            {recommendations.map((rec, index) => (
              <li key={index} className="text-xs text-blue-700 flex items-start gap-1">
                <span>•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}

