
import API from '../services/api';
import AJAX from '../services/ajax';
import { alertError } from '../pages/alert';
import {
  UPDATE_MOVIE, UPDATE_MOVIES,
} from './../constants/action-types';

export const recieveMovie = movie => ({
  type: UPDATE_MOVIE, movie,
});

export const recieveMovies = movies => ({
  type: UPDATE_MOVIES, movies,
});

const getMovies = async () => {
  const response = await AJAX.get(API.MoviesIndexUrl);
  if (response && response.status === 'SUCCESS') {
    return response.movies;
  }
  return [];
};

const getMovie = async (id) => {
  const response = await AJAX.get(API.MovieUrl(id));
  if (response && response.status === 'FAILED') { alertError(response.error); }
  if (response && response.status === 'SUCCESS') {
    return response.movie;
  }
  return {};
};

const submitNewMovie = async (formData) => {
  const response = await AJAX.post(API.MoviesNewUrl, formData);
  if (response && response.status === 'FAILED') { alertError(response.error); }
  if (response && response.status === 'SUCCESS') {
    return true;
  }
  return false;
};

export { getMovies, submitNewMovie, getMovie };
