import expect from 'expect';
import allUsersReducer from '../../reducers/allUsersReducer';
import initialState from '../../reducers/initialState';
import * as userActions from '../../actions/userActions';

describe('All Users Reducer', () => {
  it('should have a null initialState', () => {
    expect(initialState.allUsers).toEqual(null);
  });

  it('should fetch all users when passed USERS_DATA', () => {
    const users = [
      { username: 'A' },
      { username: 'B' },
      { username: 'C' }
    ];

    const action = userActions.getAllUsersSuccess(users);

    const newState = allUsersReducer(initialState.allUsers, action);

    expect(newState).toEqual(users);
    expect(newState.length).toEqual(3);
  });

  it('should return initialState when nothing is passed', () => {
    const message = 'found';
    const action = userActions.passSuccessMessage(message);

    const newState = allUsersReducer(initialState.allUsers, action);

    expect(newState).toEqual(initialState.allUsers);
  });
});
