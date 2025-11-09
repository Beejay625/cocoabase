"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import Input from "./input";
import Button from "./button";
import { useDebounce } from "@/lib/hooks";

type SearchFilter = {
  field: string;
  operator: "contains" | "equals" | "startsWith" | "endsWith" | "greaterThan" | "lessThan";
  value: string;
};

type AdvancedSearchProps = {
  onSearch: (query: string, filters: SearchFilter[]) => void;
  fields?: Array<{ value: string; label: string }>;
  className?: string;
};

export default function AdvancedSearch({
  onSearch,
  fields = [],
  className,
}: AdvancedSearchProps) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilter[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  const addFilter = () => {
    setFilters([
      ...filters,
      {
        field: fields[0]?.value || "",
        operator: "contains",
        value: "",
      },
    ]);
  };

  const updateFilter = (index: number, updates: Partial<SearchFilter>) => {
    setFilters(
      filters.map((f, i) => (i === index ? { ...f, ...updates } : f))
    );
  };

  const removeFilter = (index: number) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const handleSearch = () => {
    onSearch(debouncedQuery, filters);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("rounded-xl bg-white border border-cream-200 p-4", className)}
    >
      <div className="flex gap-2 mb-4">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          fullWidth
          className="flex-1"
        />
        <Button onClick={handleSearch} variant="primary">
          Search
        </Button>
        <Button
          onClick={() => setShowAdvanced(!showAdvanced)}
          variant="outline"
        >
          {showAdvanced ? "Simple" : "Advanced"}
        </Button>
      </div>

      {showAdvanced && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="space-y-3 border-t border-cream-200 pt-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-cocoa-700">Filters</span>
            <Button onClick={addFilter} variant="ghost" size="sm">
              + Add Filter
            </Button>
          </div>

          {filters.map((filter, index) => (
            <div key={index} className="flex gap-2 items-end">
              <select
                value={filter.field}
                onChange={(e) =>
                  updateFilter(index, { field: e.target.value })
                }
                className="rounded-lg border border-cream-300 px-3 py-2 text-sm"
              >
                {fields.map((field) => (
                  <option key={field.value} value={field.value}>
                    {field.label}
                  </option>
                ))}
              </select>
              <select
                value={filter.operator}
                onChange={(e) =>
                  updateFilter(index, {
                    operator: e.target.value as SearchFilter["operator"],
                  })
                }
                className="rounded-lg border border-cream-300 px-3 py-2 text-sm"
              >
                <option value="contains">Contains</option>
                <option value="equals">Equals</option>
                <option value="startsWith">Starts With</option>
                <option value="endsWith">Ends With</option>
                <option value="greaterThan">Greater Than</option>
                <option value="lessThan">Less Than</option>
              </select>
              <Input
                value={filter.value}
                onChange={(e) =>
                  updateFilter(index, { value: e.target.value })
                }
                placeholder="Value"
                className="flex-1"
              />
              <Button
                onClick={() => removeFilter(index)}
                variant="ghost"
                size="sm"
              >
                ✕
              </Button>
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

