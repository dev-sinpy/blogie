import Vue from 'vue';
import firebase from "firebase/app";
import "firebase/auth";

var config = {
  apiKey: "AIzaSyBewo6hymBkNLD0Kn-L2yr6LOfbeYhBjGc",
  authDomain: "blogie-frontend.firebaseapp.com",
  databaseURL: "https://blogie-frontend.firebaseio.com",
  projectId: "blogie-frontend",
  storageBucket: "blogie-frontend.appspot.com",
  messagingSenderId: "378119109380",
  appId: "1:378119109380:web:51967b7e0e9683e743ae51",
  measurementId: "G-V8LDN6G0SC",
};
if (firebase.apps.length === 0){
  firebase.initializeApp(config);
  var AUTH = firebase.auth();
}
Vue.prototype.$auth = AUTH

export { AUTH }
