import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import './global.css'; // NativeWind tailwind config

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-black">
      <Text className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Welcome to NativeWind + Expo!
      </Text>

      <StatusBar style="auto" />
    </View>
  );
}
