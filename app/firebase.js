import { initializeApp } from '@firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyADNyUaY2Ds1FCDQBo5UsSDEwqm7X7ra8I',
  authDomain: 'fir-group-2f359.firebaseapp.com',
  projectId: 'fir-group-2f359',
  storageBucket: 'fir-group-2f359.firebasestorage.app',
  messagingSenderId: '473311272073',
  appId: '1:473311272073:web:93d7bd5c96ec841017fa58',
};

export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
