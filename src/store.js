import { createStore } from 'redux';
import contacts from './reducers';
import {loggedIn} from './actions';
import database, {user} from './database';
import * as firebase from "firebase";
var store = createStore(contacts);

function save_to_firebase () {
  var state = store.getState();

  // state.contacts
  // save to firebase
  if (state.user.uid) {
    database.ref('contacts/' + state.user.uid).set(state.contacts);
  }
}

firebase.auth()
  .onAuthStateChanged(function(user) {
    if (user) {
      console.log(user);
      store.dispatch(loggedIn(user));
    }
  });

store.subscribe(save_to_firebase);

export default store;
