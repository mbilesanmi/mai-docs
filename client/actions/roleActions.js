import axios from 'axios';
import * as types from './actionTypes';

export default function getRoleSuccess(roles) {
  return { type: types.GET_ALL_ROLES_SUCCESS, roles };
}
export function passFailureMessage(errorMessage) {
  return { type: types.ERROR_MESSAGE, errorMessage };
}

export function getAllRoles() {
  return dispatch => axios.get('/api/roles')
  .then((response) => {
    dispatch(getRoleSuccess(response.data));
  })
  .catch((error) => {
    dispatch(passFailureMessage(error.response.data.message));
    throw error;
  });
}
