import React, { useEffect, useState } from 'react';
import { firestore } from './firebase';
import { collection, getDocs } from '@firebase/firestore';
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [currentAnswers, setCurrentAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      const ref = collection(firestore, 'questions');
      const querySnapshot = await getDocs(ref);
      const fetchedQuestions = querySnapshot.docs.map((doc) => doc.data());
      setQuestions(fetchedQuestions);
    };

    fetchQuestions();
  }, []);

  const handleOptionSelect = (questionIndex, selectedOption) => {
    setCurrentAnswers((prev) => ({
      ...prev,
      [questionIndex]: selectedOption,
    }));
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    questions.forEach((question, index) => {
      if (currentAnswers[index] === question.correct) {
        calculatedScore += 1;
      }
    });
    setScore(calculatedScore);
    setQuizSubmitted(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Finnish Quiz</Text>
      {quizSubmitted ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            Your Score: {score} / {questions.length}
          </Text>
          <Button
            title="Retry Quiz"
            onPress={() => {
              setCurrentAnswers({});
              setScore(null);
              setQuizSubmitted(false);
            }}
          />
        </View>
      ) : (
        questions.map((question, index) => (
          <View key={index} style={styles.questionContainer}>
            <Text style={styles.questionTitle}>
              {index + 1}. {question.title}
            </Text>
            {question.options.map((option, optionIndex) => (
              <TouchableOpacity
                key={optionIndex}
                style={[
                  styles.optionButton,
                  currentAnswers[index] === option ? styles.selectedOption : {},
                ]}
                onPress={() => handleOptionSelect(index, option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))
      )}
      {!quizSubmitted && (
        <Button
          title="Submit Quiz"
          onPress={handleSubmit}
          disabled={Object.keys(currentAnswers).length !== questions.length}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  questionContainer: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  questionTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  optionButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#e9ecef',
    borderRadius: 4,
  },
  selectedOption: {
    backgroundColor: '#6c757d',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
  resultContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
