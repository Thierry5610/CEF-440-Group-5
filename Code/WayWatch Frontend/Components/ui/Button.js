import { Text, TouchableOpacity, StyleSheet} from 'react-native';
import { theme } from '../../theme';

export function ButtonPrimary({children,onClick}){
    return(
          <TouchableOpacity style={styles.button} activeOpacity={0.8}
            onPress={onClick}
          >
            <Text style={styles.buttonText}>{children}</Text>
          </TouchableOpacity>
    )
} 

export function ButtonSecondary({children,onClick}){
    return(
          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]} 
            onPress={onClick}
            activeOpacity={0.8}
          >
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>{children}</Text>
          </TouchableOpacity>
    )
} 

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4A9EFF', // Brighter blue to match image
    paddingVertical: theme.spacing[4],
    paddingHorizontal: theme.spacing[8],
    borderRadius: theme.borderRadius['full'], // More rounded like in image
    marginVertical: theme.spacing[2],
    width: '100%',
    alignItems: 'center',
    // Add shadow for depth
    shadowColor: theme.colors.sky[500],
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: theme.colors.sky[500],
    // Remove shadow for outline button
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: theme.colors.sky[500],
  },
});