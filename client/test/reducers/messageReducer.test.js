import expect from 'expect';
import { createStore } from 'redux';
import rootReducer from '../../reducers';
import initialState from '../../reducers/initialState';
import * as actions from '../../actions/documentActions';

describe('Message reducer', () => {
  it('should add a success message when a document is created.', () => {
    const store = createStore(rootReducer, initialState);

    const successMessage = 'Document update successful';

    const action = actions.passSuccessMessage(successMessage);
    store.dispatch(action);

    const actual = store.getState().message;
    const expected = successMessage;

    expect(actual).toEqual(expected);
    expect(typeof actual).toBe('string');
  });

  it('should add a failure message when a document is created.', () => {
    const store = createStore(rootReducer, initialState);

    const failureMessage = 'Document did not update';

    const action = actions.passFailureMessage(failureMessage);
    store.dispatch(action);

    const actual = store.getState().message;
    const expected = failureMessage;

    expect(actual).toEqual(expected);
    expect(typeof actual).toBe('string');
  });
});
