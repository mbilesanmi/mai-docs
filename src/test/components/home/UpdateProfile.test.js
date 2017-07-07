import React from 'react';
import sinon, { spy } from 'sinon';
import expect from 'expect';
import { shallow, mount, render } from 'enzyme';
import { UpdateProfile } from '../../../components/home/UpdateProfile.jsx';

let wrapper;
let props;

/**
 * @desc handles the triggering of the necessary action
 * @param {*} isAuthenticated
 * @returns {null} returns no value
 */
function setup(isAuthenticated) {
  props = {
    isAuthenticated,
    userActions: {
      updateProfile: spy(() => new Promise((resolve) => { resolve(); })),
      getOneUser: spy(() => new Promise((resolve, reject) => { resolve(); }))
    },
    authUser: { id: 1, roleId: 1, expiresIn: '1hr', iat: 1498921548 },
    message: ''
  };

  return mount(<UpdateProfile {...props} />);
}

describe('UpdateProfile component', () => {
  let component;

  it('should display the update profile form', () => {
    wrapper = setup(true);
    expect(wrapper).toExist();
    expect(wrapper.props().userActions.getOneUser.called).toBe(true);
  });

  it('should display the redirected component', () => {
    wrapper = setup(false);
    expect(wrapper).toExist();
  });

  it('should have a deleteDocument function', () => {
    wrapper = setup(true, document1, 1);
    expect(wrapper.node.changePasswordCLick).toBeA('function');
  });

  it('should submit the form when button is clicked', () => {
    const updateProfile = wrapper.find('button[name="updateProfile"]');
    updateProfile.simulate('blur', {
      target: { value: 'pass', name: 'firstname' } });
    const form = wrapper.find('form[name="registration-form"]');
    form.simulate('submit', {
      preventDefault: () => {}
    });
    expect(wrapper.state().isLoading).toBeFalsy();
  });
});
