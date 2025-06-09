import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Mail, Lock, Info, Eye, EyeOff, ArrowLeft, LucideChevronLeft } from 'lucide-react-native';
import { ButtonPrimary } from '../Components/ui/Button';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const insets = useSafeAreaInsets();

  const handleConfirm = () => {
    console.log('Sign in with:', { email, password });
    navigation.navigate("OTPVerification")
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
  };

  const handleGoBack = () => {
    console.log('Go back pressed');
    navigation.goBack()
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={[styles.container, { paddingTop: insets.top }]}>
       
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <LucideChevronLeft/>
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text style={styles.title}>Sign In</Text>

        {/* Email Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Email Address</Text>
          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <Mail color="#999999" size={16} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor="#C4C4C4"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Password Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <Lock color="#999999" size={16} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#C4C4C4"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.rightIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff color="#CCCCCC" size={16} />
              ) : (
                <Eye color="#CCCCCC" size={16} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Forgot Password */}
        <View style={styles.forgotContainer}>
          <View style={styles.infoIcon}>
            <Info color="#FFFFFF" size={10} />
          </View>
          <Text style={styles.forgotText}>Forgot Password? </Text>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotLink}>Click here</Text>
          </TouchableOpacity>
        </View>

        {/* Confirm Button */}
        <ButtonPrimary onClick={handleConfirm}>Confirm</ButtonPrimary>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  container: {
    flex: 1,
    paddingHorizontal: 28,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 40,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F1F1F1",
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    width: 20,
    alignItems: 'center',
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    paddingVertical: 0,
  },
  rightIcon: {
    width: 20,
    alignItems: 'center',
    marginLeft: 12,
  },
  forgotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40,
    paddingHorizontal: 4,
  },
  infoIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#4A9EFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  forgotText: {
    fontSize: 14,
    color: '#666666',
  },
  forgotLink: {
    fontSize: 14,
    color: '#4A9EFF',
    fontWeight: '500',
  },
});

export default SignIn;