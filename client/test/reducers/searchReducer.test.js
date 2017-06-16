import expect from 'expect';
import { createStore } from 'redux';
import rootReducer from '../../reducers';
import initialState from '../../reducers/initialState';
import * as documentActions from '../../actions/documentActions';
import * as userActions from '../../actions/userActions';

describe('Store', () => {
  it('should return a list of all searched documents.', () => {
    const store = createStore(rootReducer, initialState);

    const documents = [
      { title: 'Doc 2' },
      { title: 'Doc 1' }
    ];

    const action = documentActions.searchDocumentsSuccess(documents);
    store.dispatch(action);

    const actual = store.getState().searchResults.documents;
    const expected = documents;

    expect(actual).toEqual(expected);
  });
});
