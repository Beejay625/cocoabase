type LogLevel = "debug" | "info" | "warn" | "error";

type LogEntry = {
  level: LogLevel;
  message: string;
  timestamp: Date;
  data?: unknown;
  context?: Record<string, unknown>;
};

class Logger {
  private logs: LogEntry[] = [];
  private maxLogs: number = 1000;
  private level: LogLevel = "info";
  private subscribers: Set<(entry: LogEntry) => void> = new Set();

  setLevel(level: LogLevel): void {
    this.level = level;
  }

  getLevel(): LogLevel {
    return this.level;
  }

  setMaxLogs(max: number): void {
    this.maxLogs = max;
    if (this.logs.length > max) {
      this.logs = this.logs.slice(-max);
    }
  }

  subscribe(callback: (entry: LogEntry) => void): () => void {
    this.subscribers.add(callback);
    return () => {
      this.subscribers.delete(callback);
    };
  }

  private shouldLog(level: LogLevel): boolean {
    const levels: LogLevel[] = ["debug", "info", "warn", "error"];
    return levels.indexOf(level) >= levels.indexOf(this.level);
  }

  private log(level: LogLevel, message: string, data?: unknown, context?: Record<string, unknown>): void {
    if (!this.shouldLog(level)) {
      return;
    }

    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date(),
      data,
      context,
    };

    this.logs.push(entry);

    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    this.subscribers.forEach((callback) => {
      try {
        callback(entry);
      } catch (error) {
        console.error("Logger subscriber error:", error);
      }
    });

    const consoleMethod = level === "error" ? "error" : level === "warn" ? "warn" : "log";
    const prefix = `[${level.toUpperCase()}]`;
    
    if (data || context) {
      console[consoleMethod](prefix, message, { data, context });
    } else {
      console[consoleMethod](prefix, message);
    }
  }

  debug(message: string, data?: unknown, context?: Record<string, unknown>): void {
    this.log("debug", message, data, context);
  }

  info(message: string, data?: unknown, context?: Record<string, unknown>): void {
    this.log("info", message, data, context);
  }

  warn(message: string, data?: unknown, context?: Record<string, unknown>): void {
    this.log("warn", message, data, context);
  }

  error(message: string, data?: unknown, context?: Record<string, unknown>): void {
    this.log("error", message, data, context);
  }

  getLogs(level?: LogLevel): LogEntry[] {
    if (level) {
      return this.logs.filter((log) => log.level === level);
    }
    return [...this.logs];
  }

  getRecentLogs(count: number, level?: LogLevel): LogEntry[] {
    const logs = level ? this.logs.filter((log) => log.level === level) : this.logs;
    return logs.slice(-count);
  }

  clear(): void {
    this.logs = [];
  }

  export(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  import(logsJson: string): void {
    try {
      const parsed = JSON.parse(logsJson);
      if (Array.isArray(parsed)) {
        this.logs = parsed.map((entry) => ({
          ...entry,
          timestamp: new Date(entry.timestamp),
        }));
      }
    } catch (error) {
      console.error("Failed to import logs:", error);
    }
  }
}

export const logger = new Logger();

export default logger;
