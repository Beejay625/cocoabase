export interface BarcodeData {
  type: string;
  value: string;
  format: string;
}

export const scanBarcode = async (): Promise<BarcodeData | null> => {
  if (typeof window === "undefined" || !("BarcodeDetector" in window)) {
    return null;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
    const video = document.createElement("video");
    video.srcObject = stream;
    video.play();

    const detector = new (window as unknown as { BarcodeDetector: new () => BarcodeDetector }).BarcodeDetector({
      formats: ["qr_code", "ean_13", "ean_8", "code_128"],
    });

    return new Promise((resolve) => {
      const checkBarcode = async () => {
        try {
          const barcodes = await detector.detect(video);
          if (barcodes.length > 0) {
            stream.getTracks().forEach((track) => track.stop());
            resolve({
              type: barcodes[0].format,
              value: barcodes[0].rawValue,
              format: barcodes[0].format,
            });
          } else {
            requestAnimationFrame(checkBarcode);
          }
        } catch {
          stream.getTracks().forEach((track) => track.stop());
          resolve(null);
        }
      };
      checkBarcode();
    });
  } catch {
    return null;
  }
};

export const generateQRCode = async (data: string): Promise<string | null> => {
  try {
    const QRCode = await import("qrcode");
    return await QRCode.toDataURL(data);
  } catch {
    return null;
  }
};

export const parseBarcodeValue = (value: string): {
  type: string;
  data: Record<string, unknown>;
} => {
  if (value.startsWith("PLANTATION:")) {
    const id = value.replace("PLANTATION:", "");
    return {
      type: "plantation",
      data: { id },
    };
  }

  if (value.startsWith("TASK:")) {
    const id = value.replace("TASK:", "");
    return {
      type: "task",
      data: { id },
    };
  }

  if (value.startsWith("EQUIPMENT:")) {
    const id = value.replace("EQUIPMENT:", "");
    return {
      type: "equipment",
      data: { id },
    };
  }

  return {
    type: "unknown",
    data: { value },
  };
};

export const createPlantationBarcode = (plantationId: string): string => {
  return `PLANTATION:${plantationId}`;
};

export const createTaskBarcode = (taskId: string): string => {
  return `TASK:${taskId}`;
};

export const createEquipmentBarcode = (equipmentId: string): string => {
  return `EQUIPMENT:${equipmentId}`;
};

export const validateBarcodeFormat = (value: string, format: string): boolean => {
  const formats: Record<string, RegExp> = {
    qr_code: /^[A-Za-z0-9:]+$/,
    ean_13: /^\d{13}$/,
    ean_8: /^\d{8}$/,
    code_128: /^[A-Za-z0-9]+$/,
  };

  const regex = formats[format.toLowerCase()];
  return regex ? regex.test(value) : true;
};


