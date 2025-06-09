import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  Alert,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ActivityIndicator,
  Platform,
} from 'react-native';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { ChevronLeft, Plus } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

// Simpler array of static image URLs
const staticImages = [
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
  'https://images.unsplash.com/photo-1581094794339-7e3a560a8d4e',
  'https://images.unsplash.com/photo-1564103571236-9d2c8c9e9d4a',
  'https://images.unsplash.com/photo-1533090161767-e6ffed986c88',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e',
];

const getRandomImage = (category = 'traffic') => {
  const categoryImages = {
    traffic: [staticImages[0], staticImages[1]],
    accident: [staticImages[2], staticImages[3]],
    construction: [staticImages[4]],
    police: [staticImages[0]],
    weather: [staticImages[1]],
  };
  const images = categoryImages[category] || staticImages;
  return images[Math.floor(Math.random() * images.length)];
};

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'traffic',
      title: 'Internal traffic',
      subtitle: 'ANYFOCUS',
      time: '3:00 PM',
      icon: '🚗',
      location: 'Mile 16, Douala',
      date: '10/11/2025',
      actualTime: '11:00 PM',
      images: [getRandomImage('traffic')],
      description: 'Heavy traffic congestion on main road causing significant delays for commuters.',
    },
    {
      id: 2,
      type: 'accident',
      title: 'Car crash',
      subtitle: 'ANYFOCUS',
      time: '2:00 PM',
      icon: '🚙',
      location: 'Bonanjo, Douala',
      date: '10/11/2025',
      actualTime: '11:00 PM',
      images: [getRandomImage('accident'), getRandomImage('accident')],
      description: 'Vehicle collision reported with minor injuries. Emergency services responded quickly.',
    },
    {
      id: 3,
      type: 'construction',
      title: 'Road construction',
      subtitle: 'ANYFOCUS',
      time: '1:00 PM',
      icon: '🚧',
      location: 'Akwa, Douala',
      date: '10/11/2025',
      actualTime: '11:00 PM',
      images: [getRandomImage('construction')],
      description: 'Ongoing road maintenance work causing lane closures during peak hours.',
    },
  ]);

  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showIncidentForm, setShowIncidentForm] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [newReport, setNewReport] = useState({
    type: '',
    description: '',
    location: '',
    hasInjuries: null,
    images: [],
  });
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);

  const insets = useSafeAreaInsets();

  const incidentTypes = [
    { id: 'traffic', label: 'Traffic', icon: '🚗', color: '#007AFF' },
    { id: 'police', label: 'Police', icon: '👮‍♂️', color: '#34C759' },
    { id: 'crash', label: 'Crash', icon: '💥', color: '#FF3B30' },
    { id: 'hazard', label: 'Hazard', icon: '⚠️', color: '#FF9500' },
    { id: 'construction', label: 'Construction', icon: '🚧', color: '#FF9500' },
    { id: 'lane', label: 'Blocked Lane', icon: '🚫', color: '#FF6B35' },
    { id: 'breakdown', label: 'Map Issue', icon: '🗺️', color: '#5AC8FA' },
    { id: 'weather', label: 'Weather', icon: '🌧️', color: '#AF52DE' },
    { id: 'other', label: 'Other', icon: '❓', color: '#8E8E93' },
  ];

  const getCurrentLocation = async () => {
    setLoadingLocation(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required to get your current location.');
        setLoadingLocation(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (address.length > 0) {
        const addr = address[0];
        const locationString = `${addr.street || ''} ${addr.city || ''}, ${addr.region || ''}`.trim();
        setCurrentLocation(locationString);
        setNewReport((prev) => ({ ...prev, location: locationString }));
      }
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('Error', 'Could not get your current location. Please enter manually.');
    }
    setLoadingLocation(false);
  };

  const handleImagePick = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Photo library access is required to add images.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setNewReport((prev) => ({
          ...prev,
          images: [...prev.images, result.assets[0].uri],
        }));
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Could not select image.');
    }
  };

  const handleNotificationPress = (notification) => {
    setSelectedNotification(notification);
  };

  const handleAddReport = () => {
    setShowReportModal(true);
  };

  const handleIncidentTypeSelect = (type) => {
    setNewReport((prev) => ({ ...prev, type }));
    setShowReportModal(false);
    setShowIncidentForm(true);
    getCurrentLocation();
  };

  const handleSubmitReport = () => {
    if (!newReport.description.trim()) {
      Alert.alert('Error', 'Please describe what you see');
      return;
    }
    if (!newReport.location.trim()) {
      Alert.alert('Error', 'Please provide a location');
      return;
    }
    setShowConfirmModal(true);
  };

  const confirmSubmission = () => {
    const selectedType = incidentTypes.find((t) => t.id === newReport.type);
    const newNotification = {
      id: Date.now(),
      type: newReport.type,
      title: selectedType?.label || 'Report',
      subtitle: 'YOUR REPORT',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      icon: selectedType?.icon || '📝',
      location: newReport.location,
      date: new Date().toLocaleDateString(),
      actualTime: new Date().toLocaleTimeString(),
      images: newReport.images.length > 0 ? newReport.images : [getRandomImage(newReport.type)],
      description: newReport.description,
    };

    setNotifications((prev) => [newNotification, ...prev]);

    setNewReport({ type: '', description: '', location: '', hasInjuries: null, images: [] });
    setShowConfirmModal(false);
    setShowIncidentForm(false);
    setSelectedNotification(null);

    Alert.alert('Success', 'Your report has been submitted successfully!');
  };

  const resetModals = () => {
    setSelectedNotification(null);
    setShowReportModal(false);
    setShowIncidentForm(false);
    setShowConfirmModal(false);
    setNewReport({ type: '', description: '', location: '', hasInjuries: null, images: [] });
  };

  const NotificationItem = ({ item }) => (
    <TouchableOpacity style={styles.notificationItem} onPress={() => handleNotificationPress(item)} activeOpacity={0.7}>
      <View
        style={[styles.notificationIcon, { backgroundColor: incidentTypes.find((t) => t.id === item.type)?.color + '20' || '#f0f0f0' }]}
      >
        <Text style={styles.iconText}>{item.icon}</Text>
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationSubtitle}>{item.subtitle}</Text>
      </View>
      <Text style={styles.notificationTime}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />

      {/* Main Notifications List */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity onPress={handleAddReport} style={styles.addButton}>
          <Plus size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.notificationsList} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {notifications.map((item) => (
          <NotificationItem key={item.id} item={item} />
        ))}
      </ScrollView>

      {/* Notification Detail Modal */}
      <Modal visible={!!selectedNotification} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={[styles.modalContainer, { paddingBottom: insets.bottom }]}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setSelectedNotification(null)} style={styles.backButtonContainer}>
              <ChevronLeft size={24} color="#007AFF" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Incident Details</Text>
            <View style={styles.placeholder} />
          </View>

          {selectedNotification && (
            <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false} contentContainerStyle={styles.detailScrollContent}>
              <View style={styles.detailCard}>
                <View style={styles.detailItem}>
                  <View style={styles.detailIconContainer}>
                    <Text style={styles.detailIcon}>📍</Text>
                  </View>
                  <View style={styles.detailTextContainer}>
                    <Text style={styles.detailLabel}>Location</Text>
                    <Text style={styles.detailValue}>{selectedNotification.location}</Text>
                  </View>
                </View>

                <View style={styles.detailItem}>
                  <View style={styles.detailIconContainer}>
                    <Text style={styles.detailIcon}>📅</Text>
                  </View>
                  <View style={styles.detailTextContainer}>
                    <Text style={styles.detailLabel}>Date</Text>
                    <Text style={styles.detailValue}>{selectedNotification.date}</Text>
                  </View>
                </View>

                <View style={styles.detailItem}>
                  <View style={styles.detailIconContainer}>
                    <Text style={styles.detailIcon}>🕐</Text>
                  </View>
                  <View style={styles.detailTextContainer}>
                    <Text style={styles.detailLabel}>Time</Text>
                    <Text style={styles.detailValue}>{selectedNotification.actualTime}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.photosSection}>
                <Text style={styles.sectionTitle}>Photos</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photosContainer}>
                  {selectedNotification.images.map((image, index) => (
                    <Image key={index} source={{ uri: image }} style={styles.photo} />
                  ))}
                </ScrollView>
              </View>

              <View style={styles.descriptionSection}>
                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.descriptionText}>{selectedNotification.description}</Text>
              </View>
            </ScrollView>
          )}
        </SafeAreaView>
      </Modal>

      {/* Report Type Selection Modal */}
      <Modal visible={showReportModal} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={[styles.modalContainer, { paddingBottom: insets.bottom }]}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowReportModal(false)} style={styles.backButtonContainer}>
              <ChevronLeft size={24} color="#007AFF" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Report Incident</Text>
            <View style={styles.placeholder} />
          </View>

          <ScrollView style={styles.incidentGrid} showsVerticalScrollIndicator={false} contentContainerStyle={styles.gridScrollContent}>
            <Text style={styles.gridTitle}>What do you see?</Text>
            <Text style={styles.gridSubtitle}>Select the type of incident below</Text>

            <View style={styles.grid}>
              {incidentTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  style={[styles.gridItem, { backgroundColor: type.color }]}
                  onPress={() => handleIncidentTypeSelect(type.id)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.gridIcon}>{type.icon}</Text>
                  <Text style={styles.gridLabel}>{type.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Incident Form Modal */}
      <Modal visible={showIncidentForm} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={[styles.modalContainer, { paddingBottom: insets.bottom }]}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowIncidentForm(false)} style={styles.backButtonContainer}>
              <ChevronLeft size={24} color="#007AFF" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Report Details</Text>
            <View style={styles.placeholder} />
          </View>

          <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false} contentContainerStyle={styles.formScrollContent}>
            <Text style={styles.formTitle}>Tell us what happened</Text>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Add Photos</Text>
              <TouchableOpacity style={styles.imageUpload} onPress={handleImagePick}>
                {newReport.images.length > 0 ? (
                  <View style={styles.imagePreviewContainer}>
                    <Image source={{ uri: newReport.images[0] }} style={styles.imagePreview} />
                    <View style={styles.imageCount}>
                      <Text style={styles.imageCountText}>{newReport.images.length}</Text>
                    </View>
                  </View>
                ) : (
                  <>
                    <Text style={styles.imageUploadIcon}>📷</Text>
                    <Text style={styles.imageUploadText}>Tap to add photo</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.section}>
              <View style={styles.injuryQuestion}>
                <Text style={styles.questionText}>😟 Any Injuries?</Text>
                <View style={styles.buttonGroup}>
                  <TouchableOpacity
                    style={[styles.optionButton, newReport.hasInjuries === true && styles.selectedButton]}
                    onPress={() => setNewReport((prev) => ({ ...prev, hasInjuries: true }))}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.optionText, newReport.hasInjuries === true && styles.selectedText]}>YES</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.optionButton, newReport.hasInjuries === false && styles.selectedButton]}
                    onPress={() => setNewReport((prev) => ({ ...prev, hasInjuries: false }))}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.optionText, newReport.hasInjuries === false && styles.selectedText]}>NO</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.inputLabel}>Description *</Text>
              <TextInput
                style={styles.textArea}
                multiline
                numberOfLines={4}
                placeholder="Describe what you see in detail..."
                value={newReport.description}
                onChangeText={(text) => setNewReport((prev) => ({ ...prev, description: text }))}
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.section}>
              <View style={styles.locationContainer}>
                <Text style={styles.inputLabel}>Location *</Text>
                <TouchableOpacity style={styles.locationButton} onPress={getCurrentLocation} disabled={loadingLocation}>
                  {loadingLocation ? (
                    <ActivityIndicator size="small" color="#007AFF" />
                  ) : (
                    <>
                      <Text style={styles.locationIcon}>📍</Text>
                      <Text style={styles.locationButtonText}>Use Current Location</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
              <TextInput
                style={styles.textInput}
                placeholder="Or enter location manually"
                value={newReport.location}
                onChangeText={(text) => setNewReport((prev) => ({ ...prev, location: text }))}
                placeholderTextColor="#999"
              />
            </View>

            <TouchableOpacity
              style={[styles.submitButton, (!newReport.description.trim() || !newReport.location.trim()) && styles.disabledButton]}
              onPress={handleSubmitReport}
              disabled={!newReport.description.trim() || !newReport.location.trim()}
              activeOpacity={0.8}
            >
              <Text style={styles.submitButtonText}>Submit Report</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Confirmation Modal */}
      <Modal visible={showConfirmModal} animationType="fade" transparent>
        <View style={styles.overlay}>
          <View style={styles.confirmModal}>
            <Text style={styles.confirmTitle}>Confirm Report</Text>
            <Text style={styles.confirmText}>Do you want to submit this incident report?</Text>
            <View style={styles.confirmButtons}>
              <TouchableOpacity style={styles.confirmButton} onPress={confirmSubmission} activeOpacity={0.8}>
                <Text style={styles.confirmButtonText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setShowConfirmModal(false)} activeOpacity={0.8}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationsList: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 100,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  notificationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconText: {
    fontSize: 22,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  notificationSubtitle: {
    fontSize: 14,
    color: '#6c757d',
    fontWeight: '500',
  },
  notificationTime: {
    fontSize: 13,
    color: '#adb5bd',
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16, // Updated for improved header
    paddingVertical: 12, // Updated for improved header
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA', // Updated for improved header
    backgroundColor: '#FFFFFF', // Updated for improved header
  },
  backButtonContainer: {
    width: 40, // Updated for improved header
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  placeholder: {
    width: 40, // Updated for improved header
  },
  modalContent: {
    flex: 1,
  },
  detailScrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  detailCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  detailIcon: {
    fontSize: 18,
  },
  detailTextContainer: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6c757d',
    fontWeight: '500',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: '600',
  },
  photosSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  photosContainer: {
    paddingLeft: 4,
  },
  photo: {
    width: 120,
    height: 80,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: '#f8f9fa',
  },
  descriptionSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  descriptionText: {
    fontSize: 15,
    color: '#495057',
    lineHeight: 22,
  },
  incidentGrid: {
    flex: 1,
  },
  gridScrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  gridTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 8,
  },
  gridSubtitle: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 32,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: (width - 60) / 3,
    aspectRatio: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gridIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  gridLabel: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
  },
  formScrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
  imageUpload: {
    height: 120,
    borderWidth: 2,
    borderColor: '#dee2e6',
    borderStyle: 'dashed',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  imageUploadIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  imageUploadText: {
    fontSize: 16,
    color: '#6c757d',
    fontWeight: '500',
  },
  imagePreviewContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 14,
  },
  imageCount: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageCountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  injuryQuestion: {
    alignItems: 'center',
  },
  questionText: {
    fontSize: 18,
    color: '#1a1a1a',
    marginBottom: 16,
    fontWeight: '600',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 16,
  },
  optionButton: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#dee2e6',
    backgroundColor: '#fff',
  },
  selectedButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  optionText: {
    fontSize: 15,
    color: '#6c757d',
    fontWeight: '600',
  },
  selectedText: {
    color: '#fff',
  },
  inputLabel: {
    fontSize: 16,
    color: '#1a1a1a',
    marginBottom: 8,
    fontWeight: '600',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
    color: '#1a1a1a',
    minHeight: 100,
  },
  locationContainer: {
    marginBottom: 12,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 12,
  },
  locationIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  locationButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#1a1a1a',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  disabledButton: {
    backgroundColor: '#adb5bd',
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmModal: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  confirmTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 12,
  },
  confirmText: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  confirmButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  cancelButtonText: {
    color: '#6c757d',
    fontSize: 16,
    fontWeight: '600',
  },
});