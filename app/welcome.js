import React, { useRef, useState } from 'react';
import { firestore } from './firebase';
import { addDoc, collection } from '@firebase/firestore';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function Home() {
  const [displayMessage, setDisplayMessage] = useState('');
  // const ref = collection(firestore, 'messages');
  const router = useRouter();

  const handleTestKnowledge = async () => {
    try {
      router.push('./quiz');
    } catch (error) {
      console.log(error);
      setDisplayMessage('Error');
    }
  };

  const handleLearnNow = async () => {
    try {
      router.push('./learn');
    } catch (error) {
      console.log(error);
      setDisplayMessage('Error');
    }
  };

  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>Ready to Start Learning ?</Text>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.image}
      />
      <Text style={styles.secondTitle}>
        We aim to teach a new language by practising new words on our Quiz App.
        Start whenever you feel ready and discover your potential today.
      </Text>
      <View style={styles.OpacityContainer}>
        <TouchableOpacity onPress={handleTestKnowledge}>
          <View style={styles.buttonContainer}>
            <Image
              source={require('../assets/images/start.svg')} // Logout button icon
              style={styles.icon}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLearnNow}>
          <View style={styles.buttonContainer}>
            <Image
              source={require('../assets/images/brain.svg')} // Logout button icon
              style={styles.icon}
            />
          </View>
        </TouchableOpacity>
      </View>

      {displayMessage ? (
        <Text style={styles.message}>{displayMessage}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    flex: 1,
    backgroundColor: '#f0f0f0',
  },

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
  buttonContainer: {
    backgroundColor: '#d3d3d3', // Grey background
    width: 60, // Width of the grey square
    height: 60, // Height of the grey square
    justifyContent: 'center', // Center the icon inside the square
    alignItems: 'center', // Center the icon inside the square
    borderRadius: 20,
  },

  OpacityContainer: {
    flexDirection: 'row', // This makes the children display horizontally (next to each other)
    justifyContent: 'space-between', // You can use this to add space between the buttons or 'center' to align them centrally
    alignItems: 'center', // Aligns items vertically in the center
    width: '100%', // Takes the full width of the container
    padding: 120, // Add padding around the container for spacing
    height: 'auto',
  },
  title: {
    fontSize: 30,
    marginBottom: 12,
    textAlign: 'center',
  },
  secondTitle: {
    fontSize: 24,
    margin: 10,
    textAlign: 'center',
    color: 'white',
  },
  userText: {
    fontSize: 18,
    fontWeight: 'bold',
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

  toggleText: {
    color: '#3498db',
    textAlign: 'center',
  },
  bottomContainer: {
    marginTop: 20,
  },
  image: {
    width: '50%',
    height: 200,
    borderRadius: 8,
    margin: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emailText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  message: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
    color: 'green',
  },
  icon: {
    width: 40, // Ajuste la taille de l'icône
    height: 40,
    resizeMode: 'contain',
  },
});
