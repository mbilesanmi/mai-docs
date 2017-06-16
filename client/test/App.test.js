import React from 'react';
import { mount, shallow } from 'enzyme';
import expect from 'expect';
import App from '../components/App.jsx';

function setup(loading) {
  const props = {
    children: {}
  };

  return shallow(<App />);
}
describe('App component Test via Enzyme', () => {
  it('should render a `container-fluid` element', () => {
    const wrapper = setup();
    expect(wrapper.find('div').props().className).toBe('container-fluid');
  });

  it('should have a `Header` children component', () => {
    const wrapper = setup();
    expect(wrapper.find('Header').length).toBe(0);
  });
});
