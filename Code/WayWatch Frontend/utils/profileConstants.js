// Default profile data
export const DEFAULT_PROFILE_DATA = {
  name: 'Group 5 Members',
  email: 'group5@gmail.com',
  username: 'Group Five',
  password: '',
};

// Default notification settings
export const DEFAULT_NOTIFICATIONS = {
  trafficReport: true,
  accidentReport: true,
  potHoleReport: true,
  checkpointReport: true,
  weatherReport: true,
  voiceAlert: true,
  popUp: true,
};

// Emergency contacts data
export const EMERGENCY_CONTACTS = [
  { name: 'Police', number: '191', type: 'police' },
  { name: 'Fire', number: '193', type: 'fire' },
  { name: 'Medical Assistance', number: '113', type: 'medical' },
  { name: 'Ambulance', number: '672387905', type: 'ambulance' },
];

// Notification settings configuration
export const NOTIFICATION_SETTINGS = [
  {
    key: 'trafficReport',
    title: 'Traffic Report',
    category: 'general'
  },
  {
    key: 'accidentReport',
    title: 'Accident Report',
    category: 'general'
  },
  {
    key: 'potHoleReport',
    title: 'Pot-hole Report',
    category: 'general'
  },
  {
    key: 'checkpointReport',
    title: 'Checkpoint Report',
    category: 'general'
  },
  {
    key: 'weatherReport',
    title: 'Weather Report',
    category: 'general'
  },
  {
    key: 'voiceAlert',
    title: 'Voice Alert',
    category: 'sound'
  },
  {
    key: 'popUp',
    title: 'Pop-up',
    category: 'sound'
  },
];

// Menu items configuration
export const MENU_ITEMS = [
  {
    id: 'notifications',
    title: 'Customize Notifications',
    icon: 'Bell',
    action: 'modal'
  },
  {
    id: 'language',
    title: 'Select Language',
    icon: 'Globe',
    action: 'alert'
  },
  {
    id: 'emergency',
    title: 'Emergency Contact',
    icon: 'Phone',
    action: 'modal'
  },
  {
    id: 'help',
    title: 'Help centre',
    icon: 'HelpCircle',
    action: 'alert'
  },
  {
    id: 'bug',
    title: 'Report a bug',
    icon: 'Bug',
    action: 'alert'
  },
];

// Validation functions
export const validateProfile = (profileData) => {
  const errors = {};

  if (!profileData.username.trim()) {
    errors.username = 'Username cannot be empty';
  }

  if (!profileData.email.trim()) {
    errors.email = 'Email cannot be empty';
  } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
    errors.email = 'Email is invalid';
  }

  if (profileData.password && profileData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters long';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export default {
  DEFAULT_PROFILE_DATA,
  DEFAULT_NOTIFICATIONS,
  EMERGENCY_CONTACTS,
  NOTIFICATION_SETTINGS,
  MENU_ITEMS,
  validateProfile,
};