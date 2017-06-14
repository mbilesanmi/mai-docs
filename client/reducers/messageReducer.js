import initialState from './initialState';
import * as types from '../actions/actionTypes';

/**
 * Message reducer
 *
 * @export
 * @param {Object} [state=initialState.message] initial state
 * @param {Object} action action
 * @returns {Object} reduced or initial state
 */
export default (state = initialState.message, action) => {
  switch (action.type) {
    case types.SUCCESS_MESSAGE:
      return action.successMessage;

    case types.ERROR_MESSAGE:
      return action.errorMessage;

    default:
      return state;
  }
};
