// Carousel data
export const CAROUSEL_DATA = [
  {
    id: 1,
    image: require('../assets/images/carousel-1.png'),
    title: 'From reckless drivers to hazardous road conditions, we help you spot threats before they escalate',
  },
  {
    id: 2,
    image: require('../assets/images/carousel-1.png'),
    title: "StreetEye doesn't just see traffic it predicts and redirects it. This is where smart cities meet safer streets.",
  },
  {
    id: 3,
    image: require('../assets/images/carousel-2.png'),
    title: 'When accidents happen, our system recalculates routes before backup begins',
  },
];

// Navigation flow configuration
export const ONBOARDING_FLOW = {
  CAROUSEL: 'Carousel',
  GET_STARTED: 'GetStarted',
  SIGN_UP: 'SignUp',
  SIGN_IN: 'SignIn',
  OTP_VERIFICATION: 'OTPVerification',
  ENABLE_LOCATION: 'EnableLocation',
  HOME_SCREEN: 'HomeScreen',
};

// App permissions
export const PERMISSIONS = {
  LOCATION: {
    title: 'Location Access',
    description: 'We need access to your location to provide accurate navigation and traffic updates.',
    required: true,
  },
  NOTIFICATIONS: {
    title: 'Push Notifications',
    description: 'Stay updated with traffic alerts and important road information.',
    required: false,
  },
  CAMERA: {
    title: 'Camera Access',
    description: 'Take photos to report road incidents and hazards.',
    required: false,
  },
};

// App features for showcase
export const APP_FEATURES = [
  {
    id: 'navigation',
    title: 'Smart Navigation',
    description: 'Get real-time directions with traffic-aware routing',
    icon: '🗺️',
  },
  {
    id: 'alerts',
    title: 'Traffic Alerts',
    description: 'Receive instant notifications about road conditions',
    icon: '🚨',
  },
  {
    id: 'reporting',
    title: 'Incident Reporting',
    description: 'Report accidents, hazards, and road issues easily',
    icon: '📱',
  },
  {
    id: 'learning',
    title: 'Road Sign Guide',
    description: 'Learn and master road signs for safer driving',
    icon: '📚',
  },
];

// Onboarding completion tracking
export const ONBOARDING_STEPS = {
  CAROUSEL_VIEWED: 'carousel_viewed',
  ACCOUNT_CREATED: 'account_created',
  PHONE_VERIFIED: 'phone_verified',
  PERMISSIONS_GRANTED: 'permissions_granted',
  PROFILE_COMPLETED: 'profile_completed',
};

// User preferences defaults
export const DEFAULT_USER_PREFERENCES = {
  theme: 'light',
  language: 'en',
  notifications: {
    traffic: true,
    accidents: true,
    weather: true,
    general: true,
  },
  privacy: {
    shareLocation: true,
    shareReports: true,
    analytics: true,
  },
};

// Validation helpers for onboarding
export const validateOnboardingStep = (step, data) => {
  switch (step) {
    case ONBOARDING_STEPS.ACCOUNT_CREATED:
      return data.email && data.username;
    case ONBOARDING_STEPS.PHONE_VERIFIED:
      return data.phoneVerified === true;
    case ONBOARDING_STEPS.PERMISSIONS_GRANTED:
      return data.locationPermission === true;
    default:
      return true;
  }
};

// Navigation helpers
export const getNextOnboardingStep = (currentStep) => {
  const steps = Object.values(ONBOARDING_FLOW);
  const currentIndex = steps.indexOf(currentStep);
  return currentIndex < steps.length - 1 ? steps[currentIndex + 1] : null;
};

export const isOnboardingComplete = (completedSteps) => {
  const requiredSteps = [
    ONBOARDING_STEPS.CAROUSEL_VIEWED,
    ONBOARDING_STEPS.ACCOUNT_CREATED,
    ONBOARDING_STEPS.PHONE_VERIFIED,
  ];
  
  return requiredSteps.every(step => completedSteps.includes(step));
};

export default {
  CAROUSEL_DATA,
  ONBOARDING_FLOW,
  PERMISSIONS,
  APP_FEATURES,
  ONBOARDING_STEPS,
  DEFAULT_USER_PREFERENCES,
  validateOnboardingStep,
  getNextOnboardingStep,
  isOnboardingComplete,
};