import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { alertSuccess } from '../../pages/alert';

export default class SignOut extends Component {
  constructor(props) {
    super(props);
    localStorage.removeItem('sessionToken');
    alertSuccess('Logged out successfully.');
  }

  render() {
    return <Redirect to="/signin" />;
  }
}

