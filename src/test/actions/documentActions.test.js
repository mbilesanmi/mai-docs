import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import moxios from 'moxios';
import * as documentActions from '../../actions/documentActions';
import {
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
  USER_DOCS,
  ALL_DOCS
} from '../../actions/actionTypes.js';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  beforeEach(() => moxios.install());
  // afterEach(() => moxios.uninstall());
  afterEach(() => {
    nock.cleanAll();
  });

  describe('Mai Docs Document actions', () => {
    it('should dispatch an action to get all documents', () => {
      const payload = { documents: {} };
      const expectedAction = {
        type: 'ALL_DOCS',
        payload
      };

      expect(
        documentActions.getAllDocsSuccess(payload)
      ).toEqual(expectedAction);
    });
    it('should dispatch an action to pass success messages', () => {
      const successMessage = 'Documents found';
      const expectedAction = {
        type: 'SUCCESS_MESSAGE',
        successMessage
      };

      expect(
        documentActions.passSuccessMessage(successMessage)
      ).toEqual(expectedAction);
    });
    it('should dispatch an action to get all docs', () => {
      const errorMessage = 'No documents found';
      const expectedAction = {
        type: 'ERROR_MESSAGE',
        errorMessage
      };

      expect(
        documentActions.passFailureMessage(errorMessage)
      ).toEqual(expectedAction);
    });
    it('should dispatch an action to get user\'s documents', () => {
      const payload = { documents: {} };
      const expectedAction = {
        type: 'USER_DOCS',
        payload
      };

      expect(
        documentActions.getUserDocsSuccess(payload)
      ).toEqual(expectedAction);
    });
  });

  describe('Mai Docs Document actions', () => {
    it('returns ALL_DOCS when fetching documents has been done', (done) => {
      nock('http://localhost:8080/')
        .get('/api/documents')
        .reply(200, { body: { documents: ['do something'] } });


      const expectedActions = [
        { type: 'ALL_DOCS', documents: ['do something'] }
      ];
      const store = mockStore();

      store.dispatch(documentActions.getAllDocuments()).then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
      done();
    });
    it('returns ALL_DOCS when fetching one document', (done) => {
      nock('http://localhost:8080/')
        .get('/api/document/1')
        .reply(200, { body: { document: ['do something'] } });


      const expectedActions = [
        { type: 'ALL_DOCS', document: ['do something'] }
      ];
      const store = mockStore();

      store.dispatch(documentActions.getOneDocument(1)).then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
      done();
    });
    it('returns SUCCESS_MESSAGE when creating a new document', (done) => {
      const doc = ['do something'];
      nock('http://localhost:8080/')
        .post('/api/documents', doc)
        .reply(200, { body: { message: 'success' } });


      const expectedActions = [
        { type: 'SUCCESS_MESSAGE', message: 'success' }
      ];
      const store = mockStore();

      store.dispatch(documentActions.createDocument(doc)).then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
      done();
    });
    it('returns SUCCESS_MESSAGE when updating a new document', (done) => {
      const doc = ['do something'];
      nock('http://localhost:8080/')
        .put('/api/document/1', doc)
        .reply(200, { body: { message: 'success' } });


      const expectedActions = [
        { type: 'SUCCESS_MESSAGE', message: 'success' }
      ];
      const store = mockStore();

      store.dispatch(documentActions.createDocument(1, doc)).then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
      done();
    });

    it('should create USER_DOCS and SUCCESS_MESSAGE when searching a user\'s documents', (done) => {
      nock('http://localhost:8080')
        .get('/api/search/userdocuments/?search=search')
        .reply(200, { message: 'Found 20 docs', data: { documents: [{ title: 'Cory' }, { title: 'House' }] } });

      const expectedActions = [
        { type: SUCCESS_MESSAGE, message: 'Found 20 docs' },
        { type: USER_DOCS, data: { documents: [{ title: 'Cory' }, { title: 'House' }] } }
      ];

      const store = mockStore({ documents: [] }, expectedActions, done);
      store.dispatch(documentActions.searchUserDocuments()).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(SUCCESS_MESSAGE);
        expect(actions[1].type).toEqual(USER_DOCS);
      });
      done();
    });

    it('should return ALL_DOCS and SUCCESS_MESSAGE when searching all documents', (done) => {
      nock('http://localhost:8080')
        .get('/api/search/documents/?search=search')
        .reply(200, { message: 'Found 20 docs', data: { documents: [{ title: 'Cory' }, { title: 'House' }] } });

      const expectedActions = [
        { type: SUCCESS_MESSAGE, message: 'Found 20 docs' },
        { type: ALL_DOCS, data: { documents: [{ title: 'Cory' }, { title: 'House' }] } }
      ];

      const store = mockStore({ documents: [] }, expectedActions, done);
      store.dispatch(documentActions.searchAllDocuments()).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(SUCCESS_MESSAGE);
        expect(actions[1].type).toEqual(ALL_DOCS);
      });
      done();
    });
    it('should return USER_DOCS and SUCCESS_MESSAGE when deleting a document', (done) => {
      nock('http://localhost:8080')
        .delete('/api/document/1')
        .reply(200, { message: 'Deleted', data: { documents: [{ title: 'Cory' }, { title: 'House' }] } });

      const expectedActions = [
        { type: SUCCESS_MESSAGE, message: 'Deleted' },
        { type: USER_DOCS, data: { documents: [{ title: 'Cory' }, { title: 'House' }] } }
      ];

      const store = mockStore({ documents: [] }, expectedActions, done);
      store.dispatch(documentActions.deleteDocument()).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(SUCCESS_MESSAGE);
        expect(actions[1].type).toEqual(USER_DOCS);
      });
      done();
    });
    it('should return ERROR_MESSAGE when deleting a document', (done) => {
      nock('http://localhost:8080')
        .delete('/api/documents/')
        .replyWithError({ code: 'ETIMEDOUT' });

      const expectedActions = [
        { type: ERROR_MESSAGE, message: 'Not deleted' }
      ];

      const store = mockStore({ documents: [] }, expectedActions, done);
      store.dispatch(documentActions.deleteDocument()).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(ERROR_MESSAGE);
      });
      done();
    });

    it('returns USER_DOCS when fetching a user\'s documents', (done) => {
      const doc = ['do something'];
      nock('http://localhost/')
        .put('/api/users/1/documents/')
        .reply(200, { body: { doc } });


      const expectedActions = [
        { type: 'USER_DOCS', doc }
      ];
      const store = mockStore();

      store.dispatch(documentActions.createDocument(1)).then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
      done();
    });
  });
});
