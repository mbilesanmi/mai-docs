import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import SigninForm from '../../../components/home/SigninForm.jsx';

function setup(loading) {
  const props = {
    user: {},
    loading,
    onSubmit: () => {},
    onChange: () => {}
  };

  return shallow(<SigninForm {...props} />);
}

describe('SigninForm via Enzyme', () => {
  it('renders a form element', () => {
    const wrapper = setup(false);
    expect(wrapper.find('form').length).toBe(1);
  });

  it('renders an h2 tag', () => {
    const wrapper = setup(false);
    expect(wrapper.find('h2').text()).toEqual('LOGIN');
  });

  it('Login button is labeled "Login" when not loading', () => {
    const wrapper = setup(false);
    expect(wrapper.find('input').props().value).toBe('Login');
  });

  it('login button is labeled "Please wait..." when loading', () => {
    const wrapper = setup(true);
    expect(wrapper.find('input').props().value).toBe('Please wait...');
  });
});
