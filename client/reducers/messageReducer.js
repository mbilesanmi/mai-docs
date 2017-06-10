import initialState from './initialState';
import * as types from '../actions/actionTypes';

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
