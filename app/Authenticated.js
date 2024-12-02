import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import SplashScreen from './Splash_screen'; // Import du SplashScreen
import AuthScreen from './index';
const AuthenticatedScreen = ({ email, handleSignOut, navigateHome }) => {
  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>Welcome to Linguini</Text>
      <Text style={styles.secondTitle}>Ready to Learn a New Language?</Text>
      <Image
        source={require('../assets/images/logo.png')} // Assurez-vous que le chemin est correct
        style={styles.image}
      />
      <Button
        title="Go Home"
        color="#3498db"
        onPress={navigateHome} // Naviguer vers l'écran d'accueil
      />
      <Text style={styles.userText}>Logged in as:</Text>
      <Text style={styles.emailText}>{email || 'Email not available'} </Text> {/* Afficher l'email de l'utilisateur */}
      <Button
        title="Logout"
        onPress={handleSignOut} // Appeler la fonction de déconnexion
        color="#e74c3c"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  authContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'pink',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    marginBottom: 16,
  },
  secondTitle: {
    fontSize: 18,
    marginBottom: 16,
  },
  emailText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  userText: {
    fontSize: 18,
    marginTop: 8,
  },
  image: {
    width: '50%',
    height: 200,
    borderRadius: 8,
    margin: 50,
  },
});

export default AuthenticatedScreen;
