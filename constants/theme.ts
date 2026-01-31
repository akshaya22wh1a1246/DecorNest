/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

// Primary Colors - Meesho Style Purple & Pink
const primary = {
  main: '#8B5CF6',        // Purple
  light: '#C4A1FF',       // Light Purple
  dark: '#7C3AED',        // Dark Purple
  pink: '#FFD6E0',        // Soft Pink
  lavender: '#E6E0FF',    // Soft Lavender
};

// Accent Colors
const accent = {
  lavender: '#F5F3FF',    // Very Light Lavender
  softPurple: '#C4A1FF',  // Soft Purple
  lightPink: '#FFD6E0',   // Light Pink
  rose: '#FF1E6C',        // Rose/Pink for accents
  yellow: '#FFB800',      // Gold for ratings
};

// Neutral Colors
const neutral = {
  white: '#FFFFFF',
  background: '#FFFFFF',
  lightGray: '#F9FAFB',
  gray: '#9CA3AF',
  darkGray: '#6B7280',
  textDark: '#1F2937',
  black: '#000000',
};

// Gradient Combinations - Meesho Style
export const Gradients = {
  primary: ['#FFD6E0', '#E6E0FF'],           // Pink to Lavender
  header: ['#FFD6E0', '#E6E0FF', '#FFFFFF'], // Header gradient
  button: ['#E6E0FF', '#FFD6E0'],            // Button gradient
  card: ['#F5F3FF', '#FAF5FF'],              // Card gradient
  category: ['#FFD6E0', '#E6E0FF'],          // Category circles
  purple: ['#8B5CF6', '#C4A1FF'],            // Purple gradient
  pink: ['#FFD6E0', '#FF1E6C'],              // Pink gradient
};

export const Colors = {
  light: {
    // Base Colors - Meesho Style
    primary: primary.main,           // #8B5CF6
    primaryLight: primary.light,     // #C4A1FF
    primaryDark: primary.dark,       // #7C3AED
    background: neutral.white,       // #FFFFFF
    surface: neutral.white,          // #FFFFFF
    text: neutral.textDark,          // #1F2937
    textLight: neutral.gray,         // #9CA3AF
    textInverse: neutral.white,      // #FFFFFF

    // UI Elements
    tint: primary.main,              // #8B5CF6
    icon: primary.main,              // #8B5CF6
    tabIconDefault: neutral.gray,    // #9CA3AF
    tabIconSelected: primary.main,   // #8B5CF6
    card: neutral.white,             // #FFFFFF
    border: primary.lavender,        // #E6E0FF

    // Accent Colors - Meesho Palette
    lavender: primary.lavender,      // #E6E0FF
    softPurple: accent.softPurple,   // #C4A1FF
    lightPink: accent.lightPink,     // #FFD6E0
    rose: accent.rose,               // #FF1E6C
    gold: accent.yellow,             // #FFB800

    // Status Colors
    success: '#10B981',
    error: accent.rose,              // #FF1E6C
    warning: '#F59E0B',
    info: primary.main,              // #8B5CF6
  },
  dark: {
    // Base Colors
    primary: primary.light,
    primaryLight: primary.main,
    primaryDark: primary.dark,
    background: neutral.black,
    surface: '#1E1E1E',
    text: neutral.white,
    textLight: neutral.gray,
    textInverse: neutral.textDark,

    // UI Elements
    tint: primary.light,
    icon: neutral.white,
    tabIconDefault: neutral.gray,
    tabIconSelected: primary.light,
    card: '#2D2D2D',
    border: '#333333',

    // Accent Colors
    lavender: primary.lavender,
    softPurple: accent.softPurple,
    lightPink: accent.lightPink,
    rose: accent.rose,
    gold: accent.yellow,

    // Status Colors
    success: '#10B981',
    error: accent.rose,
    warning: '#F59E0B',
    info: primary.light,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
