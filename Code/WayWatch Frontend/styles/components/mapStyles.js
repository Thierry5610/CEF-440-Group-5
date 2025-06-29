import { StyleSheet, Dimensions } from 'react-native';
import theme from '../theme';

const { width, height } = Dimensions.get('window');

export const mapStyles = StyleSheet.create({
  // Map container
  container: {
    flex: 1,
    backgroundColor: theme.colors.neutral[50],
  },
  
  map: {
    flex: 1,
  },

  // Markers
  currentLocationMarker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(74, 144, 226, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  currentLocationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary[500],
  },
  
  destinationMarker: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Search Interface
  searchContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.white,
    paddingBottom: theme.spacing[5],
    paddingHorizontal: theme.spacing[5],
    borderBottomLeftRadius: theme.borderRadius.xl,
    borderBottomRightRadius: theme.borderRadius.xl,
    ...theme.shadows.md,
  },
  
  searchTitle: {
    fontSize: theme.typography.fontSizes['2xl'],
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.neutral[900],
    marginBottom: theme.spacing[5],
    textAlign: 'center',
  },
  
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.neutral[50],
    borderWidth: 1,
    borderColor: theme.colors.neutral[200],
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[1],
    marginBottom: theme.spacing[3],
  },
  
  searchIcon: {
    marginRight: theme.spacing[3],
  },
  
  searchInput: {
    flex: 1,
    fontSize: theme.typography.fontSizes.base,
    color: theme.colors.neutral[900],
  },
  
  clearButton: {
    padding: theme.spacing[1],
  },

  // Search Results
  searchResultsContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    maxHeight: 200,
    marginBottom: theme.spacing[5],
    ...theme.shadows.base,
  },
  
  searchResultsList: {
    maxHeight: 200,
  },
  
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutral[100],
  },
  
  searchResultTextContainer: {
    marginLeft: theme.spacing[4],
    flex: 1,
  },
  
  searchResultTitle: {
    fontSize: theme.typography.fontSizes.base,
    fontWeight: theme.typography.fontWeights.semibold,
    color: theme.colors.neutral[900],
  },
  
  searchResultSubtitle: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.neutral[600],
    marginTop: theme.spacing[1],
  },
  
  loader: {
    padding: theme.spacing[5],
  },

  // Action Buttons
  actionButtonsContainer: {
    gap: theme.spacing[3],
  },
  
  currentLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.neutral[50],
    borderWidth: 1,
    borderColor: theme.colors.neutral[200],
    padding: theme.spacing[4],
    borderRadius: theme.borderRadius.full,
  },
  
  currentLocationText: {
    marginLeft: theme.spacing[3],
    fontSize: theme.typography.fontSizes.base,
    color: theme.colors.primary[500],
    fontWeight: theme.typography.fontWeights.medium,
  },
  
  startTripButton: {
    backgroundColor: theme.colors.primary[500],
    padding: theme.spacing[4],
    borderRadius: theme.borderRadius.full,
    alignItems: 'center',
    ...theme.shadows.md,
  },
  
  startTripButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSizes.base,
    fontWeight: theme.typography.fontWeights.semibold,
  },

  // Route Selection Interface
  routeSelectionContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
    maxHeight: height * 0.7,
    ...theme.shadows.xl,
  },
  
  routeSelectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing[5],
    marginBottom: theme.spacing[5],
    paddingTop: theme.spacing[5],
  },
  
  routesList: {
    paddingHorizontal: theme.spacing[5],
    maxHeight: 300,
  },
  
  routeOption: {
    backgroundColor: theme.colors.neutral[50],
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing[4],
    marginBottom: theme.spacing[3],
    borderWidth: 2,
    borderColor: 'transparent',
  },
  
  selectedRouteOption: {
    borderColor: theme.colors.primary[500],
    backgroundColor: theme.colors.primary[50],
  },
  
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing[2],
  },
  
  routeTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  routeColorIndicator: {
    width: 4,
    height: 20,
    borderRadius: 2,
    marginRight: theme.spacing[3],
  },
  
  routeType: {
    fontSize: theme.typography.fontSizes.base,
    fontWeight: theme.typography.fontWeights.semibold,
    color: theme.colors.neutral[900],
  },
  
  fastestBadge: {
    backgroundColor: theme.colors.success[500],
    color: theme.colors.white,
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: theme.typography.fontWeights.bold,
    paddingHorizontal: theme.spacing[2],
    paddingVertical: theme.spacing[1],
    borderRadius: theme.borderRadius.base,
    marginLeft: theme.spacing[2],
  },
  
  routeTime: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.neutral[900],
  },
  
  routeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  routeDistance: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.neutral[600],
  },
  
  routeFeatures: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
  },
  
  featureBadge: {
    backgroundColor: theme.colors.success[50],
    color: theme.colors.success[600],
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: theme.typography.fontWeights.medium,
    paddingHorizontal: theme.spacing[2],
    paddingVertical: theme.spacing[1],
    borderRadius: theme.borderRadius.md,
  },
  
  trafficIndicator: {
    paddingHorizontal: theme.spacing[2],
    paddingVertical: theme.spacing[1],
    borderRadius: theme.borderRadius.md,
  },
  
  trafficText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: theme.typography.fontWeights.medium,
  },
  
  normalTime: {
    fontSize: theme.typography.fontSizes.xs,
    color: theme.colors.neutral[600],
    marginTop: theme.spacing[1],
  },

  // Route Buttons
  routeButtonsContainer: {
    paddingHorizontal: theme.spacing[5],
    paddingBottom: theme.spacing[5],
    gap: theme.spacing[3],
  },
  
  startNavigationButton: {
    backgroundColor: theme.colors.primary[500],
    padding: theme.spacing[4],
    borderRadius: theme.borderRadius.full,
    alignItems: 'center',
    ...theme.shadows.md,
  },
  
  startNavigationButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSizes.base,
    fontWeight: theme.typography.fontWeights.semibold,
  },
  
  alternateRouteButton: {
    backgroundColor: theme.colors.neutral[100],
    padding: theme.spacing[3],
    borderRadius: theme.borderRadius.xl,
    alignItems: 'center',
  },
  
  alternateRouteButtonActive: {
    backgroundColor: theme.colors.primary[500],
  },
  
  alternateRouteButtonText: {
    color: theme.colors.primary[500],
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: theme.typography.fontWeights.medium,
  },
  
  alternateRouteButtonTextActive: {
    color: theme.colors.white,
  },

  // Navigation Interface
  navigationContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.white,
    paddingBottom: theme.spacing[5],
    paddingHorizontal: theme.spacing[5],
    borderBottomLeftRadius: theme.borderRadius.lg,
    borderBottomRightRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },
  
  navigationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  navigationInfo: {
    flex: 1,
  },
  
  navigationTime: {
    fontSize: theme.typography.fontSizes['2xl'],
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.neutral[900],
  },
  
  navigationDistance: {
    fontSize: theme.typography.fontSizes.base,
    color: theme.colors.neutral[600],
    marginTop: theme.spacing[1],
  },
  
  endTripButton: {
    backgroundColor: theme.colors.error[500],
    paddingHorizontal: theme.spacing[5],
    paddingVertical: theme.spacing[3],
    borderRadius: theme.borderRadius.xl,
  },
  
  endTripButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: theme.typography.fontWeights.semibold,
  },

  // Trip Completion Interface
  completionContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
    ...theme.shadows.xl,
  },
  
  completionContent: {
    alignItems: 'center',
    paddingHorizontal: theme.spacing[5],
    paddingTop: theme.spacing[8],
    paddingBottom: theme.spacing[10],
  },
  
  completionIcon: {
    marginBottom: theme.spacing[5],
  },
  
  completionTitle: {
    fontSize: theme.typography.fontSizes['2xl'],
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.neutral[900],
    marginBottom: theme.spacing[2],
  },
  
  completionSubtitle: {
    fontSize: theme.typography.fontSizes.base,
    color: theme.colors.neutral[600],
    marginBottom: theme.spacing[8],
    textAlign: 'center',
  },
  
  tripSummary: {
    backgroundColor: theme.colors.neutral[50],
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing[5],
    width: '100%',
    marginBottom: theme.spacing[8],
  },
  
  tripSummaryText: {
    fontSize: theme.typography.fontSizes.base,
    color: theme.colors.neutral[900],
    marginBottom: theme.spacing[2],
    textAlign: 'center',
    fontWeight: theme.typography.fontWeights.medium,
  },
  
  doneButton: {
    backgroundColor: theme.colors.primary[500],
    paddingHorizontal: theme.spacing[10],
    paddingVertical: theme.spacing[4],
    borderRadius: theme.borderRadius.full,
    width: '100%',
    alignItems: 'center',
    ...theme.shadows.md,
  },
  
  doneButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSizes.base,
    fontWeight: theme.typography.fontWeights.semibold,
  },

  // Location Button
  locationButton: {
    position: 'absolute',
    right: theme.spacing[5],
    bottom: 100,
    backgroundColor: theme.colors.white,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.lg,
  },
  
  locationButtonRouteSelection: {
    bottom: 420,
  },

  // Loading Overlay
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
});

export default mapStyles;