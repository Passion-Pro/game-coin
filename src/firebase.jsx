import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyAYlIv_MWvIJmPeK1DnJphqRHOE9OHijis",
    authDomain: "gamee-coin.firebaseapp.com",
    projectId: "gamee-coin",
    storageBucket: "gamee-coin.appspot.com",
    messagingSenderId: "663492467343",
    appId: "1:663492467343:web:c62c96f158b5cb6c23eefa",
    measurementId: "G-GHN1XFDT80"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore()
const auth = firebaseApp.auth();

const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, storage, provider };

export default db; 