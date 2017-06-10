import * as types from './../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.users, action) => {
  switch (action.type) {
    case types.GET_ALL_USERS_SUCCESS:
      return action.users;

    case types.CREATE_USER_SUCCESS:
      return [
        ...state, action.user
      ];
    default:
      return state;
  }
};
