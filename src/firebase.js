// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDXZEuVsiEyHW7WbpJGYQZ2YBYNBc76KxY",
    authDomain: "bucketlist-24fcf.firebaseapp.com",
    projectId: "bucketlist-24fcf",
    storageBucket: "bucketlist-24fcf.appspot.com",
    messagingSenderId: "532634367518",
    appId: "1:532634367518:web:391dc70b88e71c417e600f",
    measurementId: "G-0ZQ93PX22K",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const db = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { auth, provider, timestamp };
export default db;
