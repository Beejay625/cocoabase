"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import type { Plantation } from "@/store/plantations";

type WeatherWidgetProps = {
  plantations: Plantation[];
  className?: string;
};

type WeatherData = {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  rainfall: number;
  forecast: Array<{
    day: string;
    high: number;
    low: number;
    condition: string;
  }>;
};

const mockWeatherData: Record<string, WeatherData> = {
  "Ashanti, Ghana": {
    location: "Ashanti, Ghana",
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: 75,
    rainfall: 2.5,
    forecast: [
      { day: "Today", high: 30, low: 22, condition: "Partly Cloudy" },
      { day: "Tomorrow", high: 29, low: 21, condition: "Sunny" },
      { day: "Day 3", high: 31, low: 23, condition: "Rain" },
    ],
  },
  "Kumasi, Ghana": {
    location: "Kumasi, Ghana",
    temperature: 27,
    condition: "Sunny",
    humidity: 70,
    rainfall: 1.8,
    forecast: [
      { day: "Today", high: 29, low: 21, condition: "Sunny" },
      { day: "Tomorrow", high: 28, low: 20, condition: "Partly Cloudy" },
      { day: "Day 3", high: 30, low: 22, condition: "Sunny" },
    ],
  },
  "San José, Costa Rica": {
    location: "San José, Costa Rica",
    temperature: 24,
    condition: "Rain",
    humidity: 85,
    rainfall: 5.2,
    forecast: [
      { day: "Today", high: 26, low: 18, condition: "Rain" },
      { day: "Tomorrow", high: 25, low: 17, condition: "Cloudy" },
      { day: "Day 3", high: 27, low: 19, condition: "Partly Cloudy" },
    ],
  },
};

const getWeatherIcon = (condition: string) => {
  const lower = condition.toLowerCase();
  if (lower.includes("rain")) return "🌧️";
  if (lower.includes("cloud")) return "☁️";
  if (lower.includes("sun")) return "☀️";
  return "🌤️";
};

export default function WeatherWidget({
  plantations,
  className,
}: WeatherWidgetProps) {
  const locations = useMemo(() => {
    const locationSet = new Set<string>();
    plantations.forEach((p) => {
      if (p.location) {
        locationSet.add(p.location);
      }
    });
    return Array.from(locationSet);
  }, [plantations]);

  const weatherData = useMemo(() => {
    return locations
      .map((loc) => mockWeatherData[loc])
      .filter(Boolean) as WeatherData[];
  }, [locations]);

  if (weatherData.length === 0) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 }}
      className={cn(
        "rounded-3xl border border-cocoa-800/60 bg-[#101f3c]/80 p-6 text-slate-100 shadow-xl shadow-black/20 backdrop-blur",
        className
      )}
    >
      <header className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Weather forecast</h2>
          <p className="text-sm text-slate-300/80">
            Current conditions and forecast for your plantation locations.
          </p>
        </div>
      </header>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {weatherData.map((weather) => (
          <div
            key={weather.location}
            className="rounded-2xl border border-slate-700/40 bg-slate-900/50 p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">
                  {weather.location}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-3xl">
                    {getWeatherIcon(weather.condition)}
                  </span>
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {weather.temperature}°C
                    </p>
                    <p className="text-xs text-slate-300/70">
                      {weather.condition}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-slate-400/70">Humidity</p>
                <p className="font-semibold text-white">{weather.humidity}%</p>
              </div>
              <div>
                <p className="text-slate-400/70">Rainfall</p>
                <p className="font-semibold text-white">
                  {weather.rainfall}mm
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-2 border-t border-slate-700/40 pt-4">
              {weather.forecast.map((day, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-xs"
                >
                  <span className="text-slate-300/70">{day.day}</span>
                  <div className="flex items-center gap-2">
                    <span>{getWeatherIcon(day.condition)}</span>
                    <span className="text-slate-200">
                      {day.high}° / {day.low}°
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

