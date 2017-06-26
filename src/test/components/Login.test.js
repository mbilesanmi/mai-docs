import React from 'react';
import sinon from 'sinon';
import expect from 'expect';
import { shallow, mount, render } from 'enzyme';
import { Login } from '../../components/Login.jsx';

function setup(loading) {
  const props = {
    message: '',
    isAuthenticated: '',
    userActions: {
      login: () => {}
    },
    loading
  };

  return shallow(<Login {...props} />);
}

describe('The Login', () => {
  describe(' component <Login />', () => {
    let component;
    beforeEach(() => {
      component = shallow(<Login />);
    });

    it('should render once', () => {
      expect(component.length).toBe(1);
    });

    it('renders text inputs for both loginId and password', () => {
      const wrapper = setup();
      expect(wrapper.find('input').length).toEqual(2);
      expect(wrapper.find('#loginId').prop('className')).toBe('validate');
      expect(wrapper.find('input').last().prop('id')).toBe('password');
    });
  });
});
