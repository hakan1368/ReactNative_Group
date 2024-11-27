import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import SplashScreen from 'react-native-splash-screen'; // Pas de {} autour de SplashScreen

import React, { useEffect,View,Text } from 'react';

const WelcomeScreen = () => {
    useEffect(() => {
      // Hide splash screen after a delay
      setTimeout(() => {
        SplashScreen.hide();
      }, 3000); // Adjust time as needed
    }, []);
  
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome to My App!</Text>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
    },
    welcomeText: {
      fontSize: 24,
      fontWeight: 'bold',
    },
  });
  
  export default WelcomeScreen;