import expect from 'expect';
import authReducer from '../../reducers/authReducer';
import initialState from '../../reducers/initialState';
import * as userActions from '../../actions/userActions';
import { checkAuth } from '../../utils/helper';

describe('Authenticated Users Reducer', () => {
  it('should have a null initialState', () => {
    expect(initialState.users).toEqual(null);
  });

  // it('should fetch all users when passed USER_DATA', () => {
  //   const user = [
  //     { username: 'A' }
  //   ];

  //   const action = userActions.getUserSuccess(user);

  //   const newState = authReducer(initialState.users, action);

  //   expect(newState.authenticated.isAuth).toEqual(true);
  // });

  // it('should return initialState when nothing is passed', () => {
  //   const message = 'found';
  //   const action = userActions.passSuccessMessage(message);

  //   const newState = authReducer(checkAuth(), action);

  //   expect(newState).toEqual(initialState.users);
  // });
});
