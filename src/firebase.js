import firebase from 'firebase/app';

import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDFHnhVgLZqCn0aD1-Bp0juC7N318MCTOY",
  authDomain: "my-book-app-fd87a.firebaseapp.com",
  databaseURL: "https://my-book-app-fd87a.firebaseio.com",
  projectId: "my-book-app-fd87a",
  storageBucket: "my-book-app-fd87a.appspot.com",
  messagingSenderId: "28235293093",
  appId: "1:28235293093:web:1e067d7d1c7712fee8484c",
};

 // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;