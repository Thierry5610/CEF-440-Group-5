import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ChevronLeft, Plus } from 'lucide-react-native';

// Import custom components and styles
import SafeAreaWrapper from '../../components/common/SafeAreaWrapper';
import { useLocation } from '../../hooks/useLocation';
import theme from '../../styles/theme';
import { notificationStyles } from '../../styles/components/notificationStyles';
import {
  INCIDENT_TYPES,
  getRandomImage,
  DEFAULT_NOTIFICATIONS
} from '../../utils/notificationConstants';
import ModalWrapper from '../../components/common/ModalWrapper'; // Ensure this import is correct

const Notifications = () => {
  // State management
  const [notifications, setNotifications] = useState(DEFAULT_NOTIFICATIONS);
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

  // Custom hooks
  const {
    location: currentLocation,
    loading: loadingLocation,
    getCurrentLocation,
    getAddressFromCoordinates
  } = useLocation();

  // Handle notification press
  const handleNotificationPress = (notification) => {
    setSelectedNotification(notification);
  };

  // Handle add report
  const handleAddReport = () => {
    setShowReportModal(true);
  };

  // Handle incident type selection
  const handleIncidentTypeSelect = (type) => {
    setNewReport((prev) => ({ ...prev, type }));
    setShowReportModal(false);
    setShowIncidentForm(true);
    handleGetCurrentLocation();
  };

  // Get current location for report
  const handleGetCurrentLocation = async () => {
    try {
      const location = await getCurrentLocation();
      if (location) {
        const address = await getAddressFromCoordinates(location);
        setNewReport((prev) => ({ ...prev, location: address }));
      }
    } catch (error) {
      console.error('Error getting location for report:', error);
      Alert.alert('Error', 'Could not get your current location. Please enter manually.');
    }
  };

  // Handle image picker
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

  // Handle submit report
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

  // Confirm submission
  const confirmSubmission = () => {
    const selectedType = INCIDENT_TYPES.find((t) => t.id === newReport.type);
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
    resetModals();
    Alert.alert('Success', 'Your report has been submitted successfully!');
  };

  // Reset all modals and form
  const resetModals = () => {
    setSelectedNotification(null);
    setShowReportModal(false);
    setShowIncidentForm(false);
    setShowConfirmModal(false);
    setNewReport({ type: '', description: '', location: '', hasInjuries: null, images: [] });
  };

  // Render notification item
  const NotificationItem = ({ item }) => {
    const incidentType = INCIDENT_TYPES.find((t) => t.id === item.type);
    const backgroundColor = incidentType?.color ? `${incidentType.color}20` : theme.colors.neutral[100];

    return (
      <TouchableOpacity
        style={notificationStyles.notificationItem}
        onPress={() => handleNotificationPress(item)}
        activeOpacity={0.8}
      >
        <View style={[notificationStyles.notificationIcon, { backgroundColor }]}>
          <Text style={notificationStyles.iconText}>{item.icon}</Text>
        </View>
        <View style={notificationStyles.notificationContent}>
          <Text style={notificationStyles.notificationTitle}>{item.title}</Text>
          <Text style={notificationStyles.notificationSubtitle}>{item.subtitle}</Text>
        </View>
        <Text style={notificationStyles.notificationTime}>{item.time}</Text>
      </TouchableOpacity>
    );
  };

  // Render incident type grid item
  const IncidentTypeItem = ({ item }) => (
    <TouchableOpacity
      style={[notificationStyles.gridItem, { backgroundColor: item.color }]}
      onPress={() => handleIncidentTypeSelect(item.id)}
      activeOpacity={0.8}
    >
      <Text style={notificationStyles.gridIcon}>{item.icon}</Text>
      <Text style={notificationStyles.gridLabel}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaWrapper
      style={notificationStyles.container}
      statusBarStyle="dark-content"
      backgroundColor={theme.colors.white}
      edges={['top']} // Only top edge to avoid spacing issues
    >
      {/* Header */}
      <View style={notificationStyles.header}>
        <Text style={notificationStyles.headerTitle}>Notifications</Text>
        <TouchableOpacity onPress={handleAddReport} style={notificationStyles.addButton}>
          <Plus size={24} color={theme.colors.primary[500]} />
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <ScrollView
        style={notificationStyles.notificationsList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={notificationStyles.scrollContent}
      >
        {notifications.map((item) => (
          <NotificationItem key={item.id} item={item} />
        ))}
      </ScrollView>

      {/* Notification Detail Modal */}
      <Modal
        visible={!!selectedNotification}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setSelectedNotification(null)}
      >
        <ModalWrapper // Replaced SafeAreaWrapper with ModalWrapper
          style={notificationStyles.modalContainer}
          edges={['top']} // Only top edge
        >
          <View style={notificationStyles.modalHeader}>
            <TouchableOpacity
              onPress={() => setSelectedNotification(null)}
              style={notificationStyles.backButtonContainer}
            >
              <ChevronLeft size={24} color={theme.colors.primary[500]} />
            </TouchableOpacity>
            <Text style={notificationStyles.modalTitle}>Incident Details</Text>
            <View style={notificationStyles.placeholder} />
          </View>

          {selectedNotification && (
            <ScrollView
              style={notificationStyles.modalContent}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={notificationStyles.detailScrollContent}
            >
              <View style={notificationStyles.detailCard}>
                <View style={notificationStyles.detailItem}>
                  <View style={notificationStyles.detailIconContainer}>
                    <Text style={notificationStyles.detailIcon}>📍</Text>
                  </View>
                  <View style={notificationStyles.detailTextContainer}>
                    <Text style={notificationStyles.detailLabel}>Location</Text>
                    <Text style={notificationStyles.detailValue}>{selectedNotification.location}</Text>
                  </View>
                </View>

                <View style={notificationStyles.detailItem}>
                  <View style={notificationStyles.detailIconContainer}>
                    <Text style={notificationStyles.detailIcon}>📅</Text>
                  </View>
                  <View style={notificationStyles.detailTextContainer}>
                    <Text style={notificationStyles.detailLabel}>Date</Text>
                    <Text style={notificationStyles.detailValue}>{selectedNotification.date}</Text>
                  </View>
                </View>

                <View style={notificationStyles.detailItem}>
                  <View style={notificationStyles.detailIconContainer}>
                    <Text style={notificationStyles.detailIcon}>🕐</Text>
                  </View>
                  <View style={notificationStyles.detailTextContainer}>
                    <Text style={notificationStyles.detailLabel}>Time</Text>
                    <Text style={notificationStyles.detailValue}>{selectedNotification.actualTime}</Text>
                  </View>
                </View>
              </View>

              <View style={notificationStyles.photosSection}>
                <Text style={notificationStyles.sectionTitle}>Photos</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={notificationStyles.photosContainer}
                >
                  {selectedNotification.images.map((image, index) => (
                    <Image key={index} source={{ uri: image }} style={notificationStyles.photo} />
                  ))}
                </ScrollView>
              </View>

              <View style={notificationStyles.descriptionSection}>
                <Text style={notificationStyles.sectionTitle}>Description</Text>
                <Text style={notificationStyles.descriptionText}>{selectedNotification.description}</Text>
              </View>
            </ScrollView>
          )}
        </ModalWrapper>
      </Modal>

      {/* Report Type Selection Modal */}
      <Modal
        visible={showReportModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowReportModal(false)}
      >
        <ModalWrapper // Replaced SafeAreaWrapper with ModalWrapper
          style={notificationStyles.modalContainer}
          edges={['top']}
        >
          <View style={notificationStyles.modalHeader}>
            <TouchableOpacity
              onPress={() => setShowReportModal(false)}
              style={notificationStyles.backButtonContainer}
            >
              <ChevronLeft size={24} color={theme.colors.primary[500]} />
            </TouchableOpacity>
            <Text style={notificationStyles.modalTitle}>Report Incident</Text>
            <View style={notificationStyles.placeholder} />
          </View>

          <ScrollView
            style={notificationStyles.incidentGrid}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={notificationStyles.gridScrollContent}
          >
            <Text style={notificationStyles.gridTitle}>What do you see?</Text>
            <Text style={notificationStyles.gridSubtitle}>Select the type of incident below</Text>

            <View style={notificationStyles.grid}>
              {INCIDENT_TYPES.map((type) => (
                <IncidentTypeItem key={type.id} item={type} />
              ))}
            </View>
          </ScrollView>
        </ModalWrapper>
      </Modal>

      {/* Incident Form Modal */}
      <Modal
        visible={showIncidentForm}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowIncidentForm(false)}
      >
        <ModalWrapper style={notificationStyles.modalContainer}> {/* Changed `styles.modalContainer` to `notificationStyles.modalContainer` for consistency */}
          <View style={notificationStyles.modalHeader}>
            <TouchableOpacity
              onPress={() => setShowIncidentForm(false)}
              style={notificationStyles.backButtonContainer}
            >
              <ChevronLeft size={24} color={theme.colors.primary[500]} />
            </TouchableOpacity>
            <Text style={notificationStyles.modalTitle}>Report Details</Text>
            <View style={notificationStyles.placeholder} />
          </View>

          <ScrollView
            style={notificationStyles.formContainer}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={notificationStyles.formScrollContent}
          >
            <Text style={notificationStyles.formTitle}>Tell us what happened</Text>

            <View style={notificationStyles.section}>
              <Text style={notificationStyles.sectionTitle}>Add Photos</Text>
              <TouchableOpacity style={notificationStyles.imageUpload} onPress={handleImagePick}>
                {newReport.images.length > 0 ? (
                  <View style={notificationStyles.imagePreviewContainer}>
                    <Image
                      source={{ uri: newReport.images[0] }}
                      style={notificationStyles.imagePreview}
                    />
                    <View style={notificationStyles.imageCount}>
                      <Text style={notificationStyles.imageCountText}>{newReport.images.length}</Text>
                    </View>
                  </View>
                ) : (
                  <>
                    <Text style={notificationStyles.imageUploadIcon}>📷</Text>
                    <Text style={notificationStyles.imageUploadText}>Tap to add photo</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

            <View style={notificationStyles.section}>
              <View style={notificationStyles.injuryQuestion}>
                <Text style={notificationStyles.questionText}>😟 Any Injuries?</Text>
                <View style={notificationStyles.buttonGroup}>
                  <TouchableOpacity
                    style={[
                      notificationStyles.optionButton,
                      newReport.hasInjuries === true && notificationStyles.selectedButton
                    ]}
                    onPress={() => setNewReport((prev) => ({ ...prev, hasInjuries: true }))}
                    activeOpacity={0.8}
                  >
                    <Text style={[
                      notificationStyles.optionText,
                      newReport.hasInjuries === true && notificationStyles.selectedText
                    ]}>
                      YES
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      notificationStyles.optionButton,
                      newReport.hasInjuries === false && notificationStyles.selectedButton
                    ]}
                    onPress={() => setNewReport((prev) => ({ ...prev, hasInjuries: false }))}
                    activeOpacity={0.8}
                  >
                    <Text style={[
                      notificationStyles.optionText,
                      newReport.hasInjuries === false && notificationStyles.selectedText
                    ]}>
                      NO
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={notificationStyles.section}>
              <Text style={notificationStyles.inputLabel}>Description *</Text>
              <TextInput
                style={notificationStyles.textArea}
                multiline
                numberOfLines={4}
                placeholder="Describe what you see in detail..."
                value={newReport.description}
                onChangeText={(text) => setNewReport((prev) => ({ ...prev, description: text }))}
                placeholderTextColor={theme.colors.neutral[500]}
              />
            </View>

            <View style={notificationStyles.section}>
              <View style={notificationStyles.locationContainer}>
                <Text style={notificationStyles.inputLabel}>Location *</Text>
                <TouchableOpacity
                  style={notificationStyles.locationButton}
                  onPress={handleGetCurrentLocation}
                  disabled={loadingLocation}
                >
                  {loadingLocation ? (
                    <ActivityIndicator size="small" color={theme.colors.white} />
                  ) : (
                    <>
                      <Text style={notificationStyles.locationIcon}>📍</Text>
                      <Text style={notificationStyles.locationButtonText}>Use Current Location</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
              <TextInput
                style={notificationStyles.textInput}
                placeholder="Or enter location manually"
                value={newReport.location}
                onChangeText={(text) => setNewReport((prev) => ({ ...prev, location: text }))}
                placeholderTextColor={theme.colors.neutral[500]}
              />
            </View>

            <TouchableOpacity
              style={[
                notificationStyles.submitButton,
                (!newReport.description.trim() || !newReport.location.trim()) &&
                notificationStyles.disabledButton
              ]}
              onPress={handleSubmitReport}
              disabled={!newReport.description.trim() || !newReport.location.trim()}
              activeOpacity={0.8}
            >
              <Text style={notificationStyles.submitButtonText}>Submit Report</Text>
            </TouchableOpacity>
          </ScrollView>
        </ModalWrapper>
      </Modal>

      {/* Confirmation Modal */}
      <Modal visible={showConfirmModal} animationType="fade" transparent>
        <View style={notificationStyles.overlay}>
          <View style={notificationStyles.confirmModal}>
            <Text style={notificationStyles.confirmTitle}>Confirm Report</Text>
            <Text style={notificationStyles.confirmText}>
              Do you want to submit this incident report?
            </Text>
            <View style={notificationStyles.confirmButtons}>
              <TouchableOpacity
                style={notificationStyles.confirmButton}
                onPress={confirmSubmission}
                activeOpacity={0.8}
              >
                <Text style={notificationStyles.confirmButtonText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={notificationStyles.cancelButton}
                onPress={() => setShowConfirmModal(false)}
                activeOpacity={0.8}
              >
                <Text style={notificationStyles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaWrapper>
  );
};

export default Notifications;