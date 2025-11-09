"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import Button from "./button";
import {
  BackupData,
  createBackup,
  downloadBackup,
  uploadBackup,
  validateBackup,
  formatBackupSize,
  getBackupSize,
} from "@/lib/backup-utils";

type BackupManagerProps = {
  data: {
    plantations: unknown[];
    tasks: unknown[];
    inventory: unknown[];
    settings: unknown;
  };
  onRestore?: (backup: BackupData) => void;
  className?: string;
};

export default function BackupManager({
  data,
  onRestore,
  className,
}: BackupManagerProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleBackup = () => {
    const backup = createBackup(data);
    downloadBackup(backup);
  };

  const handleRestore = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      const backup = await uploadBackup(file);
      const validation = validateBackup(backup);

      if (!validation.valid) {
        setUploadError(`Invalid backup: ${validation.errors.join(", ")}`);
        setIsUploading(false);
        return;
      }

      if (onRestore) {
        onRestore(backup);
      }
    } catch (error) {
      setUploadError(
        error instanceof Error ? error.message : "Failed to restore backup"
      );
    } finally {
      setIsUploading(false);
    }
  };

  const backupSize = getBackupSize(createBackup(data));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("rounded-xl bg-white border border-cream-200 p-6", className)}
    >
      <h3 className="text-lg font-semibold text-cocoa-800 mb-4">Data Backup & Restore</h3>

      <div className="space-y-4">
        <div>
          <div className="text-sm text-cocoa-600 mb-2">
            Backup size: {formatBackupSize(backupSize)}
          </div>
          <Button onClick={handleBackup} variant="primary" fullWidth>
            Download Backup
          </Button>
        </div>

        <div>
          <label className="block text-sm font-medium text-cocoa-700 mb-2">
            Restore from Backup
          </label>
          <input
            type="file"
            accept=".json"
            onChange={handleRestore}
            disabled={isUploading}
            className="block w-full text-sm text-cocoa-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cocoa-600 file:text-white hover:file:bg-cocoa-700 disabled:opacity-50"
          />
          {isUploading && (
            <div className="mt-2 text-sm text-cocoa-600">Uploading...</div>
          )}
          {uploadError && (
            <div className="mt-2 text-sm text-red-600">{uploadError}</div>
          )}
        </div>

        <div className="rounded-lg bg-blue-50 border border-blue-200 p-3">
          <div className="text-xs font-medium text-blue-800 mb-1">ℹ️ Backup Information</div>
          <div className="text-xs text-blue-700">
            Backups include all plantations, tasks, inventory, and settings. Restoring will
            replace your current data.
          </div>
        </div>
      </div>
    </motion.div>
  );
}

