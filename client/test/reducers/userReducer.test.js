import expect from 'expect';
import { createStore } from 'redux';
import userReducer from '../../reducers/userReducer';
import rootReducer from '../../reducers';
import initialState from '../../reducers/initialState';
import * as actions from '../../actions/userActions';

describe('User reducer', () => {
  it('should return a list of all users.', () => {
    const store = createStore(rootReducer, initialState);

    const users = [
      { username: 'Ade' },
      { username: 'Admin' }
    ];

    const action = actions.getUserSuccess(users);
    store.dispatch(action);

    const actual = store.getState().users;
    const expected = users;

    expect(actual).toEqual(expected);
    expect(typeof actual).toBe('object');
  });

  it('should create a new user.', () => {
    const store = createStore(rootReducer, initialState);

    const users = [
      { username: 'Ade' },
      { username: 'Admin' }
    ];

    const newUser = { username: 'Mai' };

    const action = actions.createUserSuccess(newUser);
    store.dispatch(action);

    const actual = store.getState().users;
    const expected = [newUser];

    expect(actual).toEqual(expected);
    expect(typeof actual).toBe('object');
  });
});
