import React from 'react';
import sinon, { spy } from 'sinon';
import expect from 'expect';
import { shallow, mount, render } from 'enzyme';
import { Navbar } from '../../components/common/Navbar.jsx';

let wrapper;
let props;

/**
 *
 * @desc handles the triggering of the necessary action
 * @param {*} isAuth
 * @param {*} authUser
 * @returns {null} returns no value
 *
 */
function setup(isAuth, authUser) {
  props = {
    isAuth,
    authUser,
    logout: spy(() => new Promise((resolve) => { resolve(); }))
  };

  const context = { router: [] };

  return shallow(<Navbar {...props} />, { context });
}

describe('The Navbar', () => {
  describe('component <Navbar />', () => {
    let component;
    const authUser = { id: 1, roleId: 1, expiresIn: '1hr', iat: 1498921548 };
    const authUser2 = { id: 2, roleId: 2, expiresIn: '1hr', iat: 1498921549 };
    const noUser = { id: '', roleId: '', expiresIn: '', iat: '' };

    it('should exist', () => {
      wrapper = setup(true, authUser);
      expect(wrapper).toExist();
    });

    it('should exist', () => {
      wrapper = setup(true, authUser2);
      expect(wrapper).toExist();
    });

    it('should exist', () => {
      wrapper = setup(false, {});
      const input = wrapper.find('a[class="login"]');
      expect(input).toExist();
    });

    it.skip('should logout a user', () => {
      props.authUser = authUser;
      props.isAuth = true;
      wrapper = mount(<Navbar {...props} />);
      const input = wrapper.find('a[id="logout"]');
      input.simulate('click', {
        preventDefault: () => {
        },
        target: { value: 'ade' } });
      expect(wrapper.props().logout.called).toBe(true);
    });
  });
});
