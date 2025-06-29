import { StyleSheet } from 'react-native';
import theme from '../theme';

export const tabNavigatorStyles = StyleSheet.create({
  // Tab bar container
  tabBarStyle: {
    backgroundColor: theme.colors.white,
    height: theme.layout.tabBar.height,
    borderTopWidth: 1,
    borderTopColor: theme.colors.neutral[200],
    paddingBottom: theme.spacing[3],
    paddingTop: theme.spacing[3],
    ...theme.shadows.lg,
  },

  // Tab button container
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing[2],
  },

  // Tab icon container
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing[2],
  },

  // Active indicator dot
  activeIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.primary[500],
    marginTop: theme.spacing[2],
  },

  // Tab label (if needed)
  tabLabel: {
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: theme.typography.fontWeights.medium,
    marginTop: theme.spacing[1],
  },

  tabLabelActive: {
    color: theme.colors.primary[500],
  },

  tabLabelInactive: {
    color: theme.colors.neutral[400],
  },

  // Tab icon colors
  iconActive: {
    color: theme.colors.primary[500],
  },

  iconInactive: {
    color: theme.colors.neutral[400],
  },

  // Badge container (for notifications)
  badgeContainer: {
    position: 'absolute',
    top: -2,
    right: -6,
    backgroundColor: theme.colors.error[500],
    borderRadius: theme.borderRadius.full,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing[1],
  },

  badgeText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: theme.typography.fontWeights.bold,
    lineHeight: 12,
  },

  // Tab screen container
  screenContainer: {
    flex: 1,
    backgroundColor: theme.colors.neutral[50],
  },
});

export default tabNavigatorStyles;