import axios from 'axios';
import jwtDecode from 'jwt-decode';
import * as types from './actionTypes';
import setAuthorizationToken from '../utils/authenticate';

export function setCurrentUser(user) {
  return { type: types.SET_LOGGEDIN_USER, user };
}
export function signoutUser(user) {
  return { type: types.SIGNOUT_USER, user };
}

export function login(user) {
  return dispatch => axios.post('api/users/login', user)
    .then((response) => {
      const token = response.data.token;
      localStorage.setItem('maiDocsJwtToken', token);
      setAuthorizationToken(token);
      axios.defaults.headers.common.Authorization = token;
      dispatch(setCurrentUser(jwtDecode(token)));
    })
    .catch((error) => {
      throw (error);
    });
}

export function logout() {
  return (dispatch) => {
    localStorage.removeItem('maiDocsJwtToken');
    setAuthorizationToken(false);
    dispatch(signoutUser({}));
  };
}
