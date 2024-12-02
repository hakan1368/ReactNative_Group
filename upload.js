const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const data = require('./data_learn.json');

async function uploadData() {
  for (const doc of data) {
    await db.collection('cards').add(doc);
  }
}

uploadData();
