import { StyleSheet, Dimensions } from 'react-native';
import theme from '../theme';

const { width, height } = Dimensions.get('window');

export const notificationStyles = StyleSheet.create({
  // Main container
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa', // Match original
  },

  // Header - NO extra spacing
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

  // Notifications List
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

  // Modal Styles - FIXED spacing issues
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // FIXED: Modal header with proper spacing
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16, // Proper padding
    paddingVertical: 12, // Proper padding - NO extra space
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    backgroundColor: '#FFFFFF',
  },

  backButtonContainer: {
    width: 40,
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
    width: 40,
  },

  // FIXED: Modal content with no extra top padding
  modalContent: {
    flex: 1,
    backgroundColor: '#f8f9fa', // Proper background
  },

  // Detail Modal Styles - FIXED spacing
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

  // Photos Section
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

  // Description Section
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

  // Incident Grid Styles - FIXED spacing
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

  // Form Styles - FIXED spacing
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

  // Image Upload
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

  // Injury Question
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

  // Input Styles
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

  // Location Container
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

  // Submit Button
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

  // Confirmation Modal
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
    modalContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa', // Exact original background
  },
});

export default notificationStyles;