import React from 'react';
import { SafeAreaView, StatusBar, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import theme from '../../styles/theme';

const SafeAreaWrapper = ({ 
  children, 
  style, 
  backgroundColor = theme.colors.white,
  statusBarStyle = 'dark-content',
  statusBarBackgroundColor,
  edges = ['top', 'bottom'],
  paddingHorizontal = 0,
}) => {
  const insets = useSafeAreaInsets();
  
  // Determine status bar background color
  const statusBgColor = statusBarBackgroundColor || 
    (Platform.OS === 'android' ? backgroundColor : 'transparent');
  
  const containerStyle = [
    {
      flex: 1,
      backgroundColor,
      paddingHorizontal,
    },
    // Apply safe area padding only for specified edges
    edges.includes('top') && { paddingTop: insets.top },
    edges.includes('bottom') && { paddingBottom: insets.bottom },
    edges.includes('left') && { paddingLeft: insets.left },
    edges.includes('right') && { paddingRight: insets.right },
    style,
  ];

  return (
    <>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={statusBgColor}
        translucent={Platform.OS === 'android'}
      />
      <SafeAreaView style={containerStyle}>
        {children}
      </SafeAreaView>
    </>
  );
};

export default SafeAreaWrapper;