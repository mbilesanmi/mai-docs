import axios from 'axios';
// import jwtDecode from 'jwt-decode';
import * as types from './actionTypes';
import setAuthorizationToken from '../utils/authenticate';

export function createUserSuccess(user) {
  return { type: types.CREATE_USER_SUCCESS, user };
}
export function setCurrentUser(user) {
  return { type: types.SET_LOGGEDIN_USER, user };
}
export function signoutUser(user) {
  return { type: types.SIGNOUT_USER, user };
}

export function createUser(user) {
  return dispatch => axios.post('api/users', user)
    .then((response) => {
      const token = response.data.token;
      localStorage.setItem('maiDocsJwtToken', token);
      dispatch(createUserSuccess(response.data.userData));
      setAuthorizationToken(token);
      axios.defaults.headers.common.Authorization = token;
      dispatch(setCurrentUser(response.data));
    })
    .catch((error) => {
      throw (error);
    });
}

export function login(user) {
  return dispatch => axios.post('api/users/login', user)
    .then((response) => {
      const token = response.data.token;
      localStorage.setItem('maiDocsJwtToken', token);
      dispatch(createUserSuccess(response.data.userData));
      setAuthorizationToken(token);
      axios.defaults.headers.common.Authorization = token;
      dispatch(setCurrentUser(response.data));
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
