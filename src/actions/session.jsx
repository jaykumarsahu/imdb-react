import API from '../services/api';
import AJAX from '../services/ajax';
import { alertError, alertSuccess } from '../pages/alert';
// import { START_LOADING, STOP_LOADING} from './../constants/action-types';

export const redirectToHome = (history) => {
  alertSuccess('User has been signed in successfully.');
  history.push('/');
};

export const loginToAPI = async (loginData) => {
  const response = await AJAX.post(API.loginUrl, loginData);
  if (response && response.status === 'FAILED') { alertError(response.error); }
  if (response && response.auth_token) {
    return response.auth_token;
  }
  return null;
};
