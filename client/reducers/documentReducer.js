import * as types from './../actions/actionTypes';
import initialState from './initialState';

// const loggedinUserDocuments = initialState.loggedinUserDocuments;

export default (state = initialState.documents, action) => {
  switch (action.type) {
    case types.adasasbdjsabdsad:
      return Object.assign({}, state, action.documents);
    case types.GET_ALL_DOCUMENTS_SUCCESS:
      console.log('action.docs', action.documents);
      return action.documents;
    default:
      return state;
  }
};
