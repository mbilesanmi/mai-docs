import expect from 'expect';
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import * as userActions from '../../actions/userActions';
import * as types from '../../actions/actionTypes';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);


describe('User Actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe('createUserSuccess', () => {
    it('should create a CREATE_USER_SUCCESS action', (done) => {
      const user = {
        name: 'test',
        username: 'test',
        email: 'test@test.com',
        password: 'password',
        roleId: 2
      };
      const expectedAction = {
        type: types.CREATE_USER_SUCCESS,
        user
      };
      const action = userActions.createUserSuccess(user);
      expect(action).toEqual(expectedAction);
      done();
    });
  });

  describe('login', () => {
    it('should return an error message action when user details are incorrect', (done) => {
      const expected = [
        { type: 'ERROR_MESSAGE', payload: 'email/passwords do not match' }
      ];

      const store = mockStore({ isAuth: { loggedInUser: null, isAuthenticated: false } });

      store.dispatch(userActions.login({
        email: 'wrongemail@gmail.com',
        password: ''
      })).then(() => {
        expect(store.getActions()).toEqual(expected);
      });
      done();

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 401,
          response: { message: 'email/passwords do not match' }
        });
      });
    });

    it('logs user in when validated', (done) => {
      const expected = [
        { type: 'SET_LOGGEDIN_USER', payload: { token: '123456789' } }
      ];

      const store = mockStore({ isAuth: { loggedInUser: null, isAuthenticated: false } });

      store.dispatch(userActions.login({
        email: 'wrongemail@gmail.com',
        password: 'password'
      })).then(() => {
        expect(store.getActions()).toEqual(expected);
      });
      done();

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: { token: '123456789' }
        });
      });
    });
  });

  describe('setCurrentUser', () => {
    it('should create a SET_LOGGEDIN_USER action', () => {
      const user = { username: 'mai', email: 'mai@iles.com' };
      const expectedAction = {
        type: types.SET_LOGGEDIN_USER,
        user
      };
      const action = userActions.setCurrentUser(user);
      expect(action).toEqual(expectedAction);
    });
  });
});
