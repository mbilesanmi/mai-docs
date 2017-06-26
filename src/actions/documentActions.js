/**
 * @desc Handles all actions relating to Users on the App
 */
import axios from 'axios';
import * as types from './actionTypes';
import { setLocalstorage, setDefaultHeader, checkAuth } from '../utils/helper';

/**
 *
 * @desc passSuccessMessage
 * @export
 * @param {string} successMessage  returned success message from api call
 * @returns {*} action, action types and message
 */
export const passSuccessMessage = successMessage =>
  ({ type: types.SUCCESS_MESSAGE, successMessage });

/**
 *
 * @desc passFailureMessage
 * @export
 * @param {string} errorMessage  returned error message from api call
 * @returns {*} action, action types and message
 */
export const passFailureMessage = errorMessage =>
  ({ type: types.ERROR_MESSAGE, errorMessage });

/**
 *
 * @desc getAllDocsSuccess
 * @export
 * @param {string} documents  returned all documents from api call
 * @returns {*} action, action types and payload
 */
export const getAllDocsSuccess = documents =>
  ({ type: types.ALL_DOCS, payload: documents });

/**
 *
 * @desc getUserDocsSuccess
 * @export
 * @param {string} documents  returned users documents from api call
 * @returns {*} action, action types and payload
 */
export const getUserDocsSuccess = documents =>
  ({ type: types.USER_DOCS, payload: documents });

/**
 * @desc fetch all public and role documents via GET /api/documents/
 *
 * @export
 * @param {number} offset - The offset for pagination
 * @returns {any} the documents to be fetched.
 */
export const getAllDocuments = (offset) => dispatch =>
axios.get(`/api/documents/?offset=${offset}`)
  .then((response) => {
    dispatch(getAllDocsSuccess(response.data));
  })
  .catch((error) => {
    throw dispatch(passFailureMessage(error.response.data.message));
  });

/**
 * @desc fetch all public and role documents via GET /api/documents/
 *
 * @exportp
 * @param {number} documentId - The ID of the document to be fetched
 * @returns {any} the documents to be fetched.
 */
export const getOneDocument = (documentId) => dispatch =>
axios.get(`/api/document/${documentId}`)
  .then((response) => {
    dispatch(getAllDocsSuccess(response.data.document));
  })
  .catch((error) => {
    throw dispatch(passFailureMessage(error.response.data.message));
  });

/**
 * @desc create document via POST /api/documents
 *
 * @export
 * @param {any} document - The document to be created
 * @returns {object} fetches all documents
 */
export const createDocument = (document) => dispatch =>
axios.post('/api/documents', document)
  .then((response) => {
    dispatch(passSuccessMessage(response.data.message));
  })
  .catch((error) => {
    throw dispatch(passFailureMessage(error.response.data.message));
  });

/**
 * @desc update document via PUT /api/document/:id
 *
 * @export
 * @param {number} id - The ID of the document to be updated
 * @param {any} document - The updated content of the document
 * @returns {object} documents
 */
export const updateDocument = (id, document) => dispatch =>
axios.put(`/api/document/${id}`, document)
  .then((response) => {
    dispatch(passSuccessMessage(response.data.message));
  })
  .catch((error) => {
    throw dispatch(passFailureMessage(error.response.data.message));
  });

/**
 * @desc fetch a user via GET /api/documents/:id
 * @export
 * @param {number} id - The ID of the user to be obtained
 * @param {number} offset - The offset for pagination
 * @returns {object} the user to be fetched.
 */
export const getUserDocuments = (id, offset) => dispatch =>
axios.get(`/api/users/${id}/documents/?offset=${offset}`)
  .then((response) => {
    dispatch(getUserDocsSuccess(response.data));
  })
  .catch((error) => {
    throw dispatch(passFailureMessage(error.response.data.message));
  });

/**
 * @desc fetch a user via GET /api/documents/?query&offset
 * @export
 * @param {number} query - The search query
 * @param {number} offset - The offset for pagination
 * @returns {object} the user to be fetched.
 */
export const searchUserDocuments = (query, offset) => dispatch =>
axios.get(`/api/search/userdocuments/?search=${query}&offset=${offset}`)
  .then((response) => {
    dispatch(getUserDocsSuccess(response.data));
    dispatch(passSuccessMessage(response.data.message));
  })
  .catch((error) => {
    throw dispatch(passFailureMessage(error.response.data.message));
  });

/**
 * @desc fetch documents via GET /api/search/documents/?query&offset
 * @export
 * @param {number} query - The search query
 * @param {number} offset - The page offset
 * @returns {object} the user to be fetched.
 */
export const searchAllDocuments = (query, offset) => dispatch =>
axios.get(`/api/search/documents/?search=${query}&offset=${offset}`)
  .then((response) => {
    dispatch(getAllDocsSuccess(response.data));
    dispatch(passSuccessMessage(response.data.message));
  })
  .catch((error) => {
    throw dispatch(passFailureMessage(error.response.data.message));
  });

/**
 * @desc fetch a user via DELETE /api/documents/:id
 * @export
 * @param {number} id - The ID of the document to be deleted
 * @param {number} ownerId - The ID of the document owner
 * @returns {object} the remainig user\'s documents
 */
export const deleteDocument = (id, ownerId) => dispatch =>
axios.delete(`/api/document/${id}`)
  .then((response) => {
    dispatch(getUserDocuments(ownerId, 0));
    dispatch(passSuccessMessage(response.data.message));
  })
  .catch((error) => {
    throw dispatch(passFailureMessage(error.response.data.message));
  });
