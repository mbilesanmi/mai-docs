// import isEmpty from 'lodash/isEmpty';
import * as types from './../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.users, action) {
  switch (action.type) {
    // case types.SET_CURRENT_USER:
    //   return {
    //     isAuth: !isEmpty(action.user),
    //     user: action.user
    //   };
    default:
      return state;
  }
}
