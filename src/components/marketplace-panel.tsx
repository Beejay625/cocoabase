"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function MarketplacePanel() {
  const [selectedTab, setSelectedTab] = useState<"buy" | "sell">("buy");

  const listings = [
    {
      id: "1",
      type: "buy" as const,
      title: "Premium Cocoa Beans",
      seller: "Farm ABC",
      price: 2850,
      currency: "USD",
      quantity: "500 kg",
      location: "Ghana",
      rating: 4.8,
    },
    {
      id: "2",
      type: "buy" as const,
      title: "Organic Cocoa Seeds",
      seller: "Farm XYZ",
      price: 120,
      currency: "USD",
      quantity: "1000 seeds",
      location: "Ivory Coast",
      rating: 4.9,
    },
    {
      id: "3",
      type: "sell" as const,
      title: "Harvested Cocoa Pods",
      seller: "Your Farm",
      price: 2800,
      currency: "USD",
      quantity: "300 kg",
      location: "Nigeria",
      rating: 5.0,
    },
  ];

  const filteredListings = listings.filter((l) => l.type === selectedTab);

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-cream-200 bg-gradient-to-br from-amber-50/80 to-yellow-50/80 p-6 shadow-sm backdrop-blur"
    >
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-cocoa-900">Marketplace</h2>
        <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
          Buy and sell agricultural products
        </p>
      </div>

      <div className="mb-4 flex gap-2">
        <button
          type="button"
          onClick={() => setSelectedTab("buy")}
          className={`flex-1 rounded-xl border px-4 py-2 text-sm font-semibold transition ${
            selectedTab === "buy"
              ? "border-amber-600 bg-amber-600 text-white"
              : "border-cream-300 bg-white text-cocoa-700 hover:border-amber-300"
          }`}
        >
          🛒 Buy
        </button>
        <button
          type="button"
          onClick={() => setSelectedTab("sell")}
          className={`flex-1 rounded-xl border px-4 py-2 text-sm font-semibold transition ${
            selectedTab === "sell"
              ? "border-amber-600 bg-amber-600 text-white"
              : "border-cream-300 bg-white text-cocoa-700 hover:border-amber-300"
          }`}
        >
          💰 Sell
        </button>
      </div>

      <div className="space-y-3">
        {filteredListings.map((listing) => (
          <div
            key={listing.id}
            className="rounded-2xl border border-amber-200 bg-white/90 p-4 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-cocoa-900">
                  {listing.title}
                </h3>
                <p className="mt-1 text-sm text-cocoa-600">
                  {listing.seller} • {listing.location}
                </p>
                <div className="mt-2 flex items-center gap-3 text-xs text-cocoa-500">
                  <span>
                    {new Intl.NumberFormat(undefined, {
                      style: "currency",
                      currency: listing.currency,
                    }).format(listing.price)}
                  </span>
                  <span>•</span>
                  <span>{listing.quantity}</span>
                  <span>•</span>
                  <span>⭐ {listing.rating}</span>
                </div>
              </div>
              <button
                type="button"
                className="rounded-xl border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 transition hover:bg-amber-100"
              >
                {selectedTab === "buy" ? "Buy Now" : "View"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredListings.length === 0 && (
        <div className="rounded-2xl border border-cream-200 bg-cream-50/70 p-6 text-center">
          <p className="text-sm text-cocoa-600">
            No {selectedTab === "buy" ? "products" : "listings"} available
          </p>
        </div>
      )}
    </motion.section>
  );
}
