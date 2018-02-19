import API from '../services/api';
import AJAX from '../services/ajax';
import { alertError, alertSuccess } from '../pages/alert';

export const redirectToHome = (history) => {
  alertSuccess('User has been signed in successfully.');
  history.push('/');
};

export const login = async (credentials) => {
  const response = await AJAX.post(API.loginUrl, credentials);
  if (response && response.status === 'FAILED') { alertError(response.error); }
  if (response && response.auth_token) {
    return response.auth_token;
  }
  return null;
};
