import React from 'react';
import { mount, shallow } from 'enzyme';
import expect from 'expect';
import SignupForm from '../../../components/home/SignupForm.jsx';

function setup(loading) {
  const props = {
    user: {},
    loading,
    onSubmit: () => {},
    onChange: () => {}
  };

  return shallow(<SignupForm {...props} />);
}

describe('SignupForm via Enzyme', () => {
  it('renders a form element', () => {
    const wrapper = setup(false);
    expect(wrapper.find('form').length).toBe(1);
  });

  it('renders an Textinput tags', () => {
    const wrapper = setup(false);
    expect(wrapper.find('TextInput').length).toBe(6);
  });

  it('Signup button is labeled "Login" when not saving', () => {
    const wrapper = setup(false);
    expect(wrapper.find('input').props().value).toBe('Signup');
  });

  it('Signup button is labeled "Creating user profile..." when saving', () => {
    const wrapper = setup(true);
    expect(wrapper.find('input').props().value).toBe('Creating user profile...');
  });
});
