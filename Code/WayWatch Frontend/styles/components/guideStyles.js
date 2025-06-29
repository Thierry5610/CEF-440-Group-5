import { StyleSheet, Dimensions } from 'react-native';
import theme from '../theme';

const { width } = Dimensions.get('window');

export const guideStyles = StyleSheet.create({
  // Main container
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA', // Match original
  },

  scrollContainer: {
    flex: 1,
  },

  // Header - NO extra spacing
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },

  headerSubtitle: {
    fontSize: 16,
    color: '#6C757D',
    fontWeight: '400',
  },

  // Search - NO extra spacing
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },

  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },

  searchIcon: {
    marginRight: 12,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '400',
  },

  // Tabs - NO extra spacing
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },

  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },

  activeTab: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },

  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6C757D',
  },

  activeTabText: {
    color: '#FFFFFF',
  },

  // Categories - NO extra spacing
  categoryContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },

  categoryTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    color: '#1A1A1A',
  },

  categoryScroll: {
    flexDirection: 'row',
  },

  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },

  selectedCategoryButton: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },

  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6C757D',
  },

  selectedCategoryButtonText: {
    color: '#FFFFFF',
  },

  // Grid
  gridContainer: {
    padding: 20,
    paddingBottom: 24,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  learningCard: {
    width: (width - 60) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },

  cardImageContainer: {
    position: 'relative',
  },

  cardImage: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },

  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },

  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  difficultyBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },

  difficultyText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  cardContent: {
    padding: 16,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
    lineHeight: 20,
  },

  cardMeta: {
    marginBottom: 12,
  },

  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  metaText: {
    fontSize: 12,
    color: '#8E8E93',
    marginLeft: 4,
    fontWeight: '500',
  },

  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  learnText: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '600',
  },

  // Modal Styles - FIXED spacing
  modalContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },

  // FIXED: Modal header with proper spacing
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  detailTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },

  bookmarkButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // FIXED: Modal content with no extra top spacing
  detailContent: {
    flex: 1,
  },

  detailImageContainer: {
    position: 'relative',
  },

  detailImage: {
    width: '100%',
    height: 240,
    resizeMode: 'cover',
  },

  detailImageOverlay: {
    position: 'absolute',
    bottom: 16,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  detailDifficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },

  detailDifficultyText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  detailMetaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },

  detailMetaText: {
    fontSize: 13,
    color: '#FFFFFF',
    marginLeft: 6,
    fontWeight: '500',
  },

  detailTextContainer: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  detailQuestion: {
    fontSize: 22,
    fontWeight: '700',
    color: '#4A90E2',
    marginBottom: 16,
    lineHeight: 28,
  },

  detailDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#495057',
    marginBottom: 32,
  },

  importanceTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 20,
  },

  benefitsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },

  benefitItem: {
    flex: 1,
    alignItems: 'center',
  },

  benefitIconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  benefitIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  benefitText: {
    fontSize: 13,
    textAlign: 'center',
    color: '#6C757D',
    lineHeight: 18,
    fontWeight: '500',
  },
    modalContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa', // Exact original background
  },
});

export default guideStyles;