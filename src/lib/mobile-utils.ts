export const isMobileDevice = (): boolean => {
  if (typeof window === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

export const isTabletDevice = (): boolean => {
  if (typeof window === "undefined") return false;
  return /iPad|Android/i.test(navigator.userAgent) && !isMobileDevice();
};

export const requestCameraPermission = async (): Promise<boolean> => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    stream.getTracks().forEach((track) => track.stop());
    return true;
  } catch {
    return false;
  }
};

export const capturePhoto = async (): Promise<string | null> => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const video = document.createElement("video");
    video.srcObject = stream;
    video.play();

    return new Promise((resolve) => {
      video.addEventListener("loadedmetadata", () => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(video, 0, 0);
          stream.getTracks().forEach((track) => track.stop());
          resolve(canvas.toDataURL("image/jpeg"));
        } else {
          stream.getTracks().forEach((track) => track.stop());
          resolve(null);
        }
      });
    });
  } catch {
    return null;
  }
};

export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return "denied";
  }

  if (Notification.permission === "granted") {
    return "granted";
  }

  if (Notification.permission !== "denied") {
    return await Notification.requestPermission();
  }

  return "denied";
};

export const sendPushNotification = async (
  title: string,
  options?: NotificationOptions
): Promise<void> => {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return;
  }

  const permission = await requestNotificationPermission();
  if (permission === "granted") {
    new Notification(title, options);
  }
};

export const vibrate = (pattern: number | number[]): void => {
  if (typeof window === "undefined" || !navigator.vibrate) {
    return;
  }
  navigator.vibrate(pattern);
};

export const shareContent = async (
  data: ShareData
): Promise<boolean> => {
  if (typeof window === "undefined" || !navigator.share) {
    return false;
  }

  try {
    await navigator.share(data);
    return true;
  } catch {
    return false;
  }
};

export const getBatteryLevel = async (): Promise<number | null> => {
  if (typeof window === "undefined" || !("getBattery" in navigator)) {
    return null;
  }

  try {
    const battery = await (navigator as unknown as { getBattery: () => Promise<BatteryManager> }).getBattery();
    return battery.level * 100;
  } catch {
    return null;
  }
};

export const isOnline = (): boolean => {
  if (typeof window === "undefined") return true;
  return navigator.onLine;
};

export const getConnectionType = (): string | null => {
  if (typeof window === "undefined") return null;
  const connection = (navigator as unknown as { connection?: { effectiveType?: string } }).connection;
  return connection?.effectiveType || null;
};

export const enableOfflineMode = (): void => {
  if (typeof window === "undefined") return;
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js").catch(() => {
      console.warn("Service worker registration failed");
    });
  }
};

export const formatMobileDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const formatMobileTime = (date: Date): string => {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
};


