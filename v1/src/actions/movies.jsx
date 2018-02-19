import API from '../services/api';
import AJAX from '../services/ajax';
import { alertError, alertSuccess } from '../pages/alert';
import { UPDATE_MOVIE, UPDATE_MOVIES } from './../constants/action-types';

export const recieveMovie = movie => ({
  type: UPDATE_MOVIE, movie,
});

export const recieveMovies = movies => ({
  type: UPDATE_MOVIES, movies,
});

export const getMovies = async () => {
  const response = await AJAX.get(API.MoviesIndexUrl);
  if (response && response.status === 'SUCCESS') {
    return response.movies;
  }
  return [];
};

export const getMovie = async (id) => {
  const response = await AJAX.get(API.MovieUrl(id));
  if (response && response.status === 'SUCCESS') {
    return response.movie;
  }
  if (response && response.status === 'FAILED') { alertError(response.error); }
  return null;
};

export const submitMovie = async (formData) => {
  const response = await AJAX.post(API.MoviesNewUrl, formData);
  if (response && response.status === 'FAILED') { alertError(response.error); }
  if (response && response.status === 'SUCCESS') {
    return response.movie;
  }
  return null;
};

export const redirectToMovie = (movieID, history) => {
  alertSuccess('Movie has been added successfully.');
  history.push(`/movies/${movieID}`);
};
