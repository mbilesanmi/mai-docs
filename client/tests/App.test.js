import React from 'react';
import { mount, shallow } from 'enzyme';
import expect from 'expect';
import App from '../components/App.jsx';

describe('Role container Test via Enzyme', () => {
  const wrapper = shallow(<App />);
  it('should render a `container-fluid` element', () => {
    expect(wrapper.node.props.className).toBe('container-fluid');
  });

  it('should have a `Header` children component', () => {
    expect(wrapper.find('Header').length).toBeGreaterThanOrEqualTo(0);
  });
});
