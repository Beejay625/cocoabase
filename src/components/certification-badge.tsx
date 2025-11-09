"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import {
  Certification,
  isCertificationValid,
  isCertificationExpiringSoon,
  getDaysUntilExpiry,
  formatCertificationType,
} from "@/lib/certification-utils";

type CertificationBadgeProps = {
  certification: Certification;
  className?: string;
  showExpiry?: boolean;
};

export default function CertificationBadge({
  certification,
  className,
  showExpiry = true,
}: CertificationBadgeProps) {
  const isValid = isCertificationValid(certification);
  const expiringSoon = isCertificationExpiringSoon(certification);
  const daysUntilExpiry = getDaysUntilExpiry(certification);

  const statusColors = {
    active: "bg-green-100 text-green-800 border-green-300",
    expired: "bg-red-100 text-red-800 border-red-300",
    "renewal-due": "bg-yellow-100 text-yellow-800 border-yellow-300",
    pending: "bg-blue-100 text-blue-800 border-blue-300",
    revoked: "bg-gray-100 text-gray-800 border-gray-300",
  };

  const status = isValid
    ? expiringSoon
      ? "renewal-due"
      : "active"
    : certification.status;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium",
        statusColors[status],
        className
      )}
    >
      <span>{formatCertificationType(certification.type)}</span>
      {showExpiry && isValid && (
        <span className="text-xs opacity-75">
          ({daysUntilExpiry > 0 ? `${daysUntilExpiry}d left` : "Expired"})
        </span>
      )}
      {expiringSoon && (
        <span className="text-xs">⚠️</span>
      )}
    </motion.div>
  );
}

