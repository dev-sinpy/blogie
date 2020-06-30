// firebase instance for using plugins from firebase.
// Currently only using authentication plugin

import Vue from "vue";
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";

//secret creds only for development purposes. DO NOT SHARE
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

if (firebase.apps.length === 0) {
  firebase.initializeApp(config);
  firebase.analytics();
  var AUTH = firebase.auth();
}

//firebase auth instance for authenicating users. To use in .vue files use 'this.$auth' syntax.
Vue.prototype.$auth = AUTH;

export { AUTH };
