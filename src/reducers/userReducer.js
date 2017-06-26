import initialState from './initialState';
import * as types from '../actions/actionTypes';

/**
 * Users reducer
 *
 * @export
 * @param {Object} [state=initialState.users] initial state
 * @param {Object} action action
 * @returns {Object} reduced or initial state
 */
export default (state = initialState.users, action) => {
  switch (action.type) {
    case types.USER_DATA:
      return action.payload;

    default:
      return state;
  }
};
