import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Eye, EyeOff, Check } from 'lucide-react-native';
import theme from '../../styles/theme';
import { authStyles } from '../../styles/components/authStyles';

// Input Field Component
export const InputField = ({
  label,
  value,
  onChangeText,
  placeholder,
  icon: IconComponent,
  rightIcon: RightIconComponent,
  onRightIconPress,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  error,
  editable = true,
  style,
  inputStyle,
  showHelper = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const containerStyle = [
    authStyles.inputContainer,
    isFocused && authStyles.inputContainerFocused,
    error && authStyles.inputContainerError,
    style,
  ];

  return (
    <View style={authStyles.fieldContainer}>
      {label && <Text style={authStyles.label}>{label}</Text>}
      <View style={containerStyle}>
        {IconComponent && (
          <View style={authStyles.inputIcon}>
            <IconComponent 
              color={error ? theme.colors.error[500] : theme.colors.neutral[500]} 
              size={16} 
            />
          </View>
        )}
        <TextInput
          style={[authStyles.input, inputStyle]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.neutral[400]}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={editable}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {RightIconComponent && (
          <TouchableOpacity
            style={authStyles.rightIcon}
            onPress={onRightIconPress}
            activeOpacity={0.7}
          >
            <RightIconComponent 
              color={theme.colors.neutral[400]} 
              size={16} 
            />
          </TouchableOpacity>
        )}
        {showHelper && (
          <TouchableOpacity style={authStyles.rightIcon}>
            <Text style={authStyles.helperIcon}>?</Text>
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={authStyles.errorText}>{error}</Text>}
    </View>
  );
};

// Password Input Field Component
export const PasswordField = ({
  label = "Password",
  value,
  onChangeText,
  placeholder = "Enter password",
  error,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputField
      label={label}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      icon={require('lucide-react-native').Lock}
      rightIcon={showPassword ? EyeOff : Eye}
      onRightIconPress={() => setShowPassword(!showPassword)}
      secureTextEntry={!showPassword}
      error={error}
      autoCapitalize="none"
      {...props}
    />
  );
};

// Checkbox Component
export const Checkbox = ({ checked, onPress, label, style }) => (
  <View style={[authStyles.termsContainer, style]}>
    <TouchableOpacity
      style={authStyles.checkbox}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[authStyles.checkboxInner, checked && authStyles.checkboxChecked]}>
        {checked && <Check color={theme.colors.white} size={12} />}
      </View>
    </TouchableOpacity>
    {label && <Text style={authStyles.termsText}>{label}</Text>}
  </View>
);

// Primary Button Component
export const PrimaryButton = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const buttonStyle = [
    authStyles.primaryButton,
    disabled && authStyles.primaryButtonDisabled,
    loading && authStyles.buttonLoading,
    style,
  ];

  const buttonTextStyle = [
    authStyles.primaryButtonText,
    disabled && authStyles.primaryButtonTextDisabled,
    loading && authStyles.loadingText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      <Text style={buttonTextStyle}>
        {loading ? 'Loading...' : title}
      </Text>
    </TouchableOpacity>
  );
};

// OTP Input Component
export const OTPInput = ({ 
  length = 6, 
  value = [], 
  onChangeText, 
  onKeyPress,
  refs,
  style 
}) => {
  return (
    <View style={[authStyles.otpContainer, style]}>
      {Array.from({ length }, (_, index) => {
        const isFocused = refs?.current[index]?.isFocused?.();
        const isFilled = value[index] && value[index].length > 0;
        
        const inputStyle = [
          authStyles.otpInput,
          isFocused && authStyles.otpInputFocused,
          isFilled && authStyles.otpInputFilled,
        ];

        return (
          <TextInput
            key={index}
            ref={(ref) => {
              if (refs?.current) {
                refs.current[index] = ref;
              }
            }}
            style={inputStyle}
            value={value[index] || ''}
            onChangeText={(text) => onChangeText(text, index)}
            onKeyPress={(e) => onKeyPress && onKeyPress(e, index)}
            keyboardType="numeric"
            maxLength={1}
            textAlign="center"
            selectTextOnFocus
          />
        );
      })}
    </View>
  );
};

// Form Container Component
export const FormContainer = ({ children, style }) => (
  <View style={[authStyles.formContainer, style]}>
    {children}
  </View>
);

// Auth Header Component
export const AuthHeader = ({ title, onBackPress, showBackButton = true }) => (
  <>
    {showBackButton && (
      <View style={authStyles.header}>
        <TouchableOpacity style={authStyles.backButton} onPress={onBackPress}>
          <ChevronLeft size={24} color={theme.colors.neutral[900]} />
        </TouchableOpacity>
      </View>
    )}
    <Text style={authStyles.title}>{title}</Text>
  </>
);

export default {
  InputField,
  PasswordField,
  Checkbox,
  PrimaryButton,
  OTPInput,
  FormContainer,
  AuthHeader,
};