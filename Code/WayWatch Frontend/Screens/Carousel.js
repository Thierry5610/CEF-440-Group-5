import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';
import { ChevronRight } from 'lucide-react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const CarouselComponent = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);

  // Sample data - replace with your actual data
  const carouselData = [
    {
      id: 1,
      image: require('../assets/images/carousel-1.png'), // Replace with your image path
      title: 'From reckless drivers to hazardous road conditions, we help you spot threats before they escalate',
    },
    {
      id: 2,
      image: require('../assets/images/carousel-1.png'), // Replace with your image path
      title: "StreetEye doesn't just see traffic it predicts and redirects it. This is where smart cities meet safer streets.",
    },
    {
      id: 3,
      image: require('../assets/images/carousel-2.png'), // Replace with your image path
      title: 'When accidents happen, our system recalculates routes before backup begins',
    },
  ];

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
    if (currentIndex < carouselData.length - 1) {
      const nextIndex = currentIndex + 1;
      scrollToIndex(nextIndex);
    } else {
      // Navigate to GetStarted when reaching the final item
      navigation.navigate('GetStarted');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {carouselData.map((item) => (
          <View key={item.id} style={styles.slide}>
            {/* Status bar area spacing */}
            <View style={styles.statusBarSpacer} />
            
            {/* Main content area */}
            <View style={styles.contentArea}>
              {/* Centered image */}
              <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.image} resizeMode="cover" />
              </View>
              
              {/* Title text */}
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
              </View>
            </View>
            
            {/* Bottom controls */}
            <View style={styles.bottomControls}>
              <View style={styles.pagination}>
                {carouselData.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.dot,
                      index === currentIndex ? styles.activeDot : styles.inactiveDot,
                    ]}
                  />
                ))}
              </View>
              
              <TouchableOpacity
                style={styles.nextButton}
                onPress={handleNextPress}
                activeOpacity={0.7}
              >
                <ChevronRight size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: '#F8F9FA',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBarSpacer: {
    height: StatusBar.currentHeight || 44, // Android status bar height or iOS safe area
  },
  contentArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  imageContainer: {
    width: screenWidth - 32,
    height: 200,
    overflow: 'hidden',
    marginBottom: 40,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
    color: '#2C3E50',
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: 300,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: screenWidth,
    paddingHorizontal: 24,
    paddingBottom: 50,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: '#4A90E2',
    width: 24,
  },
  inactiveDot: {
    backgroundColor: '#BDC3C7',
    width: 8,
  },
  nextButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
});

// Make sure to export the component properly
export default CarouselComponent;