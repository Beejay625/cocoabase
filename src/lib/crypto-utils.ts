export const generateHash = async (data: string): Promise<string> => {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

export const generateRandomString = (length: number = 32): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const randomValues = new Uint8Array(length);
  crypto.getRandomValues(randomValues);
  for (let i = 0; i < length; i++) {
    result += chars[randomValues[i] % chars.length];
  }
  return result;
};

export const generateRandomBytes = (length: number): Uint8Array => {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return bytes;
};

export const encodeBase64 = (data: string): string => {
  if (typeof window !== "undefined") {
    return btoa(data);
  }
  return Buffer.from(data).toString("base64");
};

export const decodeBase64 = (data: string): string => {
  if (typeof window !== "undefined") {
    return atob(data);
  }
  return Buffer.from(data, "base64").toString();
};

export const hashString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

export const simpleHash = (str: string): string => {
  return hashString(str).toString(36);
};

export const checksum = (data: string): string => {
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum += data.charCodeAt(i);
  }
  return sum.toString(16);
};

export const obfuscate = (data: string, key: number = 42): string => {
  return data
    .split("")
    .map((char) => String.fromCharCode(char.charCodeAt(0) ^ key))
    .join("");
};

export const deobfuscate = (data: string, key: number = 42): string => {
  return obfuscate(data, key);
};

export const createNonce = (): string => {
  return generateRandomString(16);
};

export const createToken = (length: number = 32): string => {
  return generateRandomString(length);
};

export const maskSensitiveData = (data: string, visibleChars: number = 4): string => {
  if (data.length <= visibleChars * 2) {
    return "*".repeat(data.length);
  }
  const visible = data.slice(0, visibleChars) + data.slice(-visibleChars);
  const masked = "*".repeat(data.length - visibleChars * 2);
  return data.slice(0, visibleChars) + masked + data.slice(-visibleChars);
};

export const validateChecksum = (data: string, checksumValue: string): boolean => {
  return checksum(data) === checksumValue;
};

