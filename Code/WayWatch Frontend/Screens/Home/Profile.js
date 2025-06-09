import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  Switch,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Alert,
  Linking,
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
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Profile() {
  const [activeModal, setActiveModal] = useState(null);
  const [profileData, setProfileData] = useState({
    name: 'Tifuh Percilia',
    email: 'DotsyTifuh@gmail.com',
    username: 'Tifuh Percilia',
    password: '',
  });

  const [notifications, setNotifications] = useState({
    trafficReport: true,
    accidentReport: true,
    potHoleReport: true,
    checkpointReport: true,
    weatherReport: true,
    voiceAlert: true,
    popUp: true,
  });

  const [emergencyContacts] = useState([
    { name: 'Police', number: '191', type: 'police' },
    { name: 'Fire', number: '193', type: 'fire' },
    { name: 'Medical Assistance', number: '113', type: 'medical' },
    { name: 'Ambulance', number: '672387905', type: 'ambulance' }, // Normalized number for tel: URI
  ]);

  const insets = useSafeAreaInsets();

  const openModal = (modalName) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const updateProfile = () => {
    if (!profileData.username.trim()) {
      Alert.alert('Error', 'Username cannot be empty');
      return;
    }

    if (!profileData.password || profileData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    setProfileData((prev) => ({
      ...prev,
      name: prev.username,
    }));

    Alert.alert('Success', 'Profile updated successfully');
    closeModal();
  };

  const updateNotifications = () => {
    Alert.alert('Success', 'Notification settings updated');
    closeModal();
  };

  const toggleNotification = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

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

  const MenuItem = ({ icon: Icon, title, onPress, showChevron = true }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <View style={styles.iconContainer}>
          <Icon size={20} color="#4A90E2" />
        </View>
        <Text style={styles.menuItemText}>{title}</Text>
      </View>
      {showChevron && <ChevronRight size={20} color="#C7C7CC" />}
    </TouchableOpacity>
  );

  const NotificationItem = ({ title, value, onToggle }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.notificationText}>{title}</Text>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: '#E5E5EA', true: '#4A90E2' }}
        thumbColor="#FFFFFF"
      />
    </View>
  );

  const EmergencyContactItem = ({ name, number, type }) => (
    <View style={styles.emergencyItem}>
      <View style={styles.emergencyLeft}>
        <Text style={styles.emergencyName}>{name}</Text>
        <Text style={styles.emergencyNumber}>({number})</Text>
      </View>
      <TouchableOpacity style={styles.callButton} onPress={() => handleCall(number)}>
        <Phone size={18} color="#4A90E2" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Profile</Text>

        <TouchableOpacity style={styles.profileHeader} onPress={() => openModal('edit')}>
          <View style={styles.avatar}>
            <User size={40} color="#FFFFFF" />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{profileData.name}</Text>
            <Text style={styles.profileEmail}>{profileData.email}</Text>
          </View>
          <ChevronRight size={20} color="#C7C7CC" />
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings and Preferences</Text>

          <MenuItem
            icon={User}
            title="Customize Notifications"
            onPress={() => openModal('notifications')}
          />

          <MenuItem
            icon={Bell}
            title="Select Language"
            onPress={() => Alert.alert('Language', 'Language selection coming soon')}
          />

          <MenuItem
            icon={Phone}
            title="Emergency Contact"
            onPress={() => openModal('emergency')}
          />
        </View>

        <View style={styles.section}>
          <MenuItem
            icon={HelpCircle}
            title="Help centre"
            onPress={() => Alert.alert('Help', 'Help center coming soon')}
          />

          <MenuItem
            icon={Bug}
            title="Report a bug"
            onPress={() => Alert.alert('Bug Report', 'Bug reporting coming soon')}
          />
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <LogOut size={20} color="#FF3B30" />
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={activeModal === 'edit'} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={[styles.modalContainer, { paddingBottom: insets.bottom }]}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={closeModal}>
              <ChevronLeft size={24} color="#4A90E2" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Profile</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.editAvatarContainer}>
              <View style={styles.editAvatar}>
                <User size={50} color="#FFFFFF" />
              </View>
              <Text style={styles.editAvatarText}>{profileData.username}</Text>
              <TouchableOpacity style={styles.editAvatarButton}>
                <Edit3 size={16} color="#4A90E2" />
                <Text style={styles.editAvatarButtonText}>Edit Username</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.textInput}
              value={profileData.email}
              onChangeText={(text) => setProfileData((prev) => ({ ...prev, email: text }))}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.inputLabel}>Username</Text>
            <TextInput
              style={styles.textInput}
              value={profileData.username}
              onChangeText={(text) => setProfileData((prev) => ({ ...prev, username: text }))}
              placeholder="Enter your username"
            />

            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={styles.textInput}
              value={profileData.password}
              onChangeText={(text) => setProfileData((prev) => ({ ...prev, password: text }))}
              placeholder="Choose password (min 6 characters)"
              secureTextEntry
            />

            <TouchableOpacity style={styles.updateButton} onPress={updateProfile}>
              <Text style={styles.updateButtonText}>Update</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      <Modal
        visible={activeModal === 'notifications'}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={[styles.modalContainer, { paddingBottom: insets.bottom }]}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={closeModal}>
              <ChevronLeft size={24} color="#4A90E2" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Customize Notification</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView style={styles.modalContent}>
            <Text style={styles.notificationSectionTitle}>General Notifications</Text>

            <NotificationItem
              title="Traffic Report"
              value={notifications.trafficReport}
              onToggle={() => toggleNotification('trafficReport')}
            />

            <NotificationItem
              title="Accident Report"
              value={notifications.accidentReport}
              onToggle={() => toggleNotification('accidentReport')}
            />

            <NotificationItem
              title="Pot-hole Report"
              value={notifications.potHoleReport}
              onToggle={() => toggleNotification('potHoleReport')}
            />

            <NotificationItem
              title="Checkpoint Report"
              value={notifications.checkpointReport}
              onToggle={() => toggleNotification('checkpointReport')}
            />

            <NotificationItem
              title="Weather Report"
              value={notifications.weatherReport}
              onToggle={() => toggleNotification('weatherReport')}
            />

            <Text style={styles.notificationSectionTitle}>Sound & Pop-up</Text>

            <NotificationItem
              title="Voice Alert"
              value={notifications.voiceAlert}
              onToggle={() => toggleNotification('voiceAlert')}
            />

            <NotificationItem
              title="Pop-up"
              value={notifications.popUp}
              onToggle={() => toggleNotification('popUp')}
            />

            <TouchableOpacity style={styles.updateButton} onPress={updateNotifications}>
              <Text style={styles.updateButtonText}>Update</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      <Modal
        visible={activeModal === 'emergency'}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={[styles.modalContainer, { paddingBottom: insets.bottom }]}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={closeModal}>
              <ChevronLeft size={24} color="#4A90E2" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Emergency Contacts</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView style={styles.modalContent}>
            <Text style={styles.emergencySubtitle}>SHORTCUTS TO HELP</Text>

            {emergencyContacts.map((contact, index) => (
              <EmergencyContactItem
                key={index}
                name={contact.name}
                number={contact.number}
                type={contact.type}
              />
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#C7C7CC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#8E8E93',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    padding: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '400',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  logoutText: {
    fontSize: 16,
    color: '#FF3B30',
    fontWeight: '500',
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa', // Changed from #F2F2F7
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16, // Added for spacing under header
  },
  editAvatarContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    marginBottom: 12,
  },
  editAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#C7C7CC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  editAvatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  editAvatarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#E3F2FD',
    borderRadius: 16,
  },
  editAvatarButtonText: {
    fontSize: 14,
    color: '#4A90E2',
    marginLeft: 4,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 8,
    marginTop: 16,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  updateButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 9999,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 20,
  },
  updateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  notificationSectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8E8E93',
    marginBottom: 16,
    marginTop: 8,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  notificationText: {
    fontSize: 16,
    color: '#000000',
  },
  emergencySubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8E8E93',
    marginBottom: 16,
    textAlign: 'center',
  },
  emergencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  emergencyLeft: {
    flex: 1,
  },
  emergencyName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 2,
  },
  emergencyNumber: {
    fontSize: 14,
    color: '#8E8E93',
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
});