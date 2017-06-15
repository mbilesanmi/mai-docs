/**
 * @desc Handles all actions relating to Users on the App
 */

import axios from 'axios';
import * as types from './actionTypes';
import setAuthorizationToken from '../utils/authenticate';

/**
 *
 * @desc passSuccessMessage
 * @export
 * @param {string} successMessage  returned success message from api call
 * @returns {*} action, action types and message
 */
export function passSuccessMessage(successMessage) {
  return { type: types.SUCCESS_MESSAGE, successMessage };
}

/**
 *
 * @desc passFailureMessage
 * @export
 * @param {string} errorMessage  returned error message from api call
 * @returns {*} action, action types and message
 */
export function passFailureMessage(errorMessage) {
  return { type: types.ERROR_MESSAGE, errorMessage };
}

/**
 *
 * @desc searchUsersSuccess
 * @export
 * @param {*} users  returned users from search api call
 * @returns {*} action, action types and users
 */
export function searchUsersSuccess(users) {
  return { type: types.SEARCH_USERS_SUCCESS, users };
}

/**
 *
 * @desc getUserSuccess
 * @export
 * @param {*} users  returned users from getAllUsers api call
 * @returns {*} action, action types and users
 */
export function getUserSuccess(users) {
  return { type: types.GET_ALL_USERS_SUCCESS, users };
}

/**
 *
 * @desc createUserSuccess
 * @export
 * @param {*} user returned newly created user
 * @returns {*} action, action types and user
 */
export function createUserSuccess(user) {
  return { type: types.CREATE_USER_SUCCESS, user };
}

/**
 *
 * @desc setCurrentUser
 * @export
 * @param {*} user  returned logged-in user
 * @returns {*} action, action types and user§
 */
export function setCurrentUser(user) {
  return { type: types.SET_LOGGEDIN_USER, user };
}

/**
 *
 * @desc signoutUser
 * @export
 * @param {*} user  returned signedout user
 * @returns {*} action, action types and user
 */
export function signoutUser(user) {
  return { type: types.SIGNOUT_USER, user };
}

/**
 * @desc search for users via GET /api/search/users/
 *
 * @export
 * @param {any} queryString - The query to be searched for
 * @returns {any} the users to be fetched.
 */
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

/**
 * @desc fetch all users via GET /api/users/
 * @export
 * @param {number} offset - The offset for pagination
 * @returns {any} the users to be fetched.
 */
export function getAllUsers(offset) {
  return dispatch => axios.get(`/api/users/?offset=${offset}`)
  .then((response) => {
    dispatch(getUserSuccess(response.data));
  })
  .catch((error) => {
    throw dispatch(passFailureMessage(error.response.data.message));
  });
}

/**
 * @desc fetch a user via GET /api/users/:id
 * @export
 * @param {number} id - The ID of the user to be obtained
 * @returns {object} the user to be fetched.
 */
export function getOneUser(id) {
  return dispatch => axios.get(`/api/users/${id}`)
  .then((response) => {
    dispatch(getUserSuccess(response.data.user));
    // dispatch(passSuccessMessage('dfdjkf, user profile'));
    dispatch(passSuccessMessage(response.data.message));
  })
  .catch((error) => {
    throw dispatch(passFailureMessage(error.response.data.message));
  });
}

/**
 * @desc create/signup user via POST /api/users
 * @export
 * @param {any} user - The user to be created
 * @returns {object} returns the newly signuped user as logged in
 */
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

/**
 * @desc update Profile user via PUT /api/users/:id
 * @export
 * @param {any} user - The user to be updated
 * @returns {object} returns the update user profile
 */
export function updateUser(id, user) {
  return dispatch => axios.put(`/api/users/${id}`, user)
    .then((response) => {
      dispatch(passSuccessMessage(response.data.message));
      dispatch(getOneUser(id));
    })
    .catch((error) => {
      throw dispatch(passFailureMessage(error.response.data.message));
    });
}

/**
 * @desc login user via POST /api/users/login
 * @export
 * @param {any} user - The user to be created
 * @returns {object} returns the newly signed in user
 */
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

/**
 * @desc logs out the user and clears localStorage
 * @export
 * @returns {*} signout message
 */
export function logout() {
  return (dispatch) => {
    localStorage.removeItem('maiDocsJwtToken');
    setAuthorizationToken(false);
    dispatch(signoutUser({}));
  };
}

/**
 * @desc delete user from database via DELETE /api/user/:id
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
