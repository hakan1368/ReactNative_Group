import React, { useRef, useState } from 'react';
import { firestore } from '../app/firebase';
import { addDoc, collection } from '@firebase/firestore';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';

export default function Home() {
  const messageRef = useRef();
  const ref = collection(firestore, 'message');
  const [nameValue, setNameValue] = useState('');
  const [messageValue, setMessageValue] = useState('');

  const handleSubmit = () => {
    console.log('The value you entered is: ' + nameValue + messageValue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Form Testing</Text>
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
    marginBottom: 16,
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
});
