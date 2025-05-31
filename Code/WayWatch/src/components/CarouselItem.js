import React from 'react';
import { View, Image, Text } from 'react-native';
import { tailwind } from '../tailwind';  // Adjust path based on your setup

const CarouselItem = ({ imageSource, heading, subheading }) => {
  return (
    <View style={tailwind('flex-1')}>
      <View style={tailwind('h-2/5')}>
        <Image
          source={imageSource}
          style={tailwind('w-full h-full')}
          resizeMode="contain"
        />
      </View>
      <View style={tailwind('h-3/5 p-5 justify-center')}>
        <Text style={tailwind('text-custom-gray text-2xl font-bold text-center uppercase')}>
          {heading}
        </Text>
        {subheading && (
          <Text style={tailwind('text-custom-gray text-lg text-center mt-2')}>
            {subheading}
          </Text>
        )}
      </View>
    </View>
  );
};

export default CarouselItem;