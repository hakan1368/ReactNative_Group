import React, { useRef, useState } from 'react';
import { firestore } from './firebase';
import { addDoc, collection } from '@firebase/firestore';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Home() {
  const [nameValue, setNameValue] = useState('');
  const [messageValue, setMessageValue] = useState('');
  const [displayMessage, setDisplayMessage] = useState('');

  const ref = collection(firestore, 'messages');
  const router = useRouter();

  const handleSubmit = async () => {
    const data = {
      name: nameValue,
      message: messageValue,
    };

    try {
      router.push('./quiz');
      await addDoc(ref, data);
      console.log('Document succesfully written.');
      setNameValue('');
      setMessageValue('');
    } catch (error) {
      console.log(error);
      setDisplayMessage('Error saving into database.');
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
     
      <TouchableOpacity onPress={handleSubmit} >
          <Image
            source={require('../assets/images/start.svg')} // Logout button icon
            style={styles.icon}
          />
        </TouchableOpacity>

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
  title: {
    fontSize: 30,
    marginBottom: 12,
    textAlign: 'center',
  },
  secondTitle: {
    fontSize: 24,
    margin: 25,
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
  buttonContainer: {
    marginBottom: 16,
    width: '50%',
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
    margin: 50,
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
    marginTop: 20, // Ajoute de l'espace au-dessus de l'icône pour la déplacer vers le bas
  },
});

