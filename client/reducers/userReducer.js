import * as types from './../actions/actionTypes';
import initialState from './initialState';

/**
 * User reducer
 *
 * @export
 * @param {Object} [state=initialState.users] initial state
 * @param {Object} action action
 * @returns {Object} reduced or initial state
 */
export default (state = initialState.users, action) => {
  switch (action.type) {
    case types.GET_ALL_USERS_SUCCESS:
      return action.users;

    case types.CREATE_USER_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.user)
      ];
    default:
      return state;
  }
};
