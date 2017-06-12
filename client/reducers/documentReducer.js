import * as types from './../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.documents, action) => {
  switch (action.type) {
    case types.GET_ALL_DOCUMENTS_SUCCESS:
      return action.documents;

    case types.GET_ONE_DOCUMENT_SUCCESS:
      return action.document;

    case types.CREATE_DOCUMENT_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.document)
      ];

    case types.UPDATE_DOCUMENT_SUCCESS:
      return [
        ...state.filter(document => document.id !== action.document.id),
        Object.assign({}, action.document)
      ];

    case types.SIGNOUT_USER:
      return [];

    default:
      return state;
  }
};
