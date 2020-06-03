// import something here
import * as firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB9L-yqge1dT1HK1gecih7T9J9UVOrfCrU',
  authDomain: 'smackchat-33d56.firebaseapp.com',
  databaseURL: 'https://smackchat-33d56.firebaseio.com',
  projectId: 'smackchat-33d56',
  storageBucket: 'smackchat-33d56.appspot.com',
  messagingSenderId: '983244484505',
  appId: '1:983244484505:web:4c10697fd71cdc73812d08'
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAuth = firebaseApp.auth();
const firebaseDb = firebaseApp.database();

export {
  firebaseAuth,
  firebaseDb
}
