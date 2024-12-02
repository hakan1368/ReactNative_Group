import React from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Linguini!</Text>
      <Text style={styles.subtitle}>Please wait while we load your app...</Text>
      <Image
        source={require('../assets/images/logo.webp')}
        style={styles.image}
      />
      <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
    maxHeight: 600,
    maxWidth: 500,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black', // Same blue color as in AuthScreen
    marginBottom: 10, // Spacing below the title
  },
  subtitle: {
    fontSize: 18,
    color: '#777', // Light gray color for the subtitle
  },
  image: {
    width: '50%',
    height: 200,
    borderRadius: 8,
    margin: 50,
  },
  animation: {
    width: 10,
    height: 10,
  },
  loader: {
    marginTop: 20,
  },
});

export default SplashScreen;
