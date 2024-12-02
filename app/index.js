import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image } from 'react-native';
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from '@firebase/auth';
import { useRouter } from 'expo-router';
import { app } from './firebase';
import AuthenticatedScreen from './Authenticated';
import SplashScreen from './Splash_screen'; // Import du SplashScreen

const AuthScreen = ({
  email,
  setEmail,
  password,
  setPassword,
  isLogin,
  setIsLogin,
  handleAuthentication,
}) => {
  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>
        {isLogin ? 'Sign In to Linguini' : 'Sign Up to Linguini'}
      </Text>
      <Image
        source={require('../assets/images/logo.webp')}
        style={styles.image}
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <Button
        title={isLogin ? 'Sign In' : 'Sign Up'}
        onPress={handleAuthentication}
        color="#3498db"
      />
      <Text onPress={() => setIsLogin(!isLogin)}>
        {isLogin
          ? 'Need an account? Sign Up'
          : 'Already have an account? Sign In'}
      </Text>
    </View>
  );
};

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [loadingSplash, setLoadingSplash] = useState(false); // État pour afficher SplashScreen après login
  const auth = getAuth(app);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoadingSplash(true); // Afficher SplashScreen lorsque l'utilisateur est connecté
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  const handleAuthentication = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

  useEffect(() => {
    if (loadingSplash) {
      // Si SplashScreen doit s'afficher, attendre 3 secondes
      setTimeout(() => {
        setLoadingSplash(false); // Cacher SplashScreen après 3 secondes
      }, 3000);
    }
  }, [loadingSplash]);

  return (
    <View>
      {!user ? (
        <AuthScreen
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          handleAuthentication={handleAuthentication}
        />
      ) : loadingSplash ? (
        <SplashScreen /> // Afficher le SplashScreen pendant 3 secondes
      ) : (
        <AuthenticatedScreen
          email={user?.email}
          user={user}
          handleSignOut={handleSignOut}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  authContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'pink',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: 'white',
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
    width: '100%',
  },
  image: {
    width: '50%',
    height: 200,
    borderRadius: 8,
    margin: 50,
  },
});
