"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function SupplierManagement() {
  const [selectedTab, setSelectedTab] = useState<"suppliers" | "orders">(
    "suppliers"
  );

  const suppliers = [
    {
      id: "1",
      name: "AgriSupply Co.",
      category: "Seeds & Fertilizers",
      rating: 4.8,
      orders: 12,
      status: "active",
      contact: "+234 123 456 7890",
    },
    {
      id: "2",
      name: "Farm Equipment Ltd",
      category: "Equipment",
      rating: 4.6,
      orders: 8,
      status: "active",
      contact: "+234 987 654 3210",
    },
    {
      id: "3",
      name: "Organic Solutions",
      category: "Organic Products",
      rating: 4.9,
      orders: 15,
      status: "active",
      contact: "+234 555 123 4567",
    },
  ];

  const orders = [
    {
      id: "ORD-001",
      supplier: "AgriSupply Co.",
      items: "Cocoa Seeds (100kg)",
      status: "pending",
      date: "2024-01-15",
      amount: 2500,
    },
    {
      id: "ORD-002",
      supplier: "Farm Equipment Ltd",
      items: "Irrigation System",
      status: "delivered",
      date: "2024-01-10",
      amount: 15000,
    },
    {
      id: "ORD-003",
      supplier: "Organic Solutions",
      items: "Organic Fertilizer (50kg)",
      status: "in_transit",
      date: "2024-01-12",
      amount: 3500,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-cream-200 bg-gradient-to-br from-violet-50/80 to-purple-50/80 p-6 shadow-sm backdrop-blur"
    >
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-cocoa-900">
          Supplier Management
        </h2>
        <p className="text-xs uppercase tracking-[0.25em] text-cocoa-400">
          Manage suppliers and orders
        </p>
      </div>

      <div className="mb-4 flex gap-2">
        <button
          type="button"
          onClick={() => setSelectedTab("suppliers")}
          className={`flex-1 rounded-xl border px-4 py-2 text-sm font-semibold transition ${
            selectedTab === "suppliers"
              ? "border-violet-600 bg-violet-600 text-white"
              : "border-cream-300 bg-white text-cocoa-700 hover:border-violet-300"
          }`}
        >
          Suppliers
        </button>
        <button
          type="button"
          onClick={() => setSelectedTab("orders")}
          className={`flex-1 rounded-xl border px-4 py-2 text-sm font-semibold transition ${
            selectedTab === "orders"
              ? "border-violet-600 bg-violet-600 text-white"
              : "border-cream-300 bg-white text-cocoa-700 hover:border-violet-300"
          }`}
        >
          Orders
        </button>
      </div>

      <div className="space-y-3">
        {selectedTab === "suppliers" ? (
          <>
            {suppliers.map((supplier) => (
              <div
                key={supplier.id}
                className="rounded-xl border border-violet-200 bg-white/80 p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-cocoa-900">
                      {supplier.name}
                    </h3>
                    <p className="mt-1 text-xs text-cocoa-600">
                      {supplier.category}
                    </p>
                    <p className="mt-1 text-xs text-cocoa-500">
                      {supplier.contact}
                    </p>
                    <div className="mt-2 flex items-center gap-3 text-xs">
                      <span className="text-violet-700">
                        ⭐ {supplier.rating}
                      </span>
                      <span className="text-cocoa-500">
                        • {supplier.orders} orders
                      </span>
                    </div>
                  </div>
                  <span className="rounded-full bg-green-100 px-2 py-1 text-[10px] font-semibold text-green-700">
                    {supplier.status}
                  </span>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-xl border border-purple-200 bg-white/80 p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-cocoa-900">
                      {order.id}
                    </h3>
                    <p className="mt-1 text-xs text-cocoa-600">
                      {order.supplier}
                    </p>
                    <p className="mt-1 text-xs text-cocoa-700">{order.items}</p>
                    <p className="mt-2 text-xs text-cocoa-500">
                      {new Date(order.date).toLocaleDateString()} •{" "}
                      {new Intl.NumberFormat(undefined, {
                        style: "currency",
                        currency: "USD",
                      }).format(order.amount)}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "in_transit"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {order.status.replace("_", " ")}
                  </span>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </motion.section>
  );
}
