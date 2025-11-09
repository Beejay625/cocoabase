"use client";

import { cn } from "@/lib/cn";

type TimelineEvent = {
  id: string;
  title: string;
  description?: string;
  timestamp: Date | string;
  icon?: React.ReactNode;
  status?: "completed" | "pending" | "in_progress";
};

type TimelineProps = {
  events: TimelineEvent[];
  className?: string;
};

export default function Timeline({ events, className }: TimelineProps) {
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(a.timestamp).getTime();
    const dateB = new Date(b.timestamp).getTime();
    return dateB - dateA;
  });

  return (
    <div className={cn("relative", className)}>
      {sortedEvents.map((event, index) => {
        const isLast = index === sortedEvents.length - 1;
        const status = event.status || "completed";

        const statusColors = {
          completed: "bg-green-500 border-green-600",
          pending: "bg-cream-200 border-cream-300",
          in_progress: "bg-yellow-500 border-yellow-600",
        };

        return (
          <div key={event.id} className="relative flex gap-4 pb-6">
            {!isLast && (
              <div className="absolute left-5 top-10 w-0.5 h-full bg-cream-200" />
            )}
            <div
              className={cn(
                "relative z-10 w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                statusColors[status]
              )}
            >
              {event.icon || (
                <div
                  className={cn(
                    "w-3 h-3 rounded-full",
                    status === "completed"
                      ? "bg-white"
                      : status === "in_progress"
                      ? "bg-white"
                      : "bg-cream-400"
                  )}
                />
              )}
            </div>
            <div className="flex-1 pt-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-cocoa-800">{event.title}</h4>
                <span className="text-xs text-cocoa-500">
                  {new Date(event.timestamp).toLocaleDateString()}
                </span>
              </div>
              {event.description && (
                <p className="text-sm text-cocoa-600">{event.description}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

