import { StyleSheet } from 'react-native';

export const profileStyles = StyleSheet.create({
  // Main container - EXACTLY like original
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa', // Exact original background
  },

  content: {
    flex: 1,
    paddingHorizontal: 16, // Exact original padding
  },

  // Title - EXACTLY like original  
  title: {
    fontSize: 28, // Exact original size
    fontWeight: 'bold',
    color: '#000000', // Exact black
    paddingVertical: 20, // Exact original spacing
    paddingHorizontal: 16, // Exact original spacing
  },

  // Profile Header - EXACTLY like original
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Pure white like original
    padding: 16, // Exact original padding
    borderRadius: 12, // Exact original radius
    marginBottom: 30, // Exact original spacing
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },

  avatar: {
    width: 60, // Exact original size
    height: 60,
    borderRadius: 30,
    backgroundColor: '#C7C7CC', // Exact original gray
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16, // Exact original spacing
  },

  profileInfo: {
    flex: 1,
  },

  profileName: {
    fontSize: 18, // Exact original size
    fontWeight: '600',
    color: '#000000', // Pure black
    marginBottom: 4, // Exact original spacing
  },

  profileEmail: {
    fontSize: 14, // Exact original size
    color: '#8E8E93', // Exact original gray
  },

  // Sections - EXACTLY like original
  section: {
    backgroundColor: '#FFFFFF', // Pure white
    borderRadius: 12, // Exact original radius
    marginBottom: 20, // Exact original spacing
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 16, // Exact original size
    fontWeight: '600',
    color: '#000000', // Pure black
    padding: 16, // Exact original padding
    paddingBottom: 8, // Exact original bottom padding
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA', // Exact original border color
  },

  // Menu Items - EXACTLY like original
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16, // Exact original padding
    paddingVertical: 12, // Exact original padding
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA', // Exact original border
  },

  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  iconContainer: {
    width: 32, // Exact original size
    height: 32,
    borderRadius: 8, // Exact original radius
    backgroundColor: '#E3F2FD', // Exact original light blue
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12, // Exact original spacing
  },

  menuItemText: {
    fontSize: 16, // Exact original size
    color: '#000000', // Pure black
    fontWeight: '400', // Exact original weight
  },

  // Logout Button - EXACTLY like original
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF', // Pure white
    padding: 16, // Exact original padding
    borderRadius: 12, // Exact original radius
    marginBottom: 30, // Exact original spacing
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },

  logoutText: {
    fontSize: 16, // Exact original size
    color: '#FF3B30', // Exact original red
    fontWeight: '500', // Exact original weight
    marginLeft: 8, // Exact original spacing
  },

  // Modal Styles - NO EXTRA TOP SPACE
  modalContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa', // Exact original background
  },

  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16, // Exact original padding
    paddingVertical: 12, // Exact original padding - NO EXTRA SPACE
    backgroundColor: '#FFFFFF', // Pure white
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA', // Exact original border
  },

  modalTitle: {
    fontSize: 18, // Exact original size
    fontWeight: '600', // Exact original weight
    color: '#000000', // Pure black
  },

  modalContent: {
    flex: 1,
    paddingHorizontal: 16, // Exact original padding
    paddingTop: 16, // Minimal top padding
  },

  // Edit Profile Styles - EXACTLY like original
  editAvatarContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Pure white
    padding: 24, // Exact original padding
    borderRadius: 12, // Exact original radius
    borderWidth: 1,
    borderColor: '#E5E5EA', // Exact original border
    marginBottom: 12, // Exact original spacing
  },

  editAvatar: {
    width: 80, // Exact original size
    height: 80,
    borderRadius: 40,
    backgroundColor: '#C7C7CC', // Exact original gray
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12, // Exact original spacing
  },

  editAvatarText: {
    fontSize: 18, // Exact original size
    fontWeight: '600', // Exact original weight
    color: '#000000', // Pure black
    marginBottom: 8, // Exact original spacing
  },

  editAvatarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12, // Exact original padding
    paddingVertical: 6, // Exact original padding
    backgroundColor: '#E3F2FD', // Exact original light blue
    borderRadius: 16, // Exact original radius
  },

  editAvatarButtonText: {
    fontSize: 14, // Exact original size
    color: '#4A90E2', // Exact original blue
    marginLeft: 4, // Exact original spacing
  },

  // Form Inputs - EXACTLY like original
  inputLabel: {
    fontSize: 16, // Exact original size
    fontWeight: '500', // Exact original weight
    color: '#000000', // Pure black
    marginBottom: 8, // Exact original spacing
    marginTop: 16, // Exact original spacing
  },

  textInput: {
    backgroundColor: '#FFFFFF', // Pure white
    borderRadius: 8, // Exact original radius
    paddingHorizontal: 16, // Exact original padding
    paddingVertical: 12, // Exact original padding
    fontSize: 16, // Exact original size
    borderWidth: 1,
    borderColor: '#E5E5EA', // Exact original border
    color: '#000000', // Pure black text
  },

  // Update Button - EXACTLY like original
  updateButton: {
    backgroundColor: '#4A90E2', // Exact original blue
    borderRadius: 9999, // Full rounded like original
    paddingVertical: 16, // Exact original padding
    alignItems: 'center',
    marginTop: 32, // Exact original spacing
    marginBottom: 20, // Exact original spacing
  },

  updateButtonText: {
    fontSize: 16, // Exact original size
    fontWeight: '600', // Exact original weight
    color: '#FFFFFF', // White text
  },

  // Notification Settings - EXACTLY like original
  notificationSectionTitle: {
    fontSize: 14, // Exact original size
    fontWeight: '500', // Exact original weight
    color: '#8E8E93', // Exact original gray
    marginBottom: 16, // Exact original spacing
    marginTop: 8, // Exact original spacing
  },

  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF', // Pure white
    paddingHorizontal: 16, // Exact original padding
    paddingVertical: 16, // Exact original padding
    borderRadius: 8, // Exact original radius
    marginBottom: 8, // Exact original spacing
  },

  notificationText: {
    fontSize: 16, // Exact original size
    color: '#000000', // Pure black
  },

  // Emergency Contacts - EXACTLY like original
  emergencySubtitle: {
    fontSize: 14, // Exact original size
    fontWeight: '500', // Exact original weight
    color: '#8E8E93', // Exact original gray
    marginBottom: 16, // Exact original spacing
    textAlign: 'center',
  },

  emergencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF', // Pure white
    paddingHorizontal: 16, // Exact original padding
    paddingVertical: 16, // Exact original padding
    borderRadius: 8, // Exact original radius
    marginBottom: 8, // Exact original spacing
  },

  emergencyLeft: {
    flex: 1,
  },

  emergencyName: {
    fontSize: 16, // Exact original size
    fontWeight: '500', // Exact original weight
    color: '#000000', // Pure black
    marginBottom: 2, // Exact original spacing
  },

  emergencyNumber: {
    fontSize: 14, // Exact original size
    color: '#8E8E93', // Exact original gray
  },

  callButton: {
    width: 40, // Exact original size
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD', // Exact original light blue
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default profileStyles;