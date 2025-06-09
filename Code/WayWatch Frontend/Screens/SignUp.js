import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { User, Mail, Lock, Eye, EyeOff, Check, LucideChevronLeft } from 'lucide-react-native';

const SignUp = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const insets = useSafeAreaInsets(); // Get safe area insets for dynamic top margin

  const handleContinue = () => {
    console.log('Continue pressed');
    navigation.navigate("OTPVerification")
  };

  const handleGoBack = () => {
    console.log('Go back pressed');
    navigation.goBack()
  };

  return (
    <View style={[styles.safeArea, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <LucideChevronLeft/>
        </TouchableOpacity>
        <Text style={styles.title}>Sign Up</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.container}>
        {/* Username Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Username</Text>
          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <User color="#999999" size={16} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#C4C4C4"
              value={username}
              onChangeText={setUsername}
            />
            <TouchableOpacity style={styles.rightIcon}>
              <Text style={styles.questionIcon}>?</Text>
            </TouchableOpacity>
          </View>
        </View>

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

        {/* Create Password Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Create Password</Text>
          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <Lock color="#999999" size={16} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Create Password"
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

        {/* Confirm Password Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <Lock color="#999999" size={16} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#C4C4C4"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity
              style={styles.rightIcon}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff color="#CCCCCC" size={16} />
              ) : (
                <Eye color="#CCCCCC" size={16} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Terms and Conditions */}
        <View style={styles.termsContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setAcceptTerms(!acceptTerms)}
          >
            <View style={[styles.checkboxInner, acceptTerms && styles.checkboxChecked]}>
              {acceptTerms && <Check color="#FFFFFF" size={12} />}
            </View>
          </TouchableOpacity>
          <Text style={styles.termsText}>Accept Terms and Conditions</Text>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          activeOpacity={0.8}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  placeholder: {
    width: 40,
  },
  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 20,
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
  questionIcon: {
    fontSize: 16,
    color: '#CCCCCC',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    width: 20,
    height: 20,
    textAlign: 'center',
    lineHeight: 18,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
    paddingHorizontal: 4,
  },
  checkbox: {
    marginRight: 12,
  },
  checkboxInner: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxChecked: {
    backgroundColor: '#4A9EFF',
    borderColor: '#4A9EFF',
  },
  termsText: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  continueButton: {
    backgroundColor: '#4A9EFF',
    paddingVertical: 18,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#4A9EFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  continueText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SignUp;