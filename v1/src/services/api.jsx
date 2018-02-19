import apiUrl from './../constants';

const url = process.env.NODE_ENV === 'production' ?  apiUrl.production : apiUrl.development

const API = {
  url,
  registrationUrl: `${url}/api/v1/registrations`,
  loginUrl: `${url}/api/v1/sessions/login`,
  MoviesIndexUrl: `${url}/api/v1/movies`,
  MoviesNewUrl: `${url}/api/v1/movies`,
  MovieUrl: id => `${url}/api/v1/movies/${id}`,
};

export default API;
