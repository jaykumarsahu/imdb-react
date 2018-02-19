import { combineReducers } from 'redux';

import {
  initialUserFormData, initialMovieFormData, loginInitialState,
} from './../constants/initial-states';

import {
  UPDATE_MOVIES, UPDATE_MOVIE, UPDATE_MOVIE_FORM_DATA,
  UPDATE_USER_FORM_DATA, CLEAR_SESSION_FORM_DATA,
  UPDATE_SESSION_FORM_DATA, CLEAR_MOVIE_FORM_DATA,
} from './../constants/action-types';

const movies = (stateData = [], action) => {
  switch (action.type) {
    case UPDATE_MOVIES:
      return action.movies;
    default:
      return stateData;
  }
};

const movie = (stateData = {}, action) => {
  switch (action.type) {
    case UPDATE_MOVIE:
      return action.movie;
    default:
      return stateData;
  }
};

const movieFormData = (stateData = initialMovieFormData, action) => {
  switch (action.type) {
    case UPDATE_MOVIE_FORM_DATA:
      return {
        ...stateData,
        [action.fieldName]: action.value,
      };
    case CLEAR_MOVIE_FORM_DATA:
      return initialMovieFormData;
    default:
      return stateData;
  }
};

const userFormData = (stateData = initialUserFormData, action) => {
  switch (action.type) {
    case UPDATE_USER_FORM_DATA:
      return {
        ...stateData,
        [action.fieldName]: action.value,
      };
    default:
      return stateData;
  }
};

const loginData = (stateData = loginInitialState, action) => {
  switch (action.type) {
    case UPDATE_SESSION_FORM_DATA:
      return {
        ...stateData,
        [action.fieldName]: action.value,
      };
    case CLEAR_SESSION_FORM_DATA:
      return loginInitialState;
    default:
      return stateData;
  }
};

const reducers = {
  userFormData,
  loginData,
  movies,
  movieFormData,
  movie,
};

export default combineReducers(reducers);
