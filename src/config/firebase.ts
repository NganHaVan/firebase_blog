import * as firebase from 'firebase';
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: 'fir-bookblog',
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};
console.log(process.env.REACT_APP_ID);
export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const Timestamp = firebase.firestore.Timestamp;
