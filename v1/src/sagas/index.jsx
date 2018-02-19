import { fork } from 'redux-saga/effects';
import session from './session';
import movie from './movies';

export default function* sagas() {
  yield fork(movie);
  yield fork(session);
}
