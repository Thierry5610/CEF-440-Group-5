import { StyleSheet } from 'react-native';
import theme from '../theme';

export const authStyles = StyleSheet.create({
  // Main container
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: theme.spacing[5],
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.neutral[900],
  },

  headerSpacer: {
    width: 40,
  },

  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Title
  title: {
    fontSize: theme.typography.fontSizes['2xl'],
    fontWeight: theme.typography.fontWeights.semibold,
    color: theme.colors.neutral[900],
    textAlign: 'center',
    marginBottom: theme.spacing[10],
  },

  // Form container
  formContainer: {
    flex: 1,
    paddingHorizontal: 28, // Match original padding
  },

  // Field container
  fieldContainer: {
    marginBottom: theme.spacing[5],
  },

  // Label
  label: {
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: theme.typography.fontWeights.medium,
    color: theme.colors.neutral[600],
    marginBottom: theme.spacing[2],
  },

  // Input container
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8', // Match original color
    borderRadius: 12, // Match original border radius
    borderWidth: 1,
    borderColor: '#F1F1F1', // Match original border color
    paddingHorizontal: theme.spacing[4],
    height: 56, // Match original height
  },

  inputContainerFocused: {
    borderColor: theme.colors.primary[500],
    backgroundColor: theme.colors.white,
  },

  inputContainerError: {
    borderColor: theme.colors.error[500],
    backgroundColor: theme.colors.error[50],
  },

  // Input icon
  inputIcon: {
    width: 20,
    alignItems: 'center',
    marginRight: theme.spacing[3],
  },

  // Input field
  input: {
    flex: 1,
    fontSize: theme.typography.fontSizes.base,
    color: theme.colors.neutral[900],
    paddingVertical: 0,
  },

  // Right icon (show/hide password, etc.)
  rightIcon: {
    width: 20,
    alignItems: 'center',
    marginLeft: theme.spacing[3],
  },

  // Error text
  errorText: {
    fontSize: theme.typography.fontSizes.xs,
    color: theme.colors.error[500],
    marginTop: theme.spacing[1],
    marginLeft: theme.spacing[1],
  },

  // Helper icon (question mark, info, etc.)
  helperIcon: {
    fontSize: theme.typography.fontSizes.base,
    color: '#CCCCCC', // Match original color
    borderWidth: 1,
    borderColor: '#CCCCCC', // Match original color
    borderRadius: 10,
    width: 20,
    height: 20,
    textAlign: 'center',
    lineHeight: 18,
  },

  // Terms and conditions
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30, // Match original spacing
    paddingHorizontal: theme.spacing[1],
  },

  // Checkbox
  checkbox: {
    marginRight: 12, // Match original spacing
  },

  checkboxInner: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#E0E0E0', // Match original color
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
  },

  checkboxChecked: {
    backgroundColor: '#4A9EFF', // Match original blue color
    borderColor: '#4A9EFF',
  },

  // Terms text
  termsText: {
    fontSize: theme.typography.fontSizes.sm,
    color: '#333333', // Match original color
    fontWeight: theme.typography.fontWeights.medium,
  },

  // Forgot password container
  forgotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10, // Match original spacing
    marginBottom: 40, // Match original spacing
    paddingHorizontal: theme.spacing[1],
  },

  infoIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#4A9EFF', // Match original blue
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },

  forgotText: {
    fontSize: theme.typography.fontSizes.sm,
    color: '#666666', // Match original color
  },

  forgotLink: {
    fontSize: theme.typography.fontSizes.sm,
    color: '#4A9EFF', // Match original blue
    fontWeight: theme.typography.fontWeights.medium,
  },

  // Primary button
  primaryButton: {
    backgroundColor: '#4A9EFF', // Match original blue
    paddingVertical: 18, // Match original padding
    borderRadius: 50, // Match original border radius (full rounded)
    alignItems: 'center',
    marginTop: theme.spacing[5],
    shadowColor: '#4A9EFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  primaryButtonDisabled: {
    backgroundColor: '#CCCCCC', // Match original disabled color
    shadowOpacity: 0,
    elevation: 0,
  },

  primaryButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSizes.base,
    fontWeight: theme.typography.fontWeights.semibold,
  },

  primaryButtonTextDisabled: {
    color: theme.colors.neutral[500],
  },

  // OTP specific styles
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30, // Match original spacing
    paddingHorizontal: 8, // Match original padding
  },

  otpInput: {
    width: 45,
    height: 45,
    backgroundColor: '#F8F8F8', // Match original background
    borderRadius: 8,
    fontSize: theme.typography.fontSizes.lg,
    borderWidth: 1,
    borderColor: '#F1F1F1', // Match original border color
    fontWeight: theme.typography.fontWeights.semibold,
    color: theme.colors.neutral[900],
    textAlign: 'center',
  },

  otpInputFocused: {
    borderColor: theme.colors.primary[500],
    backgroundColor: theme.colors.white,
  },

  otpInputFilled: {
    borderColor: theme.colors.primary[500],
    backgroundColor: theme.colors.primary[50],
  },

  // Description text
  description: {
    fontSize: theme.typography.fontSizes.sm,
    color: '#666666', // Match original color
    textAlign: 'left',
    lineHeight: 20, // Match original line height
    marginBottom: 40, // Match original spacing
  },

  // Resend container
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 50, // Match original spacing
    paddingHorizontal: theme.spacing[1],
  },

  resendText: {
    fontSize: theme.typography.fontSizes.sm,
    color: '#666666', // Match original color
  },

  resendLink: {
    fontSize: theme.typography.fontSizes.sm,
    color: '#4A9EFF', // Match original blue
    fontWeight: theme.typography.fontWeights.medium,
  },

  // Loading states
  buttonLoading: {
    opacity: 0.7,
  },

  loadingText: {
    color: theme.colors.neutral[500],
  },

  // Accessibility
  accessibilityHint: {
    fontSize: theme.typography.fontSizes.xs,
    color: theme.colors.neutral[500],
    marginTop: theme.spacing[1],
    fontStyle: 'italic',
  },
});

export default authStyles;