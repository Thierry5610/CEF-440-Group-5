import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import screen components
import Maps from './main/Maps';
import Guide from './main/Guide';
import Profile from './main/Profile';
import Notifications from './main/Notifications';

// Import styles and constants
import theme from '../styles/theme';
import { tabNavigatorStyles } from '../styles/components/tabNavigatorStyles';
import { TAB_CONFIG, getScreenOptions } from '../utils/navigationConstants';

const Tab = createBottomTabNavigator();

// Custom Tab Bar Icon Component
const TabBarIcon = ({ route, focused, color, size = 24 }) => {
  const tabConfig = TAB_CONFIG.find(tab => tab.name === route.name);
  
  if (!tabConfig) return null;

  const IconComponent = tabConfig.icon;
  const strokeWidth = focused ? 2.5 : 2;
  const iconColor = focused ? theme.colors.primary[500] : theme.colors.neutral[400];

  return (
    <View style={tabNavigatorStyles.tabIconContainer}>
      <View style={{ position: 'relative' }}>
        <IconComponent 
          color={iconColor} 
          size={size} 
          strokeWidth={strokeWidth}
        />
        
        {/* Badge for notifications or updates */}
        {tabConfig.badge && tabConfig.badge > 0 && (
          <View style={tabNavigatorStyles.badgeContainer}>
            <Text style={tabNavigatorStyles.badgeText}>
              {tabConfig.badge > 99 ? '99+' : tabConfig.badge}
            </Text>
          </View>
        )}
      </View>
      
      {/* Active indicator dot */}
      {focused && (
        <View style={tabNavigatorStyles.activeIndicator} />
      )}
    </View>
  );
};

// Custom Tab Bar Button Component
const TabBarButton = (props) => (
  <TouchableOpacity
    {...props}
    style={[
      props.style,
      tabNavigatorStyles.tabButton
    ]}
    activeOpacity={1} // Remove press effect
  />
);

// Get component by name
const getComponentByName = (componentName) => {
  const components = {
    Maps,
    Notifications,
    Guide,
    Profile,
  };
  return components[componentName];
};

const HomeScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        ...getScreenOptions(),
        tabBarIcon: ({ focused, color, size }) => (
          <TabBarIcon 
            route={route} 
            focused={focused} 
            color={color} 
            size={size} 
          />
        ),
        tabBarStyle: tabNavigatorStyles.tabBarStyle,
        tabBarButton: TabBarButton,
      })}
      initialRouteName="Map"
    >
      {TAB_CONFIG.map((tabConfig) => {
        const Component = getComponentByName(tabConfig.component);
        
        return (
          <Tab.Screen 
            key={tabConfig.name}
            name={tabConfig.name} 
            component={Component}
            options={{
              tabBarAccessibilityLabel: `${tabConfig.label} tab`,
              tabBarTestID: `tab-${tabConfig.name.toLowerCase()}`,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default HomeScreen;