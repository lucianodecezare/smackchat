// import something here
import * as firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';
import { default as firebaseConfig } from './firebase-config.json';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAuth = firebaseApp.auth();
const firebaseDb = firebaseApp.database();

export {
  firebaseAuth,
  firebaseDb
}
