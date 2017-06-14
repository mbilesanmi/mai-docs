import * as types from './../actions/actionTypes';
import initialState from './initialState';

/**
 * Search reducer
 *
 * @export
 * @param {Object} [state=initialState.searchResults] initial state
 * @param {Object} action action
 * @returns {Object} reduced or initial state
 */
export default (state = initialState.searchResults, action) => {
  switch (action.type) {
    case types.SEARCH_DOCUMENTS_SUCCESS:
      return action;

    case types.SEARCH_USERS_SUCCESS:
      return action;

    default:
      return state;
  }
};
