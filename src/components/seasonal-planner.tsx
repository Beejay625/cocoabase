"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import {
  getCurrentSeason,
  getSeasonName,
  getSeasonalActivities,
  getUpcomingSeason,
  getDaysUntilSeason,
} from "@/lib/seasonal-utils";

type SeasonalPlannerProps = {
  className?: string;
};

export default function SeasonalPlanner({ className }: SeasonalPlannerProps) {
  const currentSeason = getCurrentSeason();
  const upcomingSeason = getUpcomingSeason(currentSeason);
  const daysUntilNext = getDaysUntilSeason(upcomingSeason);
  const activities = getSeasonalActivities(currentSeason);

  const seasonColors = {
    planting: "bg-green-100 border-green-300 text-green-800",
    growing: "bg-blue-100 border-blue-300 text-blue-800",
    harvest: "bg-yellow-100 border-yellow-300 text-yellow-800",
    maintenance: "bg-gray-100 border-gray-300 text-gray-800",
  };

  const priorityColors = {
    high: "bg-red-100 text-red-800",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-blue-100 text-blue-800",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("rounded-xl bg-white border border-cream-200 p-6", className)}
    >
      <h3 className="text-lg font-semibold text-cocoa-800 mb-4">Seasonal Planner</h3>

      <div className={cn("rounded-lg border p-4 mb-4", seasonColors[currentSeason])}>
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-sm font-medium opacity-75">Current Season</div>
            <div className="text-xl font-bold">{getSeasonName(currentSeason)}</div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium opacity-75">Next Season</div>
            <div className="text-lg font-semibold">{getSeasonName(upcomingSeason)}</div>
            <div className="text-xs opacity-75 mt-1">{daysUntilNext} days</div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-sm font-medium text-cocoa-700 mb-2">Recommended Activities</div>
        {activities.map((activity) => (
          <div
            key={activity.id}
            className={cn(
              "rounded-lg border p-3 text-sm",
              priorityColors[activity.priority]
            )}
          >
            <div className="flex items-start justify-between mb-1">
              <div className="font-medium">{activity.name}</div>
              <span className="text-xs opacity-75 capitalize">{activity.priority}</span>
            </div>
            <div className="text-xs opacity-75">{activity.description}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
