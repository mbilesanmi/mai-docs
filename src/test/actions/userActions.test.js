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
import { user, users, metaData } from '../testHelper';

let expectedActions, store;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const token = 1234;

describe('The', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('getAllUsers action', () => {
    it('should display an error message when users are not found', () => {
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

    it('should return all users', () => {
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

  describe('getOneUser action', () => {
    it('should display an error message when a user is not fetched', () => {
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

    it('should return a user\'s info successfully', () => {
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

  describe('signup action', () => {
    it('should display an error message when user signup fails', () => {
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

    it('should create a user profile', () => {
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

  describe('login action', () => {
    it('should display an error message when user login fails', () => {
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

    it('should log a user successfully', () => {
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

  describe('updateProfile action', () => {
    it('should display an error message when user update fails', () => {
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

    it('should display a success message when profile is updated', () => {
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

  describe('searchAllUsers action', () => {
    it('should display an error message when no users are not retrieved', () => {
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

    it('should display a success message when users are retrieved', () => {
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
