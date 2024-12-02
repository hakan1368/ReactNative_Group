import React, { useRef, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
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
      <View style={styles.buttonContainer}>
        <Button
          title="Learn Now"
          onPress={handleLearnNow}
          color="#e74c3c"
        ></Button>
        <Button
          title="Test Knowledge"
          onPress={handleTestKnowledge}
          color="#e74c3c"
        ></Button>
      </View>

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
    margin: 15,
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
    flexGrow: 1,
    gap: 10,
    alignContent: 'space-evenly',
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
});
