import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { User, Mail, Lock, ChevronLeft } from 'lucide-react-native';

// Import custom components and styles
import SafeAreaWrapper from '../../components/common/SafeAreaWrapper';
import { 
  InputField, 
  PasswordField, 
  Checkbox, 
  PrimaryButton, 
  FormContainer 
} from '../../components/common/FormComponents';
import theme from '../../styles/theme';
import { authStyles } from '../../styles/components/authStyles';

const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    // Basic validation
    if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    if (!acceptTerms) {
      Alert.alert('Error', 'Please accept the terms and conditions');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://backend-qcus.onrender.com/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          email: email.trim(),
          password: password,
          role: 'user', // Default role
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Registration successful
        Alert.alert(
          'Success', 
          'User registered. OTP sent to email.',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('OTPVerification', { 
                email: email.trim(),
                username: username.trim(),
                password: password 
              })
            }
          ]
        );
      } else {
        // Registration failed
        Alert.alert('Error', data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Error', 'Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
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
          <Text style={authStyles.headerTitle}>Sign Up</Text>
          <View style={authStyles.headerSpacer} />
        </View>

        {/* Username Field */}
        <InputField
          label="Username"
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
          icon={User}
          showHelper={true}
          editable={!loading}
        />

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

        {/* Create Password Field */}
        <PasswordField
          label="Create Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Create Password"
          editable={!loading}
        />

        {/* Confirm Password Field */}
        <PasswordField
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password"
          editable={!loading}
        />

        {/* Terms and Conditions */}
        <Checkbox
          checked={acceptTerms}
          onPress={() => setAcceptTerms(!acceptTerms)}
          label="Accept Terms and Conditions"
        />

        {/* Sign Up Button */}
        <PrimaryButton
          title="Continue"
          onPress={handleSignUp}
          disabled={loading}
          loading={loading}
        />
      </FormContainer>
    </SafeAreaWrapper>
  );
};

export default SignUp;