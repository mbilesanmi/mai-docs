import expect from 'expect';
import { createStore } from 'redux';
import rootReducer from '../../reducers';
import initialState from '../../reducers/initialState';
import * as documentActions from '../../actions/documentActions';
import * as userActions from '../../actions/userActions';

describe('Store', () => {
  it('should return a list of all documents.', () => {
    const store = createStore(rootReducer, initialState);

    const documents = [
      { title: 'Doc 2' },
      { title: 'Doc 1' }
    ];

    const action = documentActions.getDocumentSuccess(documents);
    store.dispatch(action);

    const actual = store.getState().documents;
    const expected = documents;

    expect(actual).toEqual(expected);
    expect(typeof actual).toBe('object');
  });

  it('Should handle creating documents', () => {
    const store = createStore(rootReducer, initialState);
    const document = {
      title: 'Dummy title',
      content: 'Dummy content',
      viewAccess: 'Public'
    };

    const action = documentActions.createDocumentSuccess(document);
    store.dispatch(action);

    const actual = store.getState().documents[0];
    const expected = document;

    expect(actual).toEqual(expected);
  });

  it('Should handle clearing state on user signout', () => {
    const store = createStore(rootReducer, initialState);
    const document = {
      title: 'Dummy title',
      content: 'Dummy content',
      viewAccess: 'Public'
    };

    const action = userActions.signoutUser();
    store.dispatch(action);

    const actual = store.getState().documents;
    const expected = [];

    expect(actual).toEqual(expected);
  });

  it('Should handle updating documents', () => {
    const store = createStore(rootReducer, initialState);
    const documents = [
      { id: '1', title: 'Dummy title 1' },
      { id: '2', title: 'Dummy title 2' }
    ];

    const document = { id: '1', title: 'Dummy title' };

    const action = documentActions.updateDocumentSuccess(document);
    store.dispatch(action);

    const actual = store.getState().documents;
    const expected = [
      { id: '1', title: 'Dummy title' }
    ];

    expect(actual).toEqual(expected);
  });
});
