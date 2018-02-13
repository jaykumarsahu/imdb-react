import { sagaMiddleware } from '../store';
import { put, call, takeEvery, select } from 'redux-saga/effects';
import { loginToAPI, redirectToHome } from '../actions/session';

import {
  START_LOADING, STOP_LOADING, REQUEST_FOR_SESSION, CLEAR_SESSION_FORM_DATA,
} from './../constants/action-types';

function* getSessionFromRails(action) {
  try {
    yield put({ type: START_LOADING });
    const token = yield loginToAPI(action.data);
    yield localStorage.setItem('sessionToken', token);
    yield redirectToHome(action.history);
    yield put({ type: STOP_LOADING });
  } catch (e) {
    console.error('Error=====>', e);
  }
}

export default function* mySaga(loginData) {
  yield takeEvery(REQUEST_FOR_SESSION, getSessionFromRails);
}
