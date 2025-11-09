"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function MobileFeatures() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const features = [
    {
      id: "gps",
      icon: "📍",
      title: "GPS Tracking",
      description: "Track plantation locations with precise GPS coordinates",
      enabled: true,
    },
    {
      id: "offline",
      icon: "📱",
      title: "Offline Mode",
      description: "Work without internet connection, sync when online",
      enabled: true,
    },
    {
      id: "photo",
      icon: "📸",
      title: "Photo Capture",
      description: "Capture and attach photos to plantations and tasks",
      enabled: true,
    },
    {
      id: "barcode",
      icon: "📷",
      title: "Barcode Scanning",
      description: "Scan barcodes for inventory and equipment tracking",
      enabled: false,
    },
    {
      id: "notifications",
      icon: "🔔",
      title: "Push Notifications",
      description: "Receive real-time alerts and reminders on mobile",
      enabled: true,
    },
    {
      id: "voice",
      icon: "🎤",
      title: "Voice Notes",
      description: "Record voice notes for quick documentation",
      enabled: false,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-cream-200 bg-gradient-to-br from-blue-50/80 to-cyan-50/80 p-6 shadow-sm backdrop-blur"
    >
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-cocoa-900">
          Mobile Features
        </h2>
        <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
          Mobile app capabilities
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {features.map((feature) => (
          <div
            key={feature.id}
            className={`rounded-2xl border p-4 transition ${
              feature.enabled
                ? "border-blue-200 bg-white/90 shadow-sm"
                : "border-cream-200 bg-cream-50/70 opacity-60"
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{feature.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-cocoa-900">
                    {feature.title}
                  </h3>
                  {feature.enabled ? (
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                      Active
                    </span>
                  ) : (
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                      Coming Soon
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-cocoa-600">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-cream-200 bg-cream-50/70 p-4">
        <p className="text-sm font-semibold text-cocoa-900">
          Mobile App Benefits:
        </p>
        <ul className="mt-2 space-y-1 text-xs text-cocoa-600">
          <li>• Access your dashboard on the go</li>
          <li>• Update plantations from the field</li>
          <li>• Capture photos and GPS coordinates</li>
          <li>• Receive instant notifications</li>
        </ul>
      </div>
    </motion.section>
  );
}
