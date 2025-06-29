import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  Alert,
  Linking,
  StatusBar,
  ActivityIndicator,
  Switch as RNSwitch,
} from 'react-native';
import {
  ChevronRight,
  ChevronLeft,
  User,
  Bell,
  Phone,
  HelpCircle,
  Bug,
  LogOut,
  Edit3,
  Globe,
} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import custom components and styles
import ModalWrapper from '../../components/common/ModalWrapper';
import SafeAreaWrapper from '../../components/common/SafeAreaWrapper';
import theme from '../../styles/theme';
import { profileStyles } from '../../styles/components/profileStyles';
import {
  DEFAULT_NOTIFICATIONS,
  EMERGENCY_CONTACTS,
  NOTIFICATION_SETTINGS,
  MENU_ITEMS,
  validateProfile,
} from '../../utils/profileConstants';

const API_BASE_URL = 'https://backend-qcus.onrender.com/api/v1';

const Profile = ({ navigation }) => {
  // State management
  const [activeModal, setActiveModal] = useState(null);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
  });
  const [originalProfileData, setOriginalProfileData] = useState({});
  const [notifications, setNotifications] = useState(DEFAULT_NOTIFICATIONS);
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);

  // Load notification settings from AsyncStorage
  const loadNotificationSettings = async () => {
    try {
      const savedSettings = await AsyncStorage.getItem('notificationSettings');
      if (savedSettings) {
        setNotifications(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error('Error loading notification settings:', error);
    }
  };

  // Save notification settings to AsyncStorage
  const saveNotificationSettings = async (updatedSettings) => {
    try {
      await AsyncStorage.setItem('notificationSettings', JSON.stringify(updatedSettings));
    } catch (error) {
      console.error('Error saving notification settings:', error);
    }
  };

  // Load user profile on component mount
  useEffect(() => {
    loadUserProfile();
    loadNotificationSettings();
  }, []);

  // Load user profile from AsyncStorage or API
  const loadUserProfile = async () => {
    try {
      setProfileLoading(true);
      
      // Try to get user data from AsyncStorage first
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const parsedData = JSON.parse(userData);
        const userProfile = {
          name: parsedData.username || parsedData.name || '',
          email: parsedData.email || '',
          username: parsedData.username || '',
          password: '',
        };
        setProfileData(userProfile);
        setOriginalProfileData(userProfile);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      Alert.alert('Error', 'Failed to load user profile');
    } finally {
      setProfileLoading(false);
    }
  };

  // Get JWT token from AsyncStorage
  const getAuthToken = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      return token;
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  };

  // Update user profile via API
  const updateUserProfile = async (updatedData) => {
    try {
      const token = await getAuthToken();
      if (!token) {
        Alert.alert('Error', 'Authentication token not found. Please login again.');
        return false;
      }

      console.log('Updating profile with:', { username: updatedData.username });
      console.log('API URL:', `${API_BASE_URL}/auth/profile`);

      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: updatedData.username,
        }),
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        // Update AsyncStorage with new user data
        const currentUserData = await AsyncStorage.getItem('userData');
        if (currentUserData) {
          const parsedUserData = JSON.parse(currentUserData);
          const updatedUserData = {
            ...parsedUserData,
            username: updatedData.username,
            name: updatedData.username,
          };
          await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
          console.log('Updated user data stored:', updatedUserData);
        }
        
        return true;
      } else {
        throw new Error(data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  // Modal handlers
  const openModal = (modalName) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
    // Reset profile data to original values if modal is closed without saving
    if (activeModal === 'edit') {
      setProfileData(originalProfileData);
    }
  };

  // Profile update handler
  const updateProfile = async () => {
    const validation = validateProfile(profileData);
    
    if (!validation.isValid) {
      const firstError = Object.values(validation.errors)[0];
      Alert.alert('Error', firstError);
      return;
    }

    // Check if anything actually changed
    if (profileData.username === originalProfileData.username) {
      Alert.alert('Info', 'No changes to save');
      return;
    }

    setLoading(true);

    try {
      await updateUserProfile(profileData);
      
      // Update the original data to reflect the changes
      setOriginalProfileData({
        ...profileData,
        name: profileData.username,
      });
      
      setProfileData(prev => ({
        ...prev,
        name: prev.username,
      }));

      Alert.alert('Success', 'Profile updated successfully');
      closeModal();
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  // Notification update handler
  const updateNotifications = async () => {
    try {
      await saveNotificationSettings(notifications);
      Alert.alert('Success', 'Notification settings updated');
      closeModal();
    } catch (error) {
      Alert.alert('Error', 'Failed to save notification settings');
    }
  };

  // Toggle notification setting
  const toggleNotification = (key) => {
    setNotifications((prev) => {
      const updated = {
        ...prev,
        [key]: !prev[key],
      };
      // Save immediately when toggled
      saveNotificationSettings(updated);
      return updated;
    });
  };

  // Handle phone call
  const handleCall = async (number) => {
    const phoneNumber = `tel:${number}`;
    try {
      const supported = await Linking.canOpenURL(phoneNumber);
      if (supported) {
        await Linking.openURL(phoneNumber);
      } else {
        Alert.alert('Error', 'Unable to make a call on this device');
      }
    } catch (error) {
      console.error('Error initiating call:', error);
      Alert.alert('Error', 'Failed to open phone dialer');
    }
  };

  // Handle logout
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              // Clear all stored data
              await AsyncStorage.multiRemove(['authToken', 'userData']);
              
              // Navigate back to the auth stack
              if (navigation) {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Carousel' }],
                });
              }
            } catch (error) {
              console.error('Error during logout:', error);
              Alert.alert('Error', 'Failed to logout properly');
            }
          },
        },
      ]
    );
  };

  // Handle menu item press
  const handleMenuItemPress = (item) => {
    switch (item.action) {
      case 'modal':
        openModal(item.id);
        break;
      case 'alert':
        Alert.alert(item.title, `${item.title} coming soon`);
        break;
      default:
        console.log(`Pressed ${item.title}`);
    }
  };

  // Get icon component by name
  const getIconComponent = (iconName) => {
    const icons = {
      Bell,
      Globe,
      Phone,
      HelpCircle,
      Bug,
    };
    return icons[iconName] || Bell;
  };

  // Menu Item Component
  const MenuItem = ({ item, showChevron = true }) => {
    const IconComponent = getIconComponent(item.icon);
    
    return (
      <TouchableOpacity 
        style={profileStyles.menuItem} 
        onPress={() => handleMenuItemPress(item)}
        activeOpacity={0.8}
      >
        <View style={profileStyles.menuItemLeft}>
          <View style={profileStyles.iconContainer}>
            <IconComponent size={20} color="#4A90E2" />
          </View>
          <Text style={profileStyles.menuItemText}>{item.title}</Text>
        </View>
        {showChevron && <ChevronRight size={20} color="#C7C7CC" />}
      </TouchableOpacity>
    );
  };

  // Notification Item Component
  const NotificationItem = ({ setting }) => (
    <View style={profileStyles.notificationItem}>
      <Text style={profileStyles.notificationText}>{setting.title}</Text>
      <RNSwitch
        value={notifications[setting.key]}
        onValueChange={() => toggleNotification(setting.key)}
        trackColor={{ false: '#E5E5EA', true: '#4A90E2' }}
        thumbColor="#FFFFFF"
        ios_backgroundColor="#E5E5EA"
      />
    </View>
  );

  // Emergency Contact Item Component
  const EmergencyContactItem = ({ contact }) => (
    <View style={profileStyles.emergencyItem}>
      <View style={profileStyles.emergencyLeft}>
        <Text style={profileStyles.emergencyName}>{contact.name}</Text>
        <Text style={profileStyles.emergencyNumber}>({contact.number})</Text>
      </View>
      <TouchableOpacity 
        style={profileStyles.callButton} 
        onPress={() => handleCall(contact.number)}
        activeOpacity={0.8}
      >
        <Phone size={18} color="#4A90E2" />
      </TouchableOpacity>
    </View>
  );

  // Group settings by category
  const generalSettings = NOTIFICATION_SETTINGS.filter(s => s.category === 'general');
  const soundSettings = NOTIFICATION_SETTINGS.filter(s => s.category === 'sound');

  // Show loading screen while profile is being loaded
  if (profileLoading) {
    return (
      <SafeAreaWrapper
        style={[profileStyles.container, { justifyContent: 'center', alignItems: 'center' }]}
        statusBarStyle="dark-content"
        backgroundColor={theme.colors.white}
        edges={['top']}
      >
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={{ marginTop: 16, color: '#666' }}>Loading profile...</Text>
      </SafeAreaWrapper>
    );
  }

  return (
    <SafeAreaWrapper
      style={profileStyles.container}
      statusBarStyle="dark-content"
      backgroundColor={theme.colors.white}
      edges={['top']}
    >
      <ScrollView style={profileStyles.content}>
        <Text style={profileStyles.title}>Profile</Text>

        {/* Profile Header */}
        <TouchableOpacity 
          style={profileStyles.profileHeader} 
          onPress={() => openModal('edit')}
          activeOpacity={0.8}
        >
          <View style={profileStyles.avatar}>
            <User size={40} color="#FFFFFF" />
          </View>
          <View style={profileStyles.profileInfo}>
            <Text style={profileStyles.profileName}>{profileData.name || profileData.username}</Text>
            <Text style={profileStyles.profileEmail}>{profileData.email}</Text>
          </View>
          <ChevronRight size={20} color="#C7C7CC" />
        </TouchableOpacity>

        {/* Settings Section */}
        <View style={profileStyles.section}>
          <Text style={profileStyles.sectionTitle}>Settings and Preferences</Text>
          {MENU_ITEMS.slice(0, 3).map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </View>

        <View style={profileStyles.section}>
          {MENU_ITEMS.slice(3).map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={profileStyles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
          <LogOut size={20} color="#FF3B30" />
          <Text style={profileStyles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal 
        visible={activeModal === 'edit'} 
        animationType="slide" 
        presentationStyle="pageSheet"
        onRequestClose={closeModal}
      >
        <ModalWrapper style={profileStyles.modalContainer}>
          <View style={profileStyles.modalHeader}>
            <TouchableOpacity onPress={closeModal} disabled={loading}>
              <ChevronLeft size={24} color="#4A90E2" />
            </TouchableOpacity>
            <Text style={profileStyles.modalTitle}>Profile</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView style={profileStyles.modalContent}>
            <View style={profileStyles.editAvatarContainer}>
              <View style={profileStyles.editAvatar}>
                <User size={50} color="#FFFFFF" />
              </View>
              <Text style={profileStyles.editAvatarText}>{profileData.username}</Text>
              <TouchableOpacity style={profileStyles.editAvatarButton}>
                <Edit3 size={16} color="#4A90E2" />
                <Text style={profileStyles.editAvatarButtonText}>Edit Username</Text>
              </TouchableOpacity>
            </View>

            <Text style={profileStyles.inputLabel}>Email</Text>
            <TextInput
              style={[profileStyles.textInput, { opacity: 0.6 }]}
              value={profileData.email}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#C4C4C4"
              editable={false}
            />
            <Text style={{ fontSize: 12, color: '#999', marginTop: 4, marginBottom: 16 }}>
              Email cannot be changed
            </Text>

            <Text style={profileStyles.inputLabel}>Username</Text>
            <TextInput
              style={profileStyles.textInput}
              value={profileData.username}
              onChangeText={(text) => setProfileData((prev) => ({ ...prev, username: text }))}
              placeholder="Enter your username"
              placeholderTextColor="#C4C4C4"
              editable={!loading}
            />

            <TouchableOpacity 
              style={[
                profileStyles.updateButton,
                loading && { opacity: 0.6 }
              ]} 
              onPress={updateProfile}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={profileStyles.updateButtonText}>Update</Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </ModalWrapper>
      </Modal>

      {/* Notifications Modal */}
      <Modal
        visible={activeModal === 'notifications'}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={closeModal}
      >
        <ModalWrapper style={profileStyles.modalContainer}>
          <View style={profileStyles.modalHeader}>
            <TouchableOpacity onPress={closeModal}>
              <ChevronLeft size={24} color="#4A90E2" />
            </TouchableOpacity>
            <Text style={profileStyles.modalTitle}>Customize Notification</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView style={profileStyles.modalContent}>
            <Text style={profileStyles.notificationSectionTitle}>General Notifications</Text>
            {generalSettings.map((setting) => (
              <NotificationItem key={setting.key} setting={setting} />
            ))}

            <Text style={profileStyles.notificationSectionTitle}>Sound & Pop-up</Text>
            {soundSettings.map((setting) => (
              <NotificationItem key={setting.key} setting={setting} />
            ))}

            <TouchableOpacity style={profileStyles.updateButton} onPress={updateNotifications}>
              <Text style={profileStyles.updateButtonText}>Update</Text>
            </TouchableOpacity>
          </ScrollView>
        </ModalWrapper>
      </Modal>

      {/* Emergency Contacts Modal */}
      <Modal
        visible={activeModal === 'emergency'}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={closeModal}
      >
        <ModalWrapper style={profileStyles.modalContainer}>
          <View style={profileStyles.modalHeader}>
            <TouchableOpacity onPress={closeModal}>
              <ChevronLeft size={24} color="#4A90E2" />
            </TouchableOpacity>
            <Text style={profileStyles.modalTitle}>Emergency Contacts</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView style={profileStyles.modalContent}>
            <Text style={profileStyles.emergencySubtitle}>SHORTCUTS TO HELP</Text>
            {EMERGENCY_CONTACTS.map((contact, index) => (
              <EmergencyContactItem key={index} contact={contact} />
            ))}
          </ScrollView>
        </ModalWrapper>
      </Modal>
    </SafeAreaWrapper>
  );
};

export default Profile;