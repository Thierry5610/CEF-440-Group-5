import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 p-5">
      <Text className="text-xl mb-4">Sign Up</Text>
      <TextInput placeholder="Username" className="border p-2 mb-2 rounded" />
      <TextInput placeholder="Email Address" className="border p-2 mb-2 rounded" />
      <TextInput
        placeholder="Create Password"
        secureTextEntry
        className="border p-2 mb-2 rounded"
      />
      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        className="border p-2 mb-4 rounded"
      />
      <View className="flex-row items-center mb-2">
        <View className="w-5 h-5 border mr-2" /> {/* Placeholder checkbox */}
        <Text>I am not a robot</Text>
      </View>
      <View className="flex-row items-center mb-4">
        <View className="w-5 h-5 border mr-2" /> {/* Placeholder checkbox */}
        <Text>Accept terms and conditions</Text>
      </View>
      <TouchableOpacity className="bg-blue-500 p-3 rounded">
        <Text className="text-white text-center">Create Account</Text>
      </TouchableOpacity>
      <Pressable onPress={() => navigation.navigate('SignIn')} className="mt-2">
        <Text className="text-blue-500 text-center">Sign In</Text>
      </Pressable>
    </View>
  );
};

export default SignUpScreen;