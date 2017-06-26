import * as types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * Users reducer
 *
 * @export
 * @param {Object} [state=initialState.allUsers] initial state
 * @param {Object} action action
 * @returns {Object} reduced or initial state
 */
export default (state = initialState.allUsers, action) => {
  switch (action.type) {
    case types.USERS_DATA:
      return action.payload;

    default:
      return state;
  }
};
