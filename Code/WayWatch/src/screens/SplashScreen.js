import React, { useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Carousel');
    }, 3000); // Navigate after 3 seconds
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View className="flex-1 bg-[#E6F0FA] justify-center items-center">
      <Image source={require('../assets/images/logo.png')} className="w-[200px] h-[200px]" />
      <Text className="text-2xl text-gray-800">StreetEye</Text>
    </View>
  );
};

export default SplashScreen;