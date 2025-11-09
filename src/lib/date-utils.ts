export const formatRelativeTime = (date: string | Date): string => {
  const now = Date.now();
  const target = typeof date === "string" ? new Date(date).getTime() : date.getTime();
  const diffMs = now - target;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSeconds < 60) {
    return "just now";
  }
  if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;
  }
  if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  }
  if (diffDays < 7) {
    return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
  }
  if (diffWeeks < 4) {
    return `${diffWeeks} week${diffWeeks !== 1 ? "s" : ""} ago`;
  }
  if (diffMonths < 12) {
    return `${diffMonths} month${diffMonths !== 1 ? "s" : ""} ago`;
  }
  return `${diffYears} year${diffYears !== 1 ? "s" : ""} ago`;
};

export const formatDateRange = (
  start: string | Date,
  end: string | Date
): string => {
  const startDate = typeof start === "string" ? new Date(start) : start;
  const endDate = typeof end === "string" ? new Date(end) : end;

  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: startDate.getFullYear() !== endDate.getFullYear() ? "numeric" : undefined,
  });

  const startFormatted = formatter.format(startDate);
  const endFormatted = formatter.format(endDate);

  if (startFormatted === endFormatted) {
    return startFormatted;
  }

  return `${startFormatted} - ${endFormatted}`;
};

export const getDaysUntil = (targetDate: string | Date): number => {
  const now = Date.now();
  const target = typeof targetDate === "string" ? new Date(targetDate).getTime() : targetDate.getTime();
  const diffMs = target - now;
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
};

export const isDateInRange = (
  date: string | Date,
  start: string | Date,
  end: string | Date
): boolean => {
  const checkDate = typeof date === "string" ? new Date(date).getTime() : date.getTime();
  const startTime = typeof start === "string" ? new Date(start).getTime() : start.getTime();
  const endTime = typeof end === "string" ? new Date(end).getTime() : end.getTime();
  return checkDate >= startTime && checkDate <= endTime;
};

export const getStartOfDay = (date: Date = new Date()): Date => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  return start;
};

export const getEndOfDay = (date: Date = new Date()): Date => {
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);
  return end;
};

export const getStartOfWeek = (date: Date = new Date()): Date => {
  const start = new Date(date);
  const day = start.getDay();
  const diff = start.getDate() - day + (day === 0 ? -6 : 1); // Adjust to Monday
  start.setDate(diff);
  start.setHours(0, 0, 0, 0);
  return start;
};

export const getEndOfWeek = (date: Date = new Date()): Date => {
  const end = getStartOfWeek(date);
  end.setDate(end.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return end;
};

export const getStartOfMonth = (date: Date = new Date()): Date => {
  const start = new Date(date);
  start.setDate(1);
  start.setHours(0, 0, 0, 0);
  return start;
};

export const getEndOfMonth = (date: Date = new Date()): Date => {
  const end = new Date(date);
  end.setMonth(end.getMonth() + 1);
  end.setDate(0);
  end.setHours(23, 59, 59, 999);
  return end;
};

export const formatDuration = (milliseconds: number): string => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}d ${hours % 24}h`;
  }
  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  }
  return `${seconds}s`;
};

export const isToday = (date: string | Date): boolean => {
  const checkDate = typeof date === "string" ? new Date(date) : date;
  const today = new Date();
  return (
    checkDate.getDate() === today.getDate() &&
    checkDate.getMonth() === today.getMonth() &&
    checkDate.getFullYear() === today.getFullYear()
  );
};

export const isThisWeek = (date: string | Date): boolean => {
  const checkDate = typeof date === "string" ? new Date(date) : date;
  const weekStart = getStartOfWeek();
  const weekEnd = getEndOfWeek();
  return checkDate >= weekStart && checkDate <= weekEnd;
};

export const isThisMonth = (date: string | Date): boolean => {
  const checkDate = typeof date === "string" ? new Date(date) : date;
  const monthStart = getStartOfMonth();
  const monthEnd = getEndOfMonth();
  return checkDate >= monthStart && checkDate <= monthEnd;
};

export const getTimeUntilDeadline = (deadline: string | Date): {
  days: number;
  hours: number;
  minutes: number;
  isOverdue: boolean;
  formatted: string;
} => {
  const now = Date.now();
  const target = typeof deadline === "string" ? new Date(deadline).getTime() : deadline.getTime();
  const diffMs = target - now;
  const isOverdue = diffMs < 0;
  const absDiff = Math.abs(diffMs);

  const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60));

  let formatted = "";
  if (isOverdue) {
    formatted = "Overdue";
    if (days > 0) {
      formatted += ` by ${days} day${days !== 1 ? "s" : ""}`;
    } else if (hours > 0) {
      formatted += ` by ${hours} hour${hours !== 1 ? "s" : ""}`;
    } else if (minutes > 0) {
      formatted += ` by ${minutes} minute${minutes !== 1 ? "s" : ""}`;
    }
  } else {
    if (days > 0) {
      formatted = `${days} day${days !== 1 ? "s" : ""}`;
    } else if (hours > 0) {
      formatted = `${hours} hour${hours !== 1 ? "s" : ""}`;
    } else if (minutes > 0) {
      formatted = `${minutes} minute${minutes !== 1 ? "s" : ""}`;
    } else {
      formatted = "Due soon";
    }
  }

  return { days, hours, minutes, isOverdue, formatted };
};

