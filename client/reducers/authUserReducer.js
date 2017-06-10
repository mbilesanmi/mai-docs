import initialState from './initialState';
import * as types from './../actions/actionTypes';

export default (state = initialState.isAuth, action) => {
  switch (action.type) {
    case types.SET_LOGGEDIN_USER:
      return Object.assign({}, state, {
        isAuthenticated: true,
        loggedInUser: action.user,
      });
    case types.GET_MY_DOCUMENTS_SUCCESS:
      return Object.assign({}, state, {
        loggedInUserDocuments: action.documents
      });
    case types.SIGNOUT_USER:
      return {
        isAuthenticated: false,
        loggedInUser: null
      };
    default:
      return state;
  }
};
