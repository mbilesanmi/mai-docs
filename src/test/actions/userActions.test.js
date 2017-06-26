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

  describe('setCurrentUser', () => {
    it('should create a LOGGEDIN_USER action', (done) => {
      const user = {
        name: 'test',
        username: 'test',
        email: 'test@test.com',
        password: 'password',
        roleId: 2
      };
      const expectedAction = {
        type: types.LOGGEDIN_USER,
        payload: user
      };
      const action = userActions.setCurrentUser(user);
      expect(action).toEqual(expectedAction);
      done();
    });
  });

  describe('login', () => {
    // it('should return an error message action when user details are incorrect', (done) => {
    //   const expected = [
    //     { type: 'ERROR_MESSAGE', payload: 'Invalid login details' }
    //   ];

    //   const store = mockStore({ users: null });

    //   store.dispatch(userActions.login({
    //     email: 'wrongemail@gmail.com',
    //     password: ''
    //   })).then(() => {
    //     expect(store.getActions()).toEqual(expected);
    //   });
    //   done();

    //   moxios.wait(() => {
    //     const request = moxios.requests.mostRecent();
    //     request.respondWith({
    //       status: 401,
    //       response: { message: 'Invalid login details' }
    //     });
    //   });
    // });

    // it('logs user in when validated', (done) => {
    //   const expected = [
    //     { type: 'LOGGEDIN_USER', payload: { token: '123456789' } }
    //   ];

    //   const store = mockStore({ isAuth: { loggedInUser: null, isAuthenticated: false } });

    //   store.dispatch(userActions.login({
    //     email: 'wrongemail@gmail.com',
    //     password: 'password'
    //   })).then(() => {
    //     expect(store.getActions()).toEqual(expected);
    //   });
    //   done();

    //   moxios.wait(() => {
    //     const request = moxios.requests.mostRecent();
    //     request.respondWith({
    //       status: 200,
    //       response: { token: '123456789' }
    //     });
    //   });
    // });
  });

  describe('getOneUser', () => {
    it('creates USER_DATA on request for a user\'s information', () => {
      moxios.stubRequest('/api/user/1', {
        status: 200,
        response: {
          user: {}
        }
      });

      // const documents = {};
      const expectedAction = [{
        type: 'USER_DATA',
        payload: { user: {} }
      }];
      const store = mockStore();

      return store.dispatch(userActions.getOneUser(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
    });
  });

  // describe('updateProfile', () => {
  //   it('should create a SET_LOGGEDIN_USER action', () => {
  //     const user = { username: 'mai', email: 'mai@iles.com' };
  //     const expectedAction = {
  //       type: types.SET_LOGGEDIN_USER,
  //       user
  //     };
  //     const action = userActions.setCurrentUser(user);
  //     expect(action).toEqual(expectedAction);
  //   });
  // });
});
