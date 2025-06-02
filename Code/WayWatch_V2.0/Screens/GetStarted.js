import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, StatusBar } from 'react-native';

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
          
          <TouchableOpacity style={styles.button} activeOpacity={0.8}
            onPress={()=>{navigation.navigate("SignUp")}}
          >
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]} 
            onPress={()=>{navigation.navigate("SignIn")}}
            activeOpacity={0.8}
          >
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    width: '100%',
    flex: 1,
    backgroundColor: '#E8F4F8', // Light blue background like in image
  },
  container: {
    flex: 1,
    backgroundColor: '#E8F4F8', // Light blue background
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
    paddingHorizontal: 32,
    paddingBottom: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: '700', // Bolder font weight
    color: '#1F2937', // Dark gray instead of black
    marginBottom: 50,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4A9EFF', // Brighter blue to match image
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 50, // More rounded like in image
    marginVertical: 8,
    width: '100%',
    alignItems: 'center',
    // Add shadow for depth
    shadowColor: '#4A9EFF',
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
    borderColor: '#4A9EFF',
    // Remove shadow for outline button
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#4A9EFF',
  },
});

export default GetStarted;