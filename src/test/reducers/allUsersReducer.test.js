import expect from 'expect';
import allUsersReducer from '../../reducers/allUsersReducer';
import initialState from '../../reducers/initialState';
import * as userActions from '../../actions/userActions';
import { users } from '../testHelper';

describe('All Users Reducer', () => {
  it('should have a null initialState', () => {
    expect(initialState.allUsers).toEqual(null);
  });

  it('should fetch all users when passed USERS_DATA', () => {
    const action = userActions.getAllUsersSuccess(users);

    const newState = allUsersReducer(initialState.allUsers, action);

    expect(newState).toEqual(users);
    expect(newState.length).toEqual(2);
  });

  it('should return initialState when nothing is passed', () => {
    const message = 'found';
    const action = userActions.passSuccessMessage(message);

    const newState = allUsersReducer(initialState.allUsers, action);

    expect(newState).toEqual(initialState.allUsers);
  });
});
