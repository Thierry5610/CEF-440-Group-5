import React from 'react';
import { TextInput } from 'react-native';
import { tailwind } from '../tailwind';  // Adjust path based on your setup

const FormInput = ({ placeholder, secureTextEntry, value, onChangeText }) => {
  return (
    <TextInput
      style={tailwind('border border-custom-light-gray p-2 rounded-md mb-4')}
      placeholder={placeholder}
      placeholderTextColor="#B0B0B0"
      secureTextEntry={secureTextEntry}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

export default FormInput;