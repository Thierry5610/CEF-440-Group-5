import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { ChevronRight } from 'lucide-react-native';

// Import custom components and styles
import SafeAreaWrapper from '../../components/common/SafeAreaWrapper';
import { onboardingStyles } from '../../styles/components/onboardingStyles';
import { CAROUSEL_DATA } from '../../utils/onboardingConstants';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const CarouselComponent = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    setCurrentIndex(index);
  };

  const scrollToIndex = (index) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: index * screenWidth,
        animated: true,
      });
      setCurrentIndex(index);
    }
  };

  const handleNextPress = () => {
    if (currentIndex < CAROUSEL_DATA.length - 1) {
      const nextIndex = currentIndex + 1;
      scrollToIndex(nextIndex);
    } else {
      // Navigate to GetStarted when reaching the final item
      navigation.navigate('GetStarted');
    }
  };

  return (
    <View style={onboardingStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" translucent={false} />
      
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
        style={onboardingStyles.scrollView}
        bounces={false} // Disable bouncing for smoother experience
        decelerationRate="fast" // Faster deceleration for snappier scrolling
      >
        {CAROUSEL_DATA.map((item) => (
          <View key={item.id} style={onboardingStyles.slide}>
            {/* Main content area */}
            <View style={onboardingStyles.contentArea}>
              {/* Centered image */}
              <View style={onboardingStyles.imageContainer}>
                <Image source={item.image} style={onboardingStyles.image} resizeMode="contain" />
              </View>
              
              {/* Title text */}
              <View style={onboardingStyles.textContainer}>
                <Text style={onboardingStyles.carouselTitle}>{item.title}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom controls - Fixed position */}
      <View style={onboardingStyles.bottomControls}>
        <View style={onboardingStyles.pagination}>
          {CAROUSEL_DATA.map((_, index) => (
            <View
              key={index}
              style={[
                onboardingStyles.dot,
                index === currentIndex ? onboardingStyles.activeDot : onboardingStyles.inactiveDot,
              ]}
            />
          ))}
        </View>
        
        <TouchableOpacity
          style={onboardingStyles.nextButton}
          onPress={handleNextPress}
          activeOpacity={0.7}
        >
          <ChevronRight size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CarouselComponent;