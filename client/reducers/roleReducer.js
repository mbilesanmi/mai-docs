import * as types from './../actions/actionTypes';
import initialState from './initialState';

/**
 * Role reducer
 *
 * @export
 * @param {Object} [state=initialState.roles] initial state
 * @param {Object} action action
 * @returns {Object} reduced or initial state
 */
export default (state = initialState.roles, action) => {
  switch (action.type) {
    case types.GET_ALL_ROLES_SUCCESS:
      return action.roles;

    default:
      return state;
  }
};
