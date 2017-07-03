import React from 'react';
import sinon, { spy } from 'sinon';
import expect from 'expect';
import { shallow, mount, render } from 'enzyme';
import { Login } from '../../components/Login.jsx';

let wrapper;

/**
 * @desc handles the triggering of the necessary action
 * @param {*} isAuthenticated
 * @returns {null} returns no value
 */
function setup(isAuthenticated) {
  const props = {
    isAuthenticated,
    userActions: {
      getOneUser: spy(() => new Promise((resolve) => { resolve(); })),
      login: spy(() => new Promise((resolve) => { resolve(); }))
    },
    message: ''
  };

  return mount(<Login {...props} />);
}

describe('The Login', () => {
  describe('component <Login />', () => {
    let component;

    it('should exist', () => {
      wrapper = setup(true);
      expect(wrapper).toExist();
    });

    it('should exist', () => {
      wrapper = setup(false);
      // console.log('kcvjhjjd kh gahd kzh dg dd', wrapper.state());
      expect(wrapper).toExist();
    });

    it('should change state when form is filled', () => {
      wrapper = setup(false);
      const loginId = wrapper.find('input[id="loginId"]');
      loginId.simulate('change', {
        preventDefault: () => {
        },
        target: { value: 'ade', name: 'loginId' } });
      const password = wrapper.find('input[id="password"]');
      password.simulate('change', {
        preventDefault: () => {
        },
        target: { value: 'password', name: 'password' } });
      expect(wrapper.state().user.loginId).toEqual('ade');
      expect(wrapper.state().user.password).toEqual('password');
    });

    it('should submit the form when button is clicked', () => {
      const form = wrapper.find('form[id="loginForm"]');
      form.simulate('submit', {
        preventDefault: () => {
        }
      });
      expect(wrapper.state().isLoading).toBeTruthy();
    });
  });
});

//
//
// WRITE TEST FOR MAPSTATETOPROPS && MAPDISPATCHTOPROPS
//
//
