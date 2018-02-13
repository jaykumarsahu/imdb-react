import jwt_decode from 'jwt-decode';

const sessionToken = () => localStorage.getItem('sessionToken');

const userInfo = () => {
  const token = sessionToken();
  if (token) {
    const {
      iss, exp, aud, ...userData
    } = jwt_decode(token);
    return userData;
  }
  return null;
};

const isUserLoggedIn = () => (!!sessionToken());

export { isUserLoggedIn };
export default userInfo;
