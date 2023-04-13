// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

class Auth {
  // Your web app's Firebase configuration
  #firebaseConfig = {
    apiKey: "AIzaSyAK1J0LTcCjLAc0cReDd9YT3aIMLvXJszI",
    authDomain: "geulmadi.firebaseapp.com",
    databaseURL: "https://geulmadi-default-rtdb.firebaseio.com",
    projectId: "geulmadi",
    storageBucket: "geulmadi.appspot.com",
    messagingSenderId: "413765648120",
    appId: "1:413765648120:web:cd715421fce4e669e9450d",
  };

  // Initialize Firebase
  #firebase_app = initializeApp(this.#firebaseConfig);
  #auth = getAuth(this.#firebase_app);

  async signUpEmail(email, password) {
    try {
      // ret data: (userCredential);
      const data = await createUserWithEmailAndPassword(
        this.#auth,
        email,
        password
      );
      console.log(data);
      return data;
    } catch (err) {
      throw err;
    }
  }

  async signInEmail(email, password) {
    try {
      // ret data: (userCredential);
      const data = await signInWithEmailAndPassword(
        this.#auth,
        email,
        password
      );
      console.log(data);
      return data;
    } catch (err) {
      throw err;
    }
  }

  async signOutUser() {
    try {
      await signOut(this.#auth);
    } catch (err) {
      throw err;
    }
  }

  onUserStateChange(handler) {
    onAuthStateChanged(this.#auth, (user) => {
      handler(user);
    });
  }
}

export default new Auth();
