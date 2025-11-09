export const getFileExtension = (filename: string): string => {
  const parts = filename.split(".");
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : "";
};

export const getFileName = (filepath: string): string => {
  return filepath.split("/").pop() || filepath.split("\\").pop() || filepath;
};

export const getFileBaseName = (filename: string): string => {
  const name = getFileName(filename);
  const lastDot = name.lastIndexOf(".");
  return lastDot > 0 ? name.slice(0, lastDot) : name;
};

export const getFileDirectory = (filepath: string): string => {
  const parts = filepath.split("/");
  if (parts.length === 1) {
    const partsWindows = filepath.split("\\");
    return partsWindows.length > 1 ? partsWindows.slice(0, -1).join("\\") : "";
  }
  return parts.slice(0, -1).join("/");
};

export const isValidFileName = (filename: string): boolean => {
  const invalidChars = /[<>:"/\\|?*\x00-\x1f]/;
  return !invalidChars.test(filename) && filename.length > 0 && filename.length <= 255;
};

export const sanitizeFileName = (filename: string): string => {
  return filename
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, "_")
    .replace(/\s+/g, "_")
    .replace(/_{2,}/g, "_")
    .replace(/^_|_$/g, "")
    .slice(0, 255);
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export const parseFileSize = (sizeString: string): number => {
  const units: Record<string, number> = {
    b: 1,
    kb: 1024,
    mb: 1024 * 1024,
    gb: 1024 * 1024 * 1024,
    tb: 1024 * 1024 * 1024 * 1024,
  };

  const match = sizeString.match(/^(\d+(?:\.\d+)?)\s*([a-z]+)?$/i);
  if (!match) return 0;

  const value = parseFloat(match[1]);
  const unit = (match[2] || "b").toLowerCase();
  const multiplier = units[unit] || 1;

  return Math.round(value * multiplier);
};

export const isImageFile = (filename: string): boolean => {
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp", "ico"];
  const ext = getFileExtension(filename);
  return imageExtensions.includes(ext);
};

export const isVideoFile = (filename: string): boolean => {
  const videoExtensions = ["mp4", "avi", "mov", "wmv", "flv", "webm", "mkv"];
  const ext = getFileExtension(filename);
  return videoExtensions.includes(ext);
};

export const isAudioFile = (filename: string): boolean => {
  const audioExtensions = ["mp3", "wav", "ogg", "aac", "flac", "m4a"];
  const ext = getFileExtension(filename);
  return audioExtensions.includes(ext);
};

export const isDocumentFile = (filename: string): boolean => {
  const documentExtensions = ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt", "rtf"];
  const ext = getFileExtension(filename);
  return documentExtensions.includes(ext);
};

export const isCodeFile = (filename: string): boolean => {
  const codeExtensions = [
    "js",
    "ts",
    "jsx",
    "tsx",
    "py",
    "java",
    "cpp",
    "c",
    "cs",
    "php",
    "rb",
    "go",
    "rs",
    "swift",
    "kt",
    "html",
    "css",
    "scss",
    "sass",
    "json",
    "xml",
    "yaml",
    "yml",
  ];
  const ext = getFileExtension(filename);
  return codeExtensions.includes(ext);
};

export const getMimeType = (filename: string): string => {
  const ext = getFileExtension(filename);
  const mimeTypes: Record<string, string> = {
    // Images
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    svg: "image/svg+xml",
    bmp: "image/bmp",
    ico: "image/x-icon",
    // Videos
    mp4: "video/mp4",
    avi: "video/x-msvideo",
    mov: "video/quicktime",
    wmv: "video/x-ms-wmv",
    webm: "video/webm",
    // Audio
    mp3: "audio/mpeg",
    wav: "audio/wav",
    ogg: "audio/ogg",
    aac: "audio/aac",
    // Documents
    pdf: "application/pdf",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    xls: "application/vnd.ms-excel",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ppt: "application/vnd.ms-powerpoint",
    pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    txt: "text/plain",
    // Code
    js: "application/javascript",
    ts: "application/typescript",
    json: "application/json",
    xml: "application/xml",
    html: "text/html",
    css: "text/css",
  };
  return mimeTypes[ext] || "application/octet-stream";
};

export const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = reject;
    reader.readAsText(file);
  });
};

export const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as ArrayBuffer);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};

export const downloadFile = (data: Blob | string, filename: string, mimeType?: string): void => {
  const blob = typeof data === "string" ? new Blob([data], { type: mimeType || "text/plain" }) : data;
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 100);
};

export const createFileFromText = (content: string, filename: string, mimeType: string = "text/plain"): File => {
  const blob = new Blob([content], { type: mimeType });
  return new File([blob], filename, { type: mimeType });
};

export const validateFileSize = (file: File, maxSizeBytes: number): boolean => {
  return file.size <= maxSizeBytes;
};

export const validateFileType = (file: File, allowedTypes: string[]): boolean => {
  const fileType = getFileExtension(file.name);
  return allowedTypes.includes(fileType.toLowerCase());
};

export const compressImage = async (
  file: File,
  maxWidth: number = 1920,
  maxHeight: number = 1080,
  quality: number = 0.8
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = width * ratio;
          height = height * ratio;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Failed to compress image"));
              return;
            }
            const compressedFile = new File([blob], file.name, { type: file.type });
            resolve(compressedFile);
          },
          file.type,
          quality
        );
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

