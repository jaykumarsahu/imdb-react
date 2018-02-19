// import React from 'react';
import { alertError } from '../pages/alert';

const isUserSignedIn = (history) => {
  const sessionToken = localStorage.getItem('sessionToken');
  if (sessionToken) {
    alertError('User has already signed in.');
    history.push('/');
  }
};

export default isUserSignedIn;
