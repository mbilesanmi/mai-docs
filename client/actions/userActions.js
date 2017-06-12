import axios from 'axios';
import * as types from './actionTypes';
import setAuthorizationToken from '../utils/authenticate';

export function passSuccessMessage(successMessage) {
  return { type: types.SUCCESS_MESSAGE, successMessage };
}
export function passFailureMessage(errorMessage) {
  return { type: types.ERROR_MESSAGE, errorMessage };
}
export function searchUsersSuccess(users) {
  return { type: types.SEARCH_USERS_SUCCESS, users };
}
export function getUserSuccess(users) {
  return { type: types.GET_ALL_USERS_SUCCESS, users };
}

export function createUserSuccess(user) {
  return { type: types.CREATE_USER_SUCCESS, user };
}
export function setCurrentUser(user) {
  return { type: types.SET_LOGGEDIN_USER, user };
}
export function signoutUser(user) {
  return { type: types.SIGNOUT_USER, user };
}

export function search(queryString) {
  return dispatch => axios.get(`/api/search/users/?search=${queryString}`)
  .then((response) => {
    dispatch(passSuccessMessage(response.data.message));
    dispatch(searchUsersSuccess(response.data.users));
  })
  .catch((error) => {
    throw dispatch(passFailureMessage(error.response.data.message));
  });
}

export function getAllUsers(offset) {
  return dispatch => axios.get(`/api/users/?offset=${offset}`)
  .then((response) => {
    dispatch(getUserSuccess(response.data));
  })
  .catch((error) => {
    throw dispatch(passFailureMessage(error.response.data.message));
  });
}

export function createUser(user) {
  return dispatch => axios.post('api/users', user)
    .then((response) => {
      const token = response.data.token;
      localStorage.setItem('maiDocsJwtToken', token);
      dispatch(passSuccessMessage(response.data.message));
      setAuthorizationToken(token);
      axios.defaults.headers.common.Authorization = token;
      dispatch(setCurrentUser(response.data.userData));
    })
    .catch((error) => {
      throw dispatch(passFailureMessage(error.response.data.message));
    });
}

export function login(user) {
  return dispatch => axios.post('api/users/login', user)
    .then((response) => {
      const token = response.data.token;
      localStorage.setItem('maiDocsJwtToken', token);
      dispatch(passSuccessMessage(response.data.message));
      setAuthorizationToken(token);
      axios.defaults.headers.common.Authorization = token;
      dispatch(setCurrentUser(response.data.userData));
    })
    .catch((error) => {
      throw dispatch(passFailureMessage(error.response.data.message));
    });
}

export function logout() {
  return (dispatch) => {
    localStorage.removeItem('maiDocsJwtToken');
    setAuthorizationToken(false);
    dispatch(signoutUser({}));
  };
}

/**
 * delete user from database using DELETE api route /api/user/:id
 *
 * @export
 * @param {any} id - The ID of the user to be deleted
 * @returns {object} users
 */
export function deleteUser(id) {
  return dispatch => axios.delete(`/api/users/${id}`)
  .then((response) => {
    dispatch(passSuccessMessage(response.data.message));
    dispatch(getAllUsers());
  })
  .catch((error) => {
    throw dispatch(passFailureMessage(error.response.data.message));
  });
}
