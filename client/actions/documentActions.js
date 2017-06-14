/**
 * @desc Handles all actions relating to Documents on the App
 */
import axios from 'axios';
import * as types from './actionTypes';

/**
 *
 * @desc passSuccessMessage
 * @export
 * @param {string} successMessage  returned success message from api call
 * @returns {*} action, action types and message
 */
export function passSuccessMessage(successMessage) {
  return { type: types.SUCCESS_MESSAGE, successMessage };
}

/**
 *
 * @desc passFailureMessage
 * @export
 * @param {string} errorMessage  returned error message from api call
 * @returns {*} action, action types and message
 */
export function passFailureMessage(errorMessage) {
  return { type: types.ERROR_MESSAGE, errorMessage };
}

/**
 *
 * @desc searchDocumentsSuccess
 * @export
 * @param {*} documents  returned documents from search api call
 * @returns {*} action, action types and documents
 */
export function searchDocumentsSuccess(documents) {
  return { type: types.SEARCH_DOCUMENTS_SUCCESS, documents };
}

/**
 *
 * @desc getDocumentSuccess
 * @export
 * @param {*} documents  returned documents from getDocuments api call
 * @returns {*} action, action types and documents
 */
export function getDocumentSuccess(documents) {
  return { type: types.GET_ALL_DOCUMENTS_SUCCESS, documents };
}

/**
 *
 * @desc createDocumentSuccess
 * @export
 * @param {*} document returned newly created document
 * @returns {*} action, action types and document
 */
export function createDocumentSuccess(document) {
  return { type: types.CREATE_DOCUMENT_SUCCESS, document };
}

/**
 *
 * @desc updateDocumentSuccess
 * @export
 * @param {*} documents  returned updated document
 * @returns {*} action, action types and document
 */
export function updateDocumentSuccess(document) {
  return { type: types.UPDATE_DOCUMENT_SUCCESS, document };
}

/**
 * @desc search for documents via GET /api/search/documents/
 *
 * @export
 * @param {any} queryString - The query to be searched for
 * @returns {any} the documents to be fetched.
 */
export function search(queryString) {
  return dispatch => axios.get(`/api/search/documents/?search=${queryString}`)
  .then((response) => {
    dispatch(passSuccessMessage(response.data.message));
    dispatch(getDocumentSuccess(response.data));
  })
  .catch((error) => {
    throw dispatch(passFailureMessage(error.response.data.message));
  });
}

/**
 * @desc fetch all public and role documents via GET /api/documents/
 *
 * @export
 * @param {number} offset - The offset for pagination
 * @returns {any} the documents to be fetched.
 */
export function getAllDocuments(offset) {
  return dispatch => axios.get(`/api/documents/?offset=${offset}`)
  .then((response) => {
    dispatch(getDocumentSuccess(response.data));
  })
  .catch((error) => {
    throw dispatch(passFailureMessage(error.response.data.message));
  });
}

/**
 * @desc fetch all documents for a user via GET /api/users/:id/documents/
 *
 * @export
 * @param {number} id - The ID of the user
 * @param {number} offset - The offset for pagination
 * @returns {any} the document to be fetched.
 */
export function getUserDocuments(id, offset) {
  return dispatch => axios.get(`api/users/${id}/documents/?offset=${offset}`)
  .then((response) => {
    dispatch(getDocumentSuccess(response.data));
  })
  .catch((error) => {
    throw dispatch(passFailureMessage(error.response.data.message));
  });
}

/**
 * @desc fetch a document via GET /api/documents/:id
 *
 * @export
 * @param {number} id - The ID of the document to be obtained
 * @returns {object} the document to be fetched.
 */
export function getOneDocument(id) {
  return dispatch => axios.get(`/api/documents/${id}`)
  .then((response) => {
    dispatch(getDocumentSuccess(response.data.document));
    dispatch(passSuccessMessage(response.data.message));
  })
  .catch((error) => {
    throw dispatch(passFailureMessage(error.response.data.message));
  });
}

/**
 * @desc create document via POST /api/documents
 *
 * @export
 * @param {any} document - The document to be created
 * @returns {object} fetches all documents
 */
export function createDocument(document) {
  return dispatch => axios.post('api/documents', document)
  .then((response) => {
    dispatch(getAllDocuments());
    dispatch(passSuccessMessage(response.data.message));
  })
  .catch((error) => {
    throw dispatch(passFailureMessage(error.response.data.message));
  });
}

/**
 * @desc update document via PUT /api/documents/:id
 *
 * @export
 * @param {number} id - The ID of the document to be updated
 * @param {any} document - The updated content of the document
 * @returns {object} documents
 */
export function updateDocument(id, document) {
  return dispatch => axios.put(`/api/documents/${id}`, document)
  .then((response) => {
    dispatch(getAllDocuments());
    dispatch(passSuccessMessage(response.data.message));
  })
  .catch((error) => {
    throw dispatch(passFailureMessage(error.response.data.message));
  });
}

/**
 * @desc delete document via DELETE /api/documents/:id
 *
 * @export
 * @param {number} id - The ID of the document to be deleted
 * @param {number} ownerId - The ID of the document owner
 * @returns {object} documents
 */
export function deleteDocument(id, ownerId) {
  return dispatch => axios.delete(`/api/documents/${id}`)
  .then((response) => {
    dispatch(passSuccessMessage(response.data.message));
    dispatch(getUserDocuments(ownerId, 0));
  })
  .catch((error) => {
    throw dispatch(passFailureMessage(error.response.data.message));
  });
}
