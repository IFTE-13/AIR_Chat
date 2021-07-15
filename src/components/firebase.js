import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyBxhjaP6PzrhXzosBmUQFYNdpGynbthdPo",
    authDomain: "airchat-7d5d0.firebaseapp.com",
    projectId: "airchat-7d5d0",
    storageBucket: "airchat-7d5d0.appspot.com",
    messagingSenderId: "147076304693",
    appId: "1:147076304693:web:463e7d364045d78efd467c"
}).auth();