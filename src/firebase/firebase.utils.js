import firebase from "firebase/app";
import "firebase/firestore"; //database

import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyCaN5CXnLlmv1CkoKMW2eO54yVEZ-mVuZQ",
  authDomain: "crwn-6e934.firebaseapp.com",
  databaseURL: "https://crwn-6e934.firebaseio.com",
  projectId: "crwn-6e934",
  storageBucket: "crwn-6e934.appspot.com",
  messagingSenderId: "226243300417",
  appId: "1:226243300417:web:f8d58eeeebaae93a554ac0",
};

firebase.initializeApp(firebaseConfig);

export const createUserProfile = async (userAuth, other) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...other,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return userRef;
};

export const addCollectionsAndDocuments = async (
  collectionKey,
  objectToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch(); //If the connection is lost in half way, all the data of half will be deleted
  objectToAdd.forEach((e) => {
    const newDocRef = collectionRef.doc(); //return empty strng and randomly create ID
    batch.set(newDocRef, e);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()), //Pass string and convert to URL can read
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection; ///accumulate the object
    return accumulator;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubcribe = auth.onAuthStateChanged((userAuth) => {
      unsubcribe();
      resolve(userAuth);
    }, reject);
  });
};

export const auth = firebase.auth();

export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();

googleProvider.setCustomParameters({ prompt: "select_account" });

export const signinWithGG = () => auth.signInWithPopup(googleProvider);

export default firebase;

/*const collectionReference = firestore.collection('users'); Taking the collections
const collectionSnapShop = collectionReference.get();*/
