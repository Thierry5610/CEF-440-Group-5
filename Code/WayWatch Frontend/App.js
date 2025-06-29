import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import screens (matching your actual directory structure)
import GetStarted from './screens/onboarding/GetStarted';
import SignIn from './screens/auth/SignIn';
import SignUp from './screens/auth/SignUp';
import OTPVerification from './screens/auth/OTPVerification';
import EnableLocation from './screens/onboarding/EnableLocation';
import Carousel from './screens/onboarding/Carousel';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Carousel" 
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Carousel" component={Carousel} />
          <Stack.Screen name="GetStarted" component={GetStarted} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="OTPVerification" component={OTPVerification} />
          <Stack.Screen name="EnableLocation" component={EnableLocation} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}