export type ValidationResult =
  | { valid: true }
  | { valid: false; error: string };

export const validateEmail = (email: string): ValidationResult => {
  if (!email.trim()) {
    return { valid: false, error: "Email is required" };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: "Invalid email format" };
  }
  return { valid: true };
};

export const validateWalletAddress = (address: string): ValidationResult => {
  if (!address.trim()) {
    return { valid: false, error: "Wallet address is required" };
  }
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return { valid: false, error: "Invalid wallet address format" };
  }
  return { valid: true };
};

export const validateRequired = (value: string, fieldName: string): ValidationResult => {
  if (!value.trim()) {
    return { valid: false, error: `${fieldName} is required` };
  }
  return { valid: true };
};

export const validateMinLength = (
  value: string,
  minLength: number,
  fieldName: string
): ValidationResult => {
  if (value.length < minLength) {
    return {
      valid: false,
      error: `${fieldName} must be at least ${minLength} characters`,
    };
  }
  return { valid: true };
};

export const validateMaxLength = (
  value: string,
  maxLength: number,
  fieldName: string
): ValidationResult => {
  if (value.length > maxLength) {
    return {
      valid: false,
      error: `${fieldName} must be no more than ${maxLength} characters`,
    };
  }
  return { valid: true };
};

export const validateNumber = (
  value: number | string,
  options?: {
    min?: number;
    max?: number;
    fieldName?: string;
    allowZero?: boolean;
  }
): ValidationResult => {
  const num = typeof value === "string" ? parseFloat(value) : value;
  const fieldName = options?.fieldName || "Value";

  if (isNaN(num)) {
    return { valid: false, error: `${fieldName} must be a valid number` };
  }

  if (!options?.allowZero && num === 0) {
    return { valid: false, error: `${fieldName} must be greater than zero` };
  }

  if (options?.min !== undefined && num < options.min) {
    return {
      valid: false,
      error: `${fieldName} must be at least ${options.min}`,
    };
  }

  if (options?.max !== undefined && num > options.max) {
    return {
      valid: false,
      error: `${fieldName} must be no more than ${options.max}`,
    };
  }

  return { valid: true };
};

export const validateDate = (
  date: string | Date,
  options?: {
    min?: string | Date;
    max?: string | Date;
    fieldName?: string;
  }
): ValidationResult => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const fieldName = options?.fieldName || "Date";

  if (isNaN(dateObj.getTime())) {
    return { valid: false, error: `${fieldName} is invalid` };
  }

  if (options?.min) {
    const minDate = typeof options.min === "string" ? new Date(options.min) : options.min;
    if (dateObj < minDate) {
      return {
        valid: false,
        error: `${fieldName} must be after ${minDate.toLocaleDateString()}`,
      };
    }
  }

  if (options?.max) {
    const maxDate = typeof options.max === "string" ? new Date(options.max) : options.max;
    if (dateObj > maxDate) {
      return {
        valid: false,
        error: `${fieldName} must be before ${maxDate.toLocaleDateString()}`,
      };
    }
  }

  return { valid: true };
};

export const validateUrl = (url: string): ValidationResult => {
  if (!url.trim()) {
    return { valid: false, error: "URL is required" };
  }
  try {
    new URL(url);
    return { valid: true };
  } catch {
    return { valid: false, error: "Invalid URL format" };
  }
};

export const validateCoordinates = (
  latitude: number,
  longitude: number
): ValidationResult => {
  if (isNaN(latitude) || isNaN(longitude)) {
    return { valid: false, error: "Coordinates must be valid numbers" };
  }
  if (latitude < -90 || latitude > 90) {
    return { valid: false, error: "Latitude must be between -90 and 90" };
  }
  if (longitude < -180 || longitude > 180) {
    return { valid: false, error: "Longitude must be between -180 and 180" };
  }
  return { valid: true };
};

export const combineValidations = (
  ...results: ValidationResult[]
): ValidationResult => {
  for (const result of results) {
    if (!result.valid) {
      return result;
    }
  }
  return { valid: true };
};

