import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, StatusBar } from 'react-native';
import { theme } from '../theme';
import { ButtonPrimary, ButtonSecondary } from '../Components/ui/Button';

const GetStarted = ({navigation}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8F4F8" />
      <View style={styles.container}>
        {/* Car illustration */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/images/carousel-3.png')}
            style={styles.carImage}
            resizeMode="contain"
          />
        </View>
        
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Get Started!</Text>
          
          <ButtonPrimary onClick={()=>{navigation.navigate("SignUp")}}>Create Account</ButtonPrimary>
          <ButtonSecondary onClick={()=>{navigation.navigate("SignIn")}}>Sign In</ButtonSecondary>

        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    width: '100%',
    flex: 1,
    backgroundColor: theme.colors.sky[50], // Light blue background like in image
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.sky[50], // Light blue background
    justifyContent: 'space-between',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  carImage: {
    width: 300,
    height: 200,
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: theme.spacing[8],
    paddingBottom: theme.spacing[15],
  },
  title: {
    fontSize: theme.fontSizes['3xl'],
    fontWeight: '700', // Bolder font weight
    color: theme.colors.slate[900], // Dark gray instead of black
    marginBottom: theme.spacing[12],
    textAlign: 'center',
  }
});

export default GetStarted;