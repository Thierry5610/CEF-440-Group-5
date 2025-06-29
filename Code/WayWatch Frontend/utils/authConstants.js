// Validation functions
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) {
    return 'Email is required';
  }
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  return null;
};

export const validatePassword = (password, isSignUp = false) => {
  if (!password) {
    return 'Password is required';
  }
  if (isSignUp && password.length < 6) {
    return 'Password must be at least 6 characters long';
  }
  return null;
};

export const validateUsername = (username) => {
  if (!username.trim()) {
    return 'Username is required';
  }
  if (username.length < 3) {
    return 'Username must be at least 3 characters long';
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return 'Username can only contain letters, numbers, and underscores';
  }
  return null;
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) {
    return 'Please confirm your password';
  }
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  return null;
};

export const validateOTP = (otp, requiredLength = 6) => {
  const otpString = Array.isArray(otp) ? otp.join('') : otp;
  if (!otpString) {
    return 'OTP is required';
  }
  if (otpString.length !== requiredLength) {
    return `OTP must be ${requiredLength} digits`;
  }
  if (!/^\d+$/.test(otpString)) {
    return 'OTP can only contain numbers';
  }
  return null;
};

// Form validation for entire forms
export const validateSignInForm = (formData) => {
  const errors = {};
  
  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;
  
  const passwordError = validatePassword(formData.password);
  if (passwordError) errors.password = passwordError;
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateSignUpForm = (formData) => {
  const errors = {};
  
  const usernameError = validateUsername(formData.username);
  if (usernameError) errors.username = usernameError;
  
  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;
  
  const passwordError = validatePassword(formData.password, true);
  if (passwordError) errors.password = passwordError;
  
  const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword);
  if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;
  
  if (!formData.acceptTerms) {
    errors.terms = 'You must accept the terms and conditions';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Default form states
export const DEFAULT_SIGNIN_FORM = {
  email: '',
  password: '',
};

export const DEFAULT_SIGNUP_FORM = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
};

export const DEFAULT_OTP_FORM = {
  otp: ['', '', '', '', '', ''],
  resendDisabled: false,
  resendCountdown: 0,
};

// Authentication constants
export const AUTH_CONFIG = {
  OTP_LENGTH: 6,
  OTP_RESEND_TIMEOUT: 60, // seconds
  PASSWORD_MIN_LENGTH: 6,
  USERNAME_MIN_LENGTH: 3,
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  INVALID_CREDENTIALS: 'Invalid email or password. Please try again.',
  USER_EXISTS: 'An account with this email already exists.',
  INVALID_OTP: 'Invalid OTP. Please try again.',
  OTP_EXPIRED: 'OTP has expired. Please request a new one.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
};

// Success messages
export const SUCCESS_MESSAGES = {
  ACCOUNT_CREATED: 'Account created successfully!',
  OTP_SENT: 'OTP sent successfully to your email.',
  LOGIN_SUCCESS: 'Logged in successfully!',
  OTP_VERIFIED: 'OTP verified successfully!',
};

export default {
  validateEmail,
  validatePassword,
  validateUsername,
  validateConfirmPassword,
  validateOTP,
  validateSignInForm,
  validateSignUpForm,
  DEFAULT_SIGNIN_FORM,
  DEFAULT_SIGNUP_FORM,
  DEFAULT_OTP_FORM,
  AUTH_CONFIG,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
};