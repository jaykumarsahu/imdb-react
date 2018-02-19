import { put, takeLatest } from 'redux-saga/effects';
import { login, redirectToHome } from '../actions/session';
import { alertError } from '../pages/alert';

import {
  START_LOADING, STOP_LOADING, REQUEST_FOR_SESSION, CLEAR_SESSION_FORM_DATA,
} from './../constants/action-types';

function* getSessionFromRails(action) {
  try {
    yield put({ type: START_LOADING });
    const token = yield login(action.credentials);
    if (token) {
      yield localStorage.setItem('sessionToken', token);
      yield redirectToHome(action.history);
      yield put({ type: CLEAR_SESSION_FORM_DATA });
    }
    yield put({ type: STOP_LOADING });
  } catch (error) {
    alertError(error.message);
  }
}

export default function* mySaga() {
  yield takeLatest(REQUEST_FOR_SESSION, getSessionFromRails);
}
