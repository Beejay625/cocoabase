import type { Alert, AlertChannel } from "@/store/alerts";

export type NotificationResult =
  | {
      status: "sent";
    }
  | {
      status: "failed";
      error: string;
    };

const logDelivery = (channel: AlertChannel, alert: Alert) => {
  const payload = {
    id: alert.id,
    type: alert.type,
    title: alert.title,
    source: alert.source,
    metadata: alert.metadata,
    createdAt: alert.createdAt,
  };

  console.info(`[alerts] ${channel} notification dispatched`, payload);
};

export const sendEmailNotification = async (
  alert: Alert
): Promise<NotificationResult> => {
  try {
    logDelivery("email", alert);
    await new Promise((resolve) => setTimeout(resolve, 150));
    return { status: "sent" };
  } catch (error) {
    return {
      status: "failed",
      error:
        error instanceof Error
          ? error.message
          : "Unknown error sending email notification",
    };
  }
};

export const sendSmsNotification = async (
  alert: Alert
): Promise<NotificationResult> => {
  try {
    logDelivery("sms", alert);
    await new Promise((resolve) => setTimeout(resolve, 150));
    return { status: "sent" };
  } catch (error) {
    return {
      status: "failed",
      error:
        error instanceof Error
          ? error.message
          : "Unknown error sending SMS notification",
    };
  }
};


