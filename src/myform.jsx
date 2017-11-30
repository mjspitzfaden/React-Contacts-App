import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import {addContact, updateContact} from './actions.js';
import { connect } from 'react-redux';
import uid from 'uid'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
// import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import database, {User} from './database';
import './myform.css';

class MyFormComponent extends Component {
  constructor(props) {
    super(props);
    this.history = props.history;
    //this.check_login();
    console.log(this.props.user)

    this.index = null;
    if (this.props.match.params.id) {
      this.index = this.props.match.params.id;
      this.state = {...this.props.contacts[this.index]};
    } else {
      this.state = {
        key: '', name: 'NONE', address: 'NONE', city: 'lafayette', email:'', phoneNumber: 'number', state:'La', zip:'70501',
      };
    }
  }

  componentDidUpdate(prevProps) {
    console.log(this.props.user)
  }



  update_state(event, key) {
    console.log(event.target);
    this.setState({[key]: event.target.value});
  }




  handle_submit(event) {

    console.log('Submitted:' , this.state.name, this.state.address, this.state.phoneNumber, this.state.email, this.state.city, this.state.state, this.state.zip);
    var infomation = {key: uid(), name: this.state.name, address: this.state.address, email: this.state.email, city: this.state.city,
    state: this.state.state, zip: this.state.zip, phoneNumber: this.state.phoneNumber,
    clicked: false}
    // var tempState = this.state.contacts;
    // tempState.push(infomation);


    //this.sort_contacts(tempState);
    event.preventDefault();


    this.props.onSubmit({key: uid(), name: this.state.name, address: this.state.address, email: this.state.email, city: this.state.city, state: this.state.state, zip: this.state.zip, phoneNumber: this.state.phoneNumber, clicked: false});
    this.props.history.push("/");
  }


updatePerson(event) {
    console.log(this.index, this.state);
    this.props.onChange(this.index, {...this.state});
    this.props.history.push("/");
  }



  sort_contacts(temp_contacts) {
     var sorted = temp_contacts.sort(function(a, b){
     var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
     if (nameA < nameB) //sort string ascending
      return -1;
     if (nameA > nameB)
      return 1;
     return 0; //default return value (no sorting)
    });

    this.setState({contacts: sorted});
    this.setStorage(sorted);

    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <Card className="md-card">
          <form onSubmit={event => this.handle_submit(event)}>
            <CardTitle title="Contact Form" subtitle=""/>
            <CardText>
              <TextField floatingLabelText="Your Name"
                defaultValue={this.state.name}
                onChange={event => this.update_state(event, 'name')}/>
              <TextField floatingLabelText="address"
                defaultValue={this.state.address}
                onChange={event => this.update_state(event, 'address')}/>
              <TextField floatingLabelText="Phone Number"
                defaultValue={this.state.phoneNumber}
                onChange={event => this.update_state(event, 'phoneNumber')}/>
              <TextField floatingLabelText="email"
                defaultValue={this.state.email}
                onChange={event => this.update_state(event, 'email')}/>
              <TextField floatingLabelText="city"
                defaultValue={this.state.city}
                onChange={event => this.update_state(event, 'city')}/>
              <TextField floatingLabelText="state"
                defaultValue={this.state.state}
                onChange={event => this.update_state(event, 'state')}/>
              <TextField floatingLabelText="zip"
                defaultValue={this.state.zip}
                onChange={event => this.update_state(event, 'zip')}/>

            </CardText>
            <CardActions>
              <RaisedButton type="submit" label="Add" primary={true}/>
              <RaisedButton label="Update" primary={true} onClick={event => this.updatePerson(event)}/>
            </CardActions>
          </form>
        </Card>
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
    onSubmit: function (data) {
      dispatch(addContact(data));
    },
    onChange: function (index, data) {
      dispatch(updateContact(index, data));
    }
  }
}

var MyForm = connect(
  mapStateToProps, mapDispatchToProps
)(MyFormComponent);

export default MyForm;
