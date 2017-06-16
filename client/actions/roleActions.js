/**
 * @desc Handles all actions relating to Roles on the App
 */
import axios from 'axios';
import * as types from './actionTypes';

/**
 *
 * @desc getRoleSuccess
 * @export
 * @param {any} roles  returns all the roles from server
 * @returns {any} action, action types and roles
 */
export default function getRoleSuccess(roles) {
  return { type: types.GET_ALL_ROLES_SUCCESS, roles };
}

/**
 *
 * @desc passSuccessMessage
 * @export
 * @param {string} errorMessage  returned error message from api call
 * @returns {string} action, action types and message
 */
export function passFailureMessage(errorMessage) {
  return { type: types.ERROR_MESSAGE, errorMessage };
}

/**
 * @desc fetch all roles via GET /api/roles/
 *
 * @export
 * @returns {any} the roles to be fetched.
 */
export function getAllRoles() {
  return dispatch => axios.get('/api/roles')
  .then((response) => {
    dispatch(getRoleSuccess(response.data));
  })
  .catch((error) => {
    throw dispatch(passFailureMessage(error.response.data.message));
  });
}
