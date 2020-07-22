import firebase from 'firebase'
import firestore from 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyCw_1Fvp5AK2m4tv7D-rD5HBtNe5NGFjhQ",
    authDomain: "vue-auth-45525.firebaseapp.com",
    databaseURL: "https://vue-auth-45525.firebaseio.com",
    projectId: "vue-auth-45525",
    storageBucket: "vue-auth-45525.appspot.com",
    messagingSenderId: "460219457160",
    appId: "1:460219457160:web:8c92487e582bf643cbc93d"
  };
  // Initialize Firebase
  
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  export default firebaseApp.firestore()

  