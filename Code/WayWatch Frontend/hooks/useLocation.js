import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';

export const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);

  // Request location permission
  const requestPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setHasPermission(status === 'granted');
      return status === 'granted';
    } catch (error) {
      console.error('Error requesting location permission:', error);
      setError(error);
      return false;
    }
  };

  // Get current location
  const getCurrentLocation = async () => {
    if (!hasPermission) {
      const permissionGranted = await requestPermission();
      if (!permissionGranted) {
        Alert.alert('Permission denied', 'Location permission is required');
        return null;
      }
    }

    setLoading(true);
    setError(null);

    try {
      const locationResult = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        timeout: 15000,
        maximumAge: 10000,
      });

      const userLocation = {
        latitude: locationResult.coords.latitude,
        longitude: locationResult.coords.longitude,
      };

      setLocation(userLocation);
      return userLocation;
    } catch (error) {
      console.error('Error getting location:', error);
      setError(error);
      Alert.alert('Error', 'Could not get current location');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Get address from coordinates
  const getAddressFromCoordinates = async (coords) => {
    try {
      const addresses = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      if (addresses.length > 0) {
        const address = addresses[0];
        const formattedAddress = [
          address.street,
          address.city,
          address.region,
          address.country
        ].filter(Boolean).join(', ');
        
        return formattedAddress || 'Unknown location';
      }
      
      return 'Unknown location';
    } catch (error) {
      console.error('Error getting address:', error);
      return 'Unknown location';
    }
  };

  // Initialize location on mount
  useEffect(() => {
    const initializeLocation = async () => {
      const permissionGranted = await requestPermission();
      if (permissionGranted) {
        getCurrentLocation();
      }
    };

    initializeLocation();
  }, []);

  return {
    location,
    loading,
    error,
    hasPermission,
    getCurrentLocation,
    getAddressFromCoordinates,
    requestPermission,
  };
};