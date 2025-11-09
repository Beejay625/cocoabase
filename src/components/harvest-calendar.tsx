"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { usePlantationsStore } from "@/store/plantations";

export default function HarvestCalendar() {
  const plantations = usePlantationsStore((state) => state.plantations);
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const harvestEvents = useMemo(() => {
    const events: Array<{
      date: Date;
      plantation: string;
      stage: string;
      yield?: number;
    }> = [];

    plantations.forEach((plantation) => {
      if (plantation.stage === "harvested" && plantation.yieldTimeline) {
        plantation.yieldTimeline.forEach((checkpoint) => {
          events.push({
            date: new Date(checkpoint.date),
            plantation: plantation.seedName,
            stage: plantation.stage,
            yield: checkpoint.yieldKg,
          });
        });
      }
    });

    return events.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
  }, [plantations]);

  const monthStart = new Date(
    selectedMonth.getFullYear(),
    selectedMonth.getMonth(),
    1
  );
  const monthEnd = new Date(
    selectedMonth.getFullYear(),
    selectedMonth.getMonth() + 1,
    0
  );
  const daysInMonth = monthEnd.getDate();
  const firstDayOfWeek = monthStart.getDay();

  const monthEvents = harvestEvents.filter((event) => {
    const eventMonth = event.date.getMonth();
    const eventYear = event.date.getFullYear();
    return (
      eventMonth === selectedMonth.getMonth() &&
      eventYear === selectedMonth.getFullYear()
    );
  });

  const getEventsForDay = (day: number) => {
    return monthEvents.filter(
      (event) => event.date.getDate() === day
    );
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setSelectedMonth((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 }}
      className="rounded-3xl border border-cocoa-800/60 bg-[#101f3c]/80 p-6 text-slate-100 shadow-xl shadow-black/20 backdrop-blur"
    >
      <header className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Harvest calendar</h2>
          <p className="text-sm text-slate-300/80">
            Visual calendar showing harvest schedules and events.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigateMonth("prev")}
            className="rounded-full bg-slate-800/70 p-2 text-slate-200/90 transition hover:bg-slate-700/80"
          >
            ←
          </button>
          <span className="min-w-[150px] text-center text-sm font-semibold text-white">
            {selectedMonth.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <button
            type="button"
            onClick={() => navigateMonth("next")}
            className="rounded-full bg-slate-800/70 p-2 text-slate-200/90 transition hover:bg-slate-700/80"
          >
            →
          </button>
        </div>
      </header>

      <div className="mt-6">
        <div className="grid grid-cols-7 gap-1">
          {weekDays.map((day) => (
            <div
              key={day}
              className="p-2 text-center text-xs font-semibold uppercase text-slate-400/70"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDayOfWeek }).map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const events = getEventsForDay(day);
            return (
              <div
                key={day}
                className={cn(
                  "relative aspect-square rounded-lg border border-slate-700/40 bg-slate-900/50 p-1",
                  events.length > 0 && "border-emerald-500/60 bg-emerald-500/10"
                )}
              >
                <div className="text-xs font-semibold text-slate-300/70">
                  {day}
                </div>
                {events.length > 0 && (
                  <div className="mt-1 space-y-0.5">
                    {events.slice(0, 2).map((event, idx) => (
                      <div
                        key={idx}
                        className="truncate rounded bg-emerald-500/20 px-1 text-[10px] text-emerald-300"
                        title={`${event.plantation}: ${event.yield || 0}kg`}
                      >
                        {event.plantation.slice(0, 8)}
                      </div>
                    ))}
                    {events.length > 2 && (
                      <div className="text-[10px] text-emerald-300/70">
                        +{events.length - 2}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {monthEvents.length > 0 && (
        <div className="mt-6 space-y-2">
          <h3 className="text-sm font-semibold text-white">
            Harvest events this month
          </h3>
          {monthEvents.map((event, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3"
            >
              <div>
                <p className="text-sm font-semibold text-white">
                  {event.plantation}
                </p>
                <p className="text-xs text-slate-300/70">
                  {event.date.toLocaleDateString()}
                </p>
              </div>
              {event.yield && (
                <p className="text-sm font-bold text-emerald-300">
                  {event.yield} kg
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </motion.section>
  );
}

