import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Mail, Lock, Info, Eye, EyeOff, ChevronLeft } from 'lucide-react-native';

// Import custom components and styles
import SafeAreaWrapper from '../../components/common/SafeAreaWrapper';
import { 
  InputField, 
  PasswordField, 
  PrimaryButton, 
  FormContainer 
} from '../../components/common/FormComponents';
import theme from '../../styles/theme';
import { authStyles } from '../../styles/components/authStyles';

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    // Basic validation
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://backend-qcus.onrender.com/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        Alert.alert('Success', 'Login successful!', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('HomeScreen')
          }
        ]);
      } else {
        // Login failed
        Alert.alert('Error', data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Password reset functionality coming soon.');
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaWrapper 
      style={authStyles.container}
      statusBarStyle="dark-content"
      backgroundColor={theme.colors.white}
    >
      <FormContainer>
        {/* Header */}
        <View style={authStyles.header}>
          <TouchableOpacity style={authStyles.backButton} onPress={handleGoBack}>
            <ChevronLeft size={24} color={theme.colors.neutral[900]} />
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text style={authStyles.title}>Sign In</Text>

        {/* Email Field */}
        <InputField
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          placeholder="Email Address"
          icon={Mail}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading}
        />

        {/* Password Field */}
        <PasswordField
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          editable={!loading}
        />

        {/* Forgot Password */}
        <View style={authStyles.forgotContainer}>
          <View style={authStyles.infoIcon}>
            <Info color={theme.colors.white} size={10} />
          </View>
          <Text style={authStyles.forgotText}>Forgot Password? </Text>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={authStyles.forgotLink}>Click here</Text>
          </TouchableOpacity>
        </View>

        {/* Sign In Button */}
        <PrimaryButton
          title="Confirm"
          onPress={handleSignIn}
          disabled={loading}
          loading={loading}
        />
      </FormContainer>
    </SafeAreaWrapper>
  );
};

export default SignIn;