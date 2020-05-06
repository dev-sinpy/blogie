import firebase from 'firebase'
import auth from 'firebase/auth' // not used but needed

let config = {
  apiKey: "AIzaSyBewo6hymBkNLD0Kn-L2yr6LOfbeYhBjGc",
  authDomain: "blogie-frontend.firebaseapp.com",
  databaseURL: "https://blogie-frontend.firebaseio.com",
  projectId: "blogie-frontend",
  storageBucket: "blogie-frontend.appspot.com",
  messagingSenderId: "378119109380",
  appId: "1:378119109380:web:51967b7e0e9683e743ae51",
  measurementId: "G-V8LDN6G0SC"
};


export const fireApp = firebase.initializeApp(config)

export const AUTH = fireApp.auth()

export default ({ app, router, Vue }) => {
  Vue.prototype.$auth = AUTH
}
