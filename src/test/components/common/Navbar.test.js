import React from 'react';
import sinon, { spy } from 'sinon';
import expect from 'expect';
import { shallow, mount, render } from 'enzyme';
import { Navbar } from '../../../components/common/Navbar.jsx';
import { authUser, authUser2, noUser} from '../../testHelper';

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

describe('Navbar component', () => {
  let component;

  it('should display the menu items for an admin', () => {
    wrapper = setup(true, authUser);
    expect(wrapper).toExist();
  });

  it('should display the menu items for a regular user', () => {
    wrapper = setup(true, authUser2);
    expect(wrapper).toExist();
  });

  it('should display the menu items for an unauthenticated user', () => {
    wrapper = setup(false, {});
    const input = wrapper.find('a[class="login"]');
    expect(input).toExist();
  });

  it('should logout a user', () => {
    wrapper = setup(true, authUser);
    const input = wrapper.find('#logout');
    input.simulate('click', {
      preventDefault: () => {
      },
      target: { value: 'ade' } });
    expect(props.logout.called).toBe(true);
  });
});
