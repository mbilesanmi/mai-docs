import * as types from './../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.searchResults, action) => {
  switch (action.type) {
    case types.SEARCH_DOCUMENTS_SUCCESS:
      console.log('action', action);
      return action;

    case types.SEARCH_USERS_SUCCESS:
      console.log('action', action);
      return action;

    default:
      return state;
  }
};
