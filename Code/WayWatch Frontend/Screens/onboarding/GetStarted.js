import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

// Import custom components and styles
import SafeAreaWrapper from '../../components/common/SafeAreaWrapper';
import theme from '../../styles/theme';
import { onboardingStyles } from '../../styles/components/onboardingStyles';

const GetStarted = ({ navigation }) => {
  // Handle create account navigation
  const handleCreateAccount = () => {
    navigation.navigate('SignUp');
  };

  // Handle sign in navigation
  const handleSignIn = () => {
    navigation.navigate('SignIn');
  };

  return (
    <SafeAreaWrapper 
      style={onboardingStyles.getStartedContainer}
      statusBarStyle="dark-content"
      backgroundColor="#E8F4F8" // Light blue background to match original
    >
      {/* Main content */}
      <View style={onboardingStyles.container}>
        {/* Car illustration */}
        <View style={onboardingStyles.getStartedImageContainer}>
          <Image
            source={require('../../assets/images/carousel-3.png')}
            style={onboardingStyles.getStartedImage}
            resizeMode="contain"
          />
        </View>
        
        {/* Bottom content */}
        <View style={onboardingStyles.getStartedContent}>
          <Text style={onboardingStyles.getStartedTitle}>Get Started!</Text>
          
          {/* Action buttons */}
          <View style={onboardingStyles.buttonContainer}>
            <TouchableOpacity 
              style={onboardingStyles.primaryButton} 
              onPress={handleCreateAccount}
              activeOpacity={0.8}
            >
              <Text style={onboardingStyles.primaryButtonText}>Create Account</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={onboardingStyles.secondaryButton} 
              onPress={handleSignIn}
              activeOpacity={0.8}
            >
              <Text style={onboardingStyles.secondaryButtonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaWrapper>
  );
};

export default GetStarted;