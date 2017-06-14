import expect from 'expect';
import { createStore } from 'redux';
import rootReducer from '../../reducers';
import initialState from '../../reducers/initialState';
import * as documentActions from '../../actions/documentActions';

describe('Store', () => {
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
    const expected = {
      title: 'Dummy title',
      content: 'Dummy content',
      viewAccess: 'Public'
    };

    expect(actual).toEqual(expected);
  });

  it('Should handle updating documents', () => {
    const store = createStore(rootReducer, initialState);
    const document = {
      title: 'Dummy title 2',
      content: 'Dummy content',
      viewAccess: 'Public'
    };

    const action = documentActions.updateDocumentSuccess(document);
    store.dispatch(action);

    const actual = store.getState().documents[0];
    const expected = {
      title: 'Dummy title 2',
      content: 'Dummy content',
      viewAccess: 'Public'
    };

    expect(actual).toEqual(expected);
  });
});
