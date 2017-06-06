import axios from 'axios';
// import jwtDecode from 'jwt-decode';
import * as types from './actionTypes';
// import setAuthorizationToken from '../utils/authenticate';

export function passSuccessMessage(successMessage) {
  return { type: types.SUCCESS_MESSAGE, successMessage };
}
export function passFailureMessage(errorMessage) {
  return { type: types.ERROR_MESSAGE, errorMessage };
}
export function getAllDocumentsSuccess(documents) {
  return { type: types.GET_ALL_DOCUMENTS_SUCCESS, documents };
}
export function createDocumentSuccess(document) {
  return { type: types.CREATE_DOCUMENT_SUCCESS, document };
}
export function updateDocumentSuccess(document) {
  return { type: types.UPDATE_DOCUMENT_SUCCESS, document };
}

// export function getMyDocumentsSuccess(documents) {
//   return { type: types.GET_MY_DOCUMENTS_SUCCESS, documents };
// }

export function getAllDocuments() {
  return dispatch => axios.get('/api/documents')
  .then((response) => {
    dispatch(getAllDocumentsSuccess(response.data));
  });
}

export function createDocument(document) {
  return dispatch => axios.post('api/documents', document)
  .then((response) => {
    dispatch(getAllDocuments());
    console.log('response', response.data.message);
    dispatch(passSuccessMessage(response.data.message));
  })
  .catch((error) => {
    console.log('err', error.response.data.message);
    dispatch(passFailureMessage(error.response.data.message));
    throw (error);
  });
}

export function updateDocument(id, document) {
  return dispatch => axios.put(`/api/documents/${id}`, document)
  .then((response) => {
    dispatch(getAllDocuments());
    console.log('response', response.data.message);
    dispatch(passSuccessMessage(response.data.message));
    // dispatch(updateDocumentSuccess(response.data.message));
    // dispatch(updateDocumentSuccess());
  })
  .catch((error) => {
    console.log('err', error.response.data.message);
    dispatch(passFailureMessage(error.response.data.message));
    throw (error);
    // console.log('err', err);
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

// export function getMyDocuments(id, limit = 10, offset = 0) {
//   return dispatch => axios.get(`api/users/${id}`)
//   .then((response) => {
//     dispatch(getMyDocumentsSuccess(response.data.documents));
//   });
// }


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