import { StyleSheet } from 'react-native';
import theme from './theme';

export const globalStyles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: theme.colors.neutral[50],
  },
  
  safeContainer: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.neutral[50],
  },
  
  // Screen styles
  screen: {
    flex: 1,
    backgroundColor: theme.colors.neutral[50],
  },
  
  screenWithPadding: {
    flex: 1,
    backgroundColor: theme.colors.neutral[50],
    paddingHorizontal: theme.layout.container.horizontal,
  },
  
  // Header styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing[5],
    paddingVertical: theme.spacing[4],
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutral[200],
    ...theme.shadows.sm,
  },
  
  headerTitle: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.neutral[900],
  },
  
  // Button styles
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.borderRadius.base,
  },
  
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    ...theme.shadows.base,
  },
  
  // Card styles
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing[4],
    marginBottom: theme.spacing[4],
    ...theme.shadows.base,
  },
  
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing[3],
  },
  
  // Input styles
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.neutral[50],
    borderWidth: 1,
    borderColor: theme.colors.neutral[200],
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing[4],
    height: 56,
  },
  
  inputFocused: {
    borderColor: theme.colors.primary[500],
    backgroundColor: theme.colors.white,
  },
  
  input: {
    flex: 1,
    fontSize: theme.typography.fontSizes.base,
    color: theme.colors.neutral[900],
    paddingVertical: 0,
  },
  
  inputIcon: {
    width: 20,
    alignItems: 'center',
    marginRight: theme.spacing[3],
  },
  
  // Text styles
  title: {
    fontSize: theme.typography.fontSizes['3xl'],
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.neutral[900],
    lineHeight: theme.typography.lineHeights.tight * theme.typography.fontSizes['3xl'],
  },
  
  subtitle: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: theme.typography.fontWeights.semibold,
    color: theme.colors.neutral[700],
    lineHeight: theme.typography.lineHeights.normal * theme.typography.fontSizes.lg,
  },
  
  body: {
    fontSize: theme.typography.fontSizes.base,
    color: theme.colors.neutral[600],
    lineHeight: theme.typography.lineHeights.relaxed * theme.typography.fontSizes.base,
  },
  
  caption: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.neutral[500],
    lineHeight: theme.typography.lineHeights.normal * theme.typography.fontSizes.sm,
  },
  
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  modalContainer: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutral[200],
    backgroundColor: theme.colors.white,
  },
  
  modalTitle: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: theme.typography.fontWeights.semibold,
    color: theme.colors.neutral[900],
  },
  
  modalContent: {
    flex: 1,
    backgroundColor: theme.colors.neutral[50],
  },
  
  // List styles
  listContainer: {
    paddingHorizontal: theme.spacing[5],
    paddingTop: theme.spacing[4],
  },
  
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    padding: theme.spacing[4],
    marginBottom: theme.spacing[3],
    borderRadius: theme.borderRadius.md,
    ...theme.shadows.sm,
  },
  
  // Loading styles
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  
  // Utility styles
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  rowSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  shadow: theme.shadows.base,
  shadowLg: theme.shadows.lg,
  
  // Spacing utilities
  m0: { margin: 0 },
  m1: { margin: theme.spacing[1] },
  m2: { margin: theme.spacing[2] },
  m3: { margin: theme.spacing[3] },
  m4: { margin: theme.spacing[4] },
  m5: { margin: theme.spacing[5] },
  
  mt0: { marginTop: 0 },
  mt1: { marginTop: theme.spacing[1] },
  mt2: { marginTop: theme.spacing[2] },
  mt3: { marginTop: theme.spacing[3] },
  mt4: { marginTop: theme.spacing[4] },
  mt5: { marginTop: theme.spacing[5] },
  
  mb0: { marginBottom: 0 },
  mb1: { marginBottom: theme.spacing[1] },
  mb2: { marginBottom: theme.spacing[2] },
  mb3: { marginBottom: theme.spacing[3] },
  mb4: { marginBottom: theme.spacing[4] },
  mb5: { marginBottom: theme.spacing[5] },
  
  p0: { padding: 0 },
  p1: { padding: theme.spacing[1] },
  p2: { padding: theme.spacing[2] },
  p3: { padding: theme.spacing[3] },
  p4: { padding: theme.spacing[4] },
  p5: { padding: theme.spacing[5] },
  
  px0: { paddingHorizontal: 0 },
  px1: { paddingHorizontal: theme.spacing[1] },
  px2: { paddingHorizontal: theme.spacing[2] },
  px3: { paddingHorizontal: theme.spacing[3] },
  px4: { paddingHorizontal: theme.spacing[4] },
  px5: { paddingHorizontal: theme.spacing[5] },
  
  py0: { paddingVertical: 0 },
  py1: { paddingVertical: theme.spacing[1] },
  py2: { paddingVertical: theme.spacing[2] },
  py3: { paddingVertical: theme.spacing[3] },
  py4: { paddingVertical: theme.spacing[4] },
  py5: { paddingVertical: theme.spacing[5] },
});

export default globalStyles;