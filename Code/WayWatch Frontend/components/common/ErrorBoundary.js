import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AlertTriangle, RefreshCw } from 'lucide-react-native';
import theme from '../../styles/theme';
import { ERROR_CONFIG, APP_INFO } from '../../config/appConfig';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      retryCount: 0 
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    if (ERROR_CONFIG.logErrors) {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // Update state with error details
    this.setState({
      error,
      errorInfo,
    });

    // Report error to crash reporting service (if enabled)
    if (ERROR_CONFIG.reportErrors) {
      this.reportError(error, errorInfo);
    }
  }

  reportError = (error, errorInfo) => {
    // Here you would integrate with your crash reporting service
    // e.g., Crashlytics, Sentry, Bugsnag, etc.
    try {
      const errorReport = {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        appVersion: APP_INFO.version,
        retryCount: this.state.retryCount,
      };
      
      // Example: Send to your error reporting service
      // CrashReporting.recordError(errorReport);
      console.log('Error report prepared:', errorReport);
    } catch (reportingError) {
      console.error('Failed to report error:', reportingError);
    }
  };

  handleRetry = () => {
    this.setState(prevState => ({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: prevState.retryCount + 1,
    }));
  };

  handleRestart = () => {
    // For React Native, you might want to restart the app
    // This would require additional native modules
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom error UI
      return (
        <View style={styles.container}>
          <View style={styles.content}>
            {/* Error Icon */}
            <View style={styles.iconContainer}>
              <AlertTriangle size={64} color={theme.colors.error[500]} />
            </View>

            {/* Error Message */}
            <Text style={styles.title}>Something went wrong</Text>
            <Text style={styles.message}>
              We're sorry, but something unexpected happened. Please try again.
            </Text>

            {/* Error Details (only in development) */}
            {__DEV__ && this.state.error && (
              <View style={styles.errorDetails}>
                <Text style={styles.errorTitle}>Error Details:</Text>
                <Text style={styles.errorText}>{this.state.error.message}</Text>
                {this.state.errorInfo && (
                  <Text style={styles.errorText}>
                    {this.state.errorInfo.componentStack}
                  </Text>
                )}
              </View>
            )}

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.retryButton}
                onPress={this.handleRetry}
                activeOpacity={0.8}
              >
                <RefreshCw size={20} color={theme.colors.white} />
                <Text style={styles.retryButtonText}>Try Again</Text>
              </TouchableOpacity>

              {this.state.retryCount > 2 && (
                <TouchableOpacity
                  style={styles.restartButton}
                  onPress={this.handleRestart}
                  activeOpacity={0.8}
                >
                  <Text style={styles.restartButtonText}>Restart App</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Retry Count */}
            {this.state.retryCount > 0 && (
              <Text style={styles.retryCount}>
                Retry attempts: {this.state.retryCount}
              </Text>
            )}
          </View>
        </View>
      );
    }

    // No error, render children normally
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing[6],
  },

  content: {
    alignItems: 'center',
    maxWidth: 400,
  },

  iconContainer: {
    marginBottom: theme.spacing[6],
  },

  title: {
    fontSize: theme.typography.fontSizes['2xl'],
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.neutral[900],
    textAlign: 'center',
    marginBottom: theme.spacing[4],
  },

  message: {
    fontSize: theme.typography.fontSizes.base,
    color: theme.colors.neutral[600],
    textAlign: 'center',
    lineHeight: theme.typography.lineHeights.relaxed * theme.typography.fontSizes.base,
    marginBottom: theme.spacing[8],
  },

  errorDetails: {
    backgroundColor: theme.colors.neutral[50],
    padding: theme.spacing[4],
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing[6],
    width: '100%',
  },

  errorTitle: {
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: theme.typography.fontWeights.semibold,
    color: theme.colors.error[600],
    marginBottom: theme.spacing[2],
  },

  errorText: {
    fontSize: theme.typography.fontSizes.xs,
    color: theme.colors.neutral[700],
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    lineHeight: theme.typography.lineHeights.normal * theme.typography.fontSizes.xs,
  },

  buttonContainer: {
    width: '100%',
    gap: theme.spacing[3],
  },

  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary[500],
    paddingVertical: theme.spacing[4],
    paddingHorizontal: theme.spacing[6],
    borderRadius: theme.borderRadius.full,
    gap: theme.spacing[2],
  },

  retryButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSizes.base,
    fontWeight: theme.typography.fontWeights.semibold,
  },

  restartButton: {
    backgroundColor: theme.colors.neutral[100],
    paddingVertical: theme.spacing[3],
    paddingHorizontal: theme.spacing[6],
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.neutral[300],
  },

  restartButtonText: {
    color: theme.colors.neutral[700],
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: theme.typography.fontWeights.medium,
    textAlign: 'center',
  },

  retryCount: {
    fontSize: theme.typography.fontSizes.xs,
    color: theme.colors.neutral[500],
    marginTop: theme.spacing[4],
    textAlign: 'center',
  },
});

export default ErrorBoundary;