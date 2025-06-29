import { StyleSheet, Dimensions, StatusBar } from 'react-native';
import theme from '../theme';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const onboardingStyles = StyleSheet.create({
  // Common container
  container: {
    flex: 1,
    backgroundColor: '#E8F4F8', // Light blue background to match original
  },

  safeContainer: {
    flex: 1,
    backgroundColor: '#E8F4F8',
  },

  // Carousel styles - FULL SCREEN
  scrollView: {
    flex: 1,
  },

  slide: {
    width: screenWidth,
    height: screenHeight, // Full screen height
    backgroundColor: '#F8F9FA',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight || 0, // Account for status bar
  },

  contentArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    width: '100%',
  },

  // Image container - FULL WIDTH
  imageContainer: {
    width: '100%', // Full width
    height: 250, // Larger height for better visibility
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  // Text container
  textContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '100%',
  },

  carouselTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#2C3E50',
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: 320, // Slightly wider for better readability
  },

  // Bottom controls
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: screenWidth,
    paddingHorizontal: 24,
    paddingBottom: 50,
    position: 'absolute', // Position at bottom
    bottom: 0,
  },

  // Pagination
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },

  activeDot: {
    backgroundColor: '#4A90E2',
    width: 24,
  },

  inactiveDot: {
    backgroundColor: '#BDC3C7',
    width: 8,
  },

  // Next button
  nextButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },

  // GetStarted screen styles
  getStartedContainer: {
    flex: 1,
    backgroundColor: '#E8F4F8', // Light blue background to match original
    justifyContent: 'space-between',
  },

  getStartedImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50, // Match original spacing
  },

  getStartedImage: {
    width: 300,
    height: 200,
  },

  getStartedContent: {
    alignItems: 'center',
    paddingHorizontal: 32, // Match original spacing
    paddingBottom: 60, // Match original spacing
  },

  getStartedTitle: {
    fontSize: 28, // Match original font size
    fontWeight: '700', // Bolder font weight to match original
    color: '#2C3E50', // Dark gray instead of black to match original
    marginBottom: 48, // Match original spacing
    textAlign: 'center',
  },

  // Button styles (matching original design)
  buttonContainer: {
    width: '100%',
    gap: 8, // Small gap between buttons
  },

  primaryButton: {
    backgroundColor: '#4A9EFF', // Brighter blue to match original
    paddingVertical: 16, // Match original padding
    paddingHorizontal: 32,
    borderRadius: 50, // More rounded like original
    alignItems: 'center',
    width: '100%',
    // Add shadow for depth like original
    shadowColor: '#4A9EFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#4A9EFF', // Match primary color
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 50,
    alignItems: 'center',
    width: '100%',
    marginTop: 8,
  },

  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  secondaryButtonText: {
    color: '#4A9EFF',
    fontSize: 16,
    fontWeight: '600',
  },

  // Enable Location screen styles
  enableLocationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing[5],
    backgroundColor: theme.colors.white,
  },

  enableLocationContent: {
    alignItems: 'center',
    width: '100%',
  },

  locationIconContainer: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing[5],
  },

  enableLocationTitle: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: theme.typography.fontWeights.semibold,
    color: theme.colors.neutral[900],
    textAlign: 'center',
    marginBottom: theme.spacing[5],
  },

  enableLocationDescription: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.neutral[700],
    textAlign: 'center',
    marginBottom: theme.spacing[10],
    paddingHorizontal: theme.spacing[5],
    lineHeight: theme.typography.lineHeights.relaxed * theme.typography.fontSizes.sm,
  },

  enableLocationButton: {
    backgroundColor: theme.colors.primary[500],
    paddingVertical: theme.spacing[4],
    borderRadius: theme.borderRadius.full,
    alignItems: 'center',
    width: '80%',
    position: 'absolute',
    bottom: theme.spacing[10],
    ...theme.shadows.md,
  },

  enableLocationButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSizes.base,
    fontWeight: theme.typography.fontWeights.semibold,
  },

  // Loading states
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
  },

  loadingText: {
    fontSize: theme.typography.fontSizes.base,
    color: theme.colors.neutral[600],
    marginTop: theme.spacing[4],
  },
});

export default onboardingStyles;