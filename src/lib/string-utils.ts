export const capitalize = (str: string): string => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const capitalizeWords = (str: string): string => {
  return str
    .split(/\s+/)
    .map((word) => capitalize(word))
    .join(" ");
};

export const camelCase = (str: string): string => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
};

export const kebabCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
};

export const snakeCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/[\s-]+/g, "_")
    .toLowerCase();
};

export const pascalCase = (str: string): string => {
  return capitalizeWords(str).replace(/\s+/g, "");
};

export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const truncate = (str: string, maxLength: number, suffix: string = "..."): string => {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - suffix.length) + suffix;
};

export const truncateWords = (str: string, maxWords: number, suffix: string = "..."): string => {
  const words = str.split(/\s+/);
  if (words.length <= maxWords) return str;
  return words.slice(0, maxWords).join(" ") + suffix;
};

export const ellipsis = (str: string, maxLength: number): string => {
  return truncate(str, maxLength, "…");
};

export const stripHtml = (html: string): string => {
  return html.replace(/<[^>]*>/g, "");
};

export const escapeHtml = (str: string): string => {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return str.replace(/[&<>"']/g, (m) => map[m]);
};

export const unescapeHtml = (str: string): string => {
  const map: Record<string, string> = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#039;": "'",
  };
  return str.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, (m) => map[m]);
};

export const padStart = (str: string, length: number, pad: string = " "): string => {
  if (str.length >= length) return str;
  return pad.repeat(length - str.length) + str;
};

export const padEnd = (str: string, length: number, pad: string = " "): string => {
  if (str.length >= length) return str;
  return str + pad.repeat(length - str.length);
};

export const removeAccents = (str: string): string => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const normalizeWhitespace = (str: string): string => {
  return str.replace(/\s+/g, " ").trim();
};

export const extractEmails = (str: string): string[] => {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  return str.match(emailRegex) || [];
};

export const extractUrls = (str: string): string[] => {
  const urlRegex = /https?:\/\/[^\s]+/g;
  return str.match(urlRegex) || [];
};

export const extractHashtags = (str: string): string[] => {
  const hashtagRegex = /#[\w]+/g;
  return str.match(hashtagRegex) || [];
};

export const extractMentions = (str: string): string[] => {
  const mentionRegex = /@[\w]+/g;
  return str.match(mentionRegex) || [];
};

export const maskEmail = (email: string): string => {
  const [local, domain] = email.split("@");
  if (!domain) return email;
  const maskedLocal = local.length > 2
    ? local.slice(0, 2) + "*".repeat(local.length - 2)
    : "*".repeat(local.length);
  return `${maskedLocal}@${domain}`;
};

export const maskPhone = (phone: string): string => {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 4) return phone;
  const visible = digits.slice(-4);
  const masked = "*".repeat(digits.length - 4);
  return `${masked}${visible}`;
};

export const maskCreditCard = (card: string): string => {
  const digits = card.replace(/\D/g, "");
  if (digits.length < 4) return card;
  const visible = digits.slice(-4);
  const masked = "*".repeat(digits.length - 4);
  return `${masked}${visible}`;
};

export const formatPhoneNumber = (phone: string): string => {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (digits.length === 11 && digits[0] === "1") {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  return phone;
};

export const generateId = (prefix: string = "", length: number = 8): string => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "";
  for (let i = 0; i < length; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return prefix ? `${prefix}-${id}` : id;
};

export const generateSlug = (str: string, maxLength: number = 50): string => {
  return slugify(str).slice(0, maxLength);
};

export const pluralize = (count: number, singular: string, plural?: string): string => {
  if (count === 1) return singular;
  return plural || `${singular}s`;
};

export const formatList = (items: string[], conjunction: string = "and"): string => {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} ${conjunction} ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, ${conjunction} ${items[items.length - 1]}`;
};

export const wrapText = (text: string, maxLength: number): string[] => {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let currentLine = "";

  words.forEach((word) => {
    if (currentLine.length + word.length + 1 <= maxLength) {
      currentLine += (currentLine ? " " : "") + word;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  });

  if (currentLine) lines.push(currentLine);
  return lines;
};

export const countWords = (text: string): number => {
  return text.trim().split(/\s+/).filter((word) => word.length > 0).length;
};

export const countCharacters = (text: string, includeSpaces: boolean = true): number => {
  return includeSpaces ? text.length : text.replace(/\s/g, "").length;
};

export const reverse = (str: string): string => {
  return str.split("").reverse().join("");
};

export const isPalindrome = (str: string): boolean => {
  const normalized = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  return normalized === reverse(normalized);
};

