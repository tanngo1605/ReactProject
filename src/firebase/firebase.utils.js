import firebase from 'firebase/app';
import 'firebase/firestore'; //database

import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyCaN5CXnLlmv1CkoKMW2eO54yVEZ-mVuZQ",
    authDomain: "crwn-6e934.firebaseapp.com",
    databaseURL: "https://crwn-6e934.firebaseio.com",
    projectId: "crwn-6e934",
    storageBucket: "crwn-6e934.appspot.com",
    messagingSenderId: "226243300417",
    appId: "1:226243300417:web:f8d58eeeebaae93a554ac0"
  };

firebase.initializeApp(firebaseConfig);

export const createUserProfile = async(userAuth, other) =>{
  if(!userAuth) return;


  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists){
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try{
      await userRef.set({
        displayName, email, createdAt, ...other
      });
    }
    catch(err){
      console.log(err);

    }

  }

  return userRef;




}

export const auth = firebase.auth();

export const firestore = firebase.firestore();


const provideer = new firebase.auth.GoogleAuthProvider();

provideer.setCustomParameters({prompt: 'select_account'});

export const signinWithGG = () => auth.signInWithPopup(provideer);

export default firebase;