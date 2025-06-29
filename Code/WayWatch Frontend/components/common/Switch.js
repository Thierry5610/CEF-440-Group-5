import React from 'react';
import { TouchableOpacity, View, Animated } from 'react-native';
import theme from '../../styles/theme';

const Switch = ({ 
  value = false, 
  onValueChange, 
  trackColor = {
    false: theme.colors.neutral[300],
    true: theme.colors.primary[500]
  },
  thumbColor = theme.colors.white,
  disabled = false,
  style 
}) => {
  const animatedValue = React.useRef(new Animated.Value(value ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value, animatedValue]);

  const handlePress = () => {
    if (!disabled && onValueChange) {
      onValueChange(!value);
    }
  };

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22],
  });

  const trackColorInterpolated = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [trackColor.false, trackColor.true],
  });

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      disabled={disabled}
      style={[
        {
          width: 51,
          height: 31,
          borderRadius: 15.5,
          padding: 2,
          justifyContent: 'center',
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      <Animated.View
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 15.5,
          backgroundColor: trackColorInterpolated,
          justifyContent: 'center',
        }}
      >
        <Animated.View
          style={{
            width: 27,
            height: 27,
            borderRadius: 13.5,
            backgroundColor: thumbColor,
            transform: [{ translateX }],
            ...theme.shadows.base,
          }}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default Switch;