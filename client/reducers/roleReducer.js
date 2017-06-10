import * as types from './../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.roles, action) => {
  switch (action.type) {
    case types.GET_ALL_ROLES_SUCCESS:
      return action.roles;

    default:
      return state;
  }
};
