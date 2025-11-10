"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import {
  Achievement,
  calculateAchievementProgress,
  formatAchievementRarity,
} from "@/lib/achievement-utils";

type AchievementBadgeProps = {
  achievement: Achievement;
  className?: string;
  showProgress?: boolean;
};

export default function AchievementBadge({
  achievement,
  className,
  showProgress = true,
}: AchievementBadgeProps) {
  const progress = calculateAchievementProgress(achievement);

  const rarityColors = {
    common: "bg-gray-100 border-gray-300 text-gray-800",
    rare: "bg-blue-100 border-blue-300 text-blue-800",
    epic: "bg-purple-100 border-purple-300 text-purple-800",
    legendary: "bg-yellow-100 border-yellow-300 text-yellow-800",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "rounded-xl border p-4",
        rarityColors[achievement.rarity],
        achievement.unlocked && "ring-2 ring-yellow-400",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className="text-4xl">{achievement.icon}</div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold text-sm">{achievement.name}</h4>
            {achievement.unlocked && (
              <span className="text-xs font-medium">✓ Unlocked</span>
            )}
          </div>
          <p className="text-xs opacity-75 mb-2">{achievement.description}</p>
          <div className="text-xs opacity-60 mb-2">
            {formatAchievementRarity(achievement.rarity)}
          </div>
          {showProgress && !achievement.unlocked && (
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span>Progress</span>
                <span>{achievement.progress} / {achievement.target}</span>
              </div>
              <div className="h-1.5 bg-white/50 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-current rounded-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}


