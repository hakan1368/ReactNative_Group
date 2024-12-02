import React, { useEffect, useState } from 'react';
import { firestore } from './firebase';
import { collection, getDocs } from '@firebase/firestore';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Button,
} from 'react-native';
import CardFlip from 'react-native-card-flip';

export default function LearnPage() {
  const [cards, setCards] = useState([]);
  const [shuffledCards, setShuffledCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      const ref = collection(firestore, 'cards');
      const querySnapshot = await getDocs(ref);
      const fetchedCards = querySnapshot.docs.map((doc) => doc.data());
      setCards(fetchedCards);
      setShuffledCards(shuffleArray(fetchedCards));
    };

    fetchCards();
  }, []);

  const shuffleArray = (array) => {
    return array
      .map((item) => ({ ...item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map((item) => ({ finnish: item.finnish, english: item.english }));
  };

  const handleShuffle = () => {
    setShuffledCards(shuffleArray(cards));
  };

  const renderCard = ({ item }) => {
    return (
      <View style={styles.cardContainer}>
        <CardFlip
          style={styles.cardFlip}
          ref={(card) => (this['card' + item.finnish] = card)}
        >
          <TouchableOpacity
            style={[styles.card, styles.cardFront]}
            onPress={() => this['card' + item.finnish].flip()}
          >
            <Text style={styles.cardText}>{item.finnish}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.card, styles.cardBack]}
            onPress={() => this['card' + item.finnish].flip()}
          >
            <Text style={styles.cardText}>{item.english}</Text>
          </TouchableOpacity>
        </CardFlip>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Learn Finnish!</Text>
      <Button title="Shuffle" onPress={handleShuffle} color="blue" />
      <FlatList
        data={shuffledCards}
        renderItem={renderCard}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.cardList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'pink',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  cardList: {
    justifyContent: 'center',
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 8,
  },
  cardFlip: {
    width: 150,
    height: 100,
  },
  card: {
    width: 150,
    height: 100,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
  },
  cardFront: {
    backgroundColor: '#f9c74f',
  },
  cardBack: {
    backgroundColor: '#90be6d',
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
