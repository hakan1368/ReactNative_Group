import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from '@firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useRouter } from 'expo-router';

import welcome from './welcome';

import { app } from './firebase';

const Stack = createStackNavigator();
const router = useRouter();

const AuthScreen = ({ email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication }) => {
  const router = useRouter(); // useRouter for navigation

  // Navigate to authenticated screen after successful auth
  const handleAuth = async () => {
    await handleAuthentication(); // Trigger authentication
    router.push('/authenticated'); // Navigate to the authenticated screen
  };

  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>{isLogin ? 'Sign In to Linguini' : 'Sign Up to Linguini'}</Text>
      <Image source={require('../assets/images/logo.webp')} style={styles.image} />

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
      <View style={styles.buttonContainer}>
        <Button title={isLogin ? 'Sign In' : 'Sign Up'} onPress={handleAuth} color="#3498db" />
      </View>
      <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
      </Text>
    </View>
  );
};

const AuthenticatedScreen = ({ user, handleAuthentication }) => {
  const router = useRouter();
  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>Welcome to Linguini</Text>
      <Text style={styles.secondTitle}>Ready to Learn a New Language ?</Text>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.image}
      />
      <Button
        title="Go Home"
        color={'#3498db'}
        onPress={() => router.push('/welcome')}
      ></Button>
      <Text style={styles.userText}>Logged in as:</Text>
      <Text style={styles.emailText}>{user.email}</Text>
      <Button title="Logout" onPress={() => { handleAuthentication(); router.push('/Splash_screen'); }} color="#e74c3c" />
    </View>
  );
};
export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const auth = getAuth(app);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleAuthentication = async () => {
    try {
      if (user) {
        // If user is already authenticated, log out
        await signOut(auth);
      } else {
        if (isLogin) {
          await signInWithEmailAndPassword(auth, email, password);
          console.log('connected');
        } else {
          await createUserWithEmailAndPassword(auth, email, password);
          console.log('created');
        }
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

  // If user is authenticated, navigate to Authenticated screen
  if (user) {
    router.push('/authenticated'); // Navigate to the authenticated screen if logged in
  }

  return (
    <View style={styles.container}>
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
      ) : (
        <AuthenticatedScreen user={user} handleAuthentication={handleAuthentication} />
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
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
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
  buttonContainer: {
    marginBottom: 16,
    width: '50%',
  },
  toggleText: {
    color: '#3498db',
    textAlign: 'center',
  },
  image: {
    width: '50%',
    height: 200,
    borderRadius: 8,
    margin: 50,
  },
});
