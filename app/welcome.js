import React, { useRef, useState } from 'react';
import { firestore } from './firebase';
import { addDoc, collection } from '@firebase/firestore';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
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
      await addDoc(ref, data);
      console.log('Document succesfully written.');
      setDisplayMessage('Saved successfully into database.');
      setNameValue('');
      setMessageValue('');
    } catch (error) {
      console.log(error);
      setDisplayMessage('Error saving into database.');
    }
  };

  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>Form Testing</Text>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.image}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your name.."
        value={nameValue}
        onChangeText={setNameValue}
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder="Enter your message.."
        value={messageValue}
        onChangeText={setMessageValue}
      ></TextInput>
      <Button title="Submit" onPress={handleSubmit} color="#e74c3c"></Button>
      {displayMessage ? (
        <Text style={styles.message}>{displayMessage}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
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
    marginBottom: 12,
    textAlign: 'center',
  },
  secondTitle: {
    fontSize: 24,
    margin: 20,
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
});
