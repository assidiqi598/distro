import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCdglKlS8UyMdYZ_7behpJ3lLyw4m2LA0E",
    authDomain: "distro-db.firebaseapp.com",
    projectId: "distro-db",
    storageBucket: "distro-db.appspot.com",
    messagingSenderId: "738975625959",
    appId: "1:738975625959:web:8aecbd4261454dc21c6842",
    measurementId: "G-DYGK49E71D"
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
