import React, { Component } from 'react';
import * as firebase from "firebase";
// import logo from './logo.svg';
import './App.css';
import {loggedIn} from './actions.js';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {red700} from 'material-ui/styles/colors';
import { connect } from 'react-redux';
import {BrowserRouter, Route, Link, Switch, Redirect}
  from 'react-router-dom';

import { Provider } from 'react-redux';

import MyForm from './myform';
import {loggedOut, removeUser} from './actions';
import MyList from './list';
import MyDelete from './delete';
import { auth } from './database';
import store from './store.js';
const theme = getMuiTheme({
  palette: {primary1Color: red700}
});


const NoMatch = ({location}) => (
  //location = props.location;
  <div>
    <h3>Page not found: {location.pathname}</h3>
  </div>
)
/*
class Article extends Component {
  constructor (props) {
    super(props);

    this.state = {id: props.match.params.id};

    // fetch article from you api
  }

  componentWillReceiveProps () {
    // fetch article from you api
  }

  render() {
    return (
      <div>
       <h3>Article: {this.state.id}</h3>
     </div>
    )
  }
}
*/
// const Article = ({match}) => (

//   <div>
//     <h3>Article: {match.params.id}</h3>
//   </div>
// )

class Nav extends Component {
  constructor(props) {
    super(props);
  }

  login () {
    auth()
      .then((user) => {
        console.log(user);
        //this.setState({logged_in: true});
      })
      .catch(function (e) {
        console.log(e);
      });
  }

log_out(){
  firebase.auth().signOut().then(() => {
    console.log("log out sucessfull");
    //let tempstate = !this.state.logged_in;
    //this.setState({logged_in: tempstate});
    this.props.logout();
  }).catch(function(error) {
    console.log("log out failed", error);
  });
}



  auth_button () {
    if (this.props.user.uid) {
      return <button onClick={() => this.log_out()}>Logout</button>
    }

    return <button onClick={() => this.login()}>Login</button>
  }

  render() {
    return (
      <ul>
        <li><Link to="/">List</Link></li>
        <li><Link to="/add">Add Form</Link></li>
        <li>{this.auth_button()}</li>
      </ul>
    )
  }
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onClick: function (data) {
      dispatch(loggedIn(data));
    },
    logout: function () {
      dispatch(loggedOut());
      dispatch(removeUser());
    }
  }
}

var NavConnected = connect(mapStateToProps, mapDispatchToProps)(Nav);

class MyAppComponent extends Component {


  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={theme}>
          <BrowserRouter>
            <div>
              <AppBar title="Contacts Application"/>
              <NavConnected/>

              <Switch>
                <Route exact path="/" component={MyList}/>
                <Route path="/add" component={MyForm}/>
                <Route path="/edit/:id" component={MyForm}/>
                <Route path="/delete/:id" component={MyDelete}/>
                <Redirect from="/old-form" to="/form"/>
                <Route component={NoMatch}/>
              </Switch>
            </div>
          </BrowserRouter>
        </MuiThemeProvider>
      </Provider>
    );
  }
}


export default MyAppComponent;
