import * as firebase from 'firebase'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBo7zM0DUEQRQb1BGpuWFacV8uVjvKKago",
    authDomain: "the-paper-parlay.firebaseapp.com",
    databaseURL: "https://the-paper-parlay.firebaseio.com",
    projectId: "the-paper-parlay",
    storageBucket: "the-paper-parlay.appspot.com",
    messagingSenderId: "347511614908",
    appId: "1:347511614908:web:059f1479b6f9df400e8fb9",
    measurementId: "G-NWDRQGY6Q5"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
export default firebaseApp.firestore()