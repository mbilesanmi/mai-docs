import expect from 'expect';
import messageReducer from '../../reducers/messageReducer';
import initialState from '../../reducers/initialState';
import * as documentActions from '../../actions/documentActions';

describe('Message Reducer', () => {
  it('should have a null initialState', () => {
    expect(initialState.message).toEqual(null);
  });

  it('should add success message when passed SUCCESS_MESSAGE', () => {
    const msg = 'Docs found';

    const action = documentActions.passSuccessMessage(msg);

    const newState = messageReducer(initialState.message, action);

    expect(newState).toEqual('Docs found');
  });
  
  it('should add error message when passed ERROR_MESSAGE', () => {
    const msg = 'Docs not found';

    const action = documentActions.passFailureMessage(msg);

    const newState = messageReducer(initialState.message, action);

    expect(newState).toEqual('Docs not found');
  });

  it('should return initialState when nothing is passed', () => {
    const msg = '';
    const action = documentActions.getAllDocsSuccess(msg);

    const newState = messageReducer(initialState, action);

    expect(newState).toEqual(initialState);
  });
});
