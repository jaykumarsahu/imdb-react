import { put, call, takeLatest } from 'redux-saga/effects';
import { alertError } from '../pages/alert';

import {
  getMovies, getMovie, recieveMovies, recieveMovie,
  submitMovie, redirectToMovie,
} from '../actions/movies';


import {
  REQUEST_FOR_MOVIES, REQUEST_FOR_MOVIE,
  START_LOADING, STOP_LOADING, MOVIE_FORM_SUBMIT, CLEAR_MOVIE_FORM_DATA,
} from './../constants/action-types';

function* getMoviesFromRails() {
  try {
    yield put({ type: START_LOADING });
    const movies = yield call(getMovies);
    yield put(recieveMovies(movies));
  } catch (error) {
    alertError(error.message);
  }
  yield put({ type: STOP_LOADING });
}

function* getMovieFromRails(action) {
  try {
    yield put({ type: START_LOADING });
    const movie = yield getMovie(action.id);
    yield put(recieveMovie(movie));
  } catch (error) {
    alertError(error.message);
  }
  yield put({ type: STOP_LOADING });
}

function* submitMovieToAPI(action) {
  try {
    yield put({ type: START_LOADING });
    const movie = yield submitMovie(action.movieFormData);
    if (movie) {
      yield put({ type: CLEAR_MOVIE_FORM_DATA });
      yield redirectToMovie(movie.id, action.history);
    }
    yield put({ type: STOP_LOADING });
  } catch (error) {
    alertError(error.message);
  }
}

export default function* mySaga() {
  yield takeLatest(REQUEST_FOR_MOVIES, getMoviesFromRails);
  yield takeLatest(REQUEST_FOR_MOVIE, getMovieFromRails);
  yield takeLatest(MOVIE_FORM_SUBMIT, submitMovieToAPI);
}
