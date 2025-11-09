export const formatDuration = (seconds: number): string => {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours}h ${minutes}m ${secs}s`;
};

export const formatDurationShort = (seconds: number): string => {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  return `${Math.floor(seconds / 3600)}h`;
};

export const parseDuration = (duration: string): number => {
  const regex = /(\d+)([smhd])/g;
  let totalSeconds = 0;
  let match;

  while ((match = regex.exec(duration)) !== null) {
    const value = parseInt(match[1], 10);
    const unit = match[2];

    switch (unit) {
      case "s":
        totalSeconds += value;
        break;
      case "m":
        totalSeconds += value * 60;
        break;
      case "h":
        totalSeconds += value * 3600;
        break;
      case "d":
        totalSeconds += value * 86400;
        break;
    }
  }

  return totalSeconds;
};

export const getTimeAgo = (date: Date | string | number): string => {
  const now = new Date();
  const then = new Date(date);
  const diffMs = now.getTime() - then.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSeconds < 60) return "just now";
  if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
  if (diffWeeks < 4) return `${diffWeeks} week${diffWeeks !== 1 ? "s" : ""} ago`;
  if (diffMonths < 12) return `${diffMonths} month${diffMonths !== 1 ? "s" : ""} ago`;
  return `${diffYears} year${diffYears !== 1 ? "s" : ""} ago`;
};

export const getTimeUntil = (date: Date | string | number): string => {
  const now = new Date();
  const then = new Date(date);
  const diffMs = then.getTime() - now.getTime();
  const diffSeconds = Math.floor(Math.abs(diffMs) / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  const isPast = diffMs < 0;
  const prefix = isPast ? "over " : "in ";

  if (diffSeconds < 60) return isPast ? "just now" : "soon";
  if (diffMinutes < 60) return `${prefix}${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""}`;
  if (diffHours < 24) return `${prefix}${diffHours} hour${diffHours !== 1 ? "s" : ""}`;
  if (diffDays < 7) return `${prefix}${diffDays} day${diffDays !== 1 ? "s" : ""}`;
  if (diffWeeks < 4) return `${prefix}${diffWeeks} week${diffWeeks !== 1 ? "s" : ""}`;
  if (diffMonths < 12) return `${prefix}${diffMonths} month${diffMonths !== 1 ? "s" : ""}`;
  return `${prefix}${diffYears} year${diffYears !== 1 ? "s" : ""}`;
};

export const isToday = (date: Date | string | number): boolean => {
  const d = new Date(date);
  const today = new Date();
  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
};

export const isYesterday = (date: Date | string | number): boolean => {
  const d = new Date(date);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    d.getDate() === yesterday.getDate() &&
    d.getMonth() === yesterday.getMonth() &&
    d.getFullYear() === yesterday.getFullYear()
  );
};

export const isTomorrow = (date: Date | string | number): boolean => {
  const d = new Date(date);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return (
    d.getDate() === tomorrow.getDate() &&
    d.getMonth() === tomorrow.getMonth() &&
    d.getFullYear() === tomorrow.getFullYear()
  );
};

export const isThisWeek = (date: Date | string | number): boolean => {
  const d = new Date(date);
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());
  weekStart.setHours(0, 0, 0, 0);
  return d >= weekStart;
};

export const isThisMonth = (date: Date | string | number): boolean => {
  const d = new Date(date);
  const today = new Date();
  return d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
};

export const isThisYear = (date: Date | string | number): boolean => {
  const d = new Date(date);
  const today = new Date();
  return d.getFullYear() === today.getFullYear();
};

export const getStartOfDay = (date: Date = new Date()): Date => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const getEndOfDay = (date: Date = new Date()): Date => {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
};

export const getStartOfWeek = (date: Date = new Date()): Date => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const getEndOfWeek = (date: Date = new Date()): Date => {
  const d = getStartOfWeek(date);
  d.setDate(d.getDate() + 6);
  d.setHours(23, 59, 59, 999);
  return d;
};

export const getStartOfMonth = (date: Date = new Date()): Date => {
  const d = new Date(date);
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const getEndOfMonth = (date: Date = new Date()): Date => {
  const d = new Date(date);
  d.setMonth(d.getMonth() + 1);
  d.setDate(0);
  d.setHours(23, 59, 59, 999);
  return d;
};

export const getStartOfYear = (date: Date = new Date()): Date => {
  const d = new Date(date);
  d.setMonth(0);
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const getEndOfYear = (date: Date = new Date()): Date => {
  const d = new Date(date);
  d.setMonth(11);
  d.setDate(31);
  d.setHours(23, 59, 59, 999);
  return d;
};

export const addTime = (
  date: Date,
  amount: number,
  unit: "seconds" | "minutes" | "hours" | "days" | "weeks" | "months" | "years"
): Date => {
  const d = new Date(date);
  switch (unit) {
    case "seconds":
      d.setSeconds(d.getSeconds() + amount);
      break;
    case "minutes":
      d.setMinutes(d.getMinutes() + amount);
      break;
    case "hours":
      d.setHours(d.getHours() + amount);
      break;
    case "days":
      d.setDate(d.getDate() + amount);
      break;
    case "weeks":
      d.setDate(d.getDate() + amount * 7);
      break;
    case "months":
      d.setMonth(d.getMonth() + amount);
      break;
    case "years":
      d.setFullYear(d.getFullYear() + amount);
      break;
  }
  return d;
};

export const subtractTime = (
  date: Date,
  amount: number,
  unit: "seconds" | "minutes" | "hours" | "days" | "weeks" | "months" | "years"
): Date => {
  return addTime(date, -amount, unit);
};

export const getTimeDifference = (
  date1: Date | string | number,
  date2: Date | string | number = new Date()
): {
  milliseconds: number;
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  weeks: number;
  months: number;
  years: number;
} => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffMs = Math.abs(d1.getTime() - d2.getTime());

  return {
    milliseconds: diffMs,
    seconds: Math.floor(diffMs / 1000),
    minutes: Math.floor(diffMs / 60000),
    hours: Math.floor(diffMs / 3600000),
    days: Math.floor(diffMs / 86400000),
    weeks: Math.floor(diffMs / 604800000),
    months: Math.floor(diffMs / 2592000000),
    years: Math.floor(diffMs / 31536000000),
  };
};

export const formatTime = (date: Date | string | number, format: "12h" | "24h" = "12h"): string => {
  const d = new Date(date);
  const hours = d.getHours();
  const minutes = d.getMinutes();

  if (format === "24h") {
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  }

  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
};

export const formatDate = (date: Date | string | number, format: "short" | "long" | "iso" = "short"): string => {
  const d = new Date(date);

  if (format === "iso") {
    return d.toISOString();
  }

  if (format === "long") {
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatDateTime = (date: Date | string | number): string => {
  const d = new Date(date);
  return `${formatDate(d, "short")} ${formatTime(d, "12h")}`;
};

export const isWeekend = (date: Date | string | number = new Date()): boolean => {
  const d = new Date(date);
  const day = d.getDay();
  return day === 0 || day === 6;
};

export const isWeekday = (date: Date | string | number = new Date()): boolean => {
  return !isWeekend(date);
};

export const getBusinessDays = (startDate: Date, endDate: Date): number => {
  let count = 0;
  const current = new Date(startDate);
  const end = new Date(endDate);

  while (current <= end) {
    if (isWeekday(current)) {
      count++;
    }
    current.setDate(current.getDate() + 1);
  }

  return count;
};

