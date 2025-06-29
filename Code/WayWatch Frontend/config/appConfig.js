import { Platform } from 'react-native';

// App information
export const APP_INFO = {
  name: 'WayWatch',
  version: '2.0.0',
  buildNumber: '1',
  description: 'Smart navigation and traffic management app',
  website: 'https://waywatch.app',
  supportEmail: 'support@waywatch.app',
};

// Environment configuration
export const ENV = {
  development: __DEV__,
  platform: Platform.OS,
  version: Platform.Version,
};

// API configuration
export const API_CONFIG = {
  baseURL: __DEV__ 
    ? 'https://api-dev.waywatch.app' 
    : 'https://api.waywatch.app',
  timeout: 10000,
  retryAttempts: 3,
  endpoints: {
    auth: '/auth',
    maps: '/maps',
    notifications: '/notifications',
    profile: '/profile',
    incidents: '/incidents',
  },
};

// Feature flags
export const FEATURES = {
  enableAnalytics: !__DEV__,
  enableCrashReporting: !__DEV__,
  enablePushNotifications: true,
  enableLocationTracking: true,
  enableOfflineMode: true,
  enableDarkMode: false, // Future feature
  enableBiometricAuth: Platform.OS === 'ios' || Platform.Version >= 23,
};

// App settings
export const APP_SETTINGS = {
  // Location settings
  location: {
    accuracy: 'high',
    updateInterval: 5000, // 5 seconds
    minDistance: 10, // 10 meters
  },
  
  // Navigation settings
  navigation: {
    animationDuration: 300,
    gestureEnabled: true,
    headerShown: false,
  },
  
  // Notification settings
  notifications: {
    enabled: true,
    soundEnabled: true,
    vibrationEnabled: true,
    badgeEnabled: true,
  },
  
  // Map settings
  map: {
    showTraffic: true,
    showIncidents: true,
    autoRecenter: true,
    followUserLocation: true,
  },
  
  // Cache settings
  cache: {
    maxSize: 50 * 1024 * 1024, // 50MB
    ttl: 24 * 60 * 60 * 1000, // 24 hours
  },
};

// Error handling configuration
export const ERROR_CONFIG = {
  enableErrorBoundary: true,
  logErrors: true,
  reportErrors: !__DEV__,
  maxErrorLogs: 100,
};

// Performance monitoring
export const PERFORMANCE_CONFIG = {
  enableMonitoring: !__DEV__,
  sampleRate: 0.1, // 10% of sessions
  maxTraces: 100,
};

// Security settings
export const SECURITY_CONFIG = {
  enableSSLPinning: !__DEV__,
  enableJailbreakDetection: !__DEV__,
  enableScreenshotPrevention: false,
  sessionTimeout: 30 * 60 * 1000, // 30 minutes
};

// Debug settings
export const DEBUG_CONFIG = {
  enableLogger: __DEV__,
  enableNetworkLogger: __DEV__,
  enableReduxLogger: __DEV__,
  enableFlipperIntegration: __DEV__,
  logLevel: __DEV__ ? 'debug' : 'error',
};

// Storage keys
export const STORAGE_KEYS = {
  USER_TOKEN: '@waywatch_user_token',
  USER_PROFILE: '@waywatch_user_profile',
  ONBOARDING_COMPLETED: '@waywatch_onboarding_completed',
  LOCATION_PERMISSION: '@waywatch_location_permission',
  NOTIFICATION_SETTINGS: '@waywatch_notification_settings',
  THEME_PREFERENCE: '@waywatch_theme_preference',
  LANGUAGE_PREFERENCE: '@waywatch_language_preference',
  LAST_KNOWN_LOCATION: '@waywatch_last_known_location',
  CACHED_ROUTES: '@waywatch_cached_routes',
  OFFLINE_DATA: '@waywatch_offline_data',
};

// Validation rules
export const VALIDATION_RULES = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    maxLength: 254,
  },
  password: {
    required: true,
    minLength: 6,
    maxLength: 128,
    requireUppercase: false,
    requireLowercase: false,
    requireNumbers: false,
    requireSpecialChars: false,
  },
  username: {
    required: true,
    minLength: 3,
    maxLength: 30,
    pattern: /^[a-zA-Z0-9_]+$/,
  },
  phone: {
    required: false,
    pattern: /^\+?[\d\s\-\(\)]+$/,
    minLength: 10,
    maxLength: 15,
  },
};

// Default user preferences
export const DEFAULT_PREFERENCES = {
  theme: 'light',
  language: 'en',
  units: 'metric', // or 'imperial'
  mapStyle: 'standard',
  voiceGuidance: true,
  notifications: {
    traffic: true,
    accidents: true,
    weather: true,
    general: true,
    marketing: false,
  },
  privacy: {
    shareLocation: true,
    shareReports: true,
    analytics: true,
    crashReporting: true,
  },
};

export default {
  APP_INFO,
  ENV,
  API_CONFIG,
  FEATURES,
  APP_SETTINGS,
  ERROR_CONFIG,
  PERFORMANCE_CONFIG,
  SECURITY_CONFIG,
  DEBUG_CONFIG,
  STORAGE_KEYS,
  VALIDATION_RULES,
  DEFAULT_PREFERENCES,
};