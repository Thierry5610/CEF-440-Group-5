import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MapPin } from 'lucide-react-native';

const EnableLocation = () => {
  const insets = useSafeAreaInsets();

  const handleEnable = () => {
    console.log('Enable location pressed');
    // Add location permission logic here (e.g., using expo-location)
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* Location Icon */}
        <View style={styles.iconContainer}>
          <MapPin color="#000000" size={40} />
        </View>

        {/* Title */}
        <Text style={styles.title}>Enable precise location</Text>

        {/* Description */}
        <Text style={styles.description}>
          You'll need to enable your location in order to use this app.
        </Text>

        {/* Enable Button */}
        <TouchableOpacity
          style={styles.enableButton}
          onPress={handleEnable}
          activeOpacity={0.8}
        >
          <Text style={styles.enableText}>Enable</Text>
        </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4A9EFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    color: '#333333',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  enableButton: {
    backgroundColor: '#4A9EFF',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    width: '80%',
    position: 'absolute',
    bottom: 40,
  },
  enableText: {
    color: '#000000', // Black text as shown in the image
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EnableLocation;