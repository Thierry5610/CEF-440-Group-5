import React, { useState } from 'react';
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
  SafeAreaView,
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

// Import custom components and styles
import ModalWrapper from '../../components/common/ModalWrapper';
import Switch from '../../components/common/Switch';
import theme from '../../styles/theme';
import { profileStyles } from '../../styles/components/profileStyles';
import {
  DEFAULT_PROFILE_DATA,
  DEFAULT_NOTIFICATIONS,
  EMERGENCY_CONTACTS,
  NOTIFICATION_SETTINGS,
  MENU_ITEMS,
  validateProfile,
} from '../../utils/profileConstants';

const Profile = ({ navigation }) => {
  // State management
  const [activeModal, setActiveModal] = useState(null);
  const [profileData, setProfileData] = useState(DEFAULT_PROFILE_DATA);
  const [notifications, setNotifications] = useState(DEFAULT_NOTIFICATIONS);

  // Modal handlers
  const openModal = (modalName) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  // Profile update handler
  const updateProfile = () => {
    const validation = validateProfile(profileData);
    
    if (!validation.isValid) {
      const firstError = Object.values(validation.errors)[0];
      Alert.alert('Error', firstError);
      return;
    }

    setProfileData((prev) => ({
      ...prev,
      name: prev.username,
    }));

    Alert.alert('Success', 'Profile updated successfully');
    closeModal();
  };

  // Notification update handler
  const updateNotifications = () => {
    Alert.alert('Success', 'Notification settings updated');
    closeModal();
  };

  // Toggle notification setting
  const toggleNotification = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
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
          onPress: () => {
            // Navigate back to the auth stack
            if (navigation) {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Carousel' }],
              });
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
      <Switch
        value={notifications[setting.key]}
        onValueChange={() => toggleNotification(setting.key)}
        trackColor={{ false: '#E5E5EA', true: '#4A90E2' }}
        thumbColor="#FFFFFF"
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

  return (
    <SafeAreaView style={profileStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />

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
            <Text style={profileStyles.profileName}>{profileData.name}</Text>
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
            <TouchableOpacity onPress={closeModal}>
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
              style={profileStyles.textInput}
              value={profileData.email}
              onChangeText={(text) => setProfileData((prev) => ({ ...prev, email: text }))}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#C4C4C4"
            />

            <Text style={profileStyles.inputLabel}>Username</Text>
            <TextInput
              style={profileStyles.textInput}
              value={profileData.username}
              onChangeText={(text) => setProfileData((prev) => ({ ...prev, username: text }))}
              placeholder="Enter your username"
              placeholderTextColor="#C4C4C4"
            />

            <Text style={profileStyles.inputLabel}>Password</Text>
            <TextInput
              style={profileStyles.textInput}
              value={profileData.password}
              onChangeText={(text) => setProfileData((prev) => ({ ...prev, password: text }))}
              placeholder="Choose password (min 6 characters)"
              secureTextEntry
              placeholderTextColor="#C4C4C4"
            />

            <TouchableOpacity style={profileStyles.updateButton} onPress={updateProfile}>
              <Text style={profileStyles.updateButtonText}>Update</Text>
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
    </SafeAreaView>
  );
};

export default Profile;