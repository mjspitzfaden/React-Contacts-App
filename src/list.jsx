import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import {clicked} from './actions';
import uid from 'uid'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
// import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import database from './database';

import {Link} from 'react-router-dom';

class MyListComponent extends Component {
  constructor(props) {
    super(props);

    this.history = props.history;


    this.state = {
      key: '', name: 'NONE', address: 'NONE', city: 'lafayette', email:'', phoneNumber: 'number', state:'La', zip:'70501',
    };

  }


  showInfo(event, key) {
    let personIndex = this.props.contacts.findIndex((contact)=>{
      if (contact.key === key) {return contact}
    })
    // dispatch clicked:
    //store.dispatch(clicked(personIndex, this.porps.contact));
    this.props.onClick(personIndex);



    //let tempState = this.props.contacts
    //tempState[personIndex].clicked = !tempState[personIndex].clicked
    //this.setState({contacts: tempState})
  }

render() {
  var list = this.props.contacts.map((person, index) => {
    console.log('person is',person)
    if(person.clicked){
      return (<li key={person.key} onClick={(event)=>this.showInfo(event, person.key)}>
      {person.key}-{person.name}-{person.city}-{person.address}-{person.state}-{person.phoneNumber}-{person.email}-{person.zip}
      <Link to={'/edit/' + index}>Edit</Link>
      <Link to={'/delete/' + person.key}>Delete</Link>
      </li>)
    } else {
      return (<li key={person.key} onClick={(event)=>this.showInfo(event, person.key)}>
      {person.key}-{person.name}-{person.city}-{person.state}
      <Link to={'/edit/' + index}>Edit</Link>
      <Link to={'/delete/' + person.key}>Delete</Link>
      </li>)
    }
  })
  return (
    <div>
      <ul>
        {list}
      </ul>
    </div>
  );
}
}

function mapStateToProps (state) {
  return {
    contacts: state.contacts,
    user: state.user
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onClick: function (data) {
      dispatch(clicked(data));
    }
  }
}

var MyList = connect(mapStateToProps, mapDispatchToProps)(MyListComponent);

export default MyList;
