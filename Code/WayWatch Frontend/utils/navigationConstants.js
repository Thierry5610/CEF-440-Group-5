import { MapPin, Bell, Book, User } from 'lucide-react-native';

// Tab configuration
export const TAB_CONFIG = [
  {
    name: 'Map',
    component: 'Maps',
    icon: MapPin,
    label: 'Map',
    badge: null,
  },
  {
    name: 'Notifications',
    component: 'Notifications', 
    icon: Bell,
    label: 'Notifications',
    badge: null, // Example badge count
  },
  {
    name: 'Guide',
    component: 'Guide',
    icon: Book,
    label: 'Guide',
    badge: null,
  },
  {
    name: 'Profile',
    component: 'Profile',
    icon: User,
    label: 'Profile',
    badge: null,
  },
];

// Screen options configuration
export const getScreenOptions = () => ({
  headerShown: false,
  tabBarShowLabel: false,
  tabBarHideOnKeyboard: true,
  tabBarActiveTintColor: '#4A90E2',
  tabBarInactiveTintColor: '#B3B3B3',
});

// Tab bar button configuration
export const getTabBarButton = (props) => ({
  ...props,
  style: [
    props.style,
    {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }
  ],
  activeOpacity: 1, // Remove dark circle/press effect
});

export default {
  TAB_CONFIG,
  getScreenOptions,
  getTabBarButton,
};