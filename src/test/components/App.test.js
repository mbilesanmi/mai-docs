import React from 'react';//eslint-disable-line
import expect from 'expect';
import { shallow, mount, render } from 'enzyme';
import Home from '../../components/App.jsx';

describe('<App />', () => {
  it('should have props children', () => {
    const wrapper = shallow(
      <Home />
    );
    expect(wrapper.props('children')).toExist();
  });
});
