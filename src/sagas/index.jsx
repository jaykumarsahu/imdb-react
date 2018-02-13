import { sagaMiddleware } from '../store';
import { put, call, takeEvery, fork } from 'redux-saga/effects';
import { getMovies, recieveMovies } from '../actions';
import session from './session';

import {
  REQUEST_FOR_MOVIES,
} from './../constants/action-types';

function* getMoviesFromRails() {
  try {
    const movies = yield call(getMovies);
    yield put(recieveMovies(movies));
  } catch (e) {
    console.log('Error=====>', e);
  }
}

export default function* mySaga() {
  yield takeEvery(REQUEST_FOR_MOVIES, getMoviesFromRails);
}

export function* sagas() {
  yield fork(mySaga);
  yield fork(session);
}
