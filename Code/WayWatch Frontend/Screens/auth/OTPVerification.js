import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import custom components and styles
import SafeAreaWrapper from '../../components/common/SafeAreaWrapper';
import { 
  OTPInput, 
  PrimaryButton, 
  FormContainer 
} from '../../components/common/FormComponents';
import theme from '../../styles/theme';
import { authStyles } from '../../styles/components/authStyles';

const OTPVerification = ({ navigation, route }) => {
  // Get email and other data from route params
  const { email, username, password } = route.params || {};
  
  // State management
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  
  // Refs for OTP inputs
  const inputRefs = useRef([]);

  // Countdown timer effect
  useEffect(() => {
    let timer;
    if (resendCountdown > 0) {
      timer = setTimeout(() => {
        setResendCountdown(resendCountdown - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  // Handle OTP input change
  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    
    setOtp(newOtp);
    
    // Clear errors when user starts typing
    if (errors.otp) {
      setErrors(prev => ({ ...prev, otp: null }));
    }

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle key press (for backspace navigation)
  const handleKeyPress = (e, index) => {
    // Move to previous input on backspace if current input is empty
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Store user data after successful verification
  const storeUserData = async () => {
    try {
      const userData = {
        email: email,
        username: username || email.split('@')[0],
        name: username || email.split('@')[0],
        verified: true,
      };
      
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  };

  // Handle OTP verification
  const handleVerifyOTP = async () => {
    // Validate OTP
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      const error = 'Please enter a complete 6-digit OTP';
      setErrors({ otp: error });
      Alert.alert('Invalid OTP', error);
      return;
    }

    if (!email) {
      Alert.alert('Error', 'Email not found. Please go back and try again.');
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch('https://backend-qcus.onrender.com/api/v1/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          otp: otpString,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store user data
        await storeUserData();
        
        // OTP verification successful
        Alert.alert(
          'Success', 
          'Verification successful. You can now login.',
          [
            {
              text: 'Continue',
              onPress: () => navigation.navigate("HomeScreen")
            }
          ]
        );
      } else {
        // OTP verification failed
        Alert.alert('Error', data.message || 'Invalid OTP. Please try again.');
        setErrors({ otp: 'Invalid OTP' });
      }
      
    } catch (error) {
      console.error('OTP verification error:', error);
      Alert.alert('Error', 'Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle resend OTP
  const handleResendOTP = async () => {
    if (resendCountdown > 0) return;

    if (!email) {
      Alert.alert('Error', 'Email not found. Please go back and try again.');
      return;
    }

    try {
      setLoading(true);
      
      // Call the register endpoint again to resend OTP
      const response = await fetch('https://backend-qcus.onrender.com/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username || email.split('@')[0],
          email: email,
          password: password || 'temp123',
          role: 'user',
        }),
      });

      const data = await response.json();
      
      // Reset OTP inputs
      setOtp(['', '', '', '', '', '']);
      setErrors({});
      
      // Start countdown
      setResendCountdown(60);
      
      // Focus first input
      inputRefs.current[0]?.focus();
      
      Alert.alert('Success', 'OTP sent to your email again.');
      
    } catch (error) {
      console.error('Resend OTP error:', error);
      Alert.alert('Error', 'Failed to resend OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle back navigation
  const handleGoBack = () => {
    navigation.goBack();
  };

  // Check if OTP is complete
  const isOTPComplete = otp.every(digit => digit.length > 0);

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
          <Text style={authStyles.headerTitle}>OTP Verification</Text>
          <View style={authStyles.headerSpacer} />
        </View>

        {/* Description */}
        <Text style={authStyles.description}>
          Please verify by entering the code that was sent to your email: {email}
        </Text>

        {/* OTP Input */}
        <OTPInput
          length={6}
          value={otp}
          onChangeText={handleOtpChange}
          onKeyPress={handleKeyPress}
          refs={inputRefs}
        />

        {/* Error display */}
        {errors.otp && (
          <Text style={[authStyles.errorText, { textAlign: 'center', marginTop: -theme.spacing[6] }]}>
            {errors.otp}
          </Text>
        )}

        {/* Resend Section */}
        <View style={authStyles.resendContainer}>
          <Text style={authStyles.resendText}>Didn't receive code? </Text>
          <TouchableOpacity onPress={handleResendOTP} disabled={resendCountdown > 0 || loading}>
            <Text style={[
              authStyles.resendLink,
              (resendCountdown > 0 || loading) && { color: theme.colors.neutral[400] }
            ]}>
              {resendCountdown > 0 ? `resend in ${resendCountdown}s` : 'resend'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Verify Button */}
        <PrimaryButton
          title="Verify"
          onPress={handleVerifyOTP}
          disabled={!isOTPComplete}
          loading={loading}
        />
      </FormContainer>
    </SafeAreaWrapper>
  );
};

export default OTPVerification;