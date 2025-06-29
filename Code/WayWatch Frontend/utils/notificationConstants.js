import theme from '../styles/theme';

// Static image URLs
export const STATIC_IMAGES = [
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
  'https://images.unsplash.com/photo-1581094794339-7e3a560a8d4e',
  'https://images.unsplash.com/photo-1564103571236-9d2c8c9e9d4a',
  'https://images.unsplash.com/photo-1533090161767-e6ffed986c88',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e',
];

// Incident types configuration
export const INCIDENT_TYPES = [
  { 
    id: 'traffic', 
    label: 'Traffic', 
    icon: '🚗', 
    color: theme.colors.primary[500] 
  },
  { 
    id: 'police', 
    label: 'Police', 
    icon: '👮‍♂️', 
    color: theme.colors.success[500] 
  },
  { 
    id: 'crash', 
    label: 'Crash', 
    icon: '💥', 
    color: theme.colors.error[500] 
  },
  { 
    id: 'hazard', 
    label: 'Hazard', 
    icon: '⚠️', 
    color: theme.colors.warning[500] 
  },
  { 
    id: 'construction', 
    label: 'Construction', 
    icon: '🚧', 
    color: theme.colors.warning[500] 
  },
  { 
    id: 'lane', 
    label: 'Blocked Lane', 
    icon: '🚫', 
    color: '#FF6B35' 
  },
  { 
    id: 'breakdown', 
    label: 'Map Issue', 
    icon: '🗺️', 
    color: '#5AC8FA' 
  },
  { 
    id: 'weather', 
    label: 'Weather', 
    icon: '🌧️', 
    color: '#AF52DE' 
  },
  { 
    id: 'other', 
    label: 'Other', 
    icon: '❓', 
    color: theme.colors.neutral[500] 
  },
];

// Get random image by category
export const getRandomImage = (category = 'traffic') => {
  const categoryImages = {
    traffic: [STATIC_IMAGES[0], STATIC_IMAGES[1]],
    accident: [STATIC_IMAGES[2], STATIC_IMAGES[3]],
    construction: [STATIC_IMAGES[4]],
    police: [STATIC_IMAGES[0]],
    weather: [STATIC_IMAGES[1]],
  };
  const images = categoryImages[category] || STATIC_IMAGES;
  return images[Math.floor(Math.random() * images.length)];
};

// Default notification data
export const DEFAULT_NOTIFICATIONS = [

];

export default {
  STATIC_IMAGES,
  INCIDENT_TYPES,
  getRandomImage,
  DEFAULT_NOTIFICATIONS,
};