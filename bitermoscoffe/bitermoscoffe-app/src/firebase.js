import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyCg6zIHPHEADKFcYmCJFAGVLr78jUfsyJw",
    authDomain: "bitermoscoffe.firebaseapp.com",
    projectId: "bitermoscoffe",
    storageBucket: "bitermoscoffe.appspot.com",
    messagingSenderId: "190460366217",
    appId: "1:190460366217:web:0f237fdbb0896f17e8a558",
    measurementId: "G-33D2Q1129J"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore(); // for database connection
  const auth = firebase.auth() // for user auth
  // for Google auth
  const providerGoogle= new firebase.auth.GoogleAuthProvider(); 
  //for Facebook
  const providerFacebook = new firebase.auth.FacebookAuthProvider();
  export {auth,providerFacebook,providerGoogle};
  export default db;