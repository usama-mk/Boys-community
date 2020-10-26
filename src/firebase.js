import firebase from 'firebase';
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDEFj1UbaJzWxt8bUQoETmSYhRCtTZAENM",
    authDomain: "boys-community.firebaseapp.com",
    databaseURL: "https://boys-community.firebaseio.com",
    projectId: "boys-community",
    storageBucket: "boys-community.appspot.com",
    messagingSenderId: "516484430627",
    appId: "1:516484430627:web:bee83dca8410ce160faa96"
  };
  // Initialize Firebase
  const firebaseApp= firebase.initializeApp(firebaseConfig);
  const db= firebaseApp.firestore();
  const storage= firebase.storage();

  export{storage,db, firebase as default};