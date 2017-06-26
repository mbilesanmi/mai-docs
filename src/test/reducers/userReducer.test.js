import expect from 'expect';
import userReducer from '../../reducers/userReducer';
import initialState from '../../reducers/initialState';
import * as documentActions from '../../actions/userActions';

describe('User Reducer', () => {
  it('should have a null initialState', () => {
    expect(initialState.users).toEqual(null);
  });

  it('should fetch all users when passed USERS_DATA', () => {
    const user = [
      { username: 'A' }
    ];

    const action = documentActions.getUserSuccess(user);

    const newState = userReducer(initialState.users, action);

    expect(newState).toEqual(user);
  });

  it('should return initialState when nothing is passed', () => {
    const message = 'found';
    const action = documentActions.passSuccessMessage(message);

    const newState = userReducer(initialState.users, action);

    expect(newState).toEqual(initialState.users);
  });
});
