export type SyncStatus = "idle" | "syncing" | "success" | "error";

export type SyncOperation = {
  id: string;
  type: "upload" | "download" | "sync";
  entity: string;
  entityId: string;
  status: SyncStatus;
  timestamp: Date;
  error?: string;
};

export interface SyncState {
  lastSync: Date | null;
  isOnline: boolean;
  pendingChanges: number;
  operations: SyncOperation[];
}

export const createSyncOperation = (
  type: SyncOperation["type"],
  entity: string,
  entityId: string
): SyncOperation => {
  return {
    id: `sync-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type,
    entity,
    entityId,
    status: "syncing",
    timestamp: new Date(),
  };
};

export const markOperationSuccess = (operation: SyncOperation): SyncOperation => {
  return {
    ...operation,
    status: "success",
  };
};

export const markOperationError = (
  operation: SyncOperation,
  error: string
): SyncOperation => {
  return {
    ...operation,
    status: "error",
    error,
  };
};

export const getPendingOperations = (operations: SyncOperation[]): SyncOperation[] => {
  return operations.filter((op) => op.status === "syncing");
};

export const getFailedOperations = (operations: SyncOperation[]): SyncOperation[] => {
  return operations.filter((op) => op.status === "error");
};

export const retryFailedOperation = (operation: SyncOperation): SyncOperation => {
  return {
    ...operation,
    status: "syncing",
    error: undefined,
  };
};

export const checkOnlineStatus = (): boolean => {
  if (typeof window === "undefined") return true;
  return navigator.onLine;
};

export const watchOnlineStatus = (
  callback: (isOnline: boolean) => void
): (() => void) => {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleOnline = () => callback(true);
  const handleOffline = () => callback(false);

  window.addEventListener("online", handleOnline);
  window.addEventListener("offline", handleOffline);

  callback(navigator.onLine);

  return () => {
    window.removeEventListener("online", handleOnline);
    window.removeEventListener("offline", handleOffline);
  };
};

export const queueSyncOperation = (
  state: SyncState,
  operation: SyncOperation
): SyncState => {
  return {
    ...state,
    pendingChanges: state.pendingChanges + 1,
    operations: [...state.operations, operation],
  };
};

export const completeSyncOperation = (
  state: SyncState,
  operationId: string,
  success: boolean,
  error?: string
): SyncState => {
  const operations = state.operations.map((op) => {
    if (op.id === operationId) {
      return success
        ? markOperationSuccess(op)
        : markOperationError(op, error || "Unknown error");
    }
    return op;
  });

  return {
    ...state,
    lastSync: success ? new Date() : state.lastSync,
    pendingChanges: Math.max(0, state.pendingChanges - 1),
    operations,
  };
};

export const getSyncSummary = (state: SyncState): {
  total: number;
  success: number;
  failed: number;
  pending: number;
} => {
  return {
    total: state.operations.length,
    success: state.operations.filter((op) => op.status === "success").length,
    failed: state.operations.filter((op) => op.status === "error").length,
    pending: state.operations.filter((op) => op.status === "syncing").length,
  };
};

