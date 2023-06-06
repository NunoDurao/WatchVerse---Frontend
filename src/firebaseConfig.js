import firebase from "firebase/compat/app"
import "firebase/compat/auth"

const config = {
  apiKey: "AIzaSyDwPrFoxX6c5Izz4fu8V3RGDYidjc2_zxo",
  authDomain: "watchverse-87c86.firebaseapp.com",
  projectId: "watchverse-87c86",
  storageBucket: "watchverse-87c86.appspot.com",
  messagingSenderId: "283771264535",
  appId: "1:283771264535:web:f6da8f45715c243c16c652",
  measurementId: "G-7QSZZHLVMS",
};

if(!firebase.apps.length) {
    firebase.initializeApp(config);
}

export default firebase;