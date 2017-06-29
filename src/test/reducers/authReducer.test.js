import expect from 'expect';
import authReducer from '../../reducers/authReducer';
import initialState from '../../reducers/initialState';
import * as userActions from '../../actions/userActions';
import { checkAuth } from '../../utils/helper';

describe('Authenticated Users Reducer', () => {
  it('should have a null initialState', () => {
    expect(initialState.users).toEqual(null);
  });

  it('should fetch loggedin user when passed USER_DATA', () => {
    const user = [
      { username: 'A' }
    ];

    const action = userActions.setCurrentUser({ isAuth: true, user });

    const newState = authReducer(initialState.authenticated, action);

    expect(newState.isAuth).toEqual(true);
  });

  it('should fetch loggedin user when passed USER_DATA', () => {
    // const user = {};

    const action = userActions.setCurrentUser({ isAuth: false });

    const newState = authReducer(initialState.authenticated, action);

    expect(newState.isAuth).toEqual(false);
  });

  it('should return initialState when nothing is passed', () => {
    const message = 'found';
    const action = userActions.passSuccessMessage(message);

    const newState = authReducer(initialState, action);

    expect(newState).toEqual(initialState);
  });
});
