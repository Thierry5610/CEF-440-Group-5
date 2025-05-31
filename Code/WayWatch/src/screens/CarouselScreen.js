import React from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const carouselData = [
  {
    image: require('../assets/images/carousel1.png'),
    text: 'From reckless drivers to hazardous road conditions, we identify threats before they become accidents.',
  },
  {
    image: require('../assets/images/carousel2.png'),
    text: 'StreetEye doesn’t just see traffic, it provides real-time alerts to keep you safer.',
  },
  {
    image: require('../assets/images/carousel3.png'),
    text: 'When accidents happen, our system provides warnings to help you avoid backups.',
  },
  {
    image: require('../assets/images/carousel4.png'),
    text: 'Get Started!',
  },
];
const CarouselScreen = () => {
  const navigation = useNavigation();

  const renderItem = ({ item, index }) => (
    <View className="flex-1 justify-center items-center">
      <Image source={item.image} className="w-full h-1/2" />
      <Text className="text-center text-xl mt-4">{item.text}</Text>
      {index === 3 && (
        <TouchableOpacity
          className="bg-blue-500 p-4 mt-4 rounded"
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text className="text-white text-lg">Get Started!</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View className="flex-1">
      <FlatList
        data={carouselData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        // Add props for dots and arrows as needed
      />
    </View>
  );
};

export default CarouselScreen;