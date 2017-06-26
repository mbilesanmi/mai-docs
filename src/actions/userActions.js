/**
 * @desc Handles all actions relating to Users on the App
 */
import axios from 'axios';
import * as types from './actionTypes';
import { setLocalstorage, setDefaultHeader, checkAuth } from '../utils/helper';

/**
 *
 * @desc passSuccessMessage
 * @export
 * @param {string} successMessage  returned success message from api call
 * @returns {*} action, action types and message
 */
export const passSuccessMessage = successMessage =>
  ({ type: types.SUCCESS_MESSAGE, successMessage });

/**
 *
 * @desc passFailureMessage
 * @export
 * @param {string} errorMessage  returned error message from api call
 * @returns {*} action, action types and message
 */
export const passFailureMessage = errorMessage =>
  ({ type: types.ERROR_MESSAGE, errorMessage });

/**
 *
 * @desc setCurrentUser
 * @export
 * @param {*} user  returned logged-in user
 * @returns {*} action, action types and user§
 */
export const setCurrentUser = user =>
  ({ type: types.LOGGEDIN_USER, payload: user });

/**
 *
 * @desc getAllUsersSuccess
 * @export
 * @param {string} users  returned all users from api call
 * @returns {*} action, action types and payload
 */
export const getAllUsersSuccess = users =>
  ({ type: types.USERS_DATA, payload: users });

/**
 *
 * @desc getUserSuccess
 * @export
 * @param {string} user  returned one user from api call
 * @returns {*} action, action types and payload
 */
export const getUserSuccess = user =>
  ({ type: types.USER_DATA, payload: user });

/**
 *
 * @desc signoutUser
 * @export
 * @param {*} user  returned signedout user
 * @returns {*} action, action types and user
 */
export const signoutUser = () =>
  ({ type: types.SIGNOUT_USER, payload: { isAuth: false, user: null } });

/**
 * @desc create/signup user via POST /api/users
 * @export
 * @param {any} user - The user to be created
 * @returns {object} returns the newly signuped user as logged in
 */
export const signup = user => dispatch => axios.post('/api/users', user)
  .then((response) => {
    const token = response.data.token;
    setLocalstorage('maiDocsJwtToken', token);
    setDefaultHeader(token);
    dispatch(setCurrentUser(checkAuth()));
    dispatch(passSuccessMessage(response.data.message));
  })
  .catch((error) => {
    throw dispatch(passFailureMessage(error.response.data.message));
  });

/**
 * @desc login user via POST /api/users/login
 * @export
 * @param {any} user - The user to be created
 * @returns {object} returns the newly signed in user
 */
export const login = user => dispatch =>
  axios.post('/api/users/login', user)
  .then((response) => {
    const token = response.data.token;
    setLocalstorage('maiDocsJwtToken', token);
    setDefaultHeader(token);
    dispatch(setCurrentUser(checkAuth()));
    dispatch(passSuccessMessage(response.data.message));
  })
  .catch((error) => {
    throw dispatch(passFailureMessage(error.response.data.message));
  });

/**
 * @desc fetch all users via GET /api/users/
 *
 * @export
 * @param {number} offset - The offset for pagination
 * @returns {any} the users to be fetched.
 */
export const getAllUsers = (offset) => dispatch =>
  axios.get(`/api/users/?offset=${offset}`)
  .then((response) => {
    dispatch(getAllUsersSuccess(response.data));
  })
  .catch((error) => {
    throw dispatch(passFailureMessage(error.response.data.message));
  });

/**
 * @desc fetch a user via GET /api/user/:id
 * @export
 * @param {number} id - The ID of the user to be obtained
 * @returns {object} the user to be fetched.
 */
export const getOneUser = id => dispatch =>
  axios.get(`/api/user/${id}`)
  .then((response) => {
    dispatch(getUserSuccess(response.data));
  })
  .catch((error) => {
    throw dispatch(passFailureMessage(error.response.data.message));
  });

/**
 * @desc fetch users via GET /api/search/users/?query
 * @export
 * @param {number} query - The search query
 * @param {number} offset - The page offset
 * @returns {object} the user to be fetched.
 */
export const searchAllUsers = (query, offset) => dispatch =>
axios.get(`/api/search/users/?search=${query}&offset=${offset}`)
  .then((response) => {
    dispatch(getAllUsersSuccess(response.data));
    dispatch(passSuccessMessage(response.data.message));
  })
  .catch((error) => {
    throw dispatch(passFailureMessage(error.response.data.message));
  });

/**
 * @desc logs out the user and clears localStorage
 * @export
 * @returns {*} signout message
 */
export const logout = () => (dispatch) => {
  window.localStorage.removeItem('maiDocsJwtToken');
  setDefaultHeader(false);
  dispatch(signoutUser({}));
};

/**
 * @desc update document via PUT /api/document/:id
 *
 * @export
 * @param {any} user - The updated user
 * @param {number} id - The ID of the user profile to be updated
 * @returns {object} user
 */
export const updateProfile = (user, id) => dispatch =>
  axios.put(`/api/user/${id}`, user)
  .then((response) => {
    dispatch(getOneUser(id));
    dispatch(passSuccessMessage(response.data.message));
  })
  .catch((error) => {
    throw dispatch(passFailureMessage(error.response.data.message));
  });
