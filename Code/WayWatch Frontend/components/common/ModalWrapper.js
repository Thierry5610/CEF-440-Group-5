import React from 'react';
import { View, StatusBar, Platform } from 'react-native';

const ModalWrapper = ({ 
  children, 
  style, 
  backgroundColor = '#f8f9fa',
  statusBarStyle = 'dark-content',
}) => {
  const containerStyle = [
    {
      flex: 1,
      backgroundColor,
    },
    style,
  ];

  return (
    <>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={Platform.OS === 'android' ? backgroundColor : 'transparent'}
        translucent={false}
      />
      <View style={containerStyle}>
        {children}
      </View>
    </>
  );
};

export default ModalWrapper;