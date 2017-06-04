import axios from 'axios';
import jwtDecode from 'jwt-decode';
import * as types from './actionTypes';

export function setCurrentUser(user) {
  return { type: types.SET_CURRENT_USER, user };
}

export function login(user) {
  return dispatch => axios.post('api/users/login', user)
    .then((response) => {
      const token = response.data.token;
      localStorage.setItem('maiDocsJwtToken', token);
      axios.defaults.headers.common.Authorization = token;
      dispatch(setCurrentUser(jwtDecode(token)));
    })
    .catch((error) => {
      throw (error);
    });
}
