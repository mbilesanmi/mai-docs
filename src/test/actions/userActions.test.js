import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as userActions from '../../actions/userActions';
import { checkAuth } from '../../utils/helper';
import {
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
  LOGGEDIN_USER,
  USERS_DATA,
  USER_DATA,
  SIGNOUT_USER
} from '../../actions/actionTypes.js';

let expectedActions, store;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const user = {
    firstname: 'dami',
    lastname: 'dami',
    username: 'dami',
    password: 'dami'
  };
const users = [{
    firstname: 'mai',
    lastname: 'mai',
    username: 'mai',
    password: 'mai'
  },
  {
    firstname: 'peju',
    lastname: 'peju',
    username: 'peju',
    password: 'peju'
  }];
const metaData = { pageCount: 3, currentPage: 1 };
const token = 1234;

describe('async actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('Mai Docs Users actions getAllUsers', () => {
    it('returns ERROR_MESSAGE when users are not found', () => {
      moxios.stubRequest('/api/users/?offset=0', {
        status:400,
        response: { message: 'No users found' }
      });
      expectedActions = [
        {
          type: ERROR_MESSAGE,
          errorMessage: 'No users found'
        }
      ];
      store = mockStore({});
      return store.dispatch(userActions.getAllUsers(0))
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('returns USERS_DATA when all users are retrieved', () => {
      moxios.stubRequest('/api/users/?offset=0', {
        status: 200,
        response: { users, metaData }
      });
      expectedActions = [
        {
          type: USERS_DATA,
          payload: { users, metaData }
        }
      ];
      store = mockStore({});
      return store.dispatch(userActions.getAllUsers(0))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('Mai Docs Users actions getOneUser', () => {
    it('returns ERROR_MESSAGE when a user is not fetched', () => {
      moxios.stubRequest('/api/user/123', {
        status:404,
        response: { message: 'No user found' }
      });
      expectedActions = [
        {
          type: ERROR_MESSAGE,
          errorMessage: 'No user found'
        }
      ];
      store = mockStore({});
      return store.dispatch(userActions.getOneUser(123))
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('returns USER_DATA when a user info is fetched', () => {
      moxios.stubRequest('/api/user/1', {
        status: 200,
        response: { user }
      });
      expectedActions = [
        {
          type: USER_DATA,
          payload: { user }
        }
      ];
      store = mockStore({});
      return store.dispatch(userActions.getOneUser(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('Mai Docs Users actions signup', () => {
    it('returns ERROR_MESSAGE when user signup fails', () => {
      moxios.stubRequest('/api/users', {
        status:400,
        response: { message: 'User signup failed' }
      });
      expectedActions = [
        {
          type: ERROR_MESSAGE,
          errorMessage: 'User signup failed'
        }
      ];
      store = mockStore({});
      return store.dispatch(userActions.signup())
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
    it('returns SUCCESS_MESSAGE & LOGGEDIN_USER when user profile is created', () => {
      moxios.stubRequest('/api/users', {
        status: 201,
        response: { message: 'user created successfully', user }
      });
      expectedActions = [
        { type: LOGGEDIN_USER, user },
        { type: SUCCESS_MESSAGE, successMessage: 'user created successfully' }
      ];
      store = mockStore({});
      store.dispatch(userActions.signup(user))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('Mai Docs Users actions login', () => {
    it('returns ERROR_MESSAGE when user login fails', () => {
      moxios.stubRequest('/api/users/login', {
        status:400,
        response: { message: 'User login failed' }
      });
      expectedActions = [
        {
          type: ERROR_MESSAGE,
          errorMessage: 'User login failed'
        }
      ];
      store = mockStore({});
      return store.dispatch(userActions.login())
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('returns SUCCESS_MESSAGE & LOGGEDIN_USER when user profile is created', () => {
      moxios.stubRequest('/api/users/login', {
        status: 200,
        response: { message: 'user login successful', user, token }
      });
      expectedActions = [
        { type: LOGGEDIN_USER, user },
        { type: SUCCESS_MESSAGE, successMessage: 'user login successful' }
      ];
      store = mockStore({});
      store.dispatch(userActions.login(user))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('Mai Docs Users actions updateProfile', () => {
    it('returns ERROR_MESSAGE when user update fails', () => {
      moxios.stubRequest('/api/user/1211321', {
        status: 400,
        response: { message: 'Profile update failed' }
      });
      expectedActions = [
        {
          type: ERROR_MESSAGE,
          errorMessage: 'Profile update failed'
        }
      ];
      store = mockStore({});
      return store.dispatch(userActions.updateProfile(user, 1211321))
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('returns SUCCESS_MESSAGE when profile is updated', () => {
      moxios.stubRequest('/api/user/1', {
        status: 200,
        response: { message: 'Profile updated successfully' }
      });
      expectedActions = [
        {
          type: SUCCESS_MESSAGE,
          successMessage: 'Profile updated successfully'
        }
      ];
      store = mockStore({});
      return store.dispatch(userActions.updateProfile(user, 1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('Mai Docs Users actions searchAllUsers', () => {
    it('returns ERROR_MESSAGE when no users are not retrieved', () => {
      moxios.stubRequest('/api/search/users/?search=ade&offset=0', {
        status:404,
        response: { message: 'No users found' }
      });
      expectedActions = [
        {
          type: ERROR_MESSAGE,
          errorMessage: 'No users found'
        }
      ];
      store = mockStore({});
      return store.dispatch(userActions.searchAllUsers('ade', 0))
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
    it('returns SUCCESS_MESSAGE when users are retrieved', () => {
      moxios.stubRequest('/api/search/users/?search=ade&offset=0', {
        status:200,
        response: { message: 'Found 2 users' }
      });
      expectedActions = [
        {
          type: SUCCESS_MESSAGE,
          payload: 'Found 2 users'
        }
      ];
      store = mockStore({});
      store.dispatch(userActions.searchAllUsers('ade', 0))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
