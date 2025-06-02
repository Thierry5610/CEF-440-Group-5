import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import GetStarted from './Screens/GetStarted';
import SignIn from './Screens/SignIn';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import OTPVerification from './Screens/OTPVerification';
import EnableLocation from './Screens/EnableLocation';
import SignUp from './Screens/SignUp';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CarouselComponent from './Screens/Carousel';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaProvider>

      <NavigationContainer>
        <Stack.Navigator initialRouteName="Carousel" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="GetStarted" component={GetStarted}/>
          <Stack.Screen name="Carousel" component={CarouselComponent}/>
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="OTPVerification" component={OTPVerification} />
          <Stack.Screen name="EnableLocation" component={EnableLocation} />
        </Stack.Navigator>
      </NavigationContainer>

    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
