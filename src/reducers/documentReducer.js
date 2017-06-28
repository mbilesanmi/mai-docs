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
export default (state = initialState.documents, action) => {
  switch (action.type) {
    case types.USER_DOCS:
      return action.payload;

    case types.ALL_DOCS:
      return action.payload;

    case types.DOCS_NOT_FOUND:
      return initialState.documents;

    default:
      return state;
  }
};
