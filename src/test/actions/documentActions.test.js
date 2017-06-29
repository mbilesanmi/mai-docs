import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import nock from 'nock';
import * as documentActions from '../../actions/documentActions';
import {
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
  USER_DOCS,
  ALL_DOCS,
  DOCS_NOT_FOUND
} from '../../actions/actionTypes.js';

let expectedActions, store;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const document = {
    id: 2,
    title: 'pigs is pigs',
    content: 'pigs are great',
    access: 'public'
  };
const documents = [{
    title: 'test',
    content: 'test',
    access: 'public',
    ownerId: 20,
    User: { firstName: 'mai', lastName: 'iles' }
  },
  {
    title: 'test',
    content: 'test',
    access: 'public',
    ownerId: 20,
    User: { firstName: 'dami', lastName: 'peju' }
  }];
const metaData = { pageCount: 3, currentPage: 10 };
const search = {
    query: '',
    access: '',
    limit: 1,
    offset: 1
  };



describe('async actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('Mai Docs Document actions getAllDocuments', () => {
    it('returns DOCS_NOT_FOUND when documents are not retrieved', () => {
      moxios.stubRequest('/api/documents', {
        status:400,
        response: { message: 'No documents found' }
      });
      expectedActions = [
        {
          type: ERROR_MESSAGE,
          errorMessage: 'No documents found'
        }
      ];
      store = mockStore({});
      store.dispatch(documentActions.getAllDocuments())
      .then(() => {
        expect(store.getActions()).throws(expectedActions);
      });
    });
    it('returns DOCS_NOT_FOUND when documents are not retrieved', () => {
      moxios.stubRequest('/api/documents', {
        status:400,
        response: { message: 'No documents found' }
      });
      expectedActions = [
        {
          type: DOCS_NOT_FOUND,
          payload: ''
        }
      ];
      store = mockStore({});
      store.dispatch(documentActions.getAllDocuments())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
    it('returns ALL_DOCS when all documents are retrieved', () => {
      moxios.stubRequest('/api/documents/?offset=0', {
        status: 200,
        response: { documents, metaData }
      });
      expectedActions = [
        {
          type: ALL_DOCS,
          payload: { documents, metaData }
        }
      ];
      store = mockStore({});
      return store.dispatch(documentActions.getAllDocuments(0))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('Mai Docs Document actions getOneDocument', () => {
    it('returns DOCS_NOT_FOUND when document is not found', () => {
      moxios.stubRequest('/api/document/1234566', {
        status:404,
        response: { message: 'No documents found' }
      });
      expectedActions = [
        {
          type: ERROR_MESSAGE,
          errorMessage: 'No documents found'
        }
      ];
      store = mockStore({});
      store.dispatch(documentActions.getOneDocument())
      .then(() => {
        expect(store.getActions()).throws(expectedActions);
      });
    });
    it('returns DOCS_NOT_FOUND when no document are not retrieved', () => {
      moxios.stubRequest('/api/document/sdjshdjsd', {
        status:400,
        response: { message: 'Invalid document ID' }
      });
      expectedActions = [
        {
          type: DOCS_NOT_FOUND,
          payload: ''
        }
      ];
      store = mockStore({});
      store.dispatch(documentActions.getOneDocument())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
    it('returns ALL_DOCS when one document is retrieved', () => {
      moxios.stubRequest('/api/document/1', {
        status: 200,
        response: { document: { document } }
      });
      expectedActions = [
        {
          type: ALL_DOCS,
          payload: { document }
        }
      ];
      store = mockStore({});
      return store.dispatch(documentActions.getOneDocument(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('Mai Docs Document actions createDocuments', () => {
    it('returns ERROR_MESSAGE when document creation fails', () => {
      moxios.stubRequest('/api/documents', {
        status:400,
        response: { message: 'Document creation failed' }
      });
      expectedActions = [
        {
          type: ERROR_MESSAGE,
          errorMessage: 'Document creation failed'
        }
      ];
      store = mockStore({});
      store.dispatch(documentActions.createDocument(document))
      .then(() => {
        expect(store.getActions()).throws(expectedActions);
      });
    });
    it('returns SUCCESS_MESSAGE when document is created', () => {
      moxios.stubRequest('/api/documents', {
        status: 201,
        response: { message: 'document created successfully', document }
      });
      expectedActions = [
        {
          type: SUCCESS_MESSAGE,
          successMessage: 'document created successfully'
        }
      ];
      store = mockStore({});
      return store.dispatch(documentActions.createDocument(document))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('Mai Docs Document actions updateDocuments', () => {
    it('returns ERROR_MESSAGE when document update fails', () => {
      moxios.stubRequest('/api/document/1211321', {
        status: 400,
        response: { message: 'Document update failed' }
      });
      expectedActions = [
        {
          type: ERROR_MESSAGE,
          errorMessage: 'Document update failed'
        }
      ];
      store = mockStore({});
      store.dispatch(documentActions.updateDocument(document))
      .then(() => {
        expect(store.getActions()).throws(expectedActions);
      });
    });

    it('returns SUCCESS_MESSAGE when document is updated', () => {
      moxios.stubRequest('/api/document/1', {
        status: 200,
        response: { message: 'document updated successfully' }
      });
      expectedActions = [
        {
          type: SUCCESS_MESSAGE,
          successMessage: 'document updated successfully'
        }
      ];
      store = mockStore({});
      return store.dispatch(documentActions.updateDocument(1, document))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('Mai Docs Document actions getUserDocuments', () => {
    it('returns DOCS_NOT_FOUND when documents are not retrieved', () => {
      moxios.stubRequest('/api/users/23/documents/?offset=12', {
        status:404,
        response: { message: 'No documents found' }
      });
      expectedActions = [
        {
          type: ERROR_MESSAGE,
          errorMessage: 'No documents found'
        }
      ];
      store = mockStore({});
      store.dispatch(documentActions.getUserDocuments(23, 12))
      .then(() => {
        expect(store.getActions()).throws(expectedActions);
      });
    });
    it('returns DOCS_NOT_FOUND when documents are not retrieved', () => {
      moxios.stubRequest('/api/users/23/documents/?offset=12', {
        status:404,
        response: { message: 'No documents found' }
      });
      expectedActions = [
        {
          type: DOCS_NOT_FOUND,
          payload: ''
        }
      ];
      store = mockStore({});
      store.dispatch(documentActions.getUserDocuments(23, 12))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
    it('returns USER_DOCS when all documents are retrieved', () => {
      moxios.stubRequest('/api/users/23/documents/?offset=0', {
        status: 200,
        response: { documents, metaData }
      });
      expectedActions = [
        {
          type: USER_DOCS,
          payload: { documents, metaData }
        }
      ];
      store = mockStore({});
      return store.dispatch(documentActions.getUserDocuments(23, 0))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('Mai Docs Document actions searchUserDocuments', () => {
    it('returns ERROR_MESSAGE when documents are not retrieved', () => {
      moxios.stubRequest('/api/search/userdocuments/?search=ade&offset=0', {
        status:404,
        response: { message: 'No documents found' }
      });
      expectedActions = [
        {
          type: ERROR_MESSAGE,
          errorMessage: 'No documents found'
        }
      ];
      store = mockStore({});
      store.dispatch(documentActions.searchUserDocuments('ade', 0))
      .then(() => {
        expect(store.getActions()).throws(expectedActions);
      });
    });
    it('returns SUCCESS_MESSAGE when documents are retrieved', () => {
      moxios.stubRequest('/api/search/userdocuments/?search=ade&offset=0', {
        status:200,
        response: { message: 'Found 2 documents' }
      });
      expectedActions = [
        {
          type: SUCCESS_MESSAGE,
          payload: 'Found 2 documents'
        }
      ];
      store = mockStore({});
      store.dispatch(documentActions.searchUserDocuments('ade', 0))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('Mai Docs Document actions searchAllDocuments', () => {
    it('returns ERROR_MESSAGE when documents are not retrieved', () => {
      moxios.stubRequest('/api/search/documents/?search=ade&offset=0', {
        status:404,
        response: { message: 'No documents found' }
      });
      expectedActions = [
        {
          type: ERROR_MESSAGE,
          errorMessage: 'No documents found'
        }
      ];
      store = mockStore({});
      store.dispatch(documentActions.searchAllDocuments('ade', 0))
      .then(() => {
        expect(store.getActions()).throws(expectedActions);
      });
    });
    it('returns SUCCESS_MESSAGE when documents are retrieved', () => {
      moxios.stubRequest('/api/search/documents/?search=ade&offset=0', {
        status:200,
        response: { message: 'Found 2 documents' }
      });
      expectedActions = [
        {
          type: SUCCESS_MESSAGE,
          payload: 'Found 2 documents'
        }
      ];
      store = mockStore({});
      store.dispatch(documentActions.searchAllDocuments('ade', 0))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('Mai Docs Document actions deleteDocument', () => {
    it('returns ERROR_MESSAGE when document is not deleted', () => {
      moxios.stubRequest('/api/document/0', {
        status:404,
        response: { message: 'Document not found' }
      });
      expectedActions = [
        {
          type: ERROR_MESSAGE,
          errorMessage: 'Document not found'
        }
      ];
      store = mockStore({});
      store.dispatch(documentActions.deleteDocument(0))
      .then(() => {
        expect(store.getActions()).throws(expectedActions);
      });
    });
    it('returns SUCCESS_MESSAGE when document is deleted', () => {
      moxios.stubRequest('/api/document/1', {
        status:200,
        response: { message: 'Document deleted' }
      });
      expectedActions = [
        { type: USER_DOCS, documents },
        { type: SUCCESS_MESSAGE, successMessage: 'Document deleted' }
      ];
      store = mockStore({});
      store.dispatch(documentActions.deleteDocument(1, 1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
