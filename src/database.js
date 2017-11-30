import * as firebase from "firebase";

  var config = {
    apiKey: "AIzaSyB39bMuPOALebRttTrWGdollbKcdzhBqsc",
    authDomain: "myform-39d9d.firebaseapp.com",
    databaseURL: "https://myform-39d9d.firebaseio.com",
    projectId: "myform-39d9d",
    storageBucket: "myform-39d9d.appspot.com",
    messagingSenderId: "724616771204"
  };
  firebase.initializeApp(config);

var database = firebase.database();

export var User = {};
export function auth () {
  return new Promise(function (resolve, reject) {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(function (result) {
        User.user = result.user;
        resolve(User);
      })
      .catch(function (e) {
        reject(e);
      });
  });
}

export default database;
