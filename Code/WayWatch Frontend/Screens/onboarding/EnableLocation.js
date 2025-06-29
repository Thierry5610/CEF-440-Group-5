import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { MapPin } from 'lucide-react-native';

// Import custom components and styles
import SafeAreaWrapper from '../../components/common/SafeAreaWrapper';
import { useLocation } from '../../hooks/useLocation';
import theme from '../../styles/theme';
import { onboardingStyles } from '../../styles/components/onboardingStyles';
import { ONBOARDING_FLOW, PERMISSIONS } from '../../utils/onboardingConstants';

const EnableLocation = ({ navigation }) => {
  const [requesting, setRequesting] = useState(false);
  const { requestPermission, hasPermission } = useLocation();

  // Handle location permission request
  const handleEnableLocation = async () => {
    setRequesting(true);

    try {
      const granted = await requestPermission();
      
      if (granted) {
        Alert.alert(
          'Success',
          'Location permission granted! You can now use all navigation features.',
          [
            {
              text: 'Continue',
              onPress: () => navigation.navigate(ONBOARDING_FLOW.HOME_SCREEN)
            }
          ]
        );
      } else {
        Alert.alert(
          'Permission Denied',
          'Location permission is required for core app functionality. You can enable it later in settings.',
          [
            {
              text: 'Skip for now',
              style: 'cancel',
              onPress: () => navigation.navigate(ONBOARDING_FLOW.HOME_SCREEN)
            },
            {
              text: 'Try again',
              onPress: handleEnableLocation
            }
          ]
        );
      }
    } catch (error) {
      console.error('Location permission error:', error);
      Alert.alert(
        'Error',
        'Unable to request location permission. Please try again.',
        [
          {
            text: 'Skip for now',
            style: 'cancel',
            onPress: () => navigation.navigate(ONBOARDING_FLOW.HOME_SCREEN)
          },
          {
            text: 'Try again',
            onPress: handleEnableLocation
          }
        ]
      );
    } finally {
      setRequesting(false);
    }
  };

  // Handle skip (for users who want to enable later)
  const handleSkip = () => {
    Alert.alert(
      'Skip Location Permission?',
      'You can enable location access later in the app settings. Some features may be limited without location access.',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Skip',
          onPress: () => navigation.navigate(ONBOARDING_FLOW.HOME_SCREEN)
        }
      ]
    );
  };

  return (
    <SafeAreaWrapper 
      style={onboardingStyles.enableLocationContainer}
      statusBarStyle="dark-content"
      backgroundColor={theme.colors.white}
    >
      <View style={onboardingStyles.enableLocationContent}>
        {/* Location Icon */}
        <View style={onboardingStyles.locationIconContainer}>
          <MapPin color={theme.colors.white} size={40} />
        </View>

        {/* Title */}
        <Text style={onboardingStyles.enableLocationTitle}>
          {PERMISSIONS.LOCATION.title}
        </Text>

        {/* Description */}
        <Text style={onboardingStyles.enableLocationDescription}>
          {PERMISSIONS.LOCATION.description}
        </Text>

        {/* Features list */}
        <View style={{ marginBottom: theme.spacing[8] }}>
          <Text style={[onboardingStyles.enableLocationDescription, { fontWeight: theme.typography.fontWeights.semibold }]}>
            Location access enables:
          </Text>
          <Text style={onboardingStyles.enableLocationDescription}>
            • Real-time navigation and directions{'\n'}
            • Traffic alerts and road conditions{'\n'}
            • Accurate incident reporting{'\n'}
            • Personalized route suggestions
          </Text>
        </View>
      </View>

      {/* Action buttons */}
      <View style={{ width: '100%', paddingHorizontal: theme.spacing[5], paddingBottom: theme.spacing[10] }}>
        <TouchableOpacity
          style={[
            onboardingStyles.enableLocationButton,
            { position: 'relative', width: '100%', marginBottom: theme.spacing[3] },
            requesting && { opacity: 0.7 }
          ]}
          onPress={handleEnableLocation}
          disabled={requesting}
          activeOpacity={0.8}
        >
          {requesting ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ActivityIndicator size="small" color={theme.colors.white} style={{ marginRight: theme.spacing[2] }} />
              <Text style={onboardingStyles.enableLocationButtonText}>Requesting Permission...</Text>
            </View>
          ) : (
            <Text style={onboardingStyles.enableLocationButtonText}>Enable Location</Text>
          )}
        </TouchableOpacity>

        {/* Skip button */}
        <TouchableOpacity
          onPress={handleSkip}
          style={{
            paddingVertical: theme.spacing[3],
            alignItems: 'center',
          }}
          activeOpacity={0.8}
        >
          <Text style={{
            color: theme.colors.neutral[600],
            fontSize: theme.typography.fontSizes.sm,
            fontWeight: theme.typography.fontWeights.medium,
          }}>
            Skip for now
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaWrapper>
  );
};

export default EnableLocation;