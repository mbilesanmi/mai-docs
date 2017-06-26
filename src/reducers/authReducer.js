import { checkAuth } from '../utils/helper';
import * as types from '../actions/actionTypes';

/**
 * Message reducer
 *
 * @export
 * @param {Object} [state=initialState.message] initial state
 * @param {Object} action action
 * @returns {Object} reduced or initial state
 */
export default (state = checkAuth(), action) => {
  switch (action.type) {
    case types.LOGGEDIN_USER:
      return action.payload;

    case types.SIGNOUT_USER:
      return {
        isAuth: false,
        user: null
      };

    default:
      return state;
  }
};
