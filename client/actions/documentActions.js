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
export function searchDocumentsSuccess(documents) {
  return { type: types.SEARCH_DOCUMENTS_SUCCESS, documents };
}
export function getDocumentSuccess(documents) {
  return { type: types.GET_ALL_DOCUMENTS_SUCCESS, documents };
}
export function createDocumentSuccess(document) {
  return { type: types.CREATE_DOCUMENT_SUCCESS, document };
}
export function updateDocumentSuccess(document) {
  return { type: types.UPDATE_DOCUMENT_SUCCESS, document };
}

export function search(queryString) {
  return dispatch => axios.get(`/api/search/documents/?search=${queryString}`)
  .then((response) => {
    // console.log('typeof response.data', response.data.documents);
    // console.log('response.data', response);
    dispatch(passSuccessMessage(response.data.message));
    dispatch(searchDocumentsSuccess(response.data));
  })
  .catch((error) => {
    // console.log('typeof error.response.data', error.response.data.message);
    dispatch(passFailureMessage(error.response.data.message));
    // throw (error);
  });
}
export function getAllDocuments() {
  return dispatch => axios.get('/api/documents')
  .then((response) => {
    console.log('typeof getall response.data', response.data);
    dispatch(getDocumentSuccess(response.data));
  })
  .catch((error) => {
    dispatch(passFailureMessage(error.response.data.message));
    throw (error);
  });
}
export function getOneDocument(id) {
  return dispatch => axios.get(`/api/documents/${id}`)
  .then((response) => {
    console.log('document passed', response.data);
    dispatch(getDocumentSuccess(response.data.document));
    dispatch(passSuccessMessage(response.data.message));
  })
  .catch((error) => {
    dispatch(passFailureMessage(error.response.data.message));
    throw (error);
  });
}

export function createDocument(document) {
  return dispatch => axios.post('api/documents', document)
  .then((response) => {
    dispatch(getAllDocuments());
    dispatch(passSuccessMessage(response.data.message));
  })
  .catch((error) => {
    dispatch(passFailureMessage(error.response.data.message));
    throw (error);
  });
}

export function updateDocument(id, document) {
  return dispatch => axios.put(`/api/documents/${id}`, document)
  .then((response) => {
    dispatch(getAllDocuments());
    dispatch(passSuccessMessage(response.data.message));
    // console.log('response', response.data.message);
    // dispatch(updateDocumentSuccess(response.data.message));
    // dispatch(updateDocumentSuccess());
  })
  .catch((error) => {
    dispatch(passFailureMessage(error.response.data.message));
    throw (error);
    // console.log('err', error.response.data.message);
  });
}

/**
 * delete document from database using DELETE api route /api/documents/:id
 *
 * @export
 * @param {any} id - The document ID
 * @param {any} ownerId - ID of the document owner
 * @returns {object} documents
 */
export function deleteDocument(id) {
  return dispatch => axios.delete(`/api/documents/${id}`)
  .then((response) => {
    dispatch(passSuccessMessage(response.data.message));
    dispatch(getAllDocuments());
    // dispatch(getMyDocuments(ownerId));
  })
  .catch((error) => {
    dispatch(passFailureMessage(error.response.data.message));
  });
}

// export function getMyDocumentsSuccess(documents) {
//   return { type: types.GET_MY_DOCUMENTS_SUCCESS, documents };
// }

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
