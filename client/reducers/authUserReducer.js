// import isEmpty from 'lodash/isEmpty';
import initialState from './initialState';
import * as types from './../actions/actionTypes';

export default (state = initialState.isAuth, action) => {
  // console.log('state', state, 'action', action);
  switch (action.type) {
    case types.SET_LOGGEDIN_USER:
      return {
        isAuthenticated: true,
        loggedInUser: action.user
      };
    case types.SIGNOUT_USER:
      return {
        isAuthenticated: false,
        loggedInUser: null
      };
    default:
      return state;
  }
};
