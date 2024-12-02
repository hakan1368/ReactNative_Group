import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';

const AuthenticatedScreen = ({ email, handleSignOut, navigateHome }) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.webp')}
        style={styles.image}
      />
      <View style={styles.authContainer}>
        <Text style={styles.userText}>Logged in as:</Text>
        <Text style={styles.emailText}>{email || 'Email not available'}</Text>
        {/* Afficher l'email de l'utilisateur */}
      </View>

      {/* Bottom bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          onPress={() => router.push('/welcome')}
          style={styles.button}
        >
          <Image
            source={require('../assets/images/home_menu.svg')} // Home button icon
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignOut} style={styles.button}>
          <Image
            source={require('../assets/images/log_out_button.svg')} // Logout button icon
            style={styles.icon}
          />
        </TouchableOpacity>
        {/* Ajoute d'autres icônes si nécessaire */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'pink',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
    flex: 1,
    alignItems: 'center',
  },
  authContainer: {
    width: '100%',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
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
    width: '60%',
    height: 200,
    borderRadius: 8,
    margin: 50,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly', // Espacement égal entre les icônes
    width: '100%',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#D3D3D3', // Ajuste la couleur de fond comme tu préfères
  },
  icon: {
    width: 24, // Ajuste la taille de l'icône
    height: 24,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AuthenticatedScreen;
