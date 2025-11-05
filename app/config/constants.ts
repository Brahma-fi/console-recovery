// Configuration constants
// Modify these values to customize your app

// Privy Configuration
export const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID || "";

// Theme Colors - Based on Brahma brand
export const THEME_COLORS = {
  background: {
    primary: "#0a0a0a", // Dark background
    secondary: "#1a1a1a", // Slightly lighter dark
    card: "#252525", // Card background
  },
  accent: {
    primary: "#a5f3fc", // Cyan accent
    hover: "#67e8f9", // Darker cyan for hover
    light: "#cffafe", // Light cyan
  },
  text: {
    primary: "#ffffff", // White text
    secondary: "#a1a1a1", // Gray text
    muted: "#737373", // Muted gray
  },
} as const;

// App Configuration
export const APP_CONFIG = {
  name: "Brahma Account Recovery",
  description: "Secure account recovery powered by Brahma",
} as const;

export const LINKS = {
  TWITTER: "https://x.com/brahmaFi",
  SAFE_GLOBAL_UI: "https://app.safe.global",
  YOUTUBE: "https://www.youtube.com/@brahmadotfi",
};

// Navigation IDs
export const NAV_IDS = {
  SUBACCOUNT_RECOVER: "subaccount-recovery",
  MAIL_LOGIN: "mail-login",
} as const;
