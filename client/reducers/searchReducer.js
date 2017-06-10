import * as types from './../actions/actionTypes';
import initialState from './initialState';

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
