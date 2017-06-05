import axios from 'axios';
// import jwtDecode from 'jwt-decode';
import * as types from './actionTypes';
// import setAuthorizationToken from '../utils/authenticate';

export function getAllDocumentsSuccess(documents) {
  return { type: types.GET_ALL_DOCUMENTS_SUCCESS, documents };
}

export function getMyDocumentsSuccess(documents) {
  return { type: types.GET_MY_DOCUMENTS_SUCCESS, documents };
}

export function getAllDocuments(limit = 10, offset = 0) {
  return dispatch => axios.get('api/documents')
  .then((response) => {
    dispatch(getAllDocumentsSuccess(response.data));
  });
}

export function getMyDocuments(id, limit = 10, offset = 0) {
  return dispatch => axios.get(`api/users/${id}`)
  .then((response) => {
    dispatch(getMyDocumentsSuccess(response.data.documents));
  });
}

/**
 * delete document from database using DELETE api route /documents/:id
 *
 * @export
 * @param {any} id
 * @returns {object} documents
 */
export function deleteDocument(id, ownerId) {
  return dispatch => axios.delete(`/api/documents/${id}`)
  .then(() => {
    dispatch(getMyDocuments(ownerId));
    dispatch(getAllDocuments());
  });
}

// export function getUserDocs(id, limit = 10, offset = 0) {
//   return (dispatch) =>
//     axios.get(`/api/v1/users/${id}/documents/?limit=${limit}&offset=${offset}`)
//       .then((response) => {
//         dispatch({
//           type: 'FETCHED_DOCUMENTS',
//           payload: response.data.documents
//         });
//       });
// }