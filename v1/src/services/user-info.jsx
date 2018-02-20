import jwtDecode from 'jwt-decode';

const sessionToken = () => localStorage.getItem('sessionToken');

const userInfo = () => {
  const token = sessionToken();
  if (token && token.length > 10) {
    const {
      iss, exp, aud, ...userData
    } = jwtDecode(token);
    return userData;
  }
  return null;
};


const isUserLoggedIn = () => {
  const token = sessionToken();
  return (token && token.length > 10);
};

const isProduction = process.env.NODE_ENV === 'production';

export { isUserLoggedIn };
export { isProduction };
export default userInfo;
